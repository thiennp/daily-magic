import { PROJECT_TASK_STATUS_LABEL } from "@/features/projects/tasks/projectPageTasksCopy.constant";
import type { ProjectTaskDisplayStatus } from "@/features/projects/tasks/projectTaskDisplayStatus";

/** Sand-safe chip tones — awc status soft tokens only (no purple / rogue hex). */
export type ProjectTaskChipTone = "ok" | "info" | "warn" | "err" | "muted";

/** Exhaustive: a new display status will not compile without a tone. */
const STATUS_TONE: Readonly<
  Record<ProjectTaskDisplayStatus, ProjectTaskChipTone>
> = {
  done: "ok",
  running: "info",
  queued: "warn",
  failed: "err",
  timed_out: "err",
  stopped: "muted",
  stalled: "warn",
  cancelled: "muted",
  denied: "muted",
  unknown: "muted",
};

export const projectTaskStatusTone = (
  status: ProjectTaskDisplayStatus,
): ProjectTaskChipTone => STATUS_TONE[status];

/** Status chip: own label + existing sand tone per status (DF-027). */
export const projectTaskStatusChip = (
  status: ProjectTaskDisplayStatus,
): { readonly label: string; readonly tone: ProjectTaskChipTone } => ({
  label: PROJECT_TASK_STATUS_LABEL[status],
  tone: STATUS_TONE[status],
});

/** Design: locked tokens; shape/icon carries meaning — soft fills only. */
export const PROJECT_TASK_TONE_CLASS: Record<ProjectTaskChipTone, string> = {
  ok: "border-awc-border-strong bg-awc-surface text-awc-fg",
  info: "border-awc-accent-soft-2 bg-awc-info-soft text-awc-fg",
  warn: "border-awc-border-strong bg-awc-tile-2 text-awc-fg-muted",
  err: "border-awc-control-border bg-awc-surface text-awc-fg",
  muted: "border-awc-border bg-awc-tile text-awc-fg-subtle",
};
