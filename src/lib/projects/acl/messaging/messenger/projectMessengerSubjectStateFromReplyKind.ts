import type { ProjectMessengerSubjectState } from "@/lib/projects/acl/messaging/messenger/projectMessengerWindowFields.type";
import { readProjectMessengerProgress } from "@/lib/projects/acl/messaging/messenger/readProjectMessengerProgress";
import {
  PROJECT_MESSAGE_KIND_TASK_BLOCKED,
  PROJECT_MESSAGE_KIND_TASK_DONE,
  PROJECT_MESSAGE_KIND_TASK_PROCESSING,
  PROJECT_MESSAGE_KIND_TASK_RECEIVED,
  PROJECT_MESSAGE_KIND_TASK_STATUS,
} from "@/lib/projects/acl/messaging/projectMessage.constants";

/**
 * Reply kind → status code. Codes match the DF-027 run-status words the UI
 * already maps (queued → Queued, running → Running, done → Done) plus
 * "blocked" (needs you).
 */
const REPLY_KIND_STATUS: Readonly<Record<string, string>> = {
  [PROJECT_MESSAGE_KIND_TASK_RECEIVED]: "queued",
  [PROJECT_MESSAGE_KIND_TASK_PROCESSING]: "running",
  [PROJECT_MESSAGE_KIND_TASK_STATUS]: "running",
  [PROJECT_MESSAGE_KIND_TASK_DONE]: "done",
  [PROJECT_MESSAGE_KIND_TASK_BLOCKED]: "blocked",
};

/**
 * Bot task reply (task_update row) → subject state. task.status also carries
 * done/of when its summary states progress ("3/5", "40%" → of 100).
 * Other kinds → null.
 */
export const projectMessengerSubjectStateFromReplyKind = (
  kind: string,
  text = "",
): ProjectMessengerSubjectState | null => {
  const status = REPLY_KIND_STATUS[kind];
  if (status === undefined) return null;
  const progress =
    kind === PROJECT_MESSAGE_KIND_TASK_STATUS
      ? readProjectMessengerProgress(text)
      : null;
  return {
    source: "reply_kind",
    status,
    ...(progress ?? {}),
    needsYou: kind === PROJECT_MESSAGE_KIND_TASK_BLOCKED,
    awaitingApproval: false,
  };
};
