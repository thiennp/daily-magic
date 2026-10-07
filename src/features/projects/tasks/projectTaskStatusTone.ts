import type { ProjectTaskUiStatus } from "@/features/projects/sync/projectSync.types";

/** Sand-safe chip tones — awc status soft tokens only (no purple / rogue hex). */
export type ProjectTaskChipTone = "ok" | "info" | "warn" | "err" | "muted";

export const projectTaskStatusTone = (
  status: ProjectTaskUiStatus,
): ProjectTaskChipTone => {
  if (status === "done") return "ok";
  if (status === "running") return "info";
  if (status === "queued") return "warn";
  if (status === "failed") return "err";
  return "muted";
};

/** Design: locked tokens; shape/icon carries meaning — soft fills only. */
export const PROJECT_TASK_TONE_CLASS: Record<ProjectTaskChipTone, string> = {
  ok: "border-awc-border-strong bg-awc-surface text-awc-fg",
  info: "border-awc-accent-soft-2 bg-awc-info-soft text-awc-fg",
  warn: "border-awc-border-strong bg-awc-tile-2 text-awc-fg-muted",
  err: "border-awc-control-border bg-awc-surface text-awc-fg",
  muted: "border-awc-border bg-awc-tile text-awc-fg-subtle",
};
