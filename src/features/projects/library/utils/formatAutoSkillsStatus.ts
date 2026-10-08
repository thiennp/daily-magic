import type { AutoSkillsOverview } from "@/features/project-auto-skills/public-api/types";

const timeAgo = (iso: string | null, nowMs: number): string | null => {
  if (iso === null) {
    return null;
  }
  const minutes = Math.max(0, Math.round((nowMs - Date.parse(iso)) / 60_000));
  if (Number.isNaN(minutes)) {
    return null;
  }
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  return hours < 24 ? `${hours} h ago` : `${Math.round(hours / 24)} d ago`;
};

const countLabel = (n: number): string =>
  `${n} question${n === 1 ? "" : "s"} waiting`;

/**
 * Strip headline parts: on/off, judge in use, last check, waiting questions,
 * or the paused reason (never a silent failure).
 */
export const formatAutoSkillsStatus = (
  overview: AutoSkillsOverview,
  nowMs: number,
): { readonly line: string; readonly paused: boolean } => {
  if (!overview.enabled) {
    return { line: "Auto skills are off", paused: false };
  }
  if (overview.pausedReason !== null) {
    return { line: overview.pausedReason, paused: true };
  }
  return {
    line: [
      "Auto skills are on",
      ...autoSkillsDetailParts(overview, nowMs),
    ].join(" · "),
    paused: false,
  };
};

/** The facts after "Auto skills are on": judge, last check, waiting questions. */
export const autoSkillsDetailParts = (
  overview: AutoSkillsOverview,
  nowMs: number,
): readonly string[] =>
  [
    overview.judgeLabel === null ? null : `Judged by ${overview.judgeLabel}`,
    overview.lastCheckedAt === null
      ? "waiting for the first finished task"
      : `last checked ${timeAgo(overview.lastCheckedAt, nowMs) ?? "recently"}`,
    overview.pending.length > 0 ? countLabel(overview.pending.length) : null,
  ].filter((p): p is string => p !== null);
