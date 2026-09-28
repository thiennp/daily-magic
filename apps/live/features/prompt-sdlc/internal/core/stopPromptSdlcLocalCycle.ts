import {
  isPromptSdlcTerminalStatus,
  PROMPT_SDLC_STOP_USER,
} from "../../../../adapters/promptSdlcAwcCore";
import {
  readPromptSdlcLocalCycle,
  savePromptSdlcLocalCycle,
} from "./promptSdlcLocalStore";

const cycleAbortControllers = new Map<string, AbortController>();

export const openPromptSdlcLocalCycleAbort = (cycleId: string): AbortSignal => {
  const controller = new AbortController();
  cycleAbortControllers.set(cycleId, controller);
  return controller.signal;
};

export const closePromptSdlcLocalCycleAbort = (cycleId: string): void => {
  cycleAbortControllers.delete(cycleId);
};

/** Saves stopped, then SIGTERMs the writer so the next round does not start. */
export const stopPromptSdlcLocalCycle = (
  storePath: string,
  cycleId: string,
): boolean => {
  const cycle = readPromptSdlcLocalCycle(storePath, cycleId);
  if (cycle === null) {
    return false;
  }

  if (!isPromptSdlcTerminalStatus(cycle.status)) {
    savePromptSdlcLocalCycle(storePath, {
      ...cycle,
      status: "stopped",
      errorMessage: PROMPT_SDLC_STOP_USER,
      updatedAt: new Date().toISOString(),
    });
    cycleAbortControllers.get(cycleId)?.abort();
  }

  return true;
};
