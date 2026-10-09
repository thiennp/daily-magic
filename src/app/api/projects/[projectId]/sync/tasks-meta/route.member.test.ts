/**
 * POST /api/projects/:projectId/sync/tasks-meta — viewer 403 + happy authz.
 */
import { beforeEach, describe, expect, it, vi } from "vitest";

const requireAuth = vi.hoisted(() => vi.fn());
const authorize = vi.hoisted(() => vi.fn());
const upsert = vi.hoisted(() => vi.fn());
const flagOn = vi.hoisted(() => vi.fn(() => true));

vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth }));
vi.mock("@/lib/projects/acl/humanInvites/authorizeProjectPageActor", () => ({
  authorizeProjectPageActor: authorize,
}));
vi.mock("@/features/projects/sync/adapters/upsertProjectTaskNeonMeta", () => ({
  upsertProjectTaskNeonMeta: upsert,
}));
vi.mock("@/features/projects/sync/projectSyncFlag", () => ({
  isProjectSyncModuleEnabled: flagOn,
}));
vi.mock("@/features/projects/sync/adapters/neonMetaIdbGuard", () => ({
  gateNeonUpsertAfterIdb: vi.fn(),
}));

import { POST } from "@/app/api/projects/[projectId]/sync/tasks-meta/route";

const project = {
  id: "proj-1",
  ownerUserId: "owner-1",
  name: "Team",
};

describe("POST /api/projects/[projectId]/sync/tasks-meta (member)", () => {
  beforeEach(() => {
    requireAuth.mockReset();
    authorize.mockReset();
    upsert.mockReset();
    flagOn.mockReset();
    flagOn.mockReturnValue(true);
    requireAuth.mockResolvedValue({
      actor: { id: "actor-1", email: "a@x.com" },
      error: null,
    });
    upsert.mockResolvedValue({
      ok: true,
      upserted: [],
      updatedAgentRunIds: [],
    });
  });

  it("passes the caller's identity so a member only moves runs they execute", async () => {
    authorize.mockResolvedValue({
      ok: true,
      project,
      role: "member",
      membership: { role: "member" },
    });
    await POST(
      new Request("http://local/sync", {
        method: "POST",
        body: JSON.stringify({ batch: [] }),
      }),
      { params: Promise.resolve({ projectId: "proj-1" }) },
    );
    expect(upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        actor: { userId: "actor-1", isOwner: false },
      }),
    );
  });
});
