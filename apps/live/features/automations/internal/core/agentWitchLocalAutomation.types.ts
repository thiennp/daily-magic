export type LocalAutomationSchedulePreset = "hourly" | "daily" | "weekdays";

export interface LocalScheduledAutomation {
  readonly id: string;
  readonly name: string;
  readonly capabilityId: string;
  readonly prompt: string;
  readonly schedulePreset: LocalAutomationSchedulePreset;
  readonly scheduleHour: number | null;
  readonly scheduleTimezone: string;
  readonly enabled: boolean;
  readonly nextRunAt: string | null;
  readonly lastRunAt: string | null;
  readonly lastRunStatus: "ok" | "failed" | null;
  readonly lastError: string | null;
}

export interface LocalAutomationStoreDocument {
  readonly version: 1;
  readonly automations: readonly LocalScheduledAutomation[];
}

const isSchedulePreset = (
  value: string,
): value is LocalAutomationSchedulePreset =>
  value === "hourly" || value === "daily" || value === "weekdays";

export const parseLocalScheduledAutomation = (
  value: unknown,
): LocalScheduledAutomation | null => {
  if (typeof value !== "object" || value === null) {
    return null;
  }

  const record = value as Record<string, unknown>;
  const id = typeof record.id === "string" ? record.id.trim() : "";
  const name = typeof record.name === "string" ? record.name.trim() : "";
  const capabilityId =
    typeof record.capabilityId === "string" ? record.capabilityId.trim() : "";
  const prompt = typeof record.prompt === "string" ? record.prompt : "";
  const schedulePreset =
    typeof record.schedulePreset === "string" ? record.schedulePreset : "";
  const scheduleTimezone =
    typeof record.scheduleTimezone === "string" &&
    record.scheduleTimezone.length > 0
      ? record.scheduleTimezone
      : "UTC";

  if (
    id.length === 0 ||
    name.length === 0 ||
    capabilityId.length === 0 ||
    prompt.trim().length === 0 ||
    !isSchedulePreset(schedulePreset)
  ) {
    return null;
  }

  return {
    id,
    name,
    capabilityId,
    prompt: prompt.trim(),
    schedulePreset,
    scheduleHour:
      typeof record.scheduleHour === "number" ? record.scheduleHour : null,
    scheduleTimezone,
    enabled: record.enabled !== false,
    nextRunAt:
      typeof record.nextRunAt === "string" && record.nextRunAt.length > 0
        ? record.nextRunAt
        : null,
    lastRunAt:
      typeof record.lastRunAt === "string" && record.lastRunAt.length > 0
        ? record.lastRunAt
        : null,
    lastRunStatus:
      record.lastRunStatus === "ok" || record.lastRunStatus === "failed"
        ? record.lastRunStatus
        : null,
    lastError:
      typeof record.lastError === "string" && record.lastError.length > 0
        ? record.lastError
        : null,
  };
};
