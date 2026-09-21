"use client";

import type { AgentLiveRunBudgetNotice } from "@/features/agent/utils/resolveAgentLiveRunBudgetNotices";

interface AgentLiveProgressBudgetNoticesProps {
  readonly notices: readonly AgentLiveRunBudgetNotice[];
}

export default function AgentLiveProgressBudgetNotices({
  notices,
}: AgentLiveProgressBudgetNoticesProps) {
  return (
    <>
      {notices.map((notice) => (
        <div
          key={notice.label}
          className={`mt-3 rounded-lg border px-3 py-2 text-sm ${
            notice.tone === "soft"
              ? "border-sky-200 bg-sky-50 text-sky-950 dark:border-sky-900/50 dark:bg-sky-950/30 dark:text-sky-100"
              : "border-rose-200 bg-rose-50 text-rose-950 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-100"
          }`}
          role="status"
        >
          <p className="font-medium">{notice.label}</p>
          <p className="mt-1">{notice.body}</p>
        </div>
      ))}
    </>
  );
}
