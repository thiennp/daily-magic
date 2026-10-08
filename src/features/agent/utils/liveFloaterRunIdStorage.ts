/** afae8216: the run the floater shows, so a reload can reopen it. */
const LIVE_FLOATER_RUN_ID_KEY = "agent-witch:live-floater-run";

const resolveStorage = (storage?: Storage): Storage =>
  storage ?? window.sessionStorage;

export const getLiveFloaterRunId = (storage?: Storage): string | null => {
  try {
    return resolveStorage(storage).getItem(LIVE_FLOATER_RUN_ID_KEY);
  } catch {
    return null;
  }
};

export const setLiveFloaterRunId = (runId: string, storage?: Storage): void => {
  try {
    resolveStorage(storage).setItem(LIVE_FLOATER_RUN_ID_KEY, runId);
  } catch {
    return;
  }
};

export const clearLiveFloaterRunId = (storage?: Storage): void => {
  try {
    resolveStorage(storage).removeItem(LIVE_FLOATER_RUN_ID_KEY);
  } catch {
    return;
  }
};

/** Live statuses (or an open question) keep the floater restorable. */
export const resolveLiveFloaterRunIdToPersist = (input: {
  readonly runId: string | null;
  readonly status: string;
  readonly hasPendingQuestion: boolean;
}): string | null => {
  const isLive =
    input.status === "starting" ||
    input.status === "streaming" ||
    input.status === "waiting_approval" ||
    input.status === "stopping" ||
    input.hasPendingQuestion;
  return input.runId !== null && input.runId.length > 0 && isLive
    ? input.runId
    : null;
};
