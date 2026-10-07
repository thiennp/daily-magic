import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth: vi.fn() }));
vi.mock("@/lib/auth/globalRolePermissions", () => ({
  canManageAllUsers: vi.fn(),
}));
vi.mock("@/lib/billing/setPlanForUser", async () => {
  const actual = await vi.importActual<
    typeof import("@/lib/billing/setPlanForUser")
  >("@/lib/billing/setPlanForUser");
  return {
    ...actual,
    setPlanForUser: vi.fn(),
  };
});

import { canManageAllUsers } from "@/lib/auth/globalRolePermissions";
import { requireAuth } from "@/lib/auth/requireAuth";
import { setPlanForUser } from "@/lib/billing/setPlanForUser";
import { POST } from "@/app/api/billing/admin/set-plan/route";

describe("POST /api/billing/admin/set-plan", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(requireAuth).mockResolvedValue({
      actor: { id: "admin-1", email: "admin@agentwitch.com" },
      error: null,
    } as never);
  });

  it("forbids non-admins", async () => {
    vi.mocked(canManageAllUsers).mockReturnValue(false);
    const res = await POST(
      new Request("https://www.agentwitch.com/api/billing/admin/set-plan", {
        method: "POST",
        body: JSON.stringify({ userId: "u1", plan: "pro" }),
      }),
    );
    expect(res.status).toBe(403);
    expect(setPlanForUser).not.toHaveBeenCalled();
  });

  it("sets plan for admins with seatCount 1 for pro", async () => {
    vi.mocked(canManageAllUsers).mockReturnValue(true);
    vi.mocked(setPlanForUser).mockResolvedValue(true);
    const res = await POST(
      new Request("https://www.agentwitch.com/api/billing/admin/set-plan", {
        method: "POST",
        body: JSON.stringify({ userId: "u1", plan: "pro" }),
      }),
    );
    expect(res.status).toBe(200);
    const body = (await res.json()) as Record<string, unknown>;
    expect(body).toEqual({
      ok: true,
      userId: "u1",
      plan: "pro",
      adminFree: false,
      seatCount: 1,
      expiresAt: null,
    });
    expect(setPlanForUser).toHaveBeenCalledWith({
      userId: "u1",
      plan: "pro",
      seatCount: undefined,
    });
  });

  it("defaults team seatCount to 5", async () => {
    vi.mocked(canManageAllUsers).mockReturnValue(true);
    vi.mocked(setPlanForUser).mockResolvedValue(true);
    const res = await POST(
      new Request("https://www.agentwitch.com/api/billing/admin/set-plan", {
        method: "POST",
        body: JSON.stringify({
          userId: "u1",
          plan: "team",
          expiresAt: "2027-01-01T00:00:00.000Z",
        }),
      }),
    );
    expect(res.status).toBe(200);
    const body = (await res.json()) as Record<string, unknown>;
    expect(body).toEqual({
      ok: true,
      userId: "u1",
      plan: "team",
      adminFree: false,
      seatCount: 5,
      expiresAt: null,
    });
  });

  it("rejects invalid seatCount", async () => {
    vi.mocked(canManageAllUsers).mockReturnValue(true);
    const res = await POST(
      new Request("https://www.agentwitch.com/api/billing/admin/set-plan", {
        method: "POST",
        body: JSON.stringify({ userId: "u1", plan: "team", seatCount: 0 }),
      }),
    );
    expect(res.status).toBe(400);
    expect(setPlanForUser).not.toHaveBeenCalled();
  });

  it("rejects invalid plan", async () => {
    vi.mocked(canManageAllUsers).mockReturnValue(true);
    const res = await POST(
      new Request("https://www.agentwitch.com/api/billing/admin/set-plan", {
        method: "POST",
        body: JSON.stringify({ userId: "u1", plan: "enterprise" }),
      }),
    );
    expect(res.status).toBe(400);
    expect(setPlanForUser).not.toHaveBeenCalled();
  });
});
