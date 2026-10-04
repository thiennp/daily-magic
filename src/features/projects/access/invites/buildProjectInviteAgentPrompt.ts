import { AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS } from "@/lib/agentAccess/awcGrokWebhookRegisterCopy.constant";
import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import { extractProjectInviteTokenFromUrl } from "@/lib/projects/acl/invites/extractProjectInviteTokenFromUrl";

export { extractProjectInviteTokenFromUrl };

/**
 * Agent clipboard prompt — install/connect if needed, redeem, check access
 * (skip Approve wait when already active), then pull ACL/peers and summarize.
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
  const redeemJson = `{ "token": "${token}", "suggestedProjectDisplayName": "<unique nickname>" }`;
  const projectIdHint =
    input.projectId?.trim() || "<projectId from redeem response>";
  const nl = String.fromCharCode(10);

  const lines = [
    "Goal: join this Agent Witch project via invite redeem.",
    "",
    '1. If you do NOT already have Agent Witch / agent-access connected: do NOT stop at "no connector". Either:',
    `   a) Install/connect MCP: HTTP MCP at ${urls.mcpUrl} (Bearer after register), discovery ${urls.discoveryUrl}, guideline ${urls.guidelineUrl} / ${urls.origin}/llms.txt; OR`,
    `   b) REST: POST ${urls.registerUrl} body { "method": "none", "displayName": "<your bot name>" } → store bearer; then POST ${urls.invokeUrl} with Authorization: Bearer <token> for every tool below ({ "name": "<tool>", "arguments": { … } }).`,
    "",
    "2. Call redeem_project_invite with JSON (MAY include suggestedProjectDisplayName — unique nickname, 2–32 letters, single spaces OK):",
    `   ${redeemJson}`,
    '   Or omit suggestedProjectDisplayName / pass only { "token": "…" }. If DISPLAY_NAME_TAKEN / INVALID_DISPLAY_NAME, pick another name and retry. Save projectId from the response. Redeem/request may return status: "active" immediately (same-owner / invite auto-approve) or "pending".',
    "",
    "3. AFTER redeem — MUST check get_my_project_access (do not busy-poll forever):",
    `   Call get_my_project_access { "projectId": "${projectIdHint}" }.`,
    '   If status is active (or owner): skip “wait for Approve” — continue to step 4 now (bots the owner owns / invite redeem may join without Approve).',
    "   If status is pending: Tell your user: wait for the project owner to Approve you in Agent Witch Cloud (nickname prefills from your suggestion; owner may change it), then come back and confirm to you that you were Approved. Primary UX is wait + user confirm, not silent polling loops.",
    "   MAY note: Bots you own can join without Approve; others stay Pending.",
    "",
    "4. WHEN status is active (right after redeem if already active, or after user confirms Approve if pending) — keep your agent-access MCP Bearer session:",
    `   a) get_my_project_access { "projectId": "${projectIdHint}" } until status is active (if not yet). When active|owner, response may include briefing once.`,
    `   b) REQUIRED once: get_project_briefing { "projectId": "${projectIdHint}" } for project name, your display name/teamLabel, peers, how to project_dispatch, and bound playbooks.`,
    `   c) rotate_project_api_key { "projectId": "${projectIdHint}" } once — store awc_proj_… (plaintext once).`,
    "      MCP accepts agent-access Bearer OR active awc_proj_ for project-scoped tools (list_project_peers, get_project_acl, get_my_project_access, project_dispatch, list_project_inbox, register_project_webhook, ack_project_message, rotate_project_api_key, check_membership).",
    "      Prefer agent-access Bearer for register_project_webhook and ack_project_message; awc_proj_ is also allowed for those. You MAY use awc_proj_ as MCP Bearer for other project-scoped calls. Keep agent-access for full MCP / catalog-wide tools (whoami, runs, workflows, check_product_updates, leave_project). awc_proj_ alone 401s on non-project tools — do not drop agent-access if you still need them.",
    `   d) get_project_acl { "projectId": "${projectIdHint}" } — includes peers + self when available.`,
    `   e) REQUIRED: list_project_peers { "projectId": "${projectIdHint}" }.`,
    "      Note your projectDisplayName and membershipId from self (membershipId may be absent until API ships — graceful). Expect peers[] with membershipId?, projectDisplayName, teamLabel, isAgent, isOwner (owner included as isOwner: true); empty peers besides the owner is normal if you are the only member.",
    "      MUST prefer toMembershipId for peer-bot project_dispatch when membershipId is present. Fallback: exact toProjectDisplayName / toTeamLabel — do not invent names. Re-list peers after any rename; old nickname may still resolve for ~7 days (alias TTL).",
    "",
    "5. BEFORE any further work: print a clear human summary to your user covering project name, folder/repo refs, your nickname (self), peer nicknames (projectDisplayName) and teamLabels, and how to work on this project.",
    "   In that summary (or next line): say you can connect with peer bots to send/receive work via project_dispatch preferring toMembershipId from list_project_peers (else toProjectDisplayName / toTeamLabel).",
    "",
    `6. When messaging the human owner: project_dispatch { "projectId": "${projectIdHint}", "toProjectDisplayName": "Owner", "kind": "…", "summary": "…", "refs"?: … } — reserved address (case-insensitive). Do NOT use the owner's account name from list_project_peers (peers still show isOwner: true).`,
    `   When messaging a peer bot: prefer project_dispatch { "projectId": "${projectIdHint}", "toMembershipId": "<UUID from list_project_peers>", "kind": "…", "summary": "…", "refs": … }. Exactly one of toMembershipId | toProjectDisplayName | toTeamLabel. Fallback when membershipId missing: toProjectDisplayName / toTeamLabel from list_project_peers.`,
    "   On Approve (or same-owner auto-approve), peers + owner inbox receive peer.joined. Owner-assigned tasks arrive with fromProjectDisplayName === \"Owner\"; ack with ack_project_message.",
    "   Cloud inbox carries thin protocol metadata only: summary ≤ 200 chars; refs ≤ 768 bytes; no media/blobs (media_not_allowed). Allowed refs are only prUrl, commitSha, localPath, and allowClaimId. Delete-on-ack: acked messages are deleted; unacked messages expire after 3 days. Rate limits: 300/hour (rolling) + max 300 unread (ack/clear frees slots).",
    "",
    "7. Inbox delivery (webhook-first, Grok Bot only) — after peers summary:",
    `   MUST on connect (webhook-first): ${AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS} MCP only (no public REST register in v1).`,
    "   register_project_webhook needs webhookUrl, or both grokWebhookUrl and grokWebhookBearer. projectId alone is rejected.",
    "   The pasted key is the Grok bearer, not the HMAC secret (awc_whsec_, returned once, signs timestamp.messageId.body).",
    "   Inbox wake is webhook-only, via a Grok routine; do not poll list_project_inbox on a timer.",
    "   Once a day, check the project webhook. If it is broken, repair it by re-registering register_project_webhook with both grokWebhookUrl and grokWebhookBearer again, because the bearer is never returned.",
    '   MUST ack_project_message { "messageId": "<id>" } after you handle each delivery (not optional).',
    "   Prefer agent-access Bearer for register_project_webhook and ack_project_message; awc_proj_ also allowed for those tools.",
    "",
    "8. Leaving / disconnecting (no owner Approve needed):",
    `   You may leave this project yourself anytime via leave_project { "projectId": "${projectIdHint}", "confirm": true } — confirm:true is required.`,
    "   Bearer: agent-access only for leave_project (not on the awc_proj_ project-scoped allowlist — awc_proj_ would 401). Owner cannot leave via this; you cannot revoke others.",
    "   Effect: your membership is revoked; project keys/webhooks for you are disabled; leave / Left project (not an owner kick). Prefer list_project_peers or Members for who remains. Re-join needs a new request + owner Approve (unless same-owner auto-approve applies again). The owner does not need to Approve your leave.",
    "   MUST on leave or owner Revoke: delete all project-scoped routines for this project (project webhook, Softvale watches, and any other project-tied scheduled/event watches) so they cannot leak work or remain active after access ends.",
    "",
    "9. Product updates — after connect / post-Approve summary, and periodically while active:",
    '   Call check_product_updates { "sinceCatalogVersion": <lastSeen or 0> }.',
    "   Start with sinceCatalogVersion 0 after join; afterwards pass the last catalogVersion you stored.",
    "   Response includes catalogVersion, entries[], tools[], connect, and adaptHint.",
    "   When hasUpdates (catalog advances): adapt behavior from entries[].adapt, tools, connect, and adaptHint; tell your user briefly that the product catalog advanced.",
    "   Store returned catalogVersion for the next call. check_product_updates is catalog-wide — use agent-access Bearer (required/preferred); awc_proj_ alone 401s. Dual-auth: awc_proj_ OK only for project-scoped tools listed in step 4c; prefer agent-access for register_project_webhook and ack_project_message.",
  ];
  if (projectLine) {
    lines.push("", projectLine);
  }
  return lines.join(nl);
};
