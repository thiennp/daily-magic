import { ACCESS_LOG_COPY as C } from "@/features/projects/accessLog/accessLogCopy.constant";

const MINUTE_MS = 60_000;
const HOUR_MS = 3_600_000;
const DAY_MS = 86_400_000;

const monthDay = (d: Date): string =>
  d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

const monthDayYear = (d: Date): string =>
  d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

/** Full tooltip / title: "Oct 6, 2026, 11:20 AM" */
export const formatAccessLogTimeFull = (iso: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

/** Date-only for expires detail (same-year vs year). */
export const formatAccessLogDate = (
  iso: string,
  nowMs: number = Date.now(),
): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.getFullYear() === new Date(nowMs).getFullYear()
    ? monthDay(d)
    : monthDayYear(d);
};

/** Relative within 24h, then date. Pair with <time datetime> + full title. */
export const formatAccessLogTime = (
  iso: string,
  nowMs: number = Date.now(),
): { readonly relative: string; readonly full: string } => {
  const full = formatAccessLogTimeFull(iso);
  const at = new Date(iso).getTime();
  if (Number.isNaN(at)) return { relative: full, full };
  const elapsed = Math.max(0, nowMs - at);
  if (elapsed < MINUTE_MS) return { relative: C.timeJustNow, full };
  if (elapsed < HOUR_MS) {
    const n = Math.floor(elapsed / MINUTE_MS);
    return { relative: C.timeMinutes.replace("{n}", String(n)), full };
  }
  if (elapsed < DAY_MS) {
    const n = Math.floor(elapsed / HOUR_MS);
    return { relative: C.timeHours.replace("{n}", String(n)), full };
  }
  return { relative: formatAccessLogDate(iso, nowMs), full };
};
