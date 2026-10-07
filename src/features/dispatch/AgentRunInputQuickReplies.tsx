"use client";

import type { AgentRunInputQuickReply } from "@/features/dispatch/utils/resolveAgentRunInputQuickReplies";

interface AgentRunInputQuickRepliesProps {
  readonly replies: readonly AgentRunInputQuickReply[];
  readonly selectedResponse: string | null;
  readonly onSelect: (response: string) => void;
}

export default function AgentRunInputQuickReplies({
  replies,
  selectedResponse,
  onSelect,
}: AgentRunInputQuickRepliesProps) {
  if (replies.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <p className="text-xs font-medium uppercase tracking-wide text-awc-fg-muted dark:text-gray-400">
        Quick replies
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {replies.map((reply) => {
          const isSelected = selectedResponse === reply.response;

          return (
            <button
              key={reply.label}
              type="button"
              onClick={() => {
                onSelect(reply.response);
              }}
              className={`rounded-full border px-3 py-1.5 text-sm transition ${
                isSelected
                  ? "border-brand-300 bg-brand-50 text-brand-800 dark:border-brand-800 dark:bg-brand-950/40 dark:text-brand-200"
                  : "border-awc-border bg-white text-awc-fg hover:border-brand-200 hover:bg-brand-50/50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-brand-900/40"
              }`}
            >
              {reply.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
