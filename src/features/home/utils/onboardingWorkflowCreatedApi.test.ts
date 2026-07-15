import { beforeEach, describe, expect, it, vi } from "vitest";

import { fetchOnboardingWorkflowCreated } from "@/features/home/utils/onboardingWorkflowCreatedApi";

describe("onboardingWorkflowCreatedApi", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns true when GET reports workflowCreated", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true, workflowCreated: true }),
      }),
    );

    await expect(fetchOnboardingWorkflowCreated()).resolves.toBe(true);
  });

  it("returns false when GET fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
      }),
    );

    await expect(fetchOnboardingWorkflowCreated()).resolves.toBe(false);
  });
});
