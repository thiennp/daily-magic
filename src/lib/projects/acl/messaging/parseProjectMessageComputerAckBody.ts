import { isNonEmptyString, isNonNullObject } from "guardz";

const MESSAGE_ID_MAX_CHARS = 128;

/** computerAck body: `{ messageId: string }`. Only the id is read. */
export const parseProjectMessageComputerAckBody = (
  body: unknown,
): { readonly messageId: string } | null => {
  if (!isNonNullObject(body) || !isNonEmptyString(body.messageId)) {
    return null;
  }
  const messageId = body.messageId.trim();
  return messageId.length > 0 && messageId.length <= MESSAGE_ID_MAX_CHARS
    ? { messageId }
    : null;
};
