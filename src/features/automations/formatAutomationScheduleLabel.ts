import type AgentAutomationRecord from "@/lib/automations/types/AgentAutomationRecord.type";
import { AGENT_AUTOMATION_TRIGGER_TYPES } from "@/lib/automations/AgentAutomationTriggerType.constant";

export const formatAutomationScheduleLabel = (
  automation: AgentAutomationRecord,
): string => {
  if (automation.triggerType === AGENT_AUTOMATION_TRIGGER_TYPES.WEBHOOK) {
    return "Webhook trigger";
  }

  const hour = automation.scheduleHour ?? 0;
  const timeLabel = `${String(hour).padStart(2, "0")}:00 ${automation.scheduleTimezone}`;

  switch (automation.schedulePreset) {
    case "hourly":
      return `Every hour (${automation.scheduleTimezone})`;
    case "daily":
      return `Daily at ${timeLabel}`;
    case "weekdays":
      return `Weekdays at ${timeLabel}`;
    default:
      return "Scheduled";
  }
};
