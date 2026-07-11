import { HARNESS_WRITER_OPTIONS } from "@/features/harness/constants/harnessFormOptions";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

interface HarnessSetConfigurationFieldsProps {
  readonly setName: string;
  readonly writerAgent: HarnessWriterAgent;
  readonly onSetNameChange: (value: string) => void;
  readonly onWriterAgentChange: (value: HarnessWriterAgent) => void;
}

export default function HarnessSetConfigurationFields({
  setName,
  writerAgent,
  onSetNameChange,
  onWriterAgentChange,
}: HarnessSetConfigurationFieldsProps) {
  return (
    <div className="mt-5 grid gap-4 md:grid-cols-2">
      <label className="block text-sm">
        <span className="font-medium text-gray-800 dark:text-white/90">
          Harness set name
        </span>
        <input
          type="text"
          value={setName}
          onChange={(event) => {
            onSetNameChange(event.target.value);
          }}
          placeholder="My frontend rules"
          className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-theme-xs outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
        />
      </label>

      <label className="block text-sm">
        <span className="font-medium text-gray-800 dark:text-white/90">
          Writer agent
        </span>
        <select
          value={writerAgent}
          onChange={(event) => {
            onWriterAgentChange(event.target.value as HarnessWriterAgent);
          }}
          className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-theme-xs outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
        >
          {HARNESS_WRITER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
