import {
  collectPromptSdlcPriorRounds,
  selectPromptSdlcImproverHistory,
} from "../../../../adapters/promptSdlcAwcCore";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

export const buildPromptSdlcLocalImproverHistory = (
  cycle: PromptSdlcLocalCycle,
  currentScore: number,
): string | null =>
  selectPromptSdlcImproverHistory({
    currentScore,
    priorRounds: collectPromptSdlcPriorRounds(
      cycle.revisions.map((revision) => ({
        roundNumber: revision.roundNumber,
        promptText: revision.promptText,
        score: revision.judgement?.score ?? null,
        reasons: revision.judgement?.reasons ?? null,
      })),
      cycle.currentRound,
    ),
  });
