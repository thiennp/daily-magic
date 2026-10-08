export const validateCreateAutomationInput = (input: {
  readonly capabilityId: string;
  readonly name: string;
  readonly requiresProject: boolean;
  readonly selectedProjectId: string;
}): string | null => {
  if (input.capabilityId.length === 0) return "Choose a workflow.";
  if (input.name.trim().length === 0) return "Enter a name.";
  if (input.requiresProject && input.selectedProjectId.length === 0) {
    return "Choose a project folder.";
  }
  return null;
};
