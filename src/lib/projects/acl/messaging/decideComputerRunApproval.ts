import {
  DispatchPolicy,
  type DispatchPolicyValue,
} from "@/lib/dispatch/DispatchPolicy.constant";
import { shouldRequireDispatchApproval } from "@/lib/dispatch/shouldRequireDispatchApproval";

export type ComputerRunApprovalDecision = {
  readonly dispatchPolicy: DispatchPolicyValue;
  readonly requiresApproval: boolean;
};

/**
 * S0-1 / S0-2 (pure). Who may start a run on a project computer without the
 * owner's approval:
 * - the computer's owner (requester === executor) → runs;
 * - anyone else (human member or bot, including a bot claimed by the same
 *   human: it has its own user id) → the executor's dispatch policy
 *   (resolveDispatchPolicyForExecutor, default APPROVAL) via
 *   shouldRequireDispatchApproval → pending approval (15 min TTL);
 * - the per-project "Allow runs without approval" (owner-only, default OFF)
 *   turns the policy OPEN for this project only: it skips the card, never
 *   the sandbox or limits (those are enforced by AgentWitch Local).
 */
export const decideComputerRunApproval = (input: {
  readonly requesterUserId: string;
  readonly executorUserId: string;
  readonly executorDispatchPolicy: DispatchPolicyValue;
  readonly projectAllowsRunsWithoutApproval: boolean;
}): ComputerRunApprovalDecision => {
  const dispatchPolicy = input.projectAllowsRunsWithoutApproval
    ? DispatchPolicy.OPEN
    : input.executorDispatchPolicy;
  return {
    dispatchPolicy,
    requiresApproval: shouldRequireDispatchApproval({
      requesterUserId: input.requesterUserId,
      executorUserId: input.executorUserId,
      dispatchPolicy,
    }),
  };
};
