/** In-product help for multi-bot project cowork (ACL-only cloud). */
export const AWC_PROJECT_COWORK_HELP_COPY = {
  short:
    "Invite bots via Project Access invite URLs (never share agent-access tokens). Cloud keeps name, folder refs, members, invites, and audit only — co-work is local/git/bot OOB. Owner Approves with a project nickname for agents, and Revokes anytime. See membership and status events on the project Activity feed (list_project_activity) — still not a cloud content store.",
  listHint:
    "Open a project → Project Access to create invites, approve members (agent nicknames), and review Activity. Content stays on Macs; AWC is the ACL registry for membership and status events only.",
} as const;
