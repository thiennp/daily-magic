import { beforeEach, describe, expect, it, vi } from "vitest";

const requireAuth = vi.hoisted(() => vi.fn());
const authorize = vi.hoisted(() => vi.fn());
const listRuns = vi.hoisted(() => vi.fn());
const enrich = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth }));
vi.mock("@/lib/projects/acl/humanInvites/authorizeProjectPageActor", () => ({
  authorizeProjectPageActor: authorize,
}));
vi.mock("@/lib/dispatch/listAgentRunsForProject", () => ({
  listAgentRunsForProject: listRuns,
}));
vi.mock("@/lib/dispatch/enrichAgentRunRecords", () => ({
  enrichAgentRunRecords: enrich,
}));

import { GET } from "@/app/api/projects/[projectId]/reports/route";

const project = { id: "proj-1", ownerUserId: "owner-1", name: "Team" };
const run = { id: "run-1", projectId: "proj-1" };

describe("GET /api/projects/[projectId]/reports", () => {
  beforeEach(() => {
    requireAuth.mockReset();
    authorize.mockReset();
    listRuns.mockReset();
    enrich.mockReset();
    requireAuth.mockResolvedValue({
      actor: { id: "actor-1", email: "a@x.com" },
      error: null,
    });
    listRuns.mockResolvedValue([run]);
    enrich.mockResolvedValue([
      { ...run, requesterEmail: "a", executorEmail: "b" },
    ]);
  });

  it("404 for non-member", async () => {
    authorize.mockResolvedValue({ ok: false, reason: "forbidden" });
    const response = await GET(new Request("http://local/r"), {
      params: Promise.resolve({ projectId: "proj-1" }),
    });
    expect(response.status).toBe(404);
  });

  it("owner/member/viewer see project runs", async () => {
    for (const role of ["owner", "member", "viewer"] as const) {
      authorize.mockResolvedValue({
        ok: true,
        project,
        role,
        membership: role === "owner" ? null : { role },
      });
      const response = await GET(new Request("http://local/r"), {
        params: Promise.resolve({ projectId: "proj-1" }),
      });
      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body.runs).toHaveLength(1);
      expect(body.role).toBe(role);
    }
  });
});
