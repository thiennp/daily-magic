export interface OnboardingBootstrapFlags {
  readonly firstTaskSent: boolean;
  readonly automationCreated: boolean;
  readonly macPaired: boolean;
  readonly workflowCreated: boolean;
  readonly setupAcknowledged: boolean;
}

const ONBOARDING_BOOTSTRAP_API_PATH = "/api/onboarding/bootstrap";

const EMPTY_FLAGS: OnboardingBootstrapFlags = {
  firstTaskSent: false,
  automationCreated: false,
  macPaired: false,
  workflowCreated: false,
  setupAcknowledged: false,
};

const parseBooleanFlag = (value: unknown): boolean => value === true;

export const fetchOnboardingBootstrap =
  async (): Promise<OnboardingBootstrapFlags> => {
    try {
      const response = await fetch(ONBOARDING_BOOTSTRAP_API_PATH);

      if (!response.ok) {
        return EMPTY_FLAGS;
      }

      const data: unknown = await response.json();
      if (typeof data !== "object" || data === null) {
        return EMPTY_FLAGS;
      }

      const record = data as Record<string, unknown>;

      return {
        firstTaskSent: parseBooleanFlag(record.firstTaskSent),
        automationCreated: parseBooleanFlag(record.automationCreated),
        macPaired: parseBooleanFlag(record.macPaired),
        workflowCreated: parseBooleanFlag(record.workflowCreated),
        setupAcknowledged: parseBooleanFlag(record.setupAcknowledged),
      };
    } catch {
      return EMPTY_FLAGS;
    }
  };
