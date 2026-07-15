import { randomUUID } from "node:crypto";

import {
  reportLocalAutomationRunToCloud,
  resolveAgentWitchCloudApiConfig,
} from "./agentWitchCloudApi";
import { computeNextLocalScheduleRun } from "./agentWitchComputeNextScheduleRun";
import { runHeadlessWriter } from "./agentWitchHeadlessWriterRun";
import {
  findLocalScheduledAutomation,
  updateLocalScheduledAutomation,
} from "./agentWitchLocalAutomationStore";
import { readAgentWitchRunConfig } from "./readAgentWitchRunConfig";

let automationRunInFlight = false;

export const runLocalScheduledAutomationById = async (
  automationId: string,
): Promise<{ readonly ok: boolean; readonly errorMessage?: string }> => {
  if (automationRunInFlight) {
    return {
      ok: false,
      errorMessage: "Another scheduled automation is already running.",
    };
  }

  const config = readAgentWitchRunConfig();

  if (config === null) {
    return { ok: false, errorMessage: "Agent Witch is not configured." };
  }

  const cloudApi = resolveAgentWitchCloudApiConfig({
    wsUrl: config.wsUrl,
    pairingToken: config.pairingToken,
  });

  if (cloudApi === null) {
    return {
      ok: false,
      errorMessage: "Pairing token is missing. Re-link this Mac.",
    };
  }

  const automation = findLocalScheduledAutomation(config.layout, automationId);

  if (automation === null) {
    return { ok: false, errorMessage: "Automation not found on this Mac." };
  }

  if (!automation.enabled) {
    return { ok: false, errorMessage: "Automation is paused." };
  }

  automationRunInFlight = true;
  const agentRunId = randomUUID();

  try {
    const result = await runHeadlessWriter(
      config,
      "claude-cli",
      automation.prompt,
    );
    await reportLocalAutomationRunToCloud(cloudApi, automation.id, {
      agentRunId,
      exitCode: result.exitCode,
      output: result.output,
      prompt: automation.prompt,
    });

    const finishedAt = new Date();
    const nextRunAt = computeNextLocalScheduleRun({
      preset: automation.schedulePreset,
      scheduleHour: automation.scheduleHour,
      timeZone: automation.scheduleTimezone,
      from: finishedAt,
    });

    updateLocalScheduledAutomation(config.layout, {
      ...automation,
      lastRunAt: finishedAt.toISOString(),
      lastRunStatus: result.exitCode === 0 ? "ok" : "failed",
      lastError:
        result.exitCode === 0
          ? null
          : result.output.slice(0, 500) || "Run failed.",
      nextRunAt: nextRunAt.toISOString(),
    });

    return {
      ok: result.exitCode === 0,
      ...(result.exitCode === 0
        ? {}
        : { errorMessage: result.output.slice(0, 500) || "Run failed." }),
    };
  } finally {
    automationRunInFlight = false;
  }
};
