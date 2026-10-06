import {
  AgentRunStatus,
  type AgentRunStatusValue,
} from "@/lib/dispatch/AgentRunStatus.constant";

/**
 * Approval card state machine (S0 reopenable approvals). Storage stays on
 * agent_runs.status; these names are the API / live-push face.
 * pending → approved | declined | timed_out. Terminal states reject further
 * transitions with 409.
 */
export const ComputerRunApprovalState = {
  PENDING: "pending",
  APPROVED: "approved",
  DECLINED: "declined",
  TIMED_OUT: "timed_out",
} as const;

export type ComputerRunApprovalStateValue =
  (typeof ComputerRunApprovalState)[keyof typeof ComputerRunApprovalState];

export const COMPUTER_RUN_APPROVAL_TERMINAL_STATES = [
  ComputerRunApprovalState.APPROVED,
  ComputerRunApprovalState.DECLINED,
  ComputerRunApprovalState.TIMED_OUT,
] as const;

export const isComputerRunApprovalTerminal = (
  state: ComputerRunApprovalStateValue,
): boolean =>
  (COMPUTER_RUN_APPROVAL_TERMINAL_STATES as readonly string[]).includes(state);

/** agent_runs.status ↔ approval API state. */
export const approvalStateFromAgentRunStatus = (
  status: AgentRunStatusValue,
): ComputerRunApprovalStateValue | null => {
  switch (status) {
    case AgentRunStatus.PENDING_APPROVAL:
      return ComputerRunApprovalState.PENDING;
    case AgentRunStatus.RUNNING:
    case AgentRunStatus.COMPLETED:
    case AgentRunStatus.FAILED:
      return ComputerRunApprovalState.APPROVED;
    case AgentRunStatus.DENIED:
      return ComputerRunApprovalState.DECLINED;
    case AgentRunStatus.EXPIRED:
      return ComputerRunApprovalState.TIMED_OUT;
    default:
      return null;
  }
};

export const agentRunStatusForApprovalTransition = (
  next: Exclude<
    ComputerRunApprovalStateValue,
    typeof ComputerRunApprovalState.PENDING
  >,
): AgentRunStatusValue => {
  if (next === ComputerRunApprovalState.APPROVED) {
    return AgentRunStatus.RUNNING;
  }
  if (next === ComputerRunApprovalState.DECLINED) {
    return AgentRunStatus.DENIED;
  }
  return AgentRunStatus.EXPIRED;
};
