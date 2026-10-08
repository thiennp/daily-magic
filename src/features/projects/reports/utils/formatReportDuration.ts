/** 750 -> "12m 30s", 45 -> "45s", 3720 -> "1h 2m"; null when unknown. */
export const formatReportDuration = (
  seconds: number | null | undefined,
): string | null => {
  if (seconds === null || seconds === undefined || !(seconds >= 0)) {
    return null;
  }
  const total = Math.round(seconds);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const rest = total % 60;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return rest > 0 ? `${minutes}m ${rest}s` : `${minutes}m`;
  return `${rest}s`;
};

/** actualSeconds, else completed - started; null if neither is usable. */
export const resolveReportDurationSeconds = (run: {
  readonly actualSeconds?: number | null;
  readonly startedAt: string | null;
  readonly completedAt: string | null;
}): number | null => {
  if (typeof run.actualSeconds === "number" && run.actualSeconds >= 0) {
    return run.actualSeconds;
  }
  if (run.startedAt === null || run.completedAt === null) return null;
  const diff =
    (new Date(run.completedAt).getTime() - new Date(run.startedAt).getTime()) /
    1000;
  return Number.isFinite(diff) && diff >= 0 ? diff : null;
};
