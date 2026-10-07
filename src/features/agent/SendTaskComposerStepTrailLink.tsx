"use client";

import { PencilIcon } from "@/icons";

interface SendTaskComposerStepTrailLinkProps {
  readonly caption: string;
  readonly value: string;
  readonly onBack: () => void;
}

export default function SendTaskComposerStepTrailLink({
  caption,
  value,
  onBack,
}: SendTaskComposerStepTrailLinkProps) {
  return (
    <button
      type="button"
      onClick={onBack}
      aria-label={`Edit ${caption.toLowerCase()}: ${value}`}
      className="flex w-full items-center gap-2 rounded-xl border border-awc-border bg-awc-surface-2/80 px-3 py-2 text-left transition hover:border-brand-200 hover:bg-brand-50/50 dark:border-gray-800 dark:bg-white/[0.03] dark:hover:border-brand-900/40 dark:hover:bg-brand-950/20"
    >
      <span className="min-w-0 flex-1">
        <span className="block text-xs text-awc-fg-muted dark:text-gray-400">
          {caption}
        </span>
        <span className="block truncate text-sm font-medium text-awc-fg dark:text-white/90">
          {value}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-awc-border bg-white text-awc-fg-muted dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
      >
        <PencilIcon className="h-4 w-4" />
      </span>
    </button>
  );
}
