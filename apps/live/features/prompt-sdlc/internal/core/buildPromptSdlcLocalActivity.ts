import { isPromptSdlcTerminalStatus } from "../../../../adapters/promptSdlcAwcCore";
import {
  labelPromptSdlcLocalModel,
  PROMPT_SDLC_MANUAL_ACTOR,
} from "./choosePromptSdlcLocalModels";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { describePromptSdlcWriterTerminalFailure } from "./readPromptSdlcWriterOutput";

export const describePromptSdlcLocalActivity = (
  cycle: PromptSdlcLocalCycle,
): { readonly title: string; readonly detail: string } => {
  if (
    cycle.status === "judging" &&
    cycle.judgeModel === PROMPT_SDLC_MANUAL_ACTOR
  ) {
    return {
      title: `Score round ${cycle.currentRound + 1}.`,
      detail: "Add a score from 0 to 100 and the reason for that score.",
    };
  }
  if (cycle.status === "judging") {
    return {
      title: `${labelPromptSdlcLocalModel(cycle.judgeModel)} is scoring round ${cycle.currentRound + 1}.`,
      detail:
        "That writer is working on this Mac. This panel keeps updating, so the page is not stuck.",
    };
  }
  if (
    cycle.status === "improving" &&
    cycle.improverModel === PROMPT_SDLC_MANUAL_ACTOR
  ) {
    const judgement = cycle.revisions.find(
      (revision) => revision.roundNumber === cycle.currentRound,
    )?.judgement;
    const reason = judgement?.reasons?.trim() ?? "";
    return {
      title: "Rewrite the prompt.",
      detail:
        judgement?.score === null ||
        judgement?.score === undefined ||
        reason.length === 0
          ? "Write the next prompt yourself."
          : `Score ${judgement.score} / 100. ${reason}`,
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
    const message = cycle.errorMessage?.trim() ?? "";
    const finished = (cycle.errorMessage ?? "").startsWith("Finished");
    return {
      title: finished ? "Finished." : "Stopped.",
      detail:
        message.length > 0
          ? message
          : writerFailed
            ? "The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History."
            : "The best prompt is kept.",
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
