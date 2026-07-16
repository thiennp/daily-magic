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
    <div className="flex w-full items-center gap-2 rounded-xl border border-gray-200 bg-gray-50/80 px-3 py-2 dark:border-gray-800 dark:bg-white/[0.03]">
      <span className="min-w-0 flex-1">
        <span className="block text-xs text-gray-500 dark:text-gray-400">
          {caption}
        </span>
        <span className="block truncate text-sm font-medium text-gray-800 dark:text-white/90">
          {value}
        </span>
      </span>
      <button
        type="button"
        onClick={onBack}
        aria-label={`Edit ${caption.toLowerCase()}`}
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:border-brand-200 hover:bg-brand-50/50 hover:text-brand-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-brand-900/40 dark:hover:bg-brand-950/20 dark:hover:text-brand-300"
      >
        <PencilIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
