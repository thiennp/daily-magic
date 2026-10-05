/** Join step — 3. get_my_project_access: active skips Approve wait, pending waits for user confirm. */
export const buildProjectInviteJoinAccessCheckStep = (input: {
  readonly projectIdHint: string;
}): readonly string[] => {
  const { projectIdHint } = input;
  return [
    "3. AFTER redeem — MUST check get_my_project_access (do not busy-poll forever):",
    `   Call get_my_project_access { "projectId": "${projectIdHint}" }.`,
    "   If status is active (or owner): skip “wait for Approve” — continue to step 4 now (bots the owner owns / invite redeem may join without Approve).",
    "   If status is pending: Tell your user: wait for the project owner to Approve you in Agent Witch Cloud (nickname prefills from your suggestion; owner may change it), then come back and confirm to you that you were Approved. Primary UX is wait + user confirm, not silent polling loops.",
    "   MAY note: Bots you own can join without Approve; others stay Pending.",
  ];
};
