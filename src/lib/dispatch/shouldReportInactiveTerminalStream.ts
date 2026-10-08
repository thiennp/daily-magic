const REPORT_WINDOW_MS = 60_000;
const MAX_TRACKED_RUNS = 500;

const lastReportedAt = new Map<string, number>();

/**
 * a6053d1c: a host flushing chunks after its stream slot was gone got 160
 * "Terminal stream is not active for this run." errors in 9 s. Say it once
 * per run per minute; later chunks are dropped quietly.
 */
export const shouldReportInactiveTerminalStream = (
  runId: string,
  now: number = Date.now(),
): boolean => {
  const previous = lastReportedAt.get(runId);
  if (previous !== undefined && now - previous < REPORT_WINDOW_MS) {
    return false;
  }
  if (lastReportedAt.size >= MAX_TRACKED_RUNS) {
    lastReportedAt.clear();
  }
  lastReportedAt.set(runId, now);
  return true;
};

export const clearInactiveTerminalStreamReportsForTests = (): void => {
  lastReportedAt.clear();
};
