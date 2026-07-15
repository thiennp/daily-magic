import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  fetchOnboardingAutomationCreated,
  persistOnboardingAutomationCreated,
} from "@/features/home/utils/onboardingAutomationCreatedApi";

describe("onboardingAutomationCreatedApi", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns true when GET reports automationCreated", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true, automationCreated: true }),
      }),
    );

    await expect(fetchOnboardingAutomationCreated()).resolves.toBe(true);
  });

  it("POSTs to automation-created endpoint", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    await persistOnboardingAutomationCreated();

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/onboarding/automation-created",
      {
        method: "POST",
      },
    );
  });
});
