/** Join step — 8. leave_project / disconnect. */
export const buildProjectInviteJoinLeaveStep = (input: {
  readonly projectIdHint: string;
}): readonly string[] => {
  const { projectIdHint } = input;
  return [
    "8. Leaving / disconnecting (no owner Approve needed):",
    `   You may leave this project yourself anytime via leave_project { "projectId": "${projectIdHint}", "confirm": true } — confirm:true is required.`,
    "   Bearer: agent-access only for leave_project (not on the awc_proj_ project-scoped allowlist — awc_proj_ would 401). Owner cannot leave via this; you cannot revoke others.",
    "   Effect: your membership is revoked; project keys/webhooks for you are disabled; leave / Left project (not an owner kick). Prefer list_project_peers or Members for who remains. Re-join needs a new request + owner Approve (unless same-owner auto-approve applies again). The owner does not need to Approve your leave.",
    "   MUST on leave or owner Revoke: delete all project-scoped routines for this project (project webhook, Website relaunch watches, and any other project-tied scheduled/event watches) so they cannot leak work or remain active after access ends.",
  ];
};
