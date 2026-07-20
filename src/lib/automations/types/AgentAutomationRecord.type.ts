import type { AgentAutomationLastRunStatusValue } from "@/lib/automations/AgentAutomationLastRunStatus.constant";
import type { AgentAutomationSchedulePresetValue } from "@/lib/automations/AgentAutomationSchedulePreset.constant";
import type { AgentAutomationTriggerTypeValue } from "@/lib/automations/AgentAutomationTriggerType.constant";

export default interface AgentAutomationRecord {
  readonly id: string;
  readonly ownerUserId: string;
  readonly capabilityId: string;
  readonly deviceId: string | null;
  readonly executorUserId: string;
  readonly name: string;
  readonly triggerType: AgentAutomationTriggerTypeValue;
  readonly schedulePreset: AgentAutomationSchedulePresetValue | null;
  readonly scheduleHour: number | null;
  readonly scheduleTimezone: string;
  readonly webhookSecretPrefix: string | null;
  readonly fieldValues: Readonly<Record<string, string>>;
  readonly projectId: string | null;
  readonly localPrompt: string | null;
  readonly enabled: boolean;
  readonly lastRunAt: string | null;
  readonly nextRunAt: string | null;
  readonly lastRunStatus: AgentAutomationLastRunStatusValue | null;
  readonly lastError: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}
