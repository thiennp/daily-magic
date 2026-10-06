import { beforeEach, describe, expect, it, vi } from "vitest";

import { GET } from "@/app/api/projects/[projectId]/access/run-approvals/route";
import { requireAuth } from "@/lib/auth/requireAuth";

const listMock = vi.fn();

vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth: vi.fn() }));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async (id: string) =>
    id === "proj-1" ? { id: "proj-1", ownerUserId: "owner-1" } : null,
  ),
}));
vi.mock(
  "@/lib/projects/acl/runApprovals/listProjectPendingRunApprovals",
  () => ({ listProjectPendingRunApprovals: (i: unknown) => listMock(i) }),
);

const asUser = (id: string) =>
  vi.mocked(requireAuth).mockResolvedValue({
    error: null,
    actor: { id, email: `${id}@test.local`, globalRole: "user" },
  } as never);

const ctx = (projectId: string) => ({ params: Promise.resolve({ projectId }) });

describe("GET /api/projects/[id]/access/run-approvals", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    listMock.mockResolvedValue([
      {
        runId: "run-1",
        projectId: "proj-1",
        tool: "claude-cli",
        computerName: "Studio Mac",
        projectFolder: "/p",
        state: "pending",
      },
    ]);
  });

  it("403 for non-owner; 404 missing project; owner gets pending list", async () => {
    asUser("member-1");
    expect((await GET(new Request("http://local"), ctx("proj-1"))).status).toBe(
      403,
    );
    expect(listMock).not.toHaveBeenCalled();

    asUser("owner-1");
    expect((await GET(new Request("http://local"), ctx("nope"))).status).toBe(
      404,
    );

    const response = await GET(new Request("http://local"), ctx("proj-1"));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      ok: true,
      approvals: [
        expect.objectContaining({
          runId: "run-1",
          tool: "claude-cli",
          computerName: "Studio Mac",
          projectFolder: "/p",
          state: "pending",
        }),
      ],
    });
  });
});
