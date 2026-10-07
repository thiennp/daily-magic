/**
 * History turned off. Keep-300 + LOCKED Q1: do not delete Neon chat rows.
 * Learning purge on computers is owned by sync/History (tip 2 / RT10).
 * Returns 0 so callers keep a numeric "released" count.
 */
export const releaseProjectMessagesHeldForComputerAck = async (_input: {
  readonly projectId: string;
}): Promise<number> => {
  return 0;
};
