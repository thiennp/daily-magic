"use client";

import { HarnessWriterAgentMark } from "@/features/agent/icons/public-api/presentation";
import type { WriterPickerStatus } from "@/features/agent/send-readiness/resolveWriterPickerStatus";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

interface SendTaskComposerWriterAgentPickerRowProps {
  readonly label: string;
  readonly writerAgent: HarnessWriterAgent;
  readonly isSelected: boolean;
  readonly status?: WriterPickerStatus | null;
  readonly onSelect: () => void;
}

export default function SendTaskComposerWriterAgentPickerRow({
  label,
  writerAgent,
  isSelected,
  status = null,
  onSelect,
}: SendTaskComposerWriterAgentPickerRowProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
        isSelected
          ? "border-brand-300 bg-brand-50/60 dark:border-brand-800 dark:bg-brand-950/30"
          : "border-awc-border bg-white hover:border-brand-200 hover:bg-brand-50/40 dark:border-gray-800 dark:bg-white/[0.02] dark:hover:border-brand-900/40 dark:hover:bg-brand-950/20"
      }`}
    >
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-awc-border bg-white shadow-theme-xs dark:border-gray-700 dark:bg-gray-800">
        <HarnessWriterAgentMark writerAgent={writerAgent} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-awc-fg dark:text-white/90">
          {label}
        </span>
      </span>
      {status !== null ? (
        <span
          data-writer-status={status.label}
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
            status.tone === "ok"
              ? "bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-400"
              : "bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-400"
          }`}
        >
          {status.label}
        </span>
      ) : null}
    </button>
  );
}
