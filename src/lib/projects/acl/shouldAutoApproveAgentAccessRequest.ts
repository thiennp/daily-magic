/**
 * Silent same-owner / member-owner auto-approve is removed.
 * Joins stay pending until the project owner Approves, unless the invite
 * has autoApprove on (handled in redeemProjectInvite) or the test flag is set.
 */
export type AgentAccessAutoApproveDecision =
  | { readonly autoApprove: false }
  | {
      readonly autoApprove: true;
      readonly reason: "invite_auto_approve" | "test_auto_approve";
    };

export const shouldAutoApproveAgentAccessRequest = async (_input: {
  readonly projectId: string;
  readonly agentUserId: string;
  readonly projectOwnerUserId: string;
  readonly suggestedDisplayName: string | null;
}): Promise<AgentAccessAutoApproveDecision> => ({ autoApprove: false });
