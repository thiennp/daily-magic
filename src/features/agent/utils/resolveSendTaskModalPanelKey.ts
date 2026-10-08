export const resolveSendTaskModalPanelKey = (input: {
  readonly shouldRestoreLiveSession: boolean;
  readonly capabilityFromUrl: string;
  readonly sourceRunId?: string;
  readonly now?: () => number;
}): string => {
  if (input.shouldRestoreLiveSession) {
    if ((input.sourceRunId?.length ?? 0) > 0) {
      return input.sourceRunId!;
    }

    return input.capabilityFromUrl;
  }

  const now = input.now ?? Date.now;
  return `fresh-${now().toString(36)}`;
};

/**
 * bedd8c5f: Expand on a docked floater (`?resumeLive=1`, no run id) must keep
 * the mounted panel. A new key remounted it, so a minimized Failed run came
 * back as a blank picker and lost its Failed state and Retry.
 */
export const shouldKeepDockedPanelOnExpand = (input: {
  readonly keepAlive: boolean;
  readonly isResumeLive: boolean;
  readonly sourceRunId: string;
}): boolean =>
  input.keepAlive && input.isResumeLive && input.sourceRunId.length === 0;
