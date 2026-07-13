const acceptedStreamRunIds = new Set<string>();

export const markTerminalStreamAccepted = (runId: string): void => {
  acceptedStreamRunIds.add(runId);
};

export const isTerminalStreamAccepted = (runId: string): boolean =>
  acceptedStreamRunIds.has(runId);

export const clearTerminalStreamState = (runId: string): void => {
  acceptedStreamRunIds.delete(runId);
};
