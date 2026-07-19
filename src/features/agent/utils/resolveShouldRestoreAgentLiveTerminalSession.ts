/** Restore a persisted live terminal only when explicitly resuming. */
export const resolveShouldRestoreAgentLiveTerminalSession = (input: {
  readonly continueSession: boolean;
  readonly resumeLiveSession: boolean;
}): boolean => input.continueSession || input.resumeLiveSession;
