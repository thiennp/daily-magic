import { readOnboardingFirstTaskSent } from "@/features/home/utils/onboardingFirstTaskSentStore";

const hasUserSentFirstTask = (
  apiRuns: readonly unknown[] | null | undefined,
  cachedRunCount: number,
): boolean =>
  readOnboardingFirstTaskSent() ||
  (Array.isArray(apiRuns) && apiRuns.length > 0) ||
  cachedRunCount > 0;

export default hasUserSentFirstTask;
