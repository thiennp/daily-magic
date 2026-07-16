"use client";

import { ChevronLeftIcon } from "@/icons";

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
      className="flex w-full items-center gap-2 rounded-xl border border-gray-200 bg-gray-50/80 px-3 py-2 text-left transition hover:border-brand-200 hover:bg-brand-50/50 dark:border-gray-800 dark:bg-white/[0.03] dark:hover:border-brand-900/40 dark:hover:bg-brand-950/20"
    >
      <ChevronLeftIcon className="h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400" />
      <span className="min-w-0 flex-1">
        <span className="block text-xs text-gray-500 dark:text-gray-400">
          {caption}
        </span>
        <span className="block truncate text-sm font-medium text-gray-800 dark:text-white/90">
          {value}
        </span>
      </span>
    </button>
  );
}
