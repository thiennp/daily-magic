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

/** Bot `task.*` reply kind → the run status token DF-027's mapper reads. */
const KIND_TO_RUN_STATUS: ReadonlyMap<string, string> = new Map([
  [PROJECT_MESSAGE_KIND_TASK_RECEIVED, "queued"],
  [PROJECT_MESSAGE_KIND_TASK_PROCESSING, "running"],
  [PROJECT_MESSAGE_KIND_TASK_STATUS, "running"],
  [PROJECT_MESSAGE_KIND_TASK_DONE, "done"],
]);

/** DF-027 sand chip tone → the task-update pill's three tones. */
const ROW_TONE: Readonly<Record<ProjectTaskChipTone, OneWindowStatusTone>> = {
  ok: "ok",
  info: "info",
  warn: "warn",
  err: "warn",
  muted: "info",
};

/**
 * P1-S3 task-update pill: label + tone for a bot `task.*` reply, through
 * DF-027's run-status mapper (Done / Running / Queued; anything else is
 * "Unknown", never "Queued"). `task.blocked` has no run status → "Blocked".
 */
export const oneWindowTaskUpdateStatus = (
  kind: string,
): { readonly label: string; readonly tone: OneWindowStatusTone } => {
  if (kind === PROJECT_MESSAGE_KIND_TASK_BLOCKED) {
    return { label: AWC_PROJECT_MESSENGER_COPY.stateBlocked, tone: "warn" };
  }
  const chip = projectTaskStatusChip(
    mapRunStatusToProjectTaskDisplayStatus(KIND_TO_RUN_STATUS.get(kind) ?? kind),
  );
  return { label: chip.label, tone: ROW_TONE[chip.tone] };
};
