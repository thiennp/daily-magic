"use client";

import { HARNESS_WRITER_OPTIONS } from "@/features/harness/public-api/types";
import AwcFormField, {
  AWC_FORM_CONTROL_CLASS,
} from "@/components/form/AwcFormField";
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
    <AwcFormField id="delegated-writer-agent" label="Delegate tasks to">
      {disabled ? (
        <p className="mb-2 text-xs text-awc-fg-muted dark:text-gray-400">
          Finish the current session to switch AI.
        </p>
      ) : null}
      <select
        id="delegated-writer-agent"
        value={writerAgent}
        disabled={disabled}
        onChange={(event) => {
          onWriterAgentChange(event.target.value as HarnessWriterAgent);
        }}
        className={`${AWC_FORM_CONTROL_CLASS} disabled:cursor-not-allowed disabled:bg-awc-surface-2 disabled:text-awc-fg-muted dark:disabled:bg-gray-950 dark:disabled:text-gray-500`}
      >
        {HARNESS_WRITER_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </AwcFormField>
  );
}
