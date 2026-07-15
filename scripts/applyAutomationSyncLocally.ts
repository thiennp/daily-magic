import { computeNextLocalScheduleRun } from "./agentWitchComputeNextScheduleRun";
import {
  parseLocalScheduledAutomation,
  type LocalScheduledAutomation,
} from "./agentWitchLocalAutomation.types";
import {
  readLocalAutomationStore,
  replaceLocalScheduledAutomations,
} from "./agentWitchLocalAutomationStore";
import {
  resolveAgentWitchLocalLayout,
  type AgentWitchLocalLayout,
} from "./resolveAgentWitchLocalLayout";

const resolveLayout = (profileEmail?: string): AgentWitchLocalLayout => {
  if (profileEmail !== undefined && profileEmail.trim().length > 0) {
    return resolveAgentWitchLocalLayout(profileEmail.trim());
  }

  return resolveAgentWitchLocalLayout();
};

const mergeAutomation = (
  incoming: LocalScheduledAutomation,
  existing: LocalScheduledAutomation | undefined,
): LocalScheduledAutomation => {
  if (existing === undefined) {
    return {
      ...incoming,
      nextRunAt:
        incoming.nextRunAt ??
        computeNextLocalScheduleRun({
          preset: incoming.schedulePreset,
          scheduleHour: incoming.scheduleHour,
          timeZone: incoming.scheduleTimezone,
        }).toISOString(),
      lastRunAt: null,
      lastRunStatus: null,
      lastError: null,
    };
  }

  return {
    ...incoming,
    nextRunAt:
      existing.nextRunAt ??
      incoming.nextRunAt ??
      computeNextLocalScheduleRun({
        preset: incoming.schedulePreset,
        scheduleHour: incoming.scheduleHour,
        timeZone: incoming.scheduleTimezone,
      }).toISOString(),
    lastRunAt: existing.lastRunAt,
    lastRunStatus: existing.lastRunStatus,
    lastError: existing.lastError,
  };
};

export const applyAutomationSyncLocally = (input: {
  readonly automations: readonly unknown[];
  readonly profileEmail?: string;
}):
  | { readonly ok: true; readonly writtenCount: number }
  | {
      readonly ok: false;
      readonly errorMessage: string;
    } => {
  const layout = resolveLayout(input.profileEmail);
  const existingStore = readLocalAutomationStore(layout);
  const existingById = new Map(
    existingStore.automations.map((automation) => [automation.id, automation]),
  );

  const automations = input.automations.flatMap((entry) => {
    const parsed = parseLocalScheduledAutomation(entry);
    return parsed !== null
      ? [mergeAutomation(parsed, existingById.get(parsed.id))]
      : [];
  });

  replaceLocalScheduledAutomations(layout, automations);

  return { ok: true, writtenCount: automations.length };
};
