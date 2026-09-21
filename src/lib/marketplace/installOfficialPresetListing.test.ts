import { beforeEach, describe, expect, it, vi } from "vitest";

import installOfficialPresetListing from "@/lib/marketplace/installOfficialPresetListing";

const mocks = vi.hoisted(() => ({
  findOwnerLibraryCapabilityIdForComponentSlug: vi.fn(),
  saveMarketplacePresetToLibrary: vi.fn(),
  pushHarnessInstallBundleToDevice: vi.fn(),
}));

vi.mock(
  "@/lib/capabilities/findOwnerLibraryCapabilityIdForComponentSlug",
  () => ({
    findOwnerLibraryCapabilityIdForComponentSlug:
      mocks.findOwnerLibraryCapabilityIdForComponentSlug,
  }),
);

vi.mock("@/lib/marketplace/saveMarketplacePresetToLibrary", () => ({
  saveMarketplacePresetToLibrary: mocks.saveMarketplacePresetToLibrary,
}));

vi.mock("@/lib/marketplace/pushHarnessInstallBundleToDevice", () => ({
  pushHarnessInstallBundleToDevice: mocks.pushHarnessInstallBundleToDevice,
}));

describe("installOfficialPresetListing", () => {
  beforeEach(() => {
    mocks.findOwnerLibraryCapabilityIdForComponentSlug.mockReset();
    mocks.saveMarketplacePresetToLibrary.mockReset();
    mocks.pushHarnessInstallBundleToDevice.mockReset();
    mocks.pushHarnessInstallBundleToDevice.mockResolvedValue({
      installed: true,
      queued: false,
      errorMessage: null,
    });
  });

  it("reuses an existing library capability and skips create (MARKETPLACE-004)", async () => {
    mocks.findOwnerLibraryCapabilityIdForComponentSlug.mockResolvedValue(
      "existing-cap",
    );

    const result = await installOfficialPresetListing(
      "user-1",
      "vibe-coding-app-feature",
      "device-1",
    );

    expect(result.ok).toBe(true);
    expect(result.libraryCapabilityId).toBe("existing-cap");
    expect(mocks.saveMarketplacePresetToLibrary).not.toHaveBeenCalled();
    expect(mocks.pushHarnessInstallBundleToDevice).toHaveBeenCalled();
  });

  it("returns a structured error when library save throws", async () => {
    mocks.findOwnerLibraryCapabilityIdForComponentSlug.mockResolvedValue(null);
    mocks.saveMarketplacePresetToLibrary.mockResolvedValue({
      ok: false,
      errorMessage:
        "Could not save this starter. If it is already in your Library, try Install again.",
    });

    const result = await installOfficialPresetListing(
      "user-1",
      "vibe-coding-app-feature",
      "device-1",
    );

    expect(result.ok).toBe(false);
    expect(result.errorMessage).toContain("Library");
    expect(mocks.pushHarnessInstallBundleToDevice).not.toHaveBeenCalled();
  });
});
