import {
  continueAfterImproveReply,
  continueAfterJudgeReply,
} from "@/lib/promptSdlc/continuePromptSdlc";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

const withJudgement = (
  cycle: PromptSdlcLocalCycle,
  rawReply: string,
  score: number | null,
  passed: boolean | null,
  reasons: string | null,
): PromptSdlcLocalCycle["revisions"] =>
  cycle.revisions.map((revision) =>
    revision.roundNumber === cycle.currentRound
      ? {
          ...revision,
          judgement: { score, passed, reasons, rawReply },
        }
      : revision,
  );

export const applyPromptSdlcLocalJudgeReply = (
  cycle: PromptSdlcLocalCycle,
  rawReply: string,
): PromptSdlcLocalCycle => {
  const revision = cycle.revisions.find(
    (item) => item.roundNumber === cycle.currentRound,
  );
  const result = continueAfterJudgeReply({
    raw: rawReply,
    round: cycle.currentRound,
    maxRounds: cycle.maxRounds,
    passScore: cycle.passScore,
    goal: cycle.goal,
    promptText: revision?.promptText ?? "",
    improver: { kind: "writer", writerAgent: cycle.improverModel },
  });
  const revisions = withJudgement(
    cycle,
    rawReply,
    result.verdict?.score ?? null,
    result.verdict?.passed ?? null,
    result.verdict?.reasons ?? null,
  );
  const updatedAt = new Date().toISOString();
  if (result.continuation.type === "call") {
    return { ...cycle, revisions, status: "improving", updatedAt };
  }
  if (result.continuation.type === "failed") {
    return {
      ...cycle,
      revisions,
      status: "failed",
      errorMessage: result.continuation.errorMessage,
      updatedAt,
    };
  }

  return {
    ...cycle,
    revisions,
    status: result.continuation.type,
    updatedAt,
  };
};

export const applyPromptSdlcLocalImproverReply = (
  cycle: PromptSdlcLocalCycle,
  rawReply: string,
): PromptSdlcLocalCycle => {
  const result = continueAfterImproveReply({
    raw: rawReply,
    judge: { kind: "writer", writerAgent: cycle.judgeModel },
    goal: cycle.goal,
    passScore: cycle.passScore,
  });
  const updatedAt = new Date().toISOString();
  if (result.nextPrompt === null) {
    return {
      ...cycle,
      status: "failed",
      errorMessage:
        result.continuation.type === "failed"
          ? result.continuation.errorMessage
          : "The improver reply was empty.",
      updatedAt,
    };
  }

  return {
    ...cycle,
    status: "judging",
    currentRound: cycle.currentRound + 1,
    revisions: [
      ...cycle.revisions,
      {
        roundNumber: cycle.currentRound + 1,
        promptText: result.nextPrompt,
        judgement: null,
      },
    ],
    updatedAt,
  };
};
