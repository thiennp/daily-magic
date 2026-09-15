import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("./agentWitchInstallVersion", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("./agentWitchInstallVersion")>();
  return {
    ...actual,
    readAgentWitchInstallVersion: vi.fn(() => ({
      bundleVersion: "89",
      appOrigin: "https://www.agentwitch.com",
      updatedAt: "2026-01-01T00:00:00.000Z",
    })),
  };
});

vi.mock("./resolveAgentWitchLocalCloudAppOrigin", () => ({
  resolveAgentWitchLocalCloudAppOrigin: vi.fn(
    () => "https://www.agentwitch.com",
  ),
}));

vi.mock("./agentWitchSelfUpdate", () => ({
  fetchAgentWitchRemoteInstallBundleVersion: vi.fn(),
}));

import { fetchAgentWitchRemoteInstallBundleVersion } from "./agentWitchSelfUpdate";
import { resolveAgentWitchLocalInstallUpdateOffer } from "./resolveAgentWitchLocalInstallUpdateOffer";
import { resolveAgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";

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
