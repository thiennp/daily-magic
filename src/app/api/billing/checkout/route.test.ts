import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth: vi.fn() }));

import { requireAuth } from "@/lib/auth/requireAuth";
import { POST } from "@/app/api/billing/checkout/route";

describe("POST /api/billing/checkout", () => {
  beforeEach(() => {
    vi.mocked(requireAuth).mockResolvedValue({
      actor: { id: "user-1", email: "a@b.co" },
      error: null,
    } as never);
  });

  it("returns 501 stub", async () => {
    const res = await POST();
    const body = await res.json();
    expect(res.status).toBe(501);
    expect(body.code).toBe("checkout_stub");
  });
});
