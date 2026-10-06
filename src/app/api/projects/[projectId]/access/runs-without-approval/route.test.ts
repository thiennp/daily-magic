import { beforeEach, describe, expect, it, vi } from "vitest";

import { GET, PUT } from "@/app/api/projects/[projectId]/access/runs-without-approval/route";
import { requireAuth } from "@/lib/auth/requireAuth";

const setMock = vi.fn();
const readMock = vi.fn();

vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth: vi.fn() }));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async (id: string) =>
    id === "proj-1" ? { id: "proj-1", ownerUserId: "owner-1" } : null,
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

const asUser = (id: string) =>
  vi.mocked(requireAuth).mockResolvedValue({
    error: null,
    actor: { id, email: `${id}@test.local`, globalRole: "user" },
  } as never);

const ctx = (projectId: string) => ({ params: Promise.resolve({ projectId }) });
const put = (projectId: string, body: unknown) =>
  PUT(
    new Request(`http://local/api/projects/${projectId}/access/runs-without-approval`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
    ctx(projectId),
  );

describe("/api/projects/[id]/access/runs-without-approval (owner only)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setMock.mockResolvedValue({ ok: true, allowRunsWithoutApproval: true, changed: true });
    readMock.mockResolvedValue(false);
  });

  it("403 for a member or bot; nothing is written", async () => {
    asUser("bot-user-1");
    const response = await put("proj-1", { allowRunsWithoutApproval: true });
    expect(response.status).toBe(403);
    expect(setMock).not.toHaveBeenCalled();
    const getResponse = await GET(new Request("http://local"), ctx("proj-1"));
    expect(getResponse.status).toBe(403);
    expect(readMock).not.toHaveBeenCalled();
  });

  it("404 for a missing project", async () => {
    asUser("owner-1");
    expect((await put("nope", { allowRunsWithoutApproval: true })).status).toBe(404);
  });

  it("owner reads (default OFF) and toggles", async () => {
    asUser("owner-1");
    const getResponse = await GET(new Request("http://local"), ctx("proj-1"));
    expect(await getResponse.json()).toEqual({ ok: true, allowRunsWithoutApproval: false });
    const response = await put("proj-1", { allowRunsWithoutApproval: true });
    expect(response.status).toBe(200);
    expect(setMock).toHaveBeenCalledWith({
      projectId: "proj-1",
      actorUserId: "owner-1",
      allowRunsWithoutApproval: true,
    });
  });

  it("400 on a bad body", async () => {
    asUser("owner-1");
    setMock.mockResolvedValue({ ok: false, code: "invalid_value" });
    expect((await put("proj-1", { allowRunsWithoutApproval: "on" })).status).toBe(400);
  });
});
