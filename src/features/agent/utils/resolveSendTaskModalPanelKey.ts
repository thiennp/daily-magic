export const resolveSendTaskModalPanelKey = (input: {
  readonly shouldRestoreLiveSession: boolean;
  readonly capabilityFromUrl: string;
  readonly now?: () => number;
}): string => {
  if (input.shouldRestoreLiveSession) {
    return input.capabilityFromUrl;
  }

  const now = input.now ?? Date.now;
  return `fresh-${now().toString(36)}`;
};
