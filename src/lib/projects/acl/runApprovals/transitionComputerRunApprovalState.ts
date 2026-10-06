import {
  ComputerRunApprovalState,
  isComputerRunApprovalTerminal,
  type ComputerRunApprovalStateValue,
} from "@/lib/projects/acl/runApprovals/computerRunApprovalState.constant";

export type ComputerRunApprovalTransition =
  | typeof ComputerRunApprovalState.APPROVED
  | typeof ComputerRunApprovalState.DECLINED
  | typeof ComputerRunApprovalState.TIMED_OUT;

export type TransitionComputerRunApprovalResult =
  | { readonly ok: true; readonly state: ComputerRunApprovalTransition }
  | {
      readonly ok: false;
      readonly code: "invalid_transition";
      readonly from: ComputerRunApprovalStateValue;
      readonly to: ComputerRunApprovalTransition;
    };

/** Pure: only pending may leave; every other from-state is 409. */
export const transitionComputerRunApprovalState = (input: {
  readonly from: ComputerRunApprovalStateValue;
  readonly to: ComputerRunApprovalTransition;
}): TransitionComputerRunApprovalResult => {
  if (input.from !== ComputerRunApprovalState.PENDING) {
    return {
      ok: false,
      code: "invalid_transition",
      from: input.from,
      to: input.to,
    };
  }
  if (isComputerRunApprovalTerminal(input.to) === false) {
    return {
      ok: false,
      code: "invalid_transition",
      from: input.from,
      to: input.to,
    };
  }
  return { ok: true, state: input.to };
};
