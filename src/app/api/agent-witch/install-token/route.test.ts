import { beforeEach, describe, expect, it, vi } from "vitest";

import { MOBILE_UA_FIXTURES as UA } from "@/lib/mobile/mobileUserAgentFixtures.constant";

const requireAuth = vi.hoisted(() => vi.fn());
const createAgentWitchInstallTokenForUser = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth }));

vi.mock("@/lib/agentWitch/createAgentWitchInstallTokenForUser", () => ({
  createAgentWitchInstallTokenForUser,
}));

import { POST } from "@/app/api/agent-witch/install-token/route";

const postWith = (headers: Record<string, string>): Promise<Response> =>
  POST(
    new Request("http://localhost:3000/api/agent-witch/install-token", {
      method: "POST",
      headers,
    }),
  );

describe("POST /api/agent-witch/install-token mobile gate", () => {
  beforeEach(() => {
    requireAuth.mockReset();
    requireAuth.mockResolvedValue({
      actor: { id: "user-1", email: "Me@Example.com" },
      error: null,
    });
    createAgentWitchInstallTokenForUser.mockReset();
    createAgentWitchInstallTokenForUser.mockResolvedValue({
      pairingToken: "tok",
      tokenHash: "hash",
      installCommand: "curl … | bash",
    });
  });

  it.each([
    ["iPhone UA", { "user-agent": UA.iphoneSafari }],
    ["Android UA", { "user-agent": UA.androidChrome }],
    [
      "Sec-CH-UA-Mobile ?1",
      { "user-agent": UA.linuxChrome, "sec-ch-ua-mobile": "?1" },
    ],
  ])("does not create a device row for %s", async (_label, headers) => {
    const response = await postWith(headers);

    expect(response.status).toBe(403);
    expect(createAgentWitchInstallTokenForUser).not.toHaveBeenCalled();
  });

  it("creates the install token on desktop", async () => {
    const response = await postWith({
      "user-agent": UA.macChrome,
      "sec-ch-ua-mobile": "?0",
    });

    expect(response.status).toBe(200);
    expect(createAgentWitchInstallTokenForUser).toHaveBeenCalledWith(
      expect.objectContaining({ userId: "user-1", email: "me@example.com" }),
    );
  });
});
