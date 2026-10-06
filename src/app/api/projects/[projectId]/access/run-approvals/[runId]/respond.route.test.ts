import { beforeEach, describe, expect, it, vi } from "vitest";

import { POST as approve } from "@/app/api/projects/[projectId]/access/run-approvals/[runId]/approve/route";
import { POST as decline } from "@/app/api/projects/[projectId]/access/run-approvals/[runId]/decline/route";
import { requireAuth } from "@/lib/auth/requireAuth";

const respondMock = vi.fn();

vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth: vi.fn() }));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async (id: string) =>
    id === "proj-1" ? { id: "proj-1", ownerUserId: "owner-1" } : null,
  ),
}));
vi.mock(
  "@/lib/projects/acl/runApprovals/respondComputerRunApproval",
  () => ({ respondComputerRunApproval: (i: unknown) => respondMock(i) }),
);

const asUser = (id: string) =>
  vi.mocked(requireAuth).mockResolvedValue({
    error: null,
    actor: { id, email: `${id}@test.local`, globalRole: "user" },
  } as never);

const ctx = (projectId: string, runId: string) => ({
  params: Promise.resolve({ projectId, runId }),
});
const req = () => new Request("http://local", { method: "POST" });

describe("POST run-approvals/[runId]/approve|decline", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    respondMock.mockResolvedValue({
      ok: true,
      state: "approved",
      runId: "run-1",
    });
  });

  it("owner approve/decline; 409 invalid_transition; 403 member", async () => {
    asUser("owner-1");
    const ok = await approve(req(), ctx("proj-1", "run-1"));
    expect(ok.status).toBe(200);
    expect(await ok.json()).toEqual({
      ok: true,
      runId: "run-1",
      state: "approved",
    });
    expect(respondMock).toHaveBeenCalledWith({
      projectId: "proj-1",
      runId: "run-1",
      actorUserId: "owner-1",
      decision: "approve",
    });

    respondMock.mockResolvedValue({ ok: true, state: "declined", runId: "run-1" });
    const declined = await decline(req(), ctx("proj-1", "run-1"));
    expect(declined.status).toBe(200);
    expect(respondMock).toHaveBeenLastCalledWith({
      projectId: "proj-1",
      runId: "run-1",
      actorUserId: "owner-1",
      decision: "decline",
    });

    respondMock.mockResolvedValue({ ok: false, code: "invalid_transition" });
    expect((await approve(req(), ctx("proj-1", "run-1"))).status).toBe(409);

    asUser("member-1");
    expect((await approve(req(), ctx("proj-1", "run-1"))).status).toBe(403);
  });
});
