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

describe("POST /api/projects/[projectId]/sync/tasks-meta", () => {
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

  it("viewer gets 403 viewer_read_only and does not upsert", async () => {
    authorize.mockResolvedValue({
      ok: true,
      project,
      role: "viewer",
      membership: { role: "viewer" },
    });
    const response = await POST(
      new Request("http://local/sync", {
        method: "POST",
        body: JSON.stringify({ batch: [] }),
      }),
      { params: Promise.resolve({ projectId: "proj-1" }) },
    );
    expect(response.status).toBe(403);
    expect(await response.json()).toMatchObject({
      ok: false,
      code: "viewer_read_only",
    });
    expect(upsert).not.toHaveBeenCalled();
  });

  it("owner may upsert allowlisted batch", async () => {
    authorize.mockResolvedValue({
      ok: true,
      project,
      role: "owner",
      membership: null,
    });
    upsert.mockResolvedValue({
      ok: true,
      upserted: [{ id: "1" }],
      updatedAgentRunIds: ["1"],
    });
    const response = await POST(
      new Request("http://local/sync", {
        method: "POST",
        body: JSON.stringify({
          batch: [
            {
              id: "1",
              projectId: "proj-1",
              title: "t",
              status: "done",
              createdAt: "2026-10-07T00:00:00.000000Z",
              updatedAt: "2026-10-07T00:00:00.000000Z",
              version: 1,
            },
          ],
        }),
      }),
      { params: Promise.resolve({ projectId: "proj-1" }) },
    );
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({
      ok: true,
      upserted: 1,
      updatedAgentRunIds: ["1"],
    });
    expect(upsert).toHaveBeenCalledOnce();
  });

  it("member may upsert", async () => {
    authorize.mockResolvedValue({
      ok: true,
      project,
      role: "member",
      membership: { role: "member" },
    });
    const response = await POST(
      new Request("http://local/sync", {
        method: "POST",
        body: JSON.stringify({ batch: [] }),
      }),
      { params: Promise.resolve({ projectId: "proj-1" }) },
    );
    expect(response.status).toBe(200);
    expect(upsert).toHaveBeenCalledOnce();
  });
});
