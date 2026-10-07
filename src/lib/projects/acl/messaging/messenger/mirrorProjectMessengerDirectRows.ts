import { PROJECT_MESSENGER_WHOLE_THREAD_KEY } from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";
import type { ProjectMessengerKeyedRow } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";

/** Owner/member → one assistant (its own thread), not a notice or peer row. */
const isDirectHumanSend = (keyed: ProjectMessengerKeyedRow): boolean =>
  keyed.threadKey !== PROJECT_MESSENGER_WHOLE_THREAD_KEY &&
  keyed.notice !== true &&
  keyed.peer === undefined &&
  (keyed.row.senderKind === "owner" || keyed.row.senderKind === "member") &&
  keyed.row.toMembershipId === keyed.threadKey;

/**
 * Kept-recipient sends in the Whole project feed: a human message to one
 * assistant stays in that assistant's thread and is ALSO placed in Whole
 * project with `to` (seat id + name) so the feed can say "To {name}". Its
 * state chips are the same (same message id). Order is kept. Thread GET only
 * (thread list, unread and previews are unchanged). Run after notice
 * placement so notices still follow the assistant thread.
 */
export const mirrorProjectMessengerDirectRows = (
  keyed: readonly ProjectMessengerKeyedRow[],
): readonly ProjectMessengerKeyedRow[] =>
  keyed.flatMap((row) =>
    isDirectHumanSend(row)
      ? [
          row,
          {
            ...row,
            threadKey: PROJECT_MESSENGER_WHOLE_THREAD_KEY,
            to: [
              {
                membershipId: row.threadKey,
                displayName: row.row.toDisplayName ?? null,
              },
            ],
          },
        ]
      : [row],
  );
