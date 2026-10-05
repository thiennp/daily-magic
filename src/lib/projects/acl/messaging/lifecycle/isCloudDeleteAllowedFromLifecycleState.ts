import type { ProjectComputerHistoryState } from "@/lib/projects/acl/messaging/projectComputerHistoryStateMachine";
import {
  PROJECT_MESSAGE_CLOUD_DELETE_REQUIRES_FOLDER_ACK_WHEN_HISTORY_ON,
  type ProjectMessageLifecycleState,
} from "@/lib/projects/acl/messaging/lifecycle/projectMessageLifecycle.constants";

/**
 * Which lifecycle state may take deleteFromCloud.
 * History ON (on_configuring | on_ready | degraded): SAVED_TO_PROJECT_FOLDER
 * only — age/7d/timeout never qualifies (7d = flag + wake machine). History
 * OFF: OFF-only exception, READ may delete via DOR + gate allow. Unread (null)
 * never deletes here.
 */
export const isCloudDeleteAllowedFromLifecycleState = (
  state: ProjectMessageLifecycleState | null,
  historyMode: ProjectComputerHistoryState,
): boolean => {
  if (state === "SAVED_TO_PROJECT_FOLDER") {
    return true;
  }
  if (
    historyMode !== "off" &&
    PROJECT_MESSAGE_CLOUD_DELETE_REQUIRES_FOLDER_ACK_WHEN_HISTORY_ON
  ) {
    return false;
  }
  return state === "READ";
};
