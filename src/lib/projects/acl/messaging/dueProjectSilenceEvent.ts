import type {
  ProjectB2bEvent,
  ProjectB2bState,
} from "@/lib/projects/acl/messaging/projectB2bStateMachine";
import {
  PROJECT_B2B_SILENCE_BLOCK_MS,
  PROJECT_B2B_SILENCE_NOTIFY_MS,
} from "@/lib/projects/acl/messaging/projectMessage.constants";

/**
 * Which timeout event is due for a watched delivery. Pure: the caller passes
 * the wake time and the current time; no clock is read here.
 */
export const dueProjectSilenceEvent = (input: {
  readonly state: ProjectB2bState;
  readonly wokenAtMs: number;
  readonly nowMs: number;
}): Extract<ProjectB2bEvent, "timeout_5m" | "timeout_10m"> | null => {
  const silentMs = input.nowMs - input.wokenAtMs;
  if (
    input.state === "awaiting_first_activity" &&
    silentMs >= PROJECT_B2B_SILENCE_NOTIFY_MS
  ) {
    return "timeout_5m";
  }
  if (
    input.state === "silent_5m_notified" &&
    silentMs >= PROJECT_B2B_SILENCE_BLOCK_MS
  ) {
    return "timeout_10m";
  }
  return null;
};
