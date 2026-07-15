import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  getUserOnboardingAutomationCreated,
  markUserOnboardingAutomationCreated,
} from "@/lib/onboarding/onboardingAutomationCreatedQueries";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

describe("onboardingAutomationCreatedQueries", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("reads onboarding_automation_created from users", async () => {
    sqlMock.mockResolvedValue([{ onboarding_automation_created: true }]);

    await expect(getUserOnboardingAutomationCreated("user-1")).resolves.toBe(
      true,
    );
  });

  it("returns false when flag is missing or false", async () => {
    sqlMock.mockResolvedValue([{ onboarding_automation_created: false }]);

    await expect(getUserOnboardingAutomationCreated("user-1")).resolves.toBe(
      false,
    );
  });

  it("marks onboarding_automation_created true", async () => {
    sqlMock.mockResolvedValue([]);

    await markUserOnboardingAutomationCreated("user-1");

    expect(sqlMock).toHaveBeenCalledTimes(1);
  });
});
