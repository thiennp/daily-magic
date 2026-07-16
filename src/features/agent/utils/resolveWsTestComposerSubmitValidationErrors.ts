export const resolveWsTestComposerSubmitValidationErrors = (input: {
  readonly isWorkflowTask: boolean;
  readonly workflowValidationErrors: readonly string[];
  readonly resolvedPrompt: string;
}): readonly string[] => {
  if (input.isWorkflowTask) {
    return input.workflowValidationErrors;
  }

  if (input.resolvedPrompt.trim().length === 0) {
    return ["Task instructions are required."];
  }

  return [];
};
