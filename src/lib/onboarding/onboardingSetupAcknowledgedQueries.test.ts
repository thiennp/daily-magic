import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  getUserOnboardingSetupAcknowledged,
  markUserOnboardingSetupAcknowledged,
} from "@/lib/onboarding/onboardingSetupAcknowledgedQueries";

const sqlMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: <T>(value: T): T => value,
}));

describe("onboardingSetupAcknowledgedQueries", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("reads onboarding_setup_acknowledged from users", async () => {
    sqlMock.mockResolvedValue([{ onboarding_setup_acknowledged: true }]);

    await expect(getUserOnboardingSetupAcknowledged("user-1")).resolves.toBe(
      true,
    );
  });

  it("marks onboarding_setup_acknowledged true", async () => {
    sqlMock.mockResolvedValue([]);

    await markUserOnboardingSetupAcknowledged("user-1");

    expect(sqlMock).toHaveBeenCalledTimes(1);
  });
});
