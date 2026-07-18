import { describe, expect, it, vi } from "vitest";

import { fetchOnboardingBootstrap } from "@/features/home/utils/onboardingBootstrapApi";

describe("fetchOnboardingBootstrap", () => {
  it("HOME-021: loads all onboarding flags from one endpoint", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        ok: true,
        firstTaskSent: true,
        automationCreated: false,
        macPaired: true,
        workflowCreated: true,
        setupAcknowledged: false,
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(fetchOnboardingBootstrap()).resolves.toEqual({
      firstTaskSent: true,
      automationCreated: false,
      macPaired: true,
      workflowCreated: true,
      setupAcknowledged: false,
    });

    expect(fetchMock).toHaveBeenCalledWith("/api/onboarding/bootstrap");
  });
});
