import { beforeEach, describe, expect, it, vi } from "vitest";

import { userHasPairedMacInDatabase } from "@/lib/onboarding/onboardingMacPairedQueries";

const sqlMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: <T>(value: T): T => value,
}));

describe("onboardingMacPairedQueries", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("returns true when user has a non-revoked device", async () => {
    sqlMock.mockResolvedValue([{ mac_paired: true }]);

    await expect(userHasPairedMacInDatabase("user-1")).resolves.toBe(true);
  });

  it("returns false when user has no paired device", async () => {
    sqlMock.mockResolvedValue([{ mac_paired: false }]);

    await expect(userHasPairedMacInDatabase("user-1")).resolves.toBe(false);
  });
});
