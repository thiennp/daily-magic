import AutomationScheduleFields from "@/features/automations/AutomationScheduleFields";
import { AGENT_AUTOMATION_TRIGGER_TYPES } from "@/lib/automations/AgentAutomationTriggerType.constant";
import type { AgentAutomationSchedulePresetValue } from "@/lib/automations/AgentAutomationSchedulePreset.constant";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

interface CreateAutomationBaseFieldsProps {
  readonly capabilities: readonly PublishedCapabilityRecord[];
  readonly capabilityId: string;
  readonly name: string;
  readonly triggerType:
    | typeof AGENT_AUTOMATION_TRIGGER_TYPES.SCHEDULE
    | typeof AGENT_AUTOMATION_TRIGGER_TYPES.WEBHOOK;
  readonly preset: AgentAutomationSchedulePresetValue;
  readonly scheduleHour: number;
  readonly scheduleTimezone: string;
  readonly onCapabilityChange: (capabilityId: string) => void;
  readonly onNameChange: (name: string) => void;
  readonly onTriggerTypeChange: (
    triggerType:
      | typeof AGENT_AUTOMATION_TRIGGER_TYPES.SCHEDULE
      | typeof AGENT_AUTOMATION_TRIGGER_TYPES.WEBHOOK,
  ) => void;
  readonly onPresetChange: (preset: AgentAutomationSchedulePresetValue) => void;
  readonly onScheduleHourChange: (hour: number) => void;
  readonly onScheduleTimezoneChange: (timezone: string) => void;
}

export default function CreateAutomationBaseFields({
  capabilities,
  capabilityId,
  name,
  triggerType,
  preset,
  scheduleHour,
  scheduleTimezone,
  onCapabilityChange,
  onNameChange,
  onTriggerTypeChange,
  onPresetChange,
  onScheduleHourChange,
  onScheduleTimezoneChange,
}: CreateAutomationBaseFieldsProps) {
  return (
    <>
      <label className="block text-sm font-medium text-gray-800 dark:text-white/90">
        Workflow
        <select
          value={capabilityId}
          onChange={(event) => {
            onCapabilityChange(event.target.value);
          }}
          className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
        >
          <option value="">Select workflow</option>
          {capabilities.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm font-medium text-gray-800 dark:text-white/90">
        Name
        <input
          type="text"
          value={name}
          onChange={(event) => {
            onNameChange(event.target.value);
          }}
          className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
        />
      </label>
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
            Recurring schedule
          </option>
          <option value={AGENT_AUTOMATION_TRIGGER_TYPES.WEBHOOK}>
            Webhook (HTTP POST)
          </option>
        </select>
      </label>
      {triggerType === AGENT_AUTOMATION_TRIGGER_TYPES.SCHEDULE ? (
        <AutomationScheduleFields
          preset={preset}
          scheduleHour={scheduleHour}
          scheduleTimezone={scheduleTimezone}
          onPresetChange={onPresetChange}
          onScheduleHourChange={onScheduleHourChange}
          onScheduleTimezoneChange={onScheduleTimezoneChange}
        />
      ) : null}
    </>
  );
}
