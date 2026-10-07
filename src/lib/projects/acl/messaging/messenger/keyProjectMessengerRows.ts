import { isProjectMessengerWholeAddress } from "@/lib/projects/acl/messaging/messenger/isProjectMessengerWholeAddress";
import { isProjectMessengerBotToBotRow } from "@/lib/projects/acl/messaging/messenger/isProjectMessengerBotToBotRow";
import {
  PROJECT_MESSENGER_HIDDEN_KINDS,
  PROJECT_MESSENGER_STATE_ONLY_KINDS,
  PROJECT_MESSENGER_WHOLE_THREAD_KEY,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";
import { projectMessengerThreadKeyForRow } from "@/lib/projects/acl/messaging/messenger/projectMessengerThreadKeyForRow";
import type {
  ProjectMessengerKeyedRow,
  ProjectMessengerRow,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";
import { readProjectMessengerInReplyTo } from "@/lib/projects/acl/messaging/messenger/readProjectMessengerInReplyTo";

const isHumanSender = (row: ProjectMessengerRow): boolean =>
  row.senderKind === "owner" || row.senderKind === "member";

const peerKeyedRow = (
  row: ProjectMessengerRow,
  reply: { readonly inReplyTo: string | null; readonly text: string },
): ProjectMessengerKeyedRow => ({
  threadKey: PROJECT_MESSENGER_WHOLE_THREAD_KEY,
  row,
  inReplyTo: reply.inReplyTo,
  text: reply.text,
  // DF-023: every bot↔bot row is shown (state-only kinds as a compact line).
  visible: true,
  peer: {
    toMembershipId: row.toMembershipId,
    toDisplayName: row.toDisplayName ?? null,
    toTeamLabel: row.toTeamLabel,
  },
});

/**
 * Rows (oldest first) → rows placed in threads. Human text is kept verbatim;
 * bot text has its parent id read out. Lifecycle notices are dropped.
 * `includeBotToBot` (owner view only, DF-023): bot↔bot dispatch rows are
 * placed in Whole project with `peer` set instead of being dropped.
 */
export const keyProjectMessengerRows = (input: {
  readonly rows: readonly ProjectMessengerRow[];
  readonly botIds: ReadonlySet<string>;
  readonly includeBotToBot?: boolean;
}): readonly ProjectMessengerKeyedRow[] => {
  const wholeMessageIds = new Set(
    input.rows
      .filter(
        (row) => isHumanSender(row) && isProjectMessengerWholeAddress(row),
      )
      .map((row) => row.messageId),
  );
  return input.rows.flatMap((row) => {
    if (PROJECT_MESSENGER_HIDDEN_KINDS.includes(row.kind)) {
      return [];
    }
    const reply = isHumanSender(row)
      ? { inReplyTo: null, text: row.summary }
      : readProjectMessengerInReplyTo(row.summary);
    const threadKey = projectMessengerThreadKeyForRow({
      row,
      botIds: input.botIds,
      wholeMessageIds,
      inReplyTo: reply.inReplyTo,
    });
    if (threadKey === null) {
      return input.includeBotToBot === true &&
        isProjectMessengerBotToBotRow({ row, botIds: input.botIds })
        ? [peerKeyedRow(row, reply)]
        : [];
    }
    const visible =
      isHumanSender(row) ||
      !PROJECT_MESSENGER_STATE_ONLY_KINDS.includes(row.kind);
    return [
      { threadKey, row, inReplyTo: reply.inReplyTo, text: reply.text, visible },
    ];
  });
};
