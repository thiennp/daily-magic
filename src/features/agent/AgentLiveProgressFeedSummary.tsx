"use client";

import Link from "next/link";

import AgentLiveFailureDetails from "@/features/agent/AgentLiveFailureDetails";
import type { AgentLiveRunOutcome } from "@/features/agent/utils/buildAgentLiveProgressSteps";
import { PROJECTS_REPORTS_INTENT_HREF } from "@/lib/shell/projectTabIntentHrefs.constant";
import {
  requestPickAnotherWriter,
  shouldOfferPickAnotherWriter,
} from "@/features/agent/utils/pickAnotherWriterEvent";

const ENDED_KINDS: ReadonlySet<AgentLiveRunOutcome["kind"]> = new Set([
  "passed",
  "degraded",
  "failed",
  "timed_out",
]);

interface AgentLiveProgressFeedSummaryProps {
  readonly humanSummary: string | null;
  readonly failureDetails: string | null;
  readonly outcome: AgentLiveRunOutcome;
  /** Id of the finished run; the Open report link shows once it ended. */
  readonly finishedRunId?: string | null;
}

export default function AgentLiveProgressFeedSummary({
  humanSummary,
  failureDetails,
  outcome,
  finishedRunId = null,
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
      {finishedRunId !== null && ENDED_KINDS.has(outcome.kind) ? (
        <Link
          href={PROJECTS_REPORTS_INTENT_HREF}
          className="mt-2 inline-flex items-center text-xs font-medium text-awc-fg underline-offset-2 hover:underline dark:text-white/90"
        >
          Open report
        </Link>
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
