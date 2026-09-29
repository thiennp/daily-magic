import { PROMPT_SDLC_MANUAL_ACTOR } from "./choosePromptSdlcLocalModels";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

export const isPromptSdlcLocalManualWait = (
  cycle: PromptSdlcLocalCycle,
): boolean => {
  if (
    cycle.status === "improving" &&
    cycle.improverModel === PROMPT_SDLC_MANUAL_ACTOR
  ) {
    return true;
  }
  if (
    cycle.status !== "judging" ||
    cycle.judgeModel !== PROMPT_SDLC_MANUAL_ACTOR
  ) {
    return false;
  }
  const revision = cycle.revisions.find(
    (item) => item.roundNumber === cycle.currentRound,
  );
  if (cycle.judgePromptTextOnly === true) {
    return true;
  }
  if (revision?.run !== undefined) {
    return true;
  }
  return cycle.improverModel === PROMPT_SDLC_MANUAL_ACTOR;
};
