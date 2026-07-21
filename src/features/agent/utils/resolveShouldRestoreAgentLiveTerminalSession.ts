/** Restore a persisted live terminal when explicitly resuming or after refresh. */
export const resolveShouldRestoreAgentLiveTerminalSession = (input: {
  readonly continueSession: boolean;
  readonly resumeLiveSession: boolean;
  readonly sourceRunId?: string;
  /** In-progress session in localStorage (page refresh) — AGENT-048. */
  readonly hasPersistedInProgressSession?: boolean;
}): boolean =>
  input.continueSession ||
  input.resumeLiveSession ||
  (input.sourceRunId?.length ?? 0) > 0 ||
  input.hasPersistedInProgressSession === true;
