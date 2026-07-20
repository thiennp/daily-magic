import { AGENT_AUTOMATION_SCHEDULE_PRESETS } from "@/lib/automations/AgentAutomationSchedulePreset.constant";
import { AGENT_AUTOMATION_TRIGGER_TYPES } from "@/lib/automations/AgentAutomationTriggerType.constant";

export interface CreateAgentAutomationInput {
  readonly name: string;
  readonly capabilityId: string;
  readonly deviceId?: string | null;
  readonly triggerType:
    | typeof AGENT_AUTOMATION_TRIGGER_TYPES.SCHEDULE
    | typeof AGENT_AUTOMATION_TRIGGER_TYPES.WEBHOOK;
  readonly schedulePreset?:
    | typeof AGENT_AUTOMATION_SCHEDULE_PRESETS.HOURLY
    | typeof AGENT_AUTOMATION_SCHEDULE_PRESETS.DAILY
    | typeof AGENT_AUTOMATION_SCHEDULE_PRESETS.WEEKDAYS;
  readonly scheduleHour?: number;
  readonly scheduleTimezone?: string;
  readonly fieldValues?: Readonly<Record<string, string>>;
  readonly projectId?: string | null;
  readonly enabled?: boolean;
}

export interface UpdateAgentAutomationInput {
  readonly name?: string;
  readonly deviceId?: string | null;
  readonly schedulePreset?:
    | typeof AGENT_AUTOMATION_SCHEDULE_PRESETS.HOURLY
    | typeof AGENT_AUTOMATION_SCHEDULE_PRESETS.DAILY
    | typeof AGENT_AUTOMATION_SCHEDULE_PRESETS.WEEKDAYS;
  readonly scheduleHour?: number;
  readonly scheduleTimezone?: string;
  readonly fieldValues?: Readonly<Record<string, string>>;
  readonly projectId?: string | null;
  readonly enabled?: boolean;
}
