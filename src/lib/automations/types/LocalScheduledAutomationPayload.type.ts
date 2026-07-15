import type { AgentAutomationSchedulePresetValue } from "@/lib/automations/AgentAutomationSchedulePreset.constant";

/** Payload synced to ~/.agent-witch/.../automations.json for Mac-local scheduling. */
export default interface LocalScheduledAutomationPayload {
  readonly id: string;
  readonly name: string;
  readonly capabilityId: string;
  readonly prompt: string;
  readonly schedulePreset: AgentAutomationSchedulePresetValue;
  readonly scheduleHour: number | null;
  readonly scheduleTimezone: string;
  readonly enabled: boolean;
  readonly nextRunAt: string | null;
}
