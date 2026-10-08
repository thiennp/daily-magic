type StartedTerminalStream = {
  readonly extraPayload: Readonly<Record<string, unknown>>;
  readonly requestId: string | undefined;
};

export type TerminalStreamStartFrame = {
  readonly type: "terminal.stream.start";
  readonly payload: Readonly<Record<string, unknown>>;
  readonly requestId?: string;
};

const acceptedStreamRunIds = new Set<string>();
const pendingChunksByRunId = new Map<string, string[]>();
const startedStreamsByRunId = new Map<string, StartedTerminalStream>();

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

const buildStartFrame = (
  runId: string,
  started: StartedTerminalStream,
): TerminalStreamStartFrame => ({
  type: "terminal.stream.start",
  payload: { runId, ...started.extraPayload },
  ...(started.requestId !== undefined ? { requestId: started.requestId } : {}),
});

/** r323: remembers the stream so it can be re-registered after a reconnect. */
export const beginTerminalStream = (
  runId: string,
  requestId: string | undefined,
  extraPayload: Readonly<Record<string, unknown>> = {},
): TerminalStreamStartFrame => {
  const started = { extraPayload, requestId };
  startedStreamsByRunId.set(runId, started);
  return buildStartFrame(runId, started);
};

export const isTerminalStreamStarted = (runId: string): boolean =>
  startedStreamsByRunId.has(runId) || acceptedStreamRunIds.has(runId);

/**
 * r323: after a socket reconnect (or a server restart that dropped the slot)
 * every live stream must be started again. Chunks queue until the server
 * re-accepts, then flush through the normal accepted handler.
 */
export const takeTerminalStreamsForReRegister = (
  requestId?: string,
): readonly TerminalStreamStartFrame[] =>
  [...startedStreamsByRunId.entries()]
    .filter(
      ([, started]) =>
        requestId === undefined || started.requestId === requestId,
    )
    .map(([runId, started]) => {
      acceptedStreamRunIds.delete(runId);
      return buildStartFrame(runId, started);
    });

export const clearTerminalStreamState = (runId: string): void => {
  acceptedStreamRunIds.delete(runId);
  pendingChunksByRunId.delete(runId);
  startedStreamsByRunId.delete(runId);
};
