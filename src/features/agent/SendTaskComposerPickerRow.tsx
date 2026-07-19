"use client";

import SendTaskComposerPlayIcon from "@/features/agent/SendTaskComposerPlayIcon";
import type { SendTaskComposerPickerItem } from "@/features/agent/utils/buildSendTaskComposerPickerItems";

const ITEM_TYPE_LABEL: Record<SendTaskComposerPickerItem["itemType"], string> =
  {
    workflow: "Workflow",
    agent: "Agent",
    "writer-agent": "LLM CLI",
    custom: "Blank",
    history: "Continue",
  };

interface SendTaskComposerPickerRowProps {
  readonly item: SendTaskComposerPickerItem;
  readonly onPlay: (item: SendTaskComposerPickerItem) => void;
}

export default function SendTaskComposerPickerRow({
  item,
  onPlay,
}: SendTaskComposerPickerRowProps) {
  return (
    <button
      type="button"
      onClick={() => {
        onPlay(item);
      }}
      className="flex w-full items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-left transition hover:border-brand-200 hover:bg-brand-50/40 dark:border-gray-800 dark:bg-white/[0.02] dark:hover:border-brand-900/40 dark:hover:bg-brand-950/20"
    >
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white shadow-theme-xs dark:border-gray-700 dark:bg-gray-800">
        <SendTaskComposerPlayIcon className="h-4 w-4 text-gray-900 dark:text-white" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-gray-800 dark:text-white/90">
          {item.label}
        </span>
        {item.itemType === "writer-agent" ? null : (
          <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">
            {ITEM_TYPE_LABEL[item.itemType]}
          </span>
        )}
      </span>
    </button>
  );
}
