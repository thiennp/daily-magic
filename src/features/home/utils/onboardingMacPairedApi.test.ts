import { beforeEach, describe, expect, it, vi } from "vitest";

import { fetchOnboardingMacPaired } from "@/features/home/utils/onboardingMacPairedApi";

describe("onboardingMacPairedApi", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns true when GET reports macPaired", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true, macPaired: true }),
      }),
    );

    await expect(fetchOnboardingMacPaired()).resolves.toBe(true);
  });

  it("returns false when GET fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
      }),
    );

    await expect(fetchOnboardingMacPaired()).resolves.toBe(false);
  });
});
