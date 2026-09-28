import { isPromptSdlcTerminalStatus } from "../../../../adapters/promptSdlcAwcCore";
import { labelPromptSdlcLocalModel } from "./choosePromptSdlcLocalModels";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { describePromptSdlcWriterTerminalFailure } from "./readPromptSdlcWriterOutput";

export const describePromptSdlcLocalActivity = (
  cycle: PromptSdlcLocalCycle,
): { readonly title: string; readonly detail: string } => {
  if (cycle.status === "judging") {
    return {
      title: `${labelPromptSdlcLocalModel(cycle.judgeModel)} is scoring round ${cycle.currentRound + 1} of ${cycle.maxRounds}.`,
      detail:
        "That writer is working on this Mac. This panel keeps updating, so the page is not stuck.",
    };
  }
  if (cycle.status === "improving") {
    return {
      title: `${labelPromptSdlcLocalModel(cycle.improverModel)} is rewriting the prompt.`,
      detail:
        "That writer is working on this Mac. This panel keeps updating, so the page is not stuck.",
    };
  }
  if (cycle.status === "passed") {
    return { title: "This prompt passed.", detail: "" };
  }
  if (cycle.status === "stopped") {
    const writerFailed = cycle.revisions.some(
      (revision) =>
        describePromptSdlcWriterTerminalFailure(revision.promptText) !== null,
    );
    return {
      title: "Stopped after the last round.",
      detail: writerFailed
        ? "The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History."
        : "",
    };
  }
  if (isPromptSdlcTerminalStatus(cycle.status)) {
    return {
      title: "This run stopped because a reply could not be used.",
      detail: "",
    };
  }
  return {
    title: "Working on this Mac.",
    detail: "This panel keeps updating.",
  };
};
