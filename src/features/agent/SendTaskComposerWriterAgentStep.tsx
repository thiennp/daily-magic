"use client";

import SendTaskComposerWriterAgentPickerRow from "@/features/agent/SendTaskComposerWriterAgentPickerRow";
import { resolveWriterPickerStatus } from "@/features/agent/send-readiness/resolveWriterPickerStatus";
import { HARNESS_WRITER_OPTIONS } from "@/features/harness/constants/harnessFormOptions";
import type { AgentWitchDeviceWriter } from "@/lib/agentWitch/deviceWriters";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

interface SendTaskComposerWriterAgentStepProps {
  readonly selectedWriterAgent: HarnessWriterAgent;
  /** The selected computer's heartbeat writers (77e29f7a). */
  readonly writers?: readonly AgentWitchDeviceWriter[];
  readonly onSelect: (writerAgent: HarnessWriterAgent) => void;
}

export default function SendTaskComposerWriterAgentStep({
  selectedWriterAgent,
  writers,
  onSelect,
}: SendTaskComposerWriterAgentStepProps) {
  return (
    <div>
      <h2 className="text-sm font-medium text-awc-fg dark:text-white/90">
        Choose an AI on your computer
      </h2>
      <ul className="mt-3 space-y-2">
        {HARNESS_WRITER_OPTIONS.map((option) => (
          <li key={option.value}>
            <SendTaskComposerWriterAgentPickerRow
              label={option.label}
              writerAgent={option.value}
              isSelected={option.value === selectedWriterAgent}
              status={resolveWriterPickerStatus(option.value, writers)}
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
