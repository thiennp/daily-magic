import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  fetchOnboardingSetupAcknowledged,
  persistOnboardingSetupAcknowledged,
} from "@/features/home/utils/onboardingSetupAcknowledgedApi";

describe("onboardingSetupAcknowledgedApi", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns true when GET reports setupAcknowledged", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true, setupAcknowledged: true }),
      }),
    );

    await expect(fetchOnboardingSetupAcknowledged()).resolves.toBe(true);
  });

  it("POSTs to setup-acknowledged endpoint", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    await persistOnboardingSetupAcknowledged();

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/onboarding/setup-acknowledged",
      {
        method: "POST",
      },
    );
  });
});
