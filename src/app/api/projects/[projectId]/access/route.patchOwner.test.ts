import { beforeEach, describe, expect, it, vi } from "vitest";

const requireAuth = vi.hoisted(() => vi.fn());
const authorizeOwner = vi.hoisted(() => vi.fn());
const handlePatch = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth }));
vi.mock("@/lib/projects/acl/authorizeProjectOwner", () => ({
  authorizeProjectOwner: authorizeOwner,
}));
vi.mock(
  "@/app/api/projects/[projectId]/access/handleInviterAccessPatch",
  () => ({
    handleInviterAccessPatch: async () => new Response("{}", { status: 403 }),
  }),
);
vi.mock("@/app/api/projects/[projectId]/access/patchAccessAction", () => ({
  handleProjectAccessPatch: handlePatch,
}));

import { PATCH } from "@/app/api/projects/[projectId]/access/route";

const patch = (body: Record<string, unknown>) =>
  PATCH(
    new Request("http://local/access", {
      method: "PATCH",
      body: JSON.stringify(body),
    }),
    { params: Promise.resolve({ projectId: "proj-1" }) },
  );

describe("PATCH /api/projects/:projectId/access owner gate", () => {
  beforeEach(() => {
    requireAuth.mockReset();
    authorizeOwner.mockReset();
    handlePatch.mockReset();
  });

  it("viewer gets 403 without reaching approve handlers", async () => {
    requireAuth.mockResolvedValue({ actor: { id: "viewer-1" }, error: null });
    authorizeOwner.mockResolvedValue({ allow: false, reason: "forbidden" });
    const response = await patch({
      action: "approve",
      requestId: "req-1",
    });
    expect(response.status).toBe(403);
    expect(handlePatch).not.toHaveBeenCalled();
  });

  it("member gets 403 without reaching approve handlers", async () => {
    requireAuth.mockResolvedValue({ actor: { id: "member-1" }, error: null });
    authorizeOwner.mockResolvedValue({ allow: false, reason: "forbidden" });
    const response = await patch({
      action: "approve",
      requestId: "req-1",
    });
    expect(response.status).toBe(403);
    expect(handlePatch).not.toHaveBeenCalled();
  });

  it("owner still dispatches to patch handlers", async () => {
    requireAuth.mockResolvedValue({ actor: { id: "owner-1" }, error: null });
    authorizeOwner.mockResolvedValue({ allow: true });
    handlePatch.mockResolvedValue(
      Response.json({ ok: true, request: { id: "req-1" } }),
    );
    const response = await patch({
      action: "approve",
      requestId: "req-1",
    });
    expect(response.status).toBe(200);
    expect(handlePatch).toHaveBeenCalledWith({
      projectId: "proj-1",
      ownerUserId: "owner-1",
      body: { action: "approve", requestId: "req-1" },
    });
  });
});
