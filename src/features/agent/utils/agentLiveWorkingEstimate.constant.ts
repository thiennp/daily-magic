/** Extra time allowed past the agent estimate before showing a stuck banner. */
export const AGENT_LIVE_PROGRESS_ESTIMATE_BUFFER_MIN_MS = 30_000;

export const AGENT_LIVE_PROGRESS_ESTIMATE_BUFFER_RATIO = 0.2;

/** Safety net when the agent never emits [[WORKING_ESTIMATE]]. */
export const AGENT_LIVE_PROGRESS_ESTIMATE_FALLBACK_STUCK_MS = 5 * 60_000;

export const resolveAgentLiveWorkingEstimateBufferMs = (
  estimateMs: number,
): number =>
  Math.max(
    AGENT_LIVE_PROGRESS_ESTIMATE_BUFFER_MIN_MS,
    Math.round(estimateMs * AGENT_LIVE_PROGRESS_ESTIMATE_BUFFER_RATIO),
  );
