import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/onboarding/onboardingFirstTaskSentQueries", () => ({
  getUserOnboardingFirstTaskSent: vi.fn().mockResolvedValue(true),
}));
vi.mock("@/lib/onboarding/onboardingAutomationCreatedQueries", () => ({
  getUserOnboardingAutomationCreated: vi.fn().mockResolvedValue(false),
}));
vi.mock("@/lib/onboarding/onboardingMacPairedQueries", () => ({
  userHasPairedMacInDatabase: vi.fn().mockResolvedValue(true),
}));
vi.mock("@/lib/onboarding/onboardingWorkflowCreatedQueries", () => ({
  userHasCreatedWorkflowInDatabase: vi.fn().mockResolvedValue(true),
}));
vi.mock("@/lib/onboarding/onboardingSetupAcknowledgedQueries", () => ({
  getUserOnboardingSetupAcknowledged: vi.fn().mockResolvedValue(false),
}));

import { loadOnboardingBootstrapFlags } from "@/lib/onboarding/loadOnboardingBootstrapFlags";

describe("loadOnboardingBootstrapFlags", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("HOME-021: aggregates onboarding flags for one bootstrap response", async () => {
    await expect(loadOnboardingBootstrapFlags("user-1")).resolves.toEqual({
      firstTaskSent: true,
      automationCreated: false,
      macPaired: true,
      workflowCreated: true,
      setupAcknowledged: false,
    });
  });
});
