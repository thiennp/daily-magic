import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";
import type { OneWindowStatusTone } from "@/features/projects/messenger/oneWindow/oneWindowFeedItem.type";
import { mapRunStatusToProjectTaskDisplayStatus } from "@/features/projects/tasks/projectTaskDisplayStatus";
import {
  type ProjectTaskChipTone,
  projectTaskStatusChip,
} from "@/features/projects/tasks/projectTaskStatusTone";
import {
  PROJECT_MESSAGE_KIND_TASK_BLOCKED,
  PROJECT_MESSAGE_KIND_TASK_DONE,
  PROJECT_MESSAGE_KIND_TASK_PROCESSING,
  PROJECT_MESSAGE_KIND_TASK_RECEIVED,
  PROJECT_MESSAGE_KIND_TASK_STATUS,
} from "@/lib/projects/acl/messaging/projectMessage.constants";

/** DF-027 sand chip tone → the task-update pill's three tones. */
const ROW_TONE: Readonly<Record<ProjectTaskChipTone, OneWindowStatusTone>> = {
  ok: "ok",
  info: "info",
  warn: "warn",
  err: "warn",
  muted: "info",
};

/** OW9 reply_kind status for a task that cannot go on. */
const BLOCKED_STATUS = "blocked";

/**
 * P1-S5 task-update pill: OW9 `subjectState.status` (reply_kind: "done" /
 * "blocked") through DF-027's run-status mapper (Done / Running / Queued;
 * anything else is "Unknown", never "Queued"). "blocked" has no run status →
 * "Blocked". Replaces the S3 reply-kind → run-status heuristic.
 */
export const oneWindowTaskUpdateStatus = (
  status: string,
): { readonly label: string; readonly tone: OneWindowStatusTone } => {
  if (status.trim().toLowerCase() === BLOCKED_STATUS) {
    return { label: AWC_PROJECT_MESSENGER_COPY.stateBlocked, tone: "warn" };
  }
  const chip = projectTaskStatusChip(
    mapRunStatusToProjectTaskDisplayStatus(status),
  );
  return { label: chip.label, tone: ROW_TONE[chip.tone] };
};

/** Bot `task.*` reply kind → the run status token DF-027's mapper reads. */
const KIND_TO_RUN_STATUS: ReadonlyMap<string, string> = new Map([
  [PROJECT_MESSAGE_KIND_TASK_RECEIVED, "queued"],
  [PROJECT_MESSAGE_KIND_TASK_PROCESSING, "running"],
  [PROJECT_MESSAGE_KIND_TASK_STATUS, "running"],
  [PROJECT_MESSAGE_KIND_TASK_DONE, "done"],
  [PROJECT_MESSAGE_KIND_TASK_BLOCKED, BLOCKED_STATUS],
]);

/**
 * P1-S5b fallback only (subjectState null or missing): the S3 reply-kind pill
 * (task.received → Queued, task.processing / task.status → Running, …) via
 * DF-027. Not a task.* reply → null (no pill). subjectState always wins.
 */
export const oneWindowReplyKindStatus = (
  kind: string,
): ReturnType<typeof oneWindowTaskUpdateStatus> | null => {
  const status = KIND_TO_RUN_STATUS.get(kind);
  return status === undefined ? null : oneWindowTaskUpdateStatus(status);
};
