"use client";

import SendTaskComposerWriterAgentPickerRow from "@/features/agent/SendTaskComposerWriterAgentPickerRow";
import { HARNESS_WRITER_OPTIONS } from "@/features/harness/constants/harnessFormOptions";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

interface SendTaskComposerWriterAgentStepProps {
  readonly onSelect: (writerAgent: HarnessWriterAgent) => void;
}

export default function SendTaskComposerWriterAgentStep({
  onSelect,
}: SendTaskComposerWriterAgentStepProps) {
  return (
    <div>
      <h2 className="text-sm font-medium text-gray-800 dark:text-white/90">
        Choose an AI on your Mac
      </h2>
      <ul className="mt-3 space-y-2">
        {HARNESS_WRITER_OPTIONS.map((option) => (
          <li key={option.value}>
            <SendTaskComposerWriterAgentPickerRow
              label={option.label}
              writerAgent={option.value}
              onSelect={() => {
                onSelect(option.value);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
