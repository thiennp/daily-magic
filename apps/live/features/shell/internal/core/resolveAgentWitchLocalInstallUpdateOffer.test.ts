import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@agent-witch/install-self-update", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("@agent-witch/install-self-update")>();
  return {
    ...actual,
    readAgentWitchInstallVersion: vi.fn(() => ({
      bundleVersion: "89",
      appOrigin: "https://www.agentwitch.com",
      updatedAt: "2026-01-01T00:00:00.000Z",
    })),
    fetchAgentWitchRemoteInstallBundleVersion: vi.fn(),
  };
});

vi.mock("./resolveAgentWitchLocalCloudAppOrigin", () => ({
  resolveAgentWitchLocalCloudAppOrigin: vi.fn(
    () => "https://www.agentwitch.com",
  ),
}));

import { fetchAgentWitchRemoteInstallBundleVersion } from "@agent-witch/install-self-update";
import { resolveAgentWitchLocalLayout } from "@agent-witch/install-layout";
import { resolveAgentWitchLocalInstallUpdateOffer } from "./resolveAgentWitchLocalInstallUpdateOffer";

describe("resolveAgentWitchLocalInstallUpdateOffer", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("marks update available when remote bundle is newer", async () => {
    vi.mocked(fetchAgentWitchRemoteInstallBundleVersion).mockResolvedValue(
      "91",
    );

    const offer = await resolveAgentWitchLocalInstallUpdateOffer(
      resolveAgentWitchLocalLayout(),
    );

    expect(offer.updateAvailable).toBe(true);
    expect(offer.remoteBundleVersion).toBe("91");
    expect(offer.localBundleVersion).toBe("89");
  });
});
