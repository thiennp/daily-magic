import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth: vi.fn() }));
vi.mock("@/lib/billing/loadEntitlementsForUser", () => ({
  loadEntitlementsForUser: vi.fn(),
}));

import { requireAuth } from "@/lib/auth/requireAuth";
import { loadEntitlementsForUser } from "@/lib/billing/loadEntitlementsForUser";
import { GET } from "@/app/api/billing/entitlements/route";

describe("GET /api/billing/entitlements", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(requireAuth).mockResolvedValue({
      actor: { id: "user-1", email: "a@b.co" },
      error: null,
    } as never);
  });

  it("returns entitlements without infra euros", async () => {
    vi.mocked(loadEntitlementsForUser).mockResolvedValue({
      plan: "trial",
      trialEndsAt: "2026-11-01T00:00:00.000Z",
      adminFree: false,
      seats: 1,
      maxComputers: 2,
      maxAssistantConnects: 3,
      cloudMessageStorage: false,
      trialGate: "open",
      trialGateReason: null,
    });
    const res = await GET();
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.plan).toBe("trial");
    expect(body.cloudMessageStorage).toBe(false);
    expect(JSON.stringify(body)).not.toMatch(/eur|margin|railway/i);
  });
});
