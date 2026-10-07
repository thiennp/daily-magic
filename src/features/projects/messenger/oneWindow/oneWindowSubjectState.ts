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
import {
  isProjectMessengerRunAwaitingApproval,
  pickProjectMessengerLeadChip,
  PROJECT_MESSENGER_SUBJECT_STATE_RANK,
  projectMessengerSubjectStateFromDeliveries,
} from "@/lib/projects/acl/messaging/messenger/projectMessengerSubjectStateRules";

export const toStatusTone = (
  tone: ReturnType<typeof messengerStateChipTone>,
): OneWindowStatusTone => {
  if (tone === "ok") return "ok";
  if (tone === "warn" || tone === "err") return "warn";
  return "info";
};

/** Lower = shown first (attention before progress). Shared with the server (OW9 F1). */
export const STATE_RANK: Readonly<Record<AwcMessengerMessageState, number>> =
  PROJECT_MESSENGER_SUBJECT_STATE_RANK;

/** Live PD delivery chips → one task status (shared rules; done/of when > 1). */
export const subjectStateFromDeliveries = (
  states: readonly AwcMessengerStateChip[],
): OneWindowSubjectState | null => {
  const lead = pickProjectMessengerLeadChip(states);
  const codes = projectMessengerSubjectStateFromDeliveries(states);
  if (lead === null || codes === null) return null;
  return {
    source: "deliveries",
    label: formatMessengerStateLabel(lead.state, lead.displayName),
    tone: toStatusTone(messengerStateChipTone(lead.state)),
    ...(states.length > 1 ? { done: codes.done, of: codes.of } : {}),
    needsYou: codes.needsYou,
    awaitingApproval: false,
  };
};

export const formatRunStatusLabel = (status: string): string => {
  const trimmed = status.trim();
  return trimmed.length === 0 ? "Unknown" : trimmed.replaceAll("_", " ");
};

/** Live AR status on a session row → subject state (shared approval rule). */
export const subjectStateFromAgentRun = (
  status: string,
): OneWindowSubjectState => {
  const awaitingApproval = isProjectMessengerRunAwaitingApproval(status);
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
