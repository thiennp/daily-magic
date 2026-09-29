import { collectPromptSdlcPriorRounds } from "@/lib/promptOptimizer/collectPromptSdlcPriorRounds";
import type { PromptSdlcPriorRound } from "@/lib/promptOptimizer/collectPromptSdlcPriorRounds";
import {
  listPromptSdlcJudgements,
  listPromptSdlcRevisions,
} from "@/lib/promptOptimizer/promptSdlcRevisionQueries";
import type PromptSdlcRevisionRecord from "@/lib/promptOptimizer/types/PromptSdlcRevisionRecord.type";

export const loadPromptSdlcPriorRounds = async (
  cycleId: string,
  currentRound: number,
): Promise<{
  readonly current: PromptSdlcRevisionRecord | undefined;
  readonly priorRounds: readonly PromptSdlcPriorRound[];
}> => {
  const [revisions, judgements] = await Promise.all([
    listPromptSdlcRevisions(cycleId),
    listPromptSdlcJudgements(cycleId),
  ]);
  const judgementByRevisionId = new Map(
    judgements.map((judgement) => [judgement.revisionId, judgement]),
  );

  return {
    current: revisions.find(
      (revision) => revision.roundNumber === currentRound,
    ),
    priorRounds: collectPromptSdlcPriorRounds(
      revisions.map((revision) => {
        const judgement = judgementByRevisionId.get(revision.id);
        return {
          roundNumber: revision.roundNumber,
          promptText: revision.promptText,
          score: judgement?.score ?? null,
          reasons: judgement?.reasons ?? null,
        };
      }),
      currentRound,
    ),
  };
};
