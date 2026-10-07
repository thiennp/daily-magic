import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";
import type {
  OneWindowStatusTone,
  OneWindowSubjectState,
} from "@/features/projects/messenger/oneWindow/oneWindowFeedItem.type";
import type {
  AwcMessengerMessageState,
  AwcMessengerStateChip,
} from "@/features/projects/messenger/types/awcProjectMessenger.type";
import { formatMessengerStateLabel } from "@/features/projects/messenger/utils/formatMessengerStateLabel";
import { messengerAiSessionStatusTone } from "@/features/projects/messenger/utils/messengerAiSessionStatusTone";
import { messengerStateChipTone } from "@/features/projects/messenger/utils/messengerStateChipTone";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import {
  PROJECT_MESSAGE_KIND_TASK_BLOCKED,
  PROJECT_MESSAGE_KIND_TASK_DONE,
} from "@/lib/projects/acl/messaging/projectMessage.constants";

const toStatusTone = (
  tone: ReturnType<typeof messengerStateChipTone>,
): OneWindowStatusTone => {
  if (tone === "ok") return "ok";
  if (tone === "warn" || tone === "err") return "warn";
  return "info";
};

/** Lower = shown first when recipients disagree (attention before progress). */
const STATE_RANK: Record<AwcMessengerMessageState, number> = {
  blocked: 0,
  no_answer: 1,
  waiting: 2,
  checks_on_demand: 3,
  working: 4,
  got_it: 5,
  received: 6,
  done: 7,
};

const NEEDS_YOU_STATES: ReadonlySet<AwcMessengerMessageState> = new Set([
  "blocked",
  "no_answer",
]);

/** Live PD delivery chips → one task status (worst first; done/of when > 1). */
export const subjectStateFromDeliveries = (
  states: readonly AwcMessengerStateChip[],
): OneWindowSubjectState | null => {
  if (states.length === 0) return null;
  const lead = [...states].sort(
    (a, b) => STATE_RANK[a.state] - STATE_RANK[b.state],
  )[0];
  const done = states.filter((chip) => chip.state === "done").length;
  return {
    source: "deliveries",
    label: formatMessengerStateLabel(lead.state, lead.displayName),
    tone: toStatusTone(messengerStateChipTone(lead.state)),
    ...(states.length > 1 ? { done, of: states.length } : {}),
    needsYou: NEEDS_YOU_STATES.has(lead.state),
    awaitingApproval: false,
  };
};

const formatRunStatusLabel = (status: string): string => {
  const trimmed = status.trim();
  return trimmed.length === 0 ? "Unknown" : trimmed.replaceAll("_", " ");
};

/** Live AR status on a session row → subject state. */
export const subjectStateFromAgentRun = (
  status: string,
): OneWindowSubjectState => {
  const awaitingApproval =
    status.trim().toLowerCase() === AgentRunStatus.PENDING_APPROVAL;
  return {
    source: "agent_run",
    label: formatRunStatusLabel(status),
    tone: awaitingApproval
      ? "warn"
      : toStatusTone(messengerAiSessionStatusTone(status)),
    needsYou: awaitingApproval,
    awaitingApproval,
  };
};

/** Bot reply kind → terminal status only (plain `task.status` stays unlabeled). */
export const subjectStateFromReplyKind = (
  kind: string,
): OneWindowSubjectState | null => {
  const copy = AWC_PROJECT_MESSENGER_COPY;
  if (kind === PROJECT_MESSAGE_KIND_TASK_DONE) {
    return {
      source: "reply_kind",
      label: copy.stateDone,
      tone: "ok",
      needsYou: false,
      awaitingApproval: false,
    };
  }
  if (kind === PROJECT_MESSAGE_KIND_TASK_BLOCKED) {
    return {
      source: "reply_kind",
      label: copy.stateBlocked,
      tone: "warn",
      needsYou: true,
      awaitingApproval: false,
    };
  }
  return null;
};
