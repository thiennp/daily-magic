import type PromptSdlcCycleRecord from "@/lib/promptOptimizer/types/PromptSdlcCycleRecord.type";
import type PromptSdlcCycleView from "@/lib/promptOptimizer/types/PromptSdlcCycleView.type";
import type PromptSdlcJudgementRecord from "@/lib/promptOptimizer/types/PromptSdlcJudgementRecord.type";
import type PromptSdlcRevisionRecord from "@/lib/promptOptimizer/types/PromptSdlcRevisionRecord.type";

export const buildPromptSdlcCycleView = (input: {
  readonly cycle: PromptSdlcCycleRecord;
  readonly revisions: readonly PromptSdlcRevisionRecord[];
  readonly judgements: readonly PromptSdlcJudgementRecord[];
  readonly activeRunStatus: string | null;
}): PromptSdlcCycleView => {
  const judgementByRevision = new Map(
    input.judgements.map((judgement) => [judgement.revisionId, judgement]),
  );

  return {
    id: input.cycle.id,
    goal: input.cycle.goal,
    judgeModel: input.cycle.judgeModel,
    improverModel: input.cycle.improverModel,
    status: input.cycle.status,
    currentRound: input.cycle.currentRound,
    maxRounds: input.cycle.maxRounds,
    passScore: input.cycle.passScore,
    errorMessage: input.cycle.errorMessage,
    activeRunId: input.cycle.activeRunId,
    activeRunStatus: input.activeRunStatus,
    pendingLocal:
      input.cycle.status === "awaiting_local" &&
      input.cycle.pendingLocalRole !== null &&
      input.cycle.pendingLocalPrompt !== null
        ? {
            role: input.cycle.pendingLocalRole,
            prompt: input.cycle.pendingLocalPrompt,
          }
        : null,
    revisions: [...input.revisions]
      .sort((left, right) => left.roundNumber - right.roundNumber)
      .map((revision) => {
        const judgement = judgementByRevision.get(revision.id) ?? null;
        return {
          id: revision.id,
          roundNumber: revision.roundNumber,
          promptText: revision.promptText,
          judgement:
            judgement === null
              ? null
              : {
                  score: judgement.score,
                  passed: judgement.passed,
                  reasons: judgement.reasons,
                  rawReply: judgement.rawReply,
                  judgeModel: judgement.judgeModel,
                },
        };
      }),
  };
};
