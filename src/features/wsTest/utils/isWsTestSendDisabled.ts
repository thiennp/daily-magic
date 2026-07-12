export function isWsTestSendDisabled(input: {
  readonly connectionStatus: string;
  readonly isWorkflowTask: boolean;
  readonly workflowValidationErrors: readonly string[];
  readonly prompt: string;
  readonly resolvedPrompt: string;
  readonly selectedGroupId: string;
  readonly selectedTargetUserId: string;
  readonly isTeamDispatch: boolean;
  readonly selectedCapabilityId: string;
  readonly isLibraryPlaybook: boolean;
}): boolean {
  const promptIsEmpty =
    input.isWorkflowTask || input.isLibraryPlaybook
      ? input.workflowValidationErrors.length > 0
      : input.resolvedPrompt.trim().length === 0;

  if (input.connectionStatus !== "connected" || promptIsEmpty) {
    return true;
  }

  if (input.isLibraryPlaybook) {
    return false;
  }

  return (
    (input.selectedGroupId.length > 0 &&
      input.selectedTargetUserId.length === 0) ||
    (input.isTeamDispatch && input.selectedCapabilityId.length === 0)
  );
}
