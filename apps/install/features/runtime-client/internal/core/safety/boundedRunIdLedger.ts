export const RUN_ID_LEDGER_CAPACITY = 500;

/** Pure: append id (most recent last), drop duplicates, keep the newest `capacity`. */
export const rememberRunId = (
  ids: readonly string[],
  runId: string,
  capacity: number = RUN_ID_LEDGER_CAPACITY,
): readonly string[] =>
  [...ids.filter((id) => id !== runId), runId].slice(-capacity);

export interface RunIdLedger {
  readonly has: (runId: string) => boolean;
  readonly add: (runId: string) => void;
}

/**
 * In-memory bounded ledger of agentRunIds (S0-7c): used to accept a run
 * command once and to finish/post a run result once.
 */
export const createBoundedRunIdLedger = (
  capacity: number = RUN_ID_LEDGER_CAPACITY,
): RunIdLedger => {
  const state: { ids: readonly string[] } = { ids: [] };
  return {
    has: (runId) => state.ids.includes(runId),
    add: (runId) => {
      state.ids = rememberRunId(state.ids, runId, capacity);
    },
  };
};
