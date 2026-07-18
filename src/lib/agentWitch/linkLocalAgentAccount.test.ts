import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("@/lib/agentWitch/fetchAgentWitchLinkSession", () => ({
  fetchAgentWitchLinkSession: vi.fn(),
}));

vi.mock("@/lib/agentWitch/waitForLinkedMacDevice", () => ({
  hasClaimedMacDevice: vi.fn(),
  waitForLinkedMacDevice: vi.fn(),
}));

import { fetchAgentWitchLinkSession } from "@/lib/agentWitch/fetchAgentWitchLinkSession";
import { linkLocalAgentToSignedInAccount } from "@/lib/agentWitch/linkLocalAgentAccount";
import { hasClaimedMacDevice } from "@/lib/agentWitch/waitForLinkedMacDevice";

describe("linkLocalAgentToSignedInAccount", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("HOME-020: skips link-session when a Mac is already claimed", async () => {
    vi.mocked(hasClaimedMacDevice).mockResolvedValue(true);

    await expect(
      linkLocalAgentToSignedInAccount("https://www.agentwitch.com"),
    ).resolves.toEqual({ ok: true });

    expect(fetchAgentWitchLinkSession).not.toHaveBeenCalled();
  });
});
