import { buildProjectInviteJoinUrl } from "@/lib/projects/acl/invites/buildProjectInviteJoinUrl";

/**
 * Default Copy prompt (one line, same for every assistant). Points at the
 * public /join page; the full prompt stays available as a fallback.
 */
export const buildProjectInviteShortPrompt = (input: {
  readonly token: string;
  readonly projectName?: string | null;
}): string => {
  const name = (input.projectName ?? "").replace(/\s+/g, " ").trim();
  const project = name.length > 0 ? ` "${name}"` : "";
  return `Join my AgentWitch project${project}: read ${buildProjectInviteJoinUrl(input.token)} and follow it. Start with the terms, and tell me when you're waiting for my approval.`;
};
