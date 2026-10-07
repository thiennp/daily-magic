import { buildProjectInviteShortPrompt } from "@/features/projects/access/invites/buildProjectInviteShortPrompt";
import type { CreatedInvitePrompt } from "@/features/projects/access/invites/createdInvitePrompts";
import { resolveProjectInviteJoinToken } from "@/features/projects/access/invites/resolveProjectInviteJoinToken";

/** Short Copy prompt for a pending invite row; null when no token can be resolved. */
export const buildCreatedInviteCopyPrompt = (input: {
  readonly prompt: CreatedInvitePrompt | undefined;
  readonly projectName: string | null;
}): string | null => {
  if (input.prompt === undefined) return null;
  const token = resolveProjectInviteJoinToken({
    inviteUrl: input.prompt.url,
    token: input.prompt.token,
  });
  return token === null
    ? null
    : buildProjectInviteShortPrompt({ token, projectName: input.projectName });
};
