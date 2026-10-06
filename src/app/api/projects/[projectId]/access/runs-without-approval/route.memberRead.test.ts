import { beforeEach, describe, expect, it, vi } from "vitest";

import { GET, PUT } from "@/app/api/projects/[projectId]/access/runs-without-approval/route";
import { requireAuth } from "@/lib/auth/requireAuth";

const setMock = vi.fn();
const readMock = vi.fn();

vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth: vi.fn() }));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async () => ({ id: "proj-1", ownerUserId: "owner-1" })),
}));
vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({
  getActiveProjectMembership: vi.fn(async (_p: string, userId: string) =>
    userId === "member-1" ? { memberKind: "human", role: "member" } : null,
  ),
}));
vi.mock(
  "@/lib/projects/acl/runsWithoutApproval/setProjectRunsWithoutApproval",
  () => ({ setProjectRunsWithoutApproval: (i: unknown) => setMock(i) }),
);
vi.mock(
  "@/lib/projects/acl/runsWithoutApproval/readProjectRunsWithoutApproval",
  () => ({ readProjectRunsWithoutApproval: (i: unknown) => readMock(i) }),
);

const ctx = { params: Promise.resolve({ projectId: "proj-1" }) };
const asUser = (id: string) =>
  vi.mocked(requireAuth).mockResolvedValue({
    error: null,
    actor: { id, email: `${id}@test.local`, globalRole: "user" },
  } as never);

describe("runs-without-approval: human member reads, cannot write", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    readMock.mockResolvedValue(true);
  });

  it("GET 200 shows the current state to a human member", async () => {
    asUser("member-1");
    const response = await GET(new Request("http://local"), ctx);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true, allowRunsWithoutApproval: true });
  });

  it("PUT 403 for the same member; nothing is written", async () => {
    asUser("member-1");
    const response = await PUT(
      new Request("http://local", {
        method: "PUT",
        body: JSON.stringify({ allowRunsWithoutApproval: false }),
      }),
      ctx,
    );
    expect(response.status).toBe(403);
    expect(setMock).not.toHaveBeenCalled();
  });

  it("GET 403 for someone with no seat", async () => {
    asUser("stranger-1");
    expect((await GET(new Request("http://local"), ctx)).status).toBe(403);
    expect(readMock).not.toHaveBeenCalled();
  });
});
