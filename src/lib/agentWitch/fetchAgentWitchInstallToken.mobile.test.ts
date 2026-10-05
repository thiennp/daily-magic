import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const detectMobileClient = vi.hoisted(() => vi.fn());

vi.mock("@/lib/mobile/detectMobileClient", () => ({
  default: detectMobileClient,
}));

import { fetchAgentWitchInstallToken } from "@/lib/agentWitch/fetchAgentWitchInstallToken";

describe("fetchAgentWitchInstallToken mobile gate", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    detectMobileClient.mockReset();
    fetchMock.mockReset();
    fetchMock.mockResolvedValue(
      Response.json({
        installCommand: "curl … | bash",
        pairingToken: "tok",
        tokenHash: "hash",
        email: "me@example.com",
      }),
    );
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("does not POST install-token (no device row) on mobile", async () => {
    detectMobileClient.mockReturnValue(true);

    const result = await fetchAgentWitchInstallToken();

    expect(fetchMock).not.toHaveBeenCalled();
    expect(result.ok).toBe(false);
  });

  it("POSTs install-token on desktop", async () => {
    detectMobileClient.mockReturnValue(false);

    const result = await fetchAgentWitchInstallToken();

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/agent-witch/install-token",
      expect.objectContaining({ method: "POST" }),
    );
    expect(result.ok).toBe(true);
  });
});
