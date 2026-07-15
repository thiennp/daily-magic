const hasUserSentFirstTask = (
  apiRuns: readonly unknown[] | null | undefined,
  cachedRunCount: number,
): boolean =>
  (Array.isArray(apiRuns) && apiRuns.length > 0) || cachedRunCount > 0;

export default hasUserSentFirstTask;
