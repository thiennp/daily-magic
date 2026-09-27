import { buildPromptSdlcImproverPrompt } from "@/lib/promptSdlc/buildPromptSdlcImproverPrompt";
import { buildPromptSdlcJudgePrompt } from "@/lib/promptSdlc/buildPromptSdlcJudgePrompt";
import {
  applyPromptSdlcLocalImproverReply,
  applyPromptSdlcLocalJudgeReply,
} from "./applyPromptSdlcLocalReply";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
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
    const raw = await runPromptSdlcWriterReply({
      writerAgent: cycle.judgeModel,
      prompt: buildPromptSdlcJudgePrompt({
        goal: cycle.goal,
        promptText: revision.promptText,
        passScore: cycle.passScore,
      }),
    });
    return raw === null
      ? failCycle(cycle, "The judge did not reply.")
      : applyPromptSdlcLocalJudgeReply(cycle, raw);
  }

  if (cycle.status !== "improving") {
    return failCycle(
      cycle,
      "This cycle is waiting on a step this Mac cannot run.",
    );
  }

  const raw = await runPromptSdlcWriterReply({
    writerAgent: cycle.improverModel,
    prompt: buildPromptSdlcImproverPrompt({
      goal: cycle.goal,
      promptText: revision.promptText,
      score: revision.judgement?.score ?? 0,
      reasons: revision.judgement?.reasons ?? "",
    }),
  });
  return raw === null
    ? failCycle(cycle, "The improver did not reply.")
    : applyPromptSdlcLocalImproverReply(cycle, raw);
};
