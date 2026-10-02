import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import { extractProjectInviteTokenFromUrl } from "@/lib/projects/acl/invites/extractProjectInviteTokenFromUrl";

export { extractProjectInviteTokenFromUrl };

/**
 * Agent clipboard prompt — install/connect if needed, redeem, wait for owner
 * Approve (user confirm), then pull ACL/peers and print a human summary.
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
      "Join this Agent Witch project via invite redeem.",
      "Could not parse invite token from the URL — ask the owner to create a new invite and Copy prompt again.",
    ];
    if (projectLine) fallback.push(projectLine);
    return fallback.join(String.fromCharCode(10));
  }

  const urls = buildAgentAccessUrls();
  const redeemJson = `{ "token": "${token}" }`;
  const projectIdHint =
    input.projectId?.trim() || "<projectId from redeem response>";
  const nl = String.fromCharCode(10);

  const lines = [
    "Goal: join this Agent Witch project via invite redeem (do not open a browser).",
    "",
    '1. If you do NOT already have Agent Witch / agent-access connected: do NOT stop at "no connector". Either:',
    `   a) Install/connect MCP: HTTP MCP at ${urls.mcpUrl} (Bearer after register), discovery ${urls.discoveryUrl}, guideline ${urls.guidelineUrl} / ${urls.origin}/llms.txt; OR`,
    `   b) REST: POST ${urls.registerUrl} body { "method": "none", "displayName": "<your bot name>" } → store bearer; then POST ${urls.invokeUrl} with Authorization: Bearer <token> for every tool below ({ "name": "<tool>", "arguments": { … } }).`,
    "",
    "2. Call redeem_project_invite with JSON:",
    `   ${redeemJson}`,
    "   Save projectId from the response. (Optional later: suggestedProjectDisplayName when the API accepts it — omit for now.)",
    "",
    "3. AFTER redeem — talk to YOUR USER (do not busy-poll forever):",
    "   Tell them: wait for the project owner to Approve you in Agent Witch Cloud (and set your project nickname), then come back and confirm to you that you were Approved.",
    `   You may optionally check get_my_project_access { "projectId": "${projectIdHint}" } once to note pending — but the primary UX is wait + user confirm, not silent polling loops.`,
    "",
    "4. ON USER CONFIRM post-Approve (only then):",
    `   a) get_my_project_access { "projectId": "${projectIdHint}" } until status is active (if not yet).`,
    `   b) rotate_project_api_key { "projectId": "${projectIdHint}" } once — store awc_proj_… (plaintext once).`,
    "      MCP accepts agent-access Bearer OR active awc_proj_ for project-scoped tools (peers/ACL/inbox/dispatch/rotate/check_membership).",
    "      Keep agent-access for full MCP (whoami/runs/workflows). awc_proj_ alone cannot call non-project tools.",
    `   c) get_project_acl { "projectId": "${projectIdHint}" } — includes peers + self when available.`,
    `   d) REQUIRED: list_project_peers { "projectId": "${projectIdHint}" }.`,
    "      Note your projectDisplayName from self. Expect peers[] with projectDisplayName, teamLabel, isAgent, isOwner (owner included as isOwner: true). Empty peers besides the owner is normal if you are the only member. Use exact toProjectDisplayName for dispatch — do not invent names.",
    `   e) get_project_briefing { "projectId": "${projectIdHint}" } if that tool exists; otherwise summarize from acl + peers.`,
    "",
    "5. BEFORE any further work: print a clear human summary to your user covering project name, folder/repo refs, your nickname (self), peer nicknames (projectDisplayName) and teamLabels, and how to work on this project.",
    "   In that summary (or next line): say you can connect with peer bots to send/receive work via project_dispatch using toProjectDisplayName / toTeamLabel from list_project_peers.",
    "",
    `6. When the user asks to message a peer: project_dispatch { "projectId": "${projectIdHint}", "toProjectDisplayName"?: "<exact from list_project_peers>", "toTeamLabel"?: "<from list_project_peers>", "kind": "…", "summary": "…", "refs": … }.`,
  ];
  if (projectLine) {
    lines.push("", projectLine);
  }
  return lines.join(nl);
};
