import { beforeEach, describe, expect, it, vi } from "vitest";

import { userHasCreatedWorkflowInDatabase } from "@/lib/onboarding/onboardingWorkflowCreatedQueries";

const sqlMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: <T>(value: T): T => value,
}));

describe("onboardingWorkflowCreatedQueries", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("returns true when user has a non-default capability", async () => {
    sqlMock.mockResolvedValue([{ workflow_created: true }]);

    await expect(userHasCreatedWorkflowInDatabase("user-1")).resolves.toBe(
      true,
    );
  });

  it("returns false when user only has seeded defaults", async () => {
    sqlMock.mockResolvedValue([{ workflow_created: false }]);

    await expect(userHasCreatedWorkflowInDatabase("user-1")).resolves.toBe(
      false,
    );
  });
});
