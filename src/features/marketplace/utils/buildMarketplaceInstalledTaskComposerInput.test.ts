import { describe, expect, it } from "vitest";

import { buildMarketplaceInstalledTaskComposerInput } from "@/features/marketplace/utils/buildMarketplaceInstalledTaskComposerInput";

describe("buildMarketplaceInstalledTaskComposerInput", () => {
  it("keeps the project chosen during install on Start a task (MARKETPLACE-008)", () => {
    expect(
      buildMarketplaceInstalledTaskComposerInput({
        libraryCapabilityId: "cap-1",
        exampleRequest: "Draft the proposal",
        deviceId: "device-1",
        projectId: "project-client",
      }),
    ).toEqual({
      libraryCapabilityId: "cap-1",
      prompt: "Draft the proposal",
      deviceId: "device-1",
      projectId: "project-client",
    });
  });
});
