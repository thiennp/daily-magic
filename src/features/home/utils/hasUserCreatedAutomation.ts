import { readOnboardingAutomationCreated } from "@/features/home/utils/onboardingAutomationCreatedStore";
import { hasScheduledAutomationFromResponse } from "@/features/home/utils/hasScheduledAutomationFromResponse";

const hasUserCreatedAutomation = (
  automationsPayload: unknown,
  dbAutomationCreated = false,
): boolean =>
  dbAutomationCreated ||
  readOnboardingAutomationCreated() ||
  hasScheduledAutomationFromResponse(automationsPayload);

export default hasUserCreatedAutomation;
