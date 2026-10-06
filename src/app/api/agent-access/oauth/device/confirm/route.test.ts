import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/app/isAllowedAppHttpOrigin", () => ({
  isAllowedAppHttpOrigin: () => true,
}));

vi.mock("@/lib/auth/requireAuth", () => ({
  requireAuth: vi.fn(),
}));

vi.mock("@/lib/agentAccess/deviceCode/confirmDeviceAuthorization", () => ({
  confirmDeviceAuthorization: vi.fn(),
}));

vi.mock("@/lib/agentAccess/readClientIp", () => ({
  readClientIp: () => "127.0.0.1",
  hashAgentAccessClientIp: (ip: string) => `hash:${ip}`,
}));

import { requireAuth } from "@/lib/auth/requireAuth";
import { POST } from "@/app/api/agent-access/oauth/device/confirm/route";

describe("POST /api/agent-access/oauth/device/confirm", () => {
  beforeEach(() => {
    vi.mocked(requireAuth).mockReset();
  });

  it("confirm without login rejected", async () => {
    vi.mocked(requireAuth).mockResolvedValue({
      error: Response.json({ error: "Unauthorized" }, { status: 401 }),
      actor: null,
    });

    const response = await POST(
      new Request("http://localhost/api/agent-access/oauth/device/confirm", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ user_code: "BCDF-GHJK" }),
      }),
    );

    expect(response.status).toBe(401);
  });
});
