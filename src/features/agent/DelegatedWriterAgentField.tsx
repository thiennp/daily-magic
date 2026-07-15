"use client";

import { HARNESS_WRITER_OPTIONS } from "@/features/harness/constants/harnessFormOptions";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

interface DelegatedWriterAgentFieldProps {
  readonly writerAgent: HarnessWriterAgent;
  readonly onWriterAgentChange: (value: HarnessWriterAgent) => void;
  readonly disabled?: boolean;
}

export default function DelegatedWriterAgentField({
  writerAgent,
  onWriterAgentChange,
  disabled = false,
}: DelegatedWriterAgentFieldProps) {
  return (
    <label className="block text-sm">
      <span className="font-medium text-gray-800 dark:text-white/90">
        Delegate tasks to
      </span>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        {disabled
          ? "Finish the current Mac session to switch AI."
          : "Your Mac installs and signs in to this AI the first time you send a task."}
      </p>
      <select
        value={writerAgent}
        disabled={disabled}
        onChange={(event) => {
          onWriterAgentChange(event.target.value as HarnessWriterAgent);
        }}
        className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-theme-xs outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:disabled:bg-gray-950 dark:disabled:text-gray-500"
      >
        {HARNESS_WRITER_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
