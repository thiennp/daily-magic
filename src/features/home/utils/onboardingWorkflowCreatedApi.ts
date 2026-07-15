const ONBOARDING_WORKFLOW_CREATED_API_PATH = "/api/onboarding/workflow-created";

export const fetchOnboardingWorkflowCreated = async (): Promise<boolean> => {
  try {
    const response = await fetch(ONBOARDING_WORKFLOW_CREATED_API_PATH);

    if (!response.ok) {
      return false;
    }

    const data: unknown = await response.json();

    return (
      typeof data === "object" &&
      data !== null &&
      "workflowCreated" in data &&
      (data as { workflowCreated: unknown }).workflowCreated === true
    );
  } catch {
    return false;
  }
};
