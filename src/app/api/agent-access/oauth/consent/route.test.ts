import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/app/isAllowedAppHttpOrigin", () => ({
  isAllowedAppHttpOrigin: () => true,
}));

vi.mock("@/lib/auth/requireAuth", () => ({
  requireAuth: vi.fn(),
}));

vi.mock("@/lib/agentAccess/oauth/completeOauthConsent", () => ({
  completeOauthConsent: vi.fn(),
}));

import { requireAuth } from "@/lib/auth/requireAuth";
import { POST } from "@/app/api/agent-access/oauth/consent/route";

describe("POST /api/agent-access/oauth/consent", () => {
  beforeEach(() => {
    vi.mocked(requireAuth).mockReset();
  });

  it("consent without login gets 401", async () => {
    vi.mocked(requireAuth).mockResolvedValue({
      error: Response.json({ error: "Unauthorized" }, { status: 401 }),
      actor: null,
    });

    const response = await POST(
      new Request("http://localhost/api/agent-access/oauth/consent", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ pending: "x", decision: "approve" }),
      }),
    );
    expect(response.status).toBe(401);
  });

  it("browser form post with expired session goes back to consent (then /login)", async () => {
    vi.mocked(requireAuth).mockResolvedValue({
      error: Response.json({ error: "Unauthorized" }, { status: 401 }),
      actor: null,
    });

    const response = await POST(
      new Request("http://localhost/api/agent-access/oauth/consent", {
        method: "POST",
        headers: {
          accept: "text/html",
          "content-type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          pending: "p-1",
          decision: "approve",
        }).toString(),
      }),
    );

    expect(response.status).toBe(303);
    expect(response.headers.get("location")).toBe(
      "http://localhost:3000/oauth/consent?pending=p-1",
    );
  });
});
