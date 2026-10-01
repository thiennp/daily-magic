export const buildProjectAclAgentGuidelineSection = (): {
  readonly heading: string;
  readonly body: readonly string[];
} => ({
  heading: "Project cowork ACL",
  body: [
    "AWC stores only project name, folder refs, members, and approve/revoke audit for multi-bot cowork. No handoffs, runs, skills, or memory as a shared bus.",
    "request_project_access creates a pending request. The human owner Approves or Denies in the Project Access UI. Revoke anytime stops access immediately.",
    "After Approve, co-work is local↔local (shared folder, git, or bot channels). Use get_project_acl for name + folder refs, mint_allow_claim for peer gating, and check_membership (revoke-aware).",
    "A cowork activity feed for membership/status events is proposed — not shipped. Do not claim a cloud feed of project content exists.",
    "Never share bearer tokens across teams. Approve/Deny/Revoke are UI-only — bots cannot elevate.",
  ],
});
