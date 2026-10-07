import { buildProjectInviteShortPrompt } from "@/features/projects/access/invites/buildProjectInviteShortPrompt";
import { resolveProjectInviteJoinToken } from "@/features/projects/access/invites/resolveProjectInviteJoinToken";
import { fetchProjectInvitePromptApi } from "@/features/projects/access/utils/projectInviteApi";

export type PendingInviteCopyPromptResult =
  | { readonly ok: true; readonly prompt: string }
  | { readonly ok: false; readonly errorMessage: string | null };

/** 107: rebuild the short Copy prompt for a pending invite from the server. */
export const fetchPendingInviteCopyPrompt = async (input: {
  readonly projectId: string;
  readonly inviteId: string;
  readonly projectName: string | null;
}): Promise<PendingInviteCopyPromptResult> => {
  const result = await fetchProjectInvitePromptApi(
    input.projectId,
    input.inviteId,
  );
  if (!result.ok) {
    return { ok: false, errorMessage: result.errorMessage ?? null };
  }
  const token = resolveProjectInviteJoinToken({ inviteUrl: result.url });
  return token === null
    ? { ok: false, errorMessage: null }
    : {
        ok: true,
        prompt: buildProjectInviteShortPrompt({
          token,
          projectName: input.projectName,
        }),
      };
};
