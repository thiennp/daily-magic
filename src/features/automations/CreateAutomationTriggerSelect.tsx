import { AUTOMATIONS_PAGE_COPY } from "@/features/automations/automationsPageCopy.constant";
import { AGENT_AUTOMATION_TRIGGER_TYPES } from "@/lib/automations/AgentAutomationTriggerType.constant";

interface CreateAutomationTriggerSelectProps {
  readonly triggerType:
    | typeof AGENT_AUTOMATION_TRIGGER_TYPES.SCHEDULE
    | typeof AGENT_AUTOMATION_TRIGGER_TYPES.WEBHOOK;
  readonly onTriggerTypeChange: (
    triggerType:
      | typeof AGENT_AUTOMATION_TRIGGER_TYPES.SCHEDULE
      | typeof AGENT_AUTOMATION_TRIGGER_TYPES.WEBHOOK,
  ) => void;
}

export default function CreateAutomationTriggerSelect({
  triggerType,
  onTriggerTypeChange,
}: CreateAutomationTriggerSelectProps) {
  return (
    <label className="block text-sm font-medium text-gray-800 dark:text-white/90">
      Trigger
      <select
        value={triggerType}
        onChange={(event) => {
          onTriggerTypeChange(
            event.target.value as
              | typeof AGENT_AUTOMATION_TRIGGER_TYPES.SCHEDULE
              | typeof AGENT_AUTOMATION_TRIGGER_TYPES.WEBHOOK,
          );
        }}
        className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
      >
        <option value={AGENT_AUTOMATION_TRIGGER_TYPES.SCHEDULE}>
          {AUTOMATIONS_PAGE_COPY.triggerSchedule}
        </option>
        <option value={AGENT_AUTOMATION_TRIGGER_TYPES.WEBHOOK}>
          {AUTOMATIONS_PAGE_COPY.triggerWebhook}
        </option>
      </select>
    </label>
  );
}
