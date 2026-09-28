import {
  buildPromptSdlcImproverPrompt,
  buildPromptSdlcJudgePrompt,
} from "../../../../adapters/promptSdlcAwcCore";
import {
  applyPromptSdlcLocalImproverReply,
  applyPromptSdlcLocalJudgeReply,
} from "./applyPromptSdlcLocalReply";
import { PROMPT_SDLC_MANUAL_ACTOR } from "./choosePromptSdlcLocalModels";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { promptSdlcLocalWorkingDirectory } from "./promptSdlcLocalFolder";
import { runPromptSdlcWriterReply } from "./runPromptSdlcWriterReply";

const failCycle = (
  cycle: PromptSdlcLocalCycle,
  errorMessage: string,
): PromptSdlcLocalCycle => ({
  ...cycle,
  status: "failed",
  errorMessage,
  updatedAt: new Date().toISOString(),
});

export const advancePromptSdlcLocalCycle = async (
  cycle: PromptSdlcLocalCycle,
  onWriterFailure?: (writer: string) => void,
): Promise<PromptSdlcLocalCycle> => {
  const revision = cycle.revisions.find(
    (item) => item.roundNumber === cycle.currentRound,
  );
  if (revision === undefined) {
    return failCycle(cycle, "This round has no prompt.");
  }

  if (cycle.status === "judging") {
    if (cycle.judgeModel === PROMPT_SDLC_MANUAL_ACTOR) {
      return cycle;
    }
    const reply = await runPromptSdlcWriterReply({
      writerAgent: cycle.judgeModel,
      workingDirectory: promptSdlcLocalWorkingDirectory(cycle),
      prompt: buildPromptSdlcJudgePrompt({
        goal: cycle.goal,
        promptText: revision.promptText,
        passScore: cycle.passScore,
      }),
    });
    if (!reply.ok) {
      onWriterFailure?.(cycle.judgeModel);
      return failCycle(cycle, reply.errorMessage);
    }
    return applyPromptSdlcLocalJudgeReply(cycle, reply.text);
  }

  if (cycle.status !== "improving") {
    return failCycle(
      cycle,
      "This cycle is waiting on a step this Mac cannot run.",
    );
  }

  if (cycle.improverModel === PROMPT_SDLC_MANUAL_ACTOR) {
    return cycle;
  }

  const score = revision.judgement?.score;
  const reasons = revision.judgement?.reasons?.trim() ?? "";
  if (score === null || score === undefined || reasons.length === 0) {
    return failCycle(cycle, "The improver needs the score and the reason.");
  }

  const reply = await runPromptSdlcWriterReply({
    writerAgent: cycle.improverModel,
    workingDirectory: promptSdlcLocalWorkingDirectory(cycle),
    prompt: buildPromptSdlcImproverPrompt({
      goal: cycle.goal,
      promptText: revision.promptText,
      score,
      reasons,
    }),
  });
  if (!reply.ok) {
    onWriterFailure?.(cycle.improverModel);
    return failCycle(cycle, reply.errorMessage);
  }
  return applyPromptSdlcLocalImproverReply(cycle, reply.text);
};
