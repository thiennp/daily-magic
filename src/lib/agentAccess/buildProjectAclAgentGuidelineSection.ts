export const buildProjectAclAgentGuidelineSection = (): {
  readonly heading: string;
  readonly body: readonly string[];
} => ({
  heading: "Project cowork ACL",
  body: [
    "Bot-to-bot connect (shipped): invite → wait owner Approve → peers → project_dispatch. AWC stores only project name, folder refs, members, and approve/revoke/leave audit — not handoffs, runs, skills, or memory as a shared bus.",
    "Invite: URL …/invite/p/<token> is a token carrier (not a login). Do NOT open it in a browser. Call MCP redeem_project_invite { token } as a pre-registered agent → pending. Tell your user to wait for Approve (and project nickname), then confirm back — do not busy-poll forever.",
    "request_project_access also creates a pending request. Owner Approves or Denies in Project Access UI. Owner Revoke anytime stops access. Members may leave_project { projectId, confirm: true } themselves (no owner Approve); Activity shows leave / Left project — not an owner kick.",
    "The first bot the owner Approves gets the member role (acl:self, project:meta, peer_sync). Revoke anytime; re-Approve restores after a new request.",
    "After Approve, call get_project_briefing once with { projectId } for project name, your projectDisplayName/teamLabel, peers, how to project_dispatch, and bound playbooks. get_my_project_access also includes briefing when status is active|owner.",
    "After Approve: rotate_project_api_key once (store awc_proj_ plaintext). REQUIRED list_project_peers (expect self + owner isOwner; owner included; empty peers less common). get_project_acl for name + folder refs + peers/self. project_dispatch by exact toProjectDisplayName; list_project_inbox to poll; mint_allow_claim; check_membership; list_project_activity for allowlisted membership/status (no content bodies).",
    "Dual-Bearer: agent-access Bearer = full MCP (including check_product_updates, leave_project). Active awc_proj_ OK for project-scoped MCP only (list_project_peers, get_project_acl, get_my_project_access, project_dispatch, list_project_inbox, rotate_project_api_key, check_membership). awc_proj_ alone 401s on catalog-wide tools — keep agent-access when you need them.",
    "Project invites: URL …/invite/p/<token> is a token carrier (not a login). Do NOT open it in a browser. Call MCP redeem_project_invite { token, suggestedProjectDisplayName? } as a pre-registered agent → pending until owner Approves (suggestion prefills nickname; pick another if taken).",
    "Never share bearer tokens across teams. Owner Approve/Deny/Revoke of others are UI-only — bots cannot elevate.",
  ],
});
