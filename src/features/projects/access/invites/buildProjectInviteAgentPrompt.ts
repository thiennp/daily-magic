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

/**
 * Agent/MCP clipboard prompt — instruct redeem_project_invite with token.
 * Do not tell the bot to open the web URL in a browser.
 */
export const buildProjectInviteAgentPrompt = (input: {
  readonly inviteUrl: string;
  readonly token?: string | null;
  readonly projectId?: string;
  readonly projectName?: string | null;
}): string => {
  const token =
    (input.token && input.token.trim().length > 0
      ? input.token.trim()
      : null) ?? extractProjectInviteTokenFromUrl(input.inviteUrl);

  const projectLine =
    input.projectName && input.projectName.trim().length > 0
      ? `Project: ${input.projectName.trim()}${input.projectId ? ` (${input.projectId})` : ""}`
      : input.projectId
        ? `Project id: ${input.projectId}`
        : null;

  if (!token) {
    const fallback = [
      "Join this Agent Witch project via invite.",
      "Could not parse invite token from the URL — ask the owner to create a new invite and Copy prompt again.",
    ];
    if (projectLine) fallback.push(projectLine);
    return fallback.join(String.fromCharCode(10));
  }

  const lines = [
    "Join this Agent Witch project via MCP invite redeem (do not open a browser).",
    "1. Call agent-access / AW MCP tool redeem_project_invite with JSON:",
    `   { "token": "${token}" }`,
    "2. Redeem creates a pending access request — you are not a member yet; no project-scoped key until the owner Approves and sets your project nickname.",
    "3. After Approve, if a project-scoped key is shown once, store it securely and never share it.",
  ];
  if (projectLine) {
    lines.push(projectLine);
  }
  return lines.join(String.fromCharCode(10));
};
