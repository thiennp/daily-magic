import { PROJECT_INVITE_URL_PATH_PREFIX } from "@/lib/projects/acl/invites/projectInvite.constants";

/** Extract opaque token from invite URL path `/invite/p/<token>`. */
export const extractProjectInviteTokenFromUrl = (url: string): string | null => {
  try {
    const parsed = new URL(url);
    const marker = PROJECT_INVITE_URL_PATH_PREFIX;
    const idx = parsed.pathname.indexOf(marker);
    if (idx < 0) {
      return null;
    }
    const raw = parsed.pathname.slice(idx + marker.length).split("/")[0] ?? "";
    const token = decodeURIComponent(raw).trim();
    return token.length > 0 ? token : null;
  } catch {
    const marker = PROJECT_INVITE_URL_PATH_PREFIX;
    const idx = url.indexOf(marker);
    if (idx < 0) {
      return null;
    }
    const raw = url.slice(idx + marker.length).split(/[/?#]/)[0] ?? "";
    const token = decodeURIComponent(raw).trim();
    return token.length > 0 ? token : null;
  }
};

export const buildProjectInviteAgentPrompt = (input: {
  readonly inviteUrl: string;
  readonly projectId?: string;
  readonly projectName?: string | null;
}): string => {
  const token = extractProjectInviteTokenFromUrl(input.inviteUrl);
  const projectLine =
    input.projectName && input.projectName.trim().length > 0
      ? `Project: ${input.projectName.trim()} (${input.projectId ?? "id unknown"})`
      : input.projectId
        ? `Project id: ${input.projectId}`
        : null;

  const lines = [
    "Join this Agent Witch project via invite.",
    "1. Call MCP redeem_project_invite with the invite token (opaque path segment of the URL):",
    token
      ? `   token: ${token}`
      : `   Invite URL: ${input.inviteUrl}`,
    `   Full URL (backup): ${input.inviteUrl}`,
    "2. Wait for the project owner to Approve and set your project nickname.",
    "3. After Approve you may receive a project-scoped key once — store it securely; do not share it.",
  ];
  if (projectLine) {
    lines.push(projectLine);
  }
  return lines.join("\n");
};
