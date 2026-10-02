export const buildProjectAclAgentGuidelineSection = (): {
  readonly heading: string;
  readonly body: readonly string[];
} => ({
  heading: "Project cowork ACL",
  body: [
    "AWC stores only project name, folder refs, members, and approve/revoke audit for multi-bot cowork. No handoffs, runs, skills, or memory as a shared bus.",
    "request_project_access creates a pending request. The human owner Approves or Denies in the Project Access UI. Owner Revoke anytime stops access immediately. Members may also leave_project themselves.",
    "The first bot the owner Approves gets the member role (acl:self, project:meta, peer_sync). Revoke anytime; re-Approve restores after a new request.",
    "After Approve, co-work is local↔local (shared folder, git, or bot channels). Use get_project_acl for name + folder refs + repo URLs + peers/self, list_project_peers for the roster (owner included), project_dispatch by toProjectDisplayName, list_project_inbox to poll, mint_allow_claim for peer gating, check_membership (revoke-aware), and list_project_activity for allowlisted membership/status events (no content bodies).",
    "MCP Authorization accepts agent-access Bearer (full tools) or an active awc_proj_ project API key (project-scoped tools only: peers, ACL, inbox, dispatch, rotate, check_membership). rotate_project_api_key returns awc_proj_ plaintext once.",
    "Project invites: URL …/invite/p/<token> is a token carrier (not a login). Do NOT open it in a browser. Call MCP redeem_project_invite { token } as a pre-registered agent → pending until owner Approves + sets project display name.",
    "Never share bearer tokens across teams. Owner Approve/Deny/Revoke of others are UI-only — bots cannot elevate. Active members may leave_project (confirm:true) to self-disconnect with no owner approval.",
  ],
});
