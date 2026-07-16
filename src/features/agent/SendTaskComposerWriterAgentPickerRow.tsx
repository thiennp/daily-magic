"use client";

import HarnessWriterAgentMark from "@/features/agent/icons/HarnessWriterAgentMark";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

interface SendTaskComposerWriterAgentPickerRowProps {
  readonly label: string;
  readonly writerAgent: HarnessWriterAgent;
  readonly onSelect: () => void;
}

export default function SendTaskComposerWriterAgentPickerRow({
  label,
  writerAgent,
  onSelect,
}: SendTaskComposerWriterAgentPickerRowProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-left transition hover:border-brand-200 hover:bg-brand-50/40 dark:border-gray-800 dark:bg-white/[0.02] dark:hover:border-brand-900/40 dark:hover:bg-brand-950/20"
    >
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white shadow-theme-xs dark:border-gray-700 dark:bg-gray-800">
        <HarnessWriterAgentMark writerAgent={writerAgent} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-gray-800 dark:text-white/90">
          {label}
        </span>
      </span>
    </button>
  );
}
