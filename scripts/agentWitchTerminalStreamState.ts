const acceptedStreamRunIds = new Set<string>();
const pendingChunksByRunId = new Map<string, string[]>();

export const queueTerminalStreamChunk = (
  runId: string,
  chunk: string,
): void => {
  if (chunk.length === 0) {
    return;
  }

  const pending = pendingChunksByRunId.get(runId) ?? [];
  pending.push(chunk);
  pendingChunksByRunId.set(runId, pending);
};

export const acceptTerminalStream = (runId: string): readonly string[] => {
  acceptedStreamRunIds.add(runId);
  const pending = pendingChunksByRunId.get(runId) ?? [];
  pendingChunksByRunId.delete(runId);
  return pending;
};

export const markTerminalStreamAccepted = (runId: string): void => {
  acceptTerminalStream(runId);
};

export const isTerminalStreamAccepted = (runId: string): boolean =>
  acceptedStreamRunIds.has(runId);

export const clearTerminalStreamState = (runId: string): void => {
  acceptedStreamRunIds.delete(runId);
  pendingChunksByRunId.delete(runId);
};
