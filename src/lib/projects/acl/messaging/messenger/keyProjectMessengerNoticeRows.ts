import { PROJECT_MESSENGER_WHOLE_THREAD_KEY } from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";
import type {
  ProjectMessengerKeyedRow,
  ProjectMessengerRow,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";
import { readProjectMessengerInReplyTo } from "@/lib/projects/acl/messaging/messenger/readProjectMessengerInReplyTo";

/**
 * A notice row keyed for the thread GET. Text is the stored summary as is
 * (meta, ≤200 chars); the first message id in it is the parent. Placed in
 * Whole project until placeProjectMessengerNoticeRows moves it.
 */
export const keyProjectMessengerNoticeRow = (
  row: ProjectMessengerRow,
): ProjectMessengerKeyedRow => ({
  threadKey: PROJECT_MESSENGER_WHOLE_THREAD_KEY,
  row,
  inReplyTo: readProjectMessengerInReplyTo(row.summary).inReplyTo,
  text: row.summary,
  visible: true,
  notice: true,
});

/** A notice about a message (e.g. silence) goes to that message's thread. */
export const placeProjectMessengerNoticeRows = (
  keyed: readonly ProjectMessengerKeyedRow[],
): readonly ProjectMessengerKeyedRow[] => {
  const threadOf = new Map(
    keyed
      .filter((row) => row.notice !== true)
      .map((row) => [row.row.messageId.toLowerCase(), row.threadKey]),
  );
  return keyed.map((row) => {
    const parentThread =
      row.notice === true && row.inReplyTo !== null
        ? threadOf.get(row.inReplyTo)
        : undefined;
    return parentThread !== undefined
      ? { ...row, threadKey: parentThread }
      : row;
  });
};
