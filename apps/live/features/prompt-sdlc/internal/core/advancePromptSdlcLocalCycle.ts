import {
  buildPromptSdlcImproverPrompt,
  buildPromptSdlcJudgePrompt,
} from "../../../../adapters/promptSdlcAwcCore";
import {
  applyPromptSdlcLocalImproverReply,
  applyPromptSdlcLocalJudgeReply,
} from "./applyPromptSdlcLocalReply";
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
): Promise<PromptSdlcLocalCycle> => {
  const revision = cycle.revisions.find(
    (item) => item.roundNumber === cycle.currentRound,
  );
  if (revision === undefined) {
    return failCycle(cycle, "This round has no prompt.");
  }

  if (cycle.status === "judging") {
    const reply = await runPromptSdlcWriterReply({
      writerAgent: cycle.judgeModel,
      workingDirectory: promptSdlcLocalWorkingDirectory(cycle),
      prompt: buildPromptSdlcJudgePrompt({
        goal: cycle.goal,
        promptText: revision.promptText,
        passScore: cycle.passScore,
      }),
    });
    return reply.ok
      ? applyPromptSdlcLocalJudgeReply(cycle, reply.text)
      : failCycle(cycle, reply.errorMessage);
  }

  if (cycle.status !== "improving") {
    return failCycle(
      cycle,
      "This cycle is waiting on a step this Mac cannot run.",
    );
  }

  const reply = await runPromptSdlcWriterReply({
    writerAgent: cycle.improverModel,
    workingDirectory: promptSdlcLocalWorkingDirectory(cycle),
    prompt: buildPromptSdlcImproverPrompt({
      goal: cycle.goal,
      promptText: revision.promptText,
      score: revision.judgement?.score ?? 0,
      reasons: revision.judgement?.reasons ?? "",
    }),
  });
  return reply.ok
    ? applyPromptSdlcLocalImproverReply(cycle, reply.text)
    : failCycle(cycle, reply.errorMessage);
};
