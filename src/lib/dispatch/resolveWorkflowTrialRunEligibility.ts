export const WorkflowTrialRunBlockReason = {
  SIGN_IN_REQUIRED: "sign_in_required",
  EXECUTOR_REQUIRED: "executor_required",
} as const;

export type WorkflowTrialRunBlockReasonValue =
  (typeof WorkflowTrialRunBlockReason)[keyof typeof WorkflowTrialRunBlockReason];

export type WorkflowTrialRunEligibility =
  | { readonly allowed: true }
  | {
      readonly allowed: false;
      readonly reason: WorkflowTrialRunBlockReasonValue;
    };

export const resolveWorkflowTrialRunEligibility = (input: {
  readonly isSignedIn: boolean;
  readonly hasDispatchReadyMac: boolean;
  readonly hasCursorCloudConnection: boolean;
}): WorkflowTrialRunEligibility => {
  if (!input.isSignedIn) {
    return {
      allowed: false,
      reason: WorkflowTrialRunBlockReason.SIGN_IN_REQUIRED,
    };
  }

  const hasExecutor =
    input.hasDispatchReadyMac || input.hasCursorCloudConnection;

  if (!hasExecutor) {
    return {
      allowed: false,
      reason: WorkflowTrialRunBlockReason.EXECUTOR_REQUIRED,
    };
  }

  return { allowed: true };
};
