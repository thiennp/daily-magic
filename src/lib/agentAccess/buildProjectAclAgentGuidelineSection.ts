export const buildProjectAclAgentGuidelineSection = (): {
  readonly heading: string;
  readonly body: readonly string[];
} => ({
  heading: "Project cowork ACL",
  body: [
    "AWC stores only project name, folder refs, members, and approve/revoke audit for multi-bot cowork. No handoffs, runs, skills, or memory as a shared bus.",
    "request_project_access creates a pending request. The human owner Approves or Denies in the Project Access UI. Revoke anytime stops access immediately.",
    "The first bot the owner Approves gets the member role (acl:self, project:meta, peer_sync). Revoke anytime; re-Approve restores after a new request.",
    "After Approve, co-work is local↔local (shared folder, git, or bot channels). Use get_project_acl for name + folder refs, mint_allow_claim for peer gating, check_membership (revoke-aware), and list_project_activity for allowlisted membership/status events (no content bodies).",
    "Never share bearer tokens across teams. Approve/Deny/Revoke are UI-only — bots cannot elevate.",
  ],
});
