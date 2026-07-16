"use client";

import SendTaskComposerPlayIcon from "@/features/agent/SendTaskComposerPlayIcon";

interface SendTaskComposerMacPickerRowProps {
  readonly displayName: string;
  readonly isOnline: boolean;
  readonly onSelect: () => void;
}

export default function SendTaskComposerMacPickerRow({
  displayName,
  isOnline,
  onSelect,
}: SendTaskComposerMacPickerRowProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-left transition hover:border-brand-200 hover:bg-brand-50/40 dark:border-gray-800 dark:bg-white/[0.02] dark:hover:border-brand-900/40 dark:hover:bg-brand-950/20"
    >
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white shadow-theme-xs">
        <SendTaskComposerPlayIcon />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-gray-800 dark:text-white/90">
          {displayName}
        </span>
        <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">
          {isOnline ? "Online" : "Offline"}
        </span>
      </span>
    </button>
  );
}
