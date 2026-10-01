/** In-product help for multi-bot project cowork (ACL-only cloud). */
export const AWC_PROJECT_COWORK_HELP_COPY = {
  short:
    "Invite bots via Project Access. Cloud keeps name, folder refs, members, and audit only — co-work is local/git/bot OOB. Owner Approves and Revokes anytime. No token sharing. Activity API lists allowlisted membership/status events only (not cloud content); fuller UI may bind later.",
  listHint:
    "Open a project → Project Access to approve members. Content stays on Macs; AWC is the ACL registry. Membership/status activity is available via list_project_activity / GET …/activity (not a content bus).",
} as const;
