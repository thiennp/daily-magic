"use client";

import { AGENT_AUTOMATION_SCHEDULE_PRESETS } from "@/lib/automations/AgentAutomationSchedulePreset.constant";
import type { AgentAutomationSchedulePresetValue } from "@/lib/automations/AgentAutomationSchedulePreset.constant";

interface AutomationScheduleFieldsProps {
  readonly preset: AgentAutomationSchedulePresetValue;
  readonly scheduleHour: number;
  readonly scheduleTimezone: string;
  readonly onPresetChange: (preset: AgentAutomationSchedulePresetValue) => void;
  readonly onScheduleHourChange: (hour: number) => void;
  readonly onScheduleTimezoneChange: (timezone: string) => void;
}

const PRESET_OPTIONS: readonly {
  readonly value: AgentAutomationSchedulePresetValue;
  readonly label: string;
}[] = [
  { value: AGENT_AUTOMATION_SCHEDULE_PRESETS.HOURLY, label: "Every hour" },
  { value: AGENT_AUTOMATION_SCHEDULE_PRESETS.DAILY, label: "Every day" },
  { value: AGENT_AUTOMATION_SCHEDULE_PRESETS.WEEKDAYS, label: "Weekdays" },
];

export default function AutomationScheduleFields({
  preset,
  scheduleHour,
  scheduleTimezone,
  onPresetChange,
  onScheduleHourChange,
  onScheduleTimezoneChange,
}: AutomationScheduleFieldsProps) {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-800 dark:text-white/90">
        Schedule
        <select
          value={preset}
          onChange={(event) => {
            onPresetChange(
              event.target.value as AgentAutomationSchedulePresetValue,
            );
          }}
          className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
        >
          {PRESET_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      {preset !== AGENT_AUTOMATION_SCHEDULE_PRESETS.HOURLY ? (
        <label className="block text-sm font-medium text-gray-800 dark:text-white/90">
          Hour (0–23)
          <input
            type="number"
            min={0}
            max={23}
            value={scheduleHour}
            onChange={(event) => {
              onScheduleHourChange(Number(event.target.value));
            }}
            className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
          />
        </label>
      ) : null}
      <label className="block text-sm font-medium text-gray-800 dark:text-white/90">
        Timezone
        <input
          type="text"
          value={scheduleTimezone}
          onChange={(event) => {
            onScheduleTimezoneChange(event.target.value);
          }}
          className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
        />
      </label>
    </div>
  );
}
