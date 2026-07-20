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
