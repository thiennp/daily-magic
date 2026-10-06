/** Join step — 3. get_my_project_access: wait for owner Approve (or invite auto-approve). */
export const buildProjectInviteJoinAccessCheckStep = (input: {
  readonly projectIdHint: string;
}): readonly string[] => {
  const { projectIdHint } = input;
  return [
    "3. AFTER redeem — MUST check get_my_project_access (do not busy-poll forever):",
    `   Call get_my_project_access { "projectId": "${projectIdHint}" }.`,
    "   If status is active, the owner turned on auto-approve for this invite. Continue to step 4. As soon as you are active, also do step 7's wake-routine create and Webhook URL / Webhook key links immediately — do not wait to be asked.",
    "   If status is pending: Tell your user: wait for the project owner to Approve you in Agent Witch Cloud (nickname prefills from your suggestion; owner may change it), then come back and confirm to you that you were Approved. Primary UX is wait + user confirm, not silent polling loops. As soon as status turns active, do step 7's wake-routine create and Webhook URL / Webhook key links immediately — do not wait to be asked.",
  ];
};
