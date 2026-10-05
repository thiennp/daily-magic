import {
  PROJECT_MESSAGE_KIND_TASK_BLOCKED,
  PROJECT_MESSAGE_KIND_TASK_DONE,
  PROJECT_MESSAGE_KIND_TASK_PROCESSING,
  PROJECT_MESSAGE_KIND_TASK_RECEIVED,
  PROJECT_MESSAGE_KIND_TASK_STATUS,
} from "@/lib/projects/acl/messaging/projectMessage.constants";
import type { ProjectB2bEvent } from "@/lib/projects/acl/messaging/projectB2bStateMachine";

const EVENT_BY_KIND: Readonly<Record<string, ProjectB2bEvent>> = {
  [PROJECT_MESSAGE_KIND_TASK_RECEIVED]: "processing",
  [PROJECT_MESSAGE_KIND_TASK_PROCESSING]: "processing",
  [PROJECT_MESSAGE_KIND_TASK_STATUS]: "status",
  [PROJECT_MESSAGE_KIND_TASK_DONE]: "done",
  [PROJECT_MESSAGE_KIND_TASK_BLOCKED]: "blocked",
};

/** Reply kind → event. Null for any other kind (a new request, not a reply). */
export const projectPeerActivityEventForKind = (
  kind: string,
): ProjectB2bEvent | null => EVENT_BY_KIND[kind] ?? null;
