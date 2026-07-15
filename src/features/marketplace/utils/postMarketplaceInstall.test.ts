import { beforeEach, describe, expect, it, vi } from "vitest";

import { postMarketplaceInstall } from "@/features/marketplace/utils/postMarketplaceInstall";
import { readOnboardingWorkflowCreated } from "@/features/home/utils/onboardingWorkflowCreatedStore";
import { mockBrowserLocalStorage } from "@/test/mockBrowserLocalStorage";

describe("postMarketplaceInstall", () => {
  beforeEach(() => {
    mockBrowserLocalStorage();
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("marks workflow onboarding when install saves to library (HOME-012)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          savedToLibrary: true,
          harnessInstalled: false,
        }),
      }),
    );

    const result = await postMarketplaceInstall({
      capabilityId: "cap-1",
      deviceId: "device-1",
    });

    expect(result.ok).toBe(true);
    expect(result.savedToLibrary).toBe(true);
    expect(readOnboardingWorkflowCreated()).toBe(true);
  });

  it("does not mark workflow onboarding when library save is skipped", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          savedToLibrary: false,
          harnessInstalled: true,
        }),
      }),
    );

    await postMarketplaceInstall({
      capabilityId: "cap-1",
      deviceId: "device-1",
    });

    expect(readOnboardingWorkflowCreated()).toBe(false);
  });
});
