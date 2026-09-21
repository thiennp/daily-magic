"use client";

import Link from "next/link";

import {
  isAgentRunOutcomeCode,
  resolveAgentRunOutcomeFromWriterOutput,
} from "@agent-witch/shared/dispatch";

import Button from "@/components/ui/button/Button";
import AgentRunAgainButton from "@/features/reports/AgentRunAgainButton";
import { buildAgentRunOutcomePresentation } from "@/lib/dispatch/buildAgentRunOutcomePresentation";
import { isRecoverableAgentRunOutcome } from "@/lib/dispatch/resolveAgentRunWriterCompletion";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

interface AgentRunOutcomeBannerProps {
  readonly run: EnrichedAgentRunRecord;
}

export default function AgentRunOutcomeBanner({
  run,
}: AgentRunOutcomeBannerProps) {
  const code =
    run.resultOutcomeCode !== null &&
    isAgentRunOutcomeCode(run.resultOutcomeCode)
      ? run.resultOutcomeCode
      : (resolveAgentRunOutcomeFromWriterOutput(run.resultOutput ?? "")?.code ??
        null);

  if (code === null || !isRecoverableAgentRunOutcome(code)) {
    return null;
  }

  const presentation = buildAgentRunOutcomePresentation(code);

  return (
    <div
      className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-950 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-100"
      role="status"
      data-reason-code={presentation.reasonCode}
    >
      <p className="font-medium">{presentation.title}</p>
      <p className="mt-1">{presentation.body}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Link href={`/reports/${run.id}`} className="inline-flex">
          <Button variant="primary">View report</Button>
        </Link>
        <AgentRunAgainButton prompt={run.prompt} label="New task" />
      </div>
    </div>
  );
}
