import { PROJECT_BOT_KNOWLEDGE_CARD_ON_JOIN_LINE } from "@/lib/agentAccess/projectBotKnowledgeCardReport.constant";

/** Join step — 4. when active: briefing, project key, ACL, peers. */
export const buildProjectInviteJoinBriefingPeersStep = (input: {
  readonly projectIdHint: string;
}): readonly string[] => {
  const { projectIdHint } = input;
  return [
    "4. WHEN status is active (right after redeem if already active, or after user confirms Approve if pending) — keep your agent-access MCP Bearer session:",
    `   a) get_my_project_access { "projectId": "${projectIdHint}" } until status is active (if not yet). When active|owner, response may include briefing once.`,
    `   b) REQUIRED once: get_project_briefing { "projectId": "${projectIdHint}" } for project name, your display name/teamLabel, peers, how to project_dispatch, and bound playbooks.`,
    `   c) rotate_project_api_key { "projectId": "${projectIdHint}" } once — store awc_proj_… (plaintext once).`,
    "      MCP accepts agent-access Bearer OR active awc_proj_ for project-scoped tools (list_project_peers, get_project_acl, get_my_project_access, project_dispatch, list_project_inbox, register_project_webhook, ack_project_message, rotate_project_api_key, check_membership).",
    "      Prefer agent-access Bearer for register_project_webhook and ack_project_message; awc_proj_ is also allowed for those. You MAY use awc_proj_ as MCP Bearer for other project-scoped calls. Keep agent-access for full MCP / catalog-wide tools (whoami, runs, workflows, check_product_updates, leave_project). awc_proj_ alone 401s on non-project tools — do not drop agent-access if you still need them.",
    `   d) get_project_acl { "projectId": "${projectIdHint}" } — includes peers + self when available.`,
    `   e) REQUIRED: list_project_peers { "projectId": "${projectIdHint}" }.`,
    "      Note your projectDisplayName and membershipId from self (membershipId may be absent until API ships — graceful). Expect peers[] with membershipId?, projectDisplayName, teamLabel, isAgent, isOwner (owner included as isOwner: true); empty peers besides the owner is normal if you are the only member.",
    "      MUST prefer toMembershipId for peer-bot project_dispatch when membershipId is present. Fallback: exact toProjectDisplayName — do not invent names. Re-list peers after any rename; old nickname may still resolve for ~7 days (alias TTL).",
    `   f) ${PROJECT_BOT_KNOWLEDGE_CARD_ON_JOIN_LINE}`,
  ];
};
