import { isProjectMessengerWholeAddress } from "@/lib/projects/acl/messaging/messenger/isProjectMessengerWholeAddress";
import {
  PROJECT_MESSENGER_HIDDEN_KINDS,
  PROJECT_MESSENGER_STATE_ONLY_KINDS,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";
import { projectMessengerThreadKeyForRow } from "@/lib/projects/acl/messaging/messenger/projectMessengerThreadKeyForRow";
import type {
  ProjectMessengerKeyedRow,
  ProjectMessengerRow,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";
import { readProjectMessengerInReplyTo } from "@/lib/projects/acl/messaging/messenger/readProjectMessengerInReplyTo";

const isHumanSender = (row: ProjectMessengerRow): boolean =>
  row.senderKind === "owner" || row.senderKind === "member";

/**
 * Rows (oldest first) → rows placed in threads. Human text is kept verbatim;
 * bot text has its parent id read out. Lifecycle notices are dropped.
 */
export const keyProjectMessengerRows = (input: {
  readonly rows: readonly ProjectMessengerRow[];
  readonly botIds: ReadonlySet<string>;
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
      return [];
    }
    const visible =
      isHumanSender(row) ||
      !PROJECT_MESSENGER_STATE_ONLY_KINDS.includes(row.kind);
    return [
      { threadKey, row, inReplyTo: reply.inReplyTo, text: reply.text, visible },
    ];
  });
};
