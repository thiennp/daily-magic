import { buildPromptSdlcCycleView } from "@/lib/promptOptimizer/buildPromptSdlcCycleView";
import { getAgentRunById } from "@/lib/dispatch/agentRunQueries";
import { getPromptSdlcCycleForOwner } from "@/lib/promptOptimizer/promptSdlcCycleQueries";
import {
  listPromptSdlcJudgements,
  listPromptSdlcRevisions,
} from "@/lib/promptOptimizer/promptSdlcRevisionQueries";
import type PromptSdlcCycleView from "@/lib/promptOptimizer/types/PromptSdlcCycleView.type";

export const loadPromptSdlcCycleView = async (
  cycleId: string,
  ownerUserId: string,
): Promise<PromptSdlcCycleView | null> => {
  const cycle = await getPromptSdlcCycleForOwner(cycleId, ownerUserId);
  if (cycle === null) {
    return null;
  }

  const [revisions, judgements, run] = await Promise.all([
    listPromptSdlcRevisions(cycle.id),
    listPromptSdlcJudgements(cycle.id),
    cycle.activeRunId === null
      ? Promise.resolve(null)
      : getAgentRunById(cycle.activeRunId),
  ]);

  return buildPromptSdlcCycleView({
    cycle,
    revisions,
    judgements,
    activeRunStatus: run?.status ?? null,
  });
};
