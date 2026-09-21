"use client";

import type { AgentLiveRunBudgetNotice } from "@/features/agent/utils/resolveAgentLiveRunBudgetNotices";

interface AgentLiveProgressBudgetNoticesProps {
  readonly notices: readonly AgentLiveRunBudgetNotice[];
}

const severityClassName = (
  severity: AgentLiveRunBudgetNotice["severity"],
): string => {
  if (severity === "info") {
    return "border-gray-200 bg-gray-50 text-gray-800 dark:border-gray-700 dark:bg-white/[0.04] dark:text-gray-200";
  }

  return "border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100";
};

export default function AgentLiveProgressBudgetNotices({
  notices,
}: AgentLiveProgressBudgetNoticesProps) {
  return (
    <>
      {notices.map((notice) => (
        <div
          key={notice.reasonCode}
          className={`mt-3 rounded-lg border px-3 py-2 text-sm ${severityClassName(notice.severity)}`}
          role="status"
          data-reason-code={notice.reasonCode}
        >
          <p className="font-medium">{notice.title}</p>
          <p className="mt-1">{notice.body}</p>
          {notice.secondary !== undefined ? (
            <p className="mt-1 text-xs opacity-90">{notice.secondary}</p>
          ) : null}
        </div>
      ))}
    </>
  );
}
