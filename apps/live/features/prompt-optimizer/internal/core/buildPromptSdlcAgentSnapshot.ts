import {
  isPromptSdlcTerminalStatus,
  PROMPT_SDLC_LIVE_PAGE_URL,
  PROMPT_SDLC_LOCAL_CONTEXT_REASON,
  selectPromptSdlcBestPrompt,
} from "../../../../adapters/promptSdlcAwcCore";
import { derivePromptSdlcAgentOutcome } from "./derivePromptSdlcAgentOutcome";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { sumPromptSdlcLocalTokens } from "./sumPromptSdlcLocalTokens";

export const buildPromptSdlcAgentSnapshot = (cycle: PromptSdlcLocalCycle) => {
  const latest = cycle.revisions[cycle.revisions.length - 1] ?? null;
  const best = selectPromptSdlcBestPrompt(
    cycle.revisions.map((revision) => ({
      roundNumber: revision.roundNumber,
      promptText: revision.promptText,
      score: revision.judgement?.score ?? null,
      reasons: revision.judgement?.reasons ?? null,
    })),
  );
  const done = isPromptSdlcTerminalStatus(cycle.status);
  const errorKind = cycle.errorKind ?? null;
  const outcome = derivePromptSdlcAgentOutcome({
    status: cycle.status,
    errorKind,
  });

  return {
    ok: true as const,
    cycleId: cycle.id,
    status: cycle.status,
    outcome,
    done,
    /** Bundle 242 / G2: useThisPrompt only when status === passed. */
    useThisPrompt: cycle.status === "passed",
    totalTokens: sumPromptSdlcLocalTokens(cycle),
    prompt: latest?.promptText ?? "",
    bestPrompt: best?.promptText ?? null,
    bestScore: best?.score ?? null,
    bestRound: best?.roundNumber ?? null,
    score: latest?.judgement?.score ?? null,
    passed: latest?.judgement?.passed ?? null,
    goal: cycle.goal,
    judge: cycle.judgeModel,
    improver: cycle.improverModel,
    workingDirectory: cycle.workingDirectory ?? null,
    passScore: cycle.passScore,
    round: cycle.currentRound,
    errorMessage: cycle.errorMessage,
    errorKind,
    costControls: cycle.costControls
      ? {
          maxTrials: cycle.costControls.maxTrials,
          maxSpendUsd: cycle.costControls.maxSpendUsd,
          earlyStop: cycle.costControls.earlyStop,
          earlyStopFlatRounds: cycle.costControls.earlyStopFlatRounds,
          // Proposal — Product bind: targetTokenBudget + estimatedSpendUsd
          targetTokenBudget: cycle.costControls.targetTokenBudget,
          // Alias for UI stubs that still read proposedTokenBudget
          proposedTokenBudget: cycle.costControls.targetTokenBudget,
          estimatedSpendUsd: cycle.costControls.estimatedSpendUsd,
          rateUsdPer1kTokens: cycle.costControls.rateUsdPer1kTokens,
          proposalStub: cycle.costControls.proposalStub,
          confirmedTokenBudget: cycle.costControls.confirmedTokenBudget,
          confirmedMaxSpendUsd: cycle.costControls.confirmedMaxSpendUsd,
          budgetConfirmed: cycle.costControls.budgetConfirmed,
          confirmationRequired: !cycle.costControls.budgetConfirmed,
          softWarnFired: cycle.costControls.softWarnFired,
          softWarnMessage: cycle.costControls.softWarnMessage,
          budgetExceeded: cycle.costControls.budgetExceeded,
        }
      : null,
    context: PROMPT_SDLC_LOCAL_CONTEXT_REASON,
    page: `${PROMPT_SDLC_LIVE_PAGE_URL}?cycle=${encodeURIComponent(cycle.id)}`,
  };
};
