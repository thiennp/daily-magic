import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  getUserOnboardingFirstTaskSent,
  markUserOnboardingFirstTaskSent,
} from "@/lib/onboarding/onboardingFirstTaskSentQueries";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

describe("onboardingFirstTaskSentQueries", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("reads true when the column is true", async () => {
    sqlMock.mockResolvedValue([{ onboarding_first_task_sent: true }]);

    await expect(getUserOnboardingFirstTaskSent("user-1")).resolves.toBe(true);
  });

  it("reads false when missing or not true", async () => {
    sqlMock.mockResolvedValue([{ onboarding_first_task_sent: false }]);
    await expect(getUserOnboardingFirstTaskSent("user-1")).resolves.toBe(false);

    sqlMock.mockResolvedValue([]);
    await expect(getUserOnboardingFirstTaskSent("user-1")).resolves.toBe(false);
  });

  it("marks the column true for the user", async () => {
    sqlMock.mockResolvedValue([]);

    await markUserOnboardingFirstTaskSent("user-1");

    expect(sqlMock).toHaveBeenCalledTimes(1);
  });
});
