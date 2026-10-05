const MESSAGE_ID =
  /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

/**
 * Existing bot reply convention (PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE):
 * "processing <messageId>", "status <messageId>: …", "<messageId>: <result>".
 * refs cannot carry the id, so the first message id in the summary is the
 * parent. text is the summary without that id (for the chat bubble).
 */
export const readProjectMessengerInReplyTo = (
  summary: string,
): { readonly inReplyTo: string | null; readonly text: string } => {
  const match = MESSAGE_ID.exec(summary);
  if (match === null) {
    return { inReplyTo: null, text: summary };
  }
  const stripped = summary
    .replace(new RegExp(`${match[0]}\\s*:?`), " ")
    .replace(/\s+/g, " ")
    .trim();
  return {
    inReplyTo: match[0].toLowerCase(),
    text: stripped.length > 0 ? stripped : summary,
  };
};
