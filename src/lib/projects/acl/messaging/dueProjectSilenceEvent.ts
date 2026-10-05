import {
  PROJECT_B2B_TRANSITIONS,
  type ProjectB2bEvent,
  type ProjectB2bState,
} from "@/lib/projects/acl/messaging/projectB2bStateMachine";
import {
  PROJECT_B2B_SILENCE_BLOCK_MS,
  PROJECT_B2B_SILENCE_NOTIFY_MS,
} from "@/lib/projects/acl/messaging/projectMessage.constants";

/**
 * Which timeout event is due, measured from the wake or B's last activity.
 * Only states with that timeout edge in the table qualify. Pure: the caller
 * passes both times; no clock is read here.
 */
export const dueProjectSilenceEvent = (input: {
  readonly state: ProjectB2bState;
  readonly lastActivityAtMs: number;
  readonly nowMs: number;
}): Extract<ProjectB2bEvent, "timeout_5m" | "timeout_10m"> | null => {
  const silentMs = input.nowMs - input.lastActivityAtMs;
  const edges = PROJECT_B2B_TRANSITIONS[input.state];
  if (
    edges.timeout_10m !== undefined &&
    silentMs >= PROJECT_B2B_SILENCE_BLOCK_MS
  ) {
    return "timeout_10m";
  }
  if (
    edges.timeout_5m !== undefined &&
    silentMs >= PROJECT_B2B_SILENCE_NOTIFY_MS
  ) {
    return "timeout_5m";
  }
  return null;
};
