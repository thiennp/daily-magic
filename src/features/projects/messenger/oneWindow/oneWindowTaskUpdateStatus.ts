import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";
import type { OneWindowStatusTone } from "@/features/projects/messenger/oneWindow/oneWindowFeedItem.type";
import { mapRunStatusToProjectTaskDisplayStatus } from "@/features/projects/tasks/projectTaskDisplayStatus";
import {
  type ProjectTaskChipTone,
  projectTaskStatusChip,
} from "@/features/projects/tasks/projectTaskStatusTone";

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
