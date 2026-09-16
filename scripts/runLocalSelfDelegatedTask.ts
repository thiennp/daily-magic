import { randomUUID } from "node:crypto";
import fs from "node:fs";

import {
  completeAgentRunOnCloud,
  resolveAgentWitchCloudApiConfig,
  startLocalSelfDispatchOnCloud,
} from "./agentWitchCloudApi";
import { runHeadlessWriter } from "./agentWitchHeadlessWriterRun";
import { isHarnessWriterAgentId } from "./buildWriterCliInvocation";
import { readAgentWitchRunConfig } from "./readAgentWitchRunConfig";

let localSelfDelegateRunInFlight = false;

export const runLocalSelfDelegatedTask = async (input: {
  readonly prompt: string;
  readonly writerAgent: string;
  readonly projectFolderPath?: string;
}): Promise<{
  readonly ok: boolean;
  readonly agentRunId?: string;
  readonly errorMessage?: string;
}> => {
  if (localSelfDelegateRunInFlight) {
    return {
      ok: false,
      errorMessage: "Another local task is already running.",
    };
  }

  const prompt = input.prompt.trim();
  if (prompt.length === 0) {
    return { ok: false, errorMessage: "Task prompt is required." };
  }

  if (!isHarnessWriterAgentId(input.writerAgent)) {
    return {
      ok: false,
      errorMessage: `Unsupported writer agent: ${input.writerAgent}`,
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

  const workspace =
    input.projectFolderPath !== undefined &&
    input.projectFolderPath.trim().length > 0 &&
    fs.existsSync(input.projectFolderPath.trim())
      ? input.projectFolderPath.trim()
      : config.workspace;

  const agentRunId = randomUUID();
  localSelfDelegateRunInFlight = true;

  try {
    const started = await startLocalSelfDispatchOnCloud(cloudApi, {
      agentRunId,
      prompt,
      writerAgent: input.writerAgent,
    });

    if (started === null) {
      return {
        ok: false,
        errorMessage: "Could not register the run on cloud.",
      };
    }

    const result = await runHeadlessWriter(
      { ...config, workspace },
      input.writerAgent,
      prompt,
    );

    const reported = await completeAgentRunOnCloud(
      cloudApi,
      agentRunId,
      result.exitCode,
      result.output,
    );

    if (!reported) {
      return {
        ok: false,
        agentRunId,
        errorMessage: "Task finished locally but cloud status was not updated.",
      };
    }

    return {
      ok: result.exitCode === 0,
      agentRunId,
      ...(result.exitCode === 0
        ? {}
        : {
            errorMessage: result.output.slice(0, 500) || "Task failed.",
          }),
    };
  } finally {
    localSelfDelegateRunInFlight = false;
  }
};
