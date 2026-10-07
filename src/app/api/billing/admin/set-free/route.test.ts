import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth: vi.fn() }));
vi.mock("@/lib/auth/globalRolePermissions", () => ({
  canManageAllUsers: vi.fn(),
}));
vi.mock("@/lib/billing/setAdminFreeForUser", () => ({
  setAdminFreeForUser: vi.fn(),
}));

import { canManageAllUsers } from "@/lib/auth/globalRolePermissions";
import { requireAuth } from "@/lib/auth/requireAuth";
import { setAdminFreeForUser } from "@/lib/billing/setAdminFreeForUser";
import { POST } from "@/app/api/billing/admin/set-free/route";

describe("POST /api/billing/admin/set-free", () => {
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
      new Request("https://www.agentwitch.com/api/billing/admin/set-free", {
        method: "POST",
        body: JSON.stringify({ userId: "u1", adminFree: true }),
      }),
    );
    expect(res.status).toBe(403);
    expect(setAdminFreeForUser).not.toHaveBeenCalled();
  });

  it("sets admin free for admins", async () => {
    vi.mocked(canManageAllUsers).mockReturnValue(true);
    vi.mocked(setAdminFreeForUser).mockResolvedValue(true);
    const res = await POST(
      new Request("https://www.agentwitch.com/api/billing/admin/set-free", {
        method: "POST",
        body: JSON.stringify({ userId: "u1", adminFree: true }),
      }),
    );
    expect(res.status).toBe(200);
    expect(setAdminFreeForUser).toHaveBeenCalledWith({
      userId: "u1",
      adminFree: true,
    });
  });
});
