"use client";

import {
  isAgentRunOutcomeCode,
  resolveAgentRunOutcomeFromWriterOutput,
} from "@agent-witch/shared/dispatch";

import AgentRunAgainButton from "@/features/reports/AgentRunAgainButton";
import AgentRunContinueButton from "@/features/reports/AgentRunContinueButton";
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

  const resetHint =
    resolveAgentRunOutcomeFromWriterOutput(run.resultOutput ?? "")?.resetHint ??
    null;
  const presentation = buildAgentRunOutcomePresentation(code, resetHint);

  return (
    <div
      className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100"
      role="status"
    >
      <p className="font-medium">{presentation.title}</p>
      <p className="mt-1">{presentation.detail}</p>
      <p className="mt-2 text-amber-900/90 dark:text-amber-100/90">
        {presentation.nextStep}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <AgentRunContinueButton run={run} />
        <AgentRunAgainButton prompt={run.prompt} />
      </div>
    </div>
  );
}
