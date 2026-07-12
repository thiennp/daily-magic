export function isWsTestSendDisabled(input: {
  readonly connectionStatus: string;
  readonly isWorkflowTask: boolean;
  readonly workflowValidationErrors: readonly string[];
  readonly prompt: string;
  readonly selectedGroupId: string;
  readonly selectedTargetUserId: string;
  readonly isTeamDispatch: boolean;
  readonly selectedCapabilityId: string;
}): boolean {
  return (
    input.connectionStatus !== "connected" ||
    (input.isWorkflowTask
      ? input.workflowValidationErrors.length > 0
      : input.prompt.trim().length === 0) ||
    (input.selectedGroupId.length > 0 &&
      input.selectedTargetUserId.length === 0) ||
    (input.isTeamDispatch && input.selectedCapabilityId.length === 0)
  );
}
