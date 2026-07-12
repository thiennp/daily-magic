"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import AgentRunDetailContent from "@/features/reports/AgentRunDetailContent";
import AgentRunFeedbackForm from "@/features/feedback/AgentRunFeedbackForm";
import FeedbackSubmittedNotice from "@/features/feedback/FeedbackSubmittedNotice";
import { POLL_INTERVAL_MS } from "@/features/reports/agentRunsPolling.constant";
import { canSubmitFeedbackForRunStatus } from "@/lib/feedback/canSubmitFeedbackForRunStatus";
import type CapabilityFeedbackRecord from "@/lib/feedback/types/CapabilityFeedbackRecord.type";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

interface AgentRunDetailProps {
  readonly runId: string;
}

export default function AgentRunDetail({ runId }: AgentRunDetailProps) {
  const { data: session } = useSession();
  const [run, setRun] = useState<EnrichedAgentRunRecord | null>(null);
  const [feedback, setFeedback] = useState<CapabilityFeedbackRecord | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRun = async (): Promise<void> => {
      const response = await fetch(`/api/agent-runs/${runId}`);
      if (!response.ok) {
        setRun(null);
        setIsLoading(false);
        return;
      }

      const data: unknown = await response.json();
      if (
        typeof data === "object" &&
        data !== null &&
        "run" in data &&
        typeof (data as { run: EnrichedAgentRunRecord }).run === "object"
      ) {
        setRun((data as { run: EnrichedAgentRunRecord }).run);
      }
      setIsLoading(false);
    };

    const loadFeedback = async (): Promise<void> => {
      const response = await fetch(`/api/agent-runs/${runId}/feedback`);
      if (!response.ok) {
        return;
      }

      const data: unknown = await response.json();
      if (
        typeof data === "object" &&
        data !== null &&
        "feedback" in data &&
        (data as { feedback: CapabilityFeedbackRecord | null }).feedback !==
          null
      ) {
        setFeedback((data as { feedback: CapabilityFeedbackRecord }).feedback);
      }
    };

    void loadRun();
    void loadFeedback();
    const timer = setInterval(() => {
      void loadRun();
    }, POLL_INTERVAL_MS);

    return () => {
      clearInterval(timer);
    };
  }, [runId]);

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
    viewerUserId === run.requesterUserId &&
    canSubmitFeedbackForRunStatus(run.status);

  return (
    <div className="space-y-6">
      <Link
        href="/reports"
        className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
      >
        Back to job history
      </Link>
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
