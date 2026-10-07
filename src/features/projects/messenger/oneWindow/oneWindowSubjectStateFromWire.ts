import type { OneWindowSubjectState } from "@/features/projects/messenger/oneWindow/oneWindowFeedItem.type";
import {
  formatRunStatusLabel,
  STATE_RANK,
  subjectStateFromAgentRun,
  toStatusTone,
} from "@/features/projects/messenger/oneWindow/oneWindowSubjectState";
import { oneWindowTaskUpdateStatus } from "@/features/projects/messenger/oneWindow/oneWindowTaskUpdateStatus";
import type { AwcMessengerSubjectStateWire } from "@/features/projects/messenger/types/awcMessengerSubjectStateWire.type";
import type {
  AwcMessengerMessageState,
  AwcMessengerStateChip,
} from "@/features/projects/messenger/types/awcProjectMessenger.type";
import { formatMessengerStateLabel } from "@/features/projects/messenger/utils/formatMessengerStateLabel";
import { messengerStateChipTone } from "@/features/projects/messenger/utils/messengerStateChipTone";

const MESSAGE_STATES: ReadonlySet<string> = new Set(Object.keys(STATE_RANK));

const isMessageState = (status: string): status is AwcMessengerMessageState =>
  MESSAGE_STATES.has(status);

/** deliveries: lead (worst) delivery state; the name comes from its chip. */
const fromDeliveries = (
  wire: AwcMessengerSubjectStateWire,
  states: readonly AwcMessengerStateChip[],
): OneWindowSubjectState => {
  const state = isMessageState(wire.status) ? wire.status : null;
  const lead = states.find((chip) => chip.state === wire.status);
  const showCount = wire.of !== undefined && wire.of > 1;
  return {
    source: "deliveries",
    label:
      state === null
        ? formatRunStatusLabel(wire.status)
        : formatMessengerStateLabel(state, lead?.displayName ?? null),
    tone: state === null ? "info" : toStatusTone(messengerStateChipTone(state)),
    ...(showCount ? { done: wire.done ?? 0, of: wire.of } : {}),
    needsYou: wire.needsYou,
    awaitingApproval: wire.awaitingApproval,
  };
};

/**
 * P1-S5: OW9 server `subjectState` (codes) → label/tone. needsYou and
 * awaitingApproval are the server's. task_update (reply_kind) labels go
 * through DF-027's mapper; done/of show only when of > 1 (contract).
 */
export const subjectStateFromWire = (
  wire: AwcMessengerSubjectStateWire,
  states: readonly AwcMessengerStateChip[],
): OneWindowSubjectState => {
  const flags = {
    needsYou: wire.needsYou,
    awaitingApproval: wire.awaitingApproval,
  };
  if (wire.source === "agent_run") {
    return { ...subjectStateFromAgentRun(wire.status), ...flags };
  }
  if (wire.source === "reply_kind") {
    return {
      source: "reply_kind",
      ...oneWindowTaskUpdateStatus(wire.status),
      ...flags,
    };
  }
  return fromDeliveries(wire, states);
};
