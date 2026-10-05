import { beforeEach, describe, expect, it, vi } from "vitest";

import { resolveAgentWitchRequestActorUserId } from "@/lib/agentWitch/resolveAgentWitchRequestActorUserId";

const requireAgentWitchDeviceAuth = vi.hoisted(() => vi.fn());
const requireAuth = vi.hoisted(() => vi.fn());

vi.mock("@/lib/agentWitch/requireAgentWitchDeviceAuth", () => ({
  requireAgentWitchDeviceAuth,
}));
vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth }));

describe("resolveAgentWitchRequestActorUserId", () => {
  beforeEach(() => vi.clearAllMocks());

  it("uses the paired device user when a device token is sent", async () => {
    requireAgentWitchDeviceAuth.mockResolvedValue({
      device: { userId: "bot-user" },
    });
    const request = new Request("http://t", {
      headers: { "x-agent-witch-token": "tok" },
    });
    expect(await resolveAgentWitchRequestActorUserId(request)).toBe("bot-user");
    expect(requireAuth).not.toHaveBeenCalled();
  });

  it("returns the device 401 instead of falling back to the session", async () => {
    requireAgentWitchDeviceAuth.mockResolvedValue(
      new Response(null, { status: 401 }),
    );
    const request = new Request("http://t", {
      headers: { authorization: "Bearer bad" },
    });
    const result = await resolveAgentWitchRequestActorUserId(request);
    expect(result instanceof Response && result.status).toBe(401);
    expect(requireAuth).not.toHaveBeenCalled();
  });

  it("falls back to the signed-in session without a device token", async () => {
    requireAuth.mockResolvedValue({ error: null, actor: { id: "human-1" } });
    expect(
      await resolveAgentWitchRequestActorUserId(new Request("http://t")),
    ).toBe("human-1");
    requireAuth.mockResolvedValue({
      error: new Response(null, { status: 401 }),
      actor: null,
    });
    const denied = await resolveAgentWitchRequestActorUserId(
      new Request("http://t"),
    );
    expect(denied instanceof Response && denied.status).toBe(401);
  });
});
