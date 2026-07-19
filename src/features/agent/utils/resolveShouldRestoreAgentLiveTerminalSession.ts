/** Restore a persisted live terminal only when explicitly resuming. */
export const resolveShouldRestoreAgentLiveTerminalSession = (input: {
  readonly continueSession: boolean;
  readonly resumeLiveSession: boolean;
  readonly sourceRunId?: string;
}): boolean =>
  input.continueSession ||
  input.resumeLiveSession ||
  (input.sourceRunId?.length ?? 0) > 0;
