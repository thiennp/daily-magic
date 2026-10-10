"use client";

import { useAgentRunInputRequest } from "@/features/dispatch/public-api/presentation";
import { requestAgentRunInputModalReopen } from "@/features/dispatch/public-api/presentation";
import { resolveRunInputReopenRequest } from "@/features/dispatch/public-api/presentation";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

/**
 * afae8216: a dismissed "needs your answer" modal can be reopened from the
 * Home row. Opening only shows the modal; only its Send answers the agent.
 */
export default function HomeRunningJobQuestionButton({
  run,
}: {
  readonly run: AgentRunRecord;
}) {
  const stored = useAgentRunInputRequest(run.id);
  const request = resolveRunInputReopenRequest({
    runId: run.id,
    stored,
    reportSummary: run.reportSummary ?? null,
  });
  if (request === null) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => requestAgentRunInputModalReopen(request)}
      className="inline-flex shrink-0 items-center justify-center rounded-xl border border-awc-border bg-white px-3 text-xs font-medium text-awc-fg transition hover:border-brand-300 hover:bg-brand-50/40 dark:border-gray-800 dark:bg-white/[0.02] dark:text-white/90"
    >
      Open question
    </button>
  );
}
