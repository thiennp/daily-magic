import { PROJECT_MESSAGE_HOURLY_CAP } from "@/lib/projects/acl/messaging/projectMessage.constants";

/**
 * DF-024 / AWD-7: stand-alone project task records (table project_task_records,
 * migration 109). Neon keeps meta only — bodies stay local.
 */
export const PROJECT_TASK_STATUSES = [
  "queued",
  "planned",
  "in_progress",
  "blocked",
  "done",
  "cancelled",
] as const;
export type ProjectTaskStatus = (typeof PROJECT_TASK_STATUSES)[number];

/** p0 Urgent · p1 High · p2 Normal · p3 Low (tasks-planned brief). Nullable. */
export const PROJECT_TASK_PRIORITIES = ["p0", "p1", "p2", "p3"] as const;
export type ProjectTaskPriority = (typeof PROJECT_TASK_PRIORITIES)[number];

export const PROJECT_TASK_STAGES = [
  "design",
  "en",
  "build",
  "ready",
  "live",
] as const;
export type ProjectTaskStage = (typeof PROJECT_TASK_STAGES)[number];

/** Statuses a task may be created in (work not started yet). */
export const PROJECT_TASK_INITIAL_STATUSES: readonly ProjectTaskStatus[] = [
  "queued",
  "planned",
];

/**
 * Allowed moves: queued ⇄ planned → in_progress ⇄ blocked; in_progress → done.
 * Anyone may stop work (in_progress | blocked → queued, "To do") or reopen a
 * finished task (done → queued).
 * Terminal cancelled is allowed from any open status; reopen → queued.
 */
export const PROJECT_TASK_TRANSITIONS: Readonly<
  Record<ProjectTaskStatus, readonly ProjectTaskStatus[]>
> = {
  queued: ["planned", "in_progress", "cancelled"],
  planned: ["queued", "in_progress", "cancelled"],
  in_progress: ["blocked", "done", "queued", "cancelled"],
  blocked: ["in_progress", "queued", "cancelled"],
  done: ["queued"],
  cancelled: ["queued"],
};

export const PROJECT_TASK_TITLE_MAX_CHARS = 120;
/** Neon meta cap for description (chars). Longer → description_too_long. */
export const PROJECT_TASK_DESCRIPTION_MAX_CHARS = 200;
/**
 * Outcome a bot writes when it finishes (findings, what was delivered). Longer
 * than the one-line description, still a short summary: full reports stay local.
 */
export const PROJECT_TASK_RESULT_SUMMARY_MAX_CHARS = 600;
export const PROJECT_TASK_DEPENDS_ON_MAX = 10;
export const PROJECT_TASK_TIP_SHA_PATTERN = /^[0-9a-f]{7,40}$/;

/** Per-caller rolling 1h create cap — same number as project_dispatch (300/h). */
export const PROJECT_TASK_HOURLY_CREATE_CAP = PROJECT_MESSAGE_HOURLY_CAP;

/**
 * Per-project row cap (Neon), done rows included. Create beyond it →
 * task_cap_reached { limit, hint }.
 */
export const PROJECT_TASK_PROJECT_ROW_CAP = 500;

export const PROJECT_TASK_CAP_HINT = `Project has ${PROJECT_TASK_PROJECT_ROW_CAP} tasks. Mark tasks done or remove obsolete rows to create new ones.`;

/** Task / seat ids are UUID text (36); anything longer is rejected early. */
export const PROJECT_TASK_ID_MAX_CHARS = 64;

/** Tasks tab list window (newest first). */
export const PROJECT_TASK_LIST_LIMIT = 200;

/** Arg keys that would carry a body — bodies stay local (never Neon). */
export const PROJECT_TASK_BODY_ARG_KEYS = [
  "body",
  "prompt",
  "report",
  "logs",
] as const;
