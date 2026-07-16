const MAX_TERMINAL_STREAM_CHUNK_BYTES = 64 * 1024;
const MAX_TERMINAL_STREAM_CHUNKS_PER_SECOND = 200;
const RATE_LIMIT_WINDOW_MS = 1_000;

type TerminalStreamRateState = {
  windowStartedAt: number;
  chunkCount: number;
};

const rateStateByRunId = new Map<string, TerminalStreamRateState>();

export const TERMINAL_STREAM_LIMITS = {
  maxChunkBytes: MAX_TERMINAL_STREAM_CHUNK_BYTES,
  maxChunksPerSecond: MAX_TERMINAL_STREAM_CHUNKS_PER_SECOND,
} as const;

export type TerminalStreamChunkLimitResult =
  | { readonly ok: true }
  | {
      readonly ok: false;
      readonly errorMessage: string;
    };

const resetRateWindow = (state: TerminalStreamRateState, now: number): void => {
  state.windowStartedAt = now;
  state.chunkCount = 0;
};

export const validateTerminalStreamChunkLimits = (
  runId: string,
  chunk: string,
): TerminalStreamChunkLimitResult => {
  const chunkBytes = Buffer.byteLength(chunk, "utf8");
  if (chunkBytes > MAX_TERMINAL_STREAM_CHUNK_BYTES) {
    return {
      ok: false,
      errorMessage: `Terminal stream chunk exceeds ${MAX_TERMINAL_STREAM_CHUNK_BYTES} bytes.`,
    };
  }

  const now = Date.now();
  const existing = rateStateByRunId.get(runId);
  const state = existing ?? { windowStartedAt: now, chunkCount: 0 };

  if (now - state.windowStartedAt >= RATE_LIMIT_WINDOW_MS) {
    resetRateWindow(state, now);
  }

  state.chunkCount += 1;
  rateStateByRunId.set(runId, state);

  if (state.chunkCount > MAX_TERMINAL_STREAM_CHUNKS_PER_SECOND) {
    return {
      ok: false,
      errorMessage: `Terminal stream chunk rate exceeded for run ${runId}.`,
    };
  }

  return { ok: true };
};

export const clearTerminalStreamRateLimitsForTests = (): void => {
  rateStateByRunId.clear();
};
