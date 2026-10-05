import { extractProjectInviteTokenFromUrl } from "@/lib/projects/acl/invites/extractProjectInviteTokenFromUrl";

/** Join step — token: explicit token wins, else parse it from the invite URL. */
export const resolveProjectInviteJoinToken = (input: {
  readonly inviteUrl: string;
  readonly token?: string | null;
}): string | null =>
  (input.token && input.token.trim().length > 0 ? input.token.trim() : null) ??
  extractProjectInviteTokenFromUrl(input.inviteUrl);
