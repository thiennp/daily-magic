const MAX_CONCURRENT_TERMINAL_STREAMS = 1000;

const activeStreams = new Map<
  string,
  { readonly runId: string; readonly startedAt: number }
>();

export interface StreamSlotAcquireResult {
  readonly accepted: boolean;
  readonly activeStreams: number;
  readonly maxStreams: number;
  readonly retryAfterSeconds: number;
}

export const tryAcquireTerminalStreamSlot = (
  runId: string,
): StreamSlotAcquireResult => {
  if (activeStreams.has(runId)) {
    return {
      accepted: true,
      activeStreams: activeStreams.size,
      maxStreams: MAX_CONCURRENT_TERMINAL_STREAMS,
      retryAfterSeconds: 0,
    };
  }

  if (activeStreams.size >= MAX_CONCURRENT_TERMINAL_STREAMS) {
    return {
      accepted: false,
      activeStreams: activeStreams.size,
      maxStreams: MAX_CONCURRENT_TERMINAL_STREAMS,
      retryAfterSeconds: 30,
    };
  }

  activeStreams.set(runId, { runId, startedAt: Date.now() });
  return {
    accepted: true,
    activeStreams: activeStreams.size,
    maxStreams: MAX_CONCURRENT_TERMINAL_STREAMS,
    retryAfterSeconds: 0,
  };
};

export const releaseTerminalStreamSlot = (runId: string): void => {
  activeStreams.delete(runId);
};

export const getTerminalStreamSlotCount = (): number => activeStreams.size;
