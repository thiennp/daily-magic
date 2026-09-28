import {
  buildPromptSdlcImproverPrompt,
  buildPromptSdlcJudgePrompt,
  PROMPT_SDLC_STOP_USER,
} from "../../../../adapters/promptSdlcAwcCore";
import {
  applyPromptSdlcLocalImproverReply,
  applyPromptSdlcLocalJudgeReply,
} from "./applyPromptSdlcLocalReply";
import { readPromptSdlcLocalImproverReference } from "./readPromptSdlcLocalImproverReference";
import type { PromptSdlcWriterResult } from "./readPromptSdlcWriterOutput";
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

const stoppedCycle = (cycle: PromptSdlcLocalCycle): PromptSdlcLocalCycle => ({
  ...cycle,
  status: "stopped",
  errorMessage: PROMPT_SDLC_STOP_USER,
  updatedAt: new Date().toISOString(),
});

const replyOrStop = (
  cycle: PromptSdlcLocalCycle,
  reply: PromptSdlcWriterResult,
  writer: string,
  signal: AbortSignal | undefined,
  onWriterFailure?: (writer: string) => void,
): PromptSdlcLocalCycle | null => {
  if (reply.ok) {
    return null;
  }
  if (reply.stopped === true || signal?.aborted === true) {
    return stoppedCycle(cycle);
  }
  onWriterFailure?.(writer);
  return failCycle(cycle, reply.errorMessage);
};

export const advancePromptSdlcLocalCycle = async (
  cycle: PromptSdlcLocalCycle,
  onWriterFailure?: (writer: string) => void,
  signal?: AbortSignal,
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
        instructions: cycle.judgeInstructions,
      }),
      signal,
    });
    const stopped = replyOrStop(
      cycle,
      reply,
      cycle.judgeModel,
      signal,
      onWriterFailure,
    );
    if (stopped !== null) {
      return stopped;
    }
    return applyPromptSdlcLocalJudgeReply(
      cycle,
      reply.ok ? reply.text : "",
      reply.ok ? reply.tokens : null,
    );
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

  const reference = readPromptSdlcLocalImproverReference(cycle);
  if (reference === null) {
    return failCycle(cycle, "The improver needs the score and the reason.");
  }

  const reply = await runPromptSdlcWriterReply({
    writerAgent: cycle.improverModel,
    workingDirectory: promptSdlcLocalWorkingDirectory(cycle),
    prompt: buildPromptSdlcImproverPrompt({
      goal: cycle.goal,
      promptText: reference.promptText,
      score: reference.score,
      reasons: reference.reasons,
      avoid: reference.avoid,
      instructions: cycle.improverInstructions,
    }),
    signal,
  });
  const stopped = replyOrStop(
    cycle,
    reply,
    cycle.improverModel,
    signal,
    onWriterFailure,
  );
  if (stopped !== null) {
    return stopped;
  }
  return applyPromptSdlcLocalImproverReply(
    cycle,
    reply.ok ? reply.text : "",
    reply.ok ? reply.tokens : null,
  );
};
