import type { PromptSdlcCycleView } from "../../../../adapters/promptSdlcAwcCore";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

export const mapPromptSdlcLocalCycleView = (
  cycle: PromptSdlcLocalCycle,
): PromptSdlcCycleView => ({
  id: cycle.id,
  goal: cycle.goal,
  judgeModel: cycle.judgeModel,
  improverModel: cycle.improverModel,
  status: cycle.status,
  currentRound: cycle.currentRound,
  maxRounds: cycle.maxRounds,
  passScore: cycle.passScore,
  errorMessage: cycle.errorMessage,
  activeRunId: null,
  activeRunStatus: null,
  pendingLocal: null,
  revisions: cycle.revisions.map((revision) => ({
    id: `${cycle.id}-${revision.roundNumber}`,
    roundNumber: revision.roundNumber,
    promptText: revision.promptText,
    judgement:
      revision.judgement === null
        ? null
        : {
            score: revision.judgement.score,
            passed: revision.judgement.passed,
            reasons: revision.judgement.reasons,
            rawReply: revision.judgement.rawReply,
            judgeModel: cycle.judgeModel,
          },
  })),
});
