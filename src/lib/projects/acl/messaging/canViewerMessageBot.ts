/**
 * Pure: may this person pick / message this assistant? A closed assistant is
 * reachable only by the person who invited it (their own assistants are
 * handled on the dispatch path, where the sender is a seat). Not even the
 * owner is exempt; an assistant with no recorded inviter is never closed.
 */
export const canViewerMessageBot = (
  bot: { readonly closed: boolean; readonly invitedByUserId: string | null },
  viewerUserId: string,
): boolean =>
  !bot.closed ||
  bot.invitedByUserId === null ||
  bot.invitedByUserId === viewerUserId;
