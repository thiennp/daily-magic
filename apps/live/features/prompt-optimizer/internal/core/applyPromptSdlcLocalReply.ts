import {
  collectPromptSdlcPriorRounds,
  continueAfterImproveReply,
  continueAfterJudgeReply,
  resolvePromptSdlcMaxTrials,
  type HarnessWriterAgent,
} from "../../../../adapters/promptSdlcAwcCore";
import { PROMPT_SDLC_MANUAL_ACTOR } from "./choosePromptSdlcLocalModels";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { applyPromptSdlcBudgetGuard } from "./applyPromptSdlcBudgetGuard";

const writerChoice = (
  actor: PromptSdlcLocalCycle["judgeModel"],
): { readonly kind: "writer"; readonly writerAgent: HarnessWriterAgent } =>
  actor === PROMPT_SDLC_MANUAL_ACTOR
    ? { kind: "writer", writerAgent: "claude-cli" }
    : { kind: "writer", writerAgent: actor };

const withJudgement = (
  cycle: PromptSdlcLocalCycle,
  rawReply: string,
  score: number | null,
  passed: boolean | null,
  reasons: string | null,
  tokens: number | null,
): PromptSdlcLocalCycle["revisions"] =>
  cycle.revisions.map((revision) =>
    revision.roundNumber === cycle.currentRound
      ? {
          ...revision,
          judgement: { score, passed, reasons, rawReply, tokens },
        }
      : revision,
  );

export const applyPromptSdlcLocalJudgeReply = (
  cycle: PromptSdlcLocalCycle,
  rawReply: string,
  tokens: number | null = null,
): PromptSdlcLocalCycle => {
  const revision = cycle.revisions.find(
    (item) => item.roundNumber === cycle.currentRound,
  );
  const result = continueAfterJudgeReply({
    raw: rawReply,
    passScore: cycle.passScore,
    goal: cycle.goal,
    promptText: revision?.promptText ?? "",
    improver: writerChoice(cycle.improverModel),
    round: cycle.currentRound,
    maxRounds:
      // Step 4 trial cap. Evaluate and classic rounds keep cycle.maxRounds.
      cycle.wizard?.phase === "optimize_modules"
        ? resolvePromptSdlcMaxTrials({
            maxRounds: cycle.maxRounds,
            costControls: cycle.costControls,
          })
        : cycle.maxRounds,
    earlyStopFlat:
      cycle.costControls?.earlyStop === false
        ? 1_000_000
        : cycle.costControls?.earlyStopFlatRounds,
    priorRounds: collectPromptSdlcPriorRounds(
      cycle.revisions.map((item) => ({
        roundNumber: item.roundNumber,
        promptText: item.promptText,
        score: item.judgement?.score ?? null,
        reasons: item.judgement?.reasons ?? null,
      })),
      cycle.currentRound,
    ),
  });
  const revisions = withJudgement(
    cycle,
    rawReply,
    result.verdict?.score ?? null,
    result.verdict?.passed ?? null,
    result.verdict?.reasons ?? null,
    tokens,
  );
  const updatedAt = new Date().toISOString();
  if (result.continuation.type === "call") {
    return applyPromptSdlcBudgetGuard({
      ...cycle,
      revisions,
      status: "improving",
      judgePhase: undefined,
      updatedAt,
    });
  }

  return applyPromptSdlcBudgetGuard({
    ...cycle,
    revisions,
    judgePhase: undefined,
    status: result.continuation.type,
    errorMessage:
      result.continuation.type === "passed"
        ? null
        : result.continuation.errorMessage,
    updatedAt,
  });
};

export const applyPromptSdlcLocalImproverReply = (
  cycle: PromptSdlcLocalCycle,
  rawReply: string,
  tokens: number | null = null,
): PromptSdlcLocalCycle => {
  const result = continueAfterImproveReply({
    raw: rawReply,
    judge: writerChoice(cycle.judgeModel),
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
        writerTokens: tokens,
      },
    ],
    updatedAt,
  };
};
