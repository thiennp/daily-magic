"use client";

import AgentLiveFailureDetails from "@/features/agent/AgentLiveFailureDetails";
import type { AgentLiveRunOutcome } from "@/features/agent/utils/buildAgentLiveProgressSteps";
import {
  requestPickAnotherWriter,
  shouldOfferPickAnotherWriter,
} from "@/features/agent/utils/pickAnotherWriterEvent";

interface AgentLiveProgressFeedSummaryProps {
  readonly humanSummary: string | null;
  readonly failureDetails: string | null;
  readonly outcome: AgentLiveRunOutcome;
}

export default function AgentLiveProgressFeedSummary({
  humanSummary,
  failureDetails,
  outcome,
}: AgentLiveProgressFeedSummaryProps) {
  return (
    <>
      {humanSummary !== null ? (
        <p className="mt-3 whitespace-pre-line text-sm text-awc-fg dark:text-gray-200">
          {humanSummary}
        </p>
      ) : null}
      {outcome.kind === "failed" &&
      failureDetails !== null &&
      failureDetails !== humanSummary ? (
        <AgentLiveFailureDetails details={failureDetails} />
      ) : null}
      {shouldOfferPickAnotherWriter(humanSummary) ? (
        <button
          type="button"
          onClick={requestPickAnotherWriter}
          className="mt-2 inline-flex items-center rounded-lg border border-awc-border bg-white px-3 py-1.5 text-xs font-medium text-awc-fg hover:bg-gray-50 dark:border-gray-700 dark:bg-white/[0.03] dark:text-white/90"
        >
          Pick another coding tool
        </button>
      ) : null}
    </>
  );
}
