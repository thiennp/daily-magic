"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

import AgentRunDetailContent from "@/features/reports/AgentRunDetailContent";
import AgentRunDetailDeleteButton from "@/features/reports/AgentRunDetailDeleteButton";
import AgentRunFeedbackForm from "@/features/feedback/AgentRunFeedbackForm";
import FeedbackSubmittedNotice from "@/features/feedback/FeedbackSubmittedNotice";
import { useAgentRunDetailState } from "@/features/reports/hooks/useAgentRunDetailState";
import { canSubmitFeedbackForRunStatus } from "@/lib/feedback/canSubmitFeedbackForRunStatus";

interface AgentRunDetailProps {
  readonly runId: string;
}

export default function AgentRunDetail({ runId }: AgentRunDetailProps) {
  const { data: session } = useSession();
  const { run, feedback, isLoading, setFeedback } =
    useAgentRunDetailState(runId);

  if (isLoading) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">Loading job…</p>
    );
  }

  if (run === null) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">Job not found.</p>
    );
  }

  const viewerUserId =
    typeof session?.user === "object" &&
    session.user !== null &&
    "id" in session.user &&
    typeof session.user.id === "string"
      ? session.user.id
      : null;
  const showFeedbackForm =
    canSubmitFeedbackForRunStatus(run.status) &&
    viewerUserId === run.requesterUserId;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/reports"
          className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
        >
          Back to job history
        </Link>
        <AgentRunDetailDeleteButton runId={runId} />
      </div>
      <AgentRunDetailContent run={run} />
      {showFeedbackForm && feedback !== null ? (
        <FeedbackSubmittedNotice feedback={feedback} />
      ) : null}
      {showFeedbackForm && feedback === null ? (
        <AgentRunFeedbackForm runId={runId} onSubmitted={setFeedback} />
      ) : null}
    </div>
  );
}
