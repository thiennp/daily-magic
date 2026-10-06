import {
  PROJECT_MESSAGE_KIND_TASK_BLOCKED,
  PROJECT_MESSAGE_KIND_TASK_DONE,
  PROJECT_MESSAGE_KIND_TASK_PROCESSING,
  PROJECT_MESSAGE_KIND_TASK_RECEIVED,
  PROJECT_MESSAGE_KIND_TASK_STATUS,
} from "@/lib/projects/acl/messaging/projectMessage.constants";
import type { ProjectMembershipDeliveryMode } from "@/lib/projects/acl/membershipDeliveryMode.constant";
import { isProjectMembershipPollDeliveryMode } from "@/lib/projects/acl/membershipDeliveryMode.constant";
import type { ProjectB2bState } from "@/lib/projects/acl/messaging/projectB2bStateMachine";
import type { ProjectMessengerMessageState } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";

/** Existing delivery b2b_state → UI state. No new states; one row per machine state. */
const BY_B2B_STATE: Readonly<
  Record<ProjectB2bState, ProjectMessengerMessageState>
> = {
  dispatched: "received",
  awaiting_first_activity: "waiting",
  silent_5m_notified: "waiting",
  processing: "working",
  status_reporting: "working",
  done: "done",
  blocked: "blocked",
  blocked_silent_10m: "no_answer",
  acked: "got_it",
};

/** The bot's latest reply kind linked to this message → UI state. */
const BY_REPLY_KIND: Readonly<Record<string, ProjectMessengerMessageState>> = {
  [PROJECT_MESSAGE_KIND_TASK_RECEIVED]: "got_it",
  [PROJECT_MESSAGE_KIND_TASK_PROCESSING]: "working",
  [PROJECT_MESSAGE_KIND_TASK_STATUS]: "working",
  [PROJECT_MESSAGE_KIND_TASK_DONE]: "done",
  [PROJECT_MESSAGE_KIND_TASK_BLOCKED]: "blocked",
};

const mapBase = (input: {
  readonly b2bState: string | null;
  readonly latestReplyKind: string | null;
  readonly needsReply: boolean;
}): ProjectMessengerMessageState => {
  const fromState =
    input.b2bState === null
      ? null
      : ((
          BY_B2B_STATE as Readonly<Record<string, ProjectMessengerMessageState>>
        )[input.b2bState] ?? null);
  if (fromState === "no_answer") {
    return fromState;
  }
  const fromReply =
    input.latestReplyKind === null
      ? null
      : (BY_REPLY_KIND[input.latestReplyKind] ?? null);
  if (fromState === "working" && fromReply === "got_it") {
    return "got_it";
  }
  if (fromState !== null && fromState !== "received") {
    return fromState;
  }
  return fromReply ?? (input.needsReply ? "waiting" : "received");
};

/**
 * One bot's state for one owner/member message.
 * Poll-mode (delivery_mode=poll): waiting / no_answer honesty → Checks on demand.
 */
export const mapProjectMessengerDeliveryState = (input: {
  readonly b2bState: string | null;
  readonly latestReplyKind: string | null;
  readonly needsReply: boolean;
  readonly deliveryMode?: ProjectMembershipDeliveryMode;
}): ProjectMessengerMessageState => {
  const state = mapBase(input);
  if (
    isProjectMembershipPollDeliveryMode(input.deliveryMode) &&
    (state === "waiting" || state === "no_answer")
  ) {
    return "checks_on_demand";
  }
  return state;
};
