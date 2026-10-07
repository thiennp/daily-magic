/**
 * HN-H2 Home connect-block state from existing link/connect signals.
 * UI-only — no new APIs.
 */
export type HomeNotLinkedConnectBlockState =
  | "not_linked"
  | "connecting"
  | "connected"
  | "failed";

export const resolveHomeNotLinkedConnectBlockState = (input: {
  readonly shouldShowConnectThisMac: boolean;
  readonly isConnecting: boolean;
  readonly isFailed: boolean;
  readonly hasConnectedThisComputer: boolean;
}): HomeNotLinkedConnectBlockState => {
  if (input.hasConnectedThisComputer) {
    return "connected";
  }
  if (input.isConnecting) {
    return "connecting";
  }
  if (input.isFailed && input.shouldShowConnectThisMac) {
    return "failed";
  }
  if (input.shouldShowConnectThisMac) {
    return "not_linked";
  }
  return "connected";
};
