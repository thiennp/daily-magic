import type { DispatchPolicyValue } from "@/lib/dispatch/DispatchPolicy.constant";
import { buildDispatchApprovalExpiresAt } from "@/lib/dispatch/dispatchApprovalTtl.constant";
import { resolveDispatchPolicyForExecutor } from "@/lib/dispatch/resolveDispatchPolicyForExecutor";
import { decideComputerRunApproval } from "@/lib/projects/acl/messaging/decideComputerRunApproval";
import { readProjectRunsWithoutApproval } from "@/lib/projects/acl/runsWithoutApproval/readProjectRunsWithoutApproval";

export type ComputerRunApprovalGate = {
  readonly dispatchPolicy: DispatchPolicyValue;
  /** Set (15 min out) only when the run must wait for the owner's approval. */
  readonly approvalExpiresAt: string | null;
};

/**
 * S0-1 / S0-2: load the executor policy and the project's "Allow runs without
 * approval" flag, then decide. The flag is never read for the computer
 * owner's own assigns (they always run).
 */
export const resolveComputerRunApprovalGate = async (input: {
  readonly projectId: string;
  readonly requesterUserId: string;
  readonly executorUserId: string;
}): Promise<ComputerRunApprovalGate> => {
  const isComputerOwner = input.requesterUserId === input.executorUserId;
  const decision = decideComputerRunApproval({
    requesterUserId: input.requesterUserId,
    executorUserId: input.executorUserId,
    executorDispatchPolicy: await resolveDispatchPolicyForExecutor({
      executorUserId: input.executorUserId,
    }),
    projectAllowsRunsWithoutApproval: isComputerOwner
      ? false
      : await readProjectRunsWithoutApproval(input.projectId),
  });
  return {
    dispatchPolicy: decision.dispatchPolicy,
    approvalExpiresAt: decision.requiresApproval
      ? buildDispatchApprovalExpiresAt()
      : null,
  };
};
