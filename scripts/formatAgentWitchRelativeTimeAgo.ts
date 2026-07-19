const MINUTE_MS = 60_000;
const HOUR_MS = 3_600_000;
const DAY_MS = 86_400_000;

const pluralize = (count: number, singular: string, plural: string): string =>
  count === 1 ? singular : plural;

/** Human relative age for Agent Witch local UI timestamps (status / traffic / knowledge). */
export const formatAgentWitchRelativeTimeAgo = (
  value: string | null,
  nowMs: number = Date.now(),
): string | null => {
  if (value === null) {
    return null;
  }

  const timestamp = new Date(value).getTime();
  if (Number.isNaN(timestamp)) {
    return null;
  }

  const elapsedMs = Math.max(0, nowMs - timestamp);

  if (elapsedMs < MINUTE_MS) {
    return "just now";
  }

  const totalMinutes = Math.floor(elapsedMs / MINUTE_MS);
  if (totalMinutes < 60) {
    return `${totalMinutes} ${pluralize(totalMinutes, "min", "mins")} ago`;
  }

  const totalHours = Math.floor(elapsedMs / HOUR_MS);
  const remainingMinutes = Math.floor((elapsedMs % HOUR_MS) / MINUTE_MS);

  if (totalHours < 24) {
    if (remainingMinutes === 0) {
      return `${totalHours}h ago`;
    }

    return `${totalHours}h ${remainingMinutes} ${pluralize(remainingMinutes, "min", "mins")} ago`;
  }

  const totalDays = Math.floor(elapsedMs / DAY_MS);
  if (totalDays < 7) {
    return `${totalDays} ${pluralize(totalDays, "day", "days")} ago`;
  }

  const totalWeeks = Math.floor(totalDays / 7);
  if (totalWeeks < 5) {
    return `${totalWeeks} ${pluralize(totalWeeks, "week", "weeks")} ago`;
  }

  const totalMonths = Math.floor(totalDays / 30);
  if (totalMonths < 12) {
    return `${totalMonths} ${pluralize(totalMonths, "month", "months")} ago`;
  }

  const totalYears = Math.floor(totalDays / 365);
  return `${totalYears} ${pluralize(totalYears, "year", "years")} ago`;
};
