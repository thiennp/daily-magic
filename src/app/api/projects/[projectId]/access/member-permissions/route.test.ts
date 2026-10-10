import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  GET,
  PUT,
} from "@/app/api/projects/[projectId]/access/member-permissions/route";
import { requireAuth } from "@/lib/auth/requireAuth";
import { ALL_MEMBER_PERMISSIONS_ALLOWED } from "@/lib/projects/acl/memberPermissions/projectMemberPermission.constant";

const setMock = vi.fn();
const readMock = vi.fn();

vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth: vi.fn() }));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async (id: string) =>
    id === "proj-1" ? { id: "proj-1", ownerUserId: "owner-1" } : null,
  ),
}));
vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({
  getActiveProjectMembership: vi.fn(async (_p: string, userId: string) =>
    userId === "member-1" ? { memberKind: "human", role: "member" } : null,
  ),
}));
vi.mock(
  "@/lib/projects/acl/memberPermissions/setProjectMemberPermissions",
  () => ({ setProjectMemberPermissions: (i: unknown) => setMock(i) }),
);
vi.mock(
  "@/lib/projects/acl/memberPermissions/readProjectMemberPermissions",
  () => ({ readProjectMemberPermissions: (i: unknown) => readMock(i) }),
);

const asUser = (id: string) =>
  vi.mocked(requireAuth).mockResolvedValue({
    error: null,
    actor: { id, email: `${id}@test.local`, globalRole: "user" },
  } as never);

const ctx = (projectId: string) => ({ params: Promise.resolve({ projectId }) });
const put = (projectId: string, body: unknown) =>
  PUT(
    new Request(
      `http://local/api/projects/${projectId}/access/member-permissions`,
      {
        method: "PUT",
        body: JSON.stringify(body),
      },
    ),
    ctx(projectId),
  );
const get = (projectId: string) =>
  GET(new Request("http://local/x"), ctx(projectId));

describe("member-permissions route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    readMock.mockResolvedValue(ALL_MEMBER_PERMISSIONS_ALLOWED);
  });

  it("owner reads and writes", async () => {
    asUser("owner-1");
    const res = await get("proj-1");
    expect(await res.json()).toEqual({
      ok: true,
      permissions: ALL_MEMBER_PERMISSIONS_ALLOWED,
    });
    setMock.mockResolvedValue({
      ok: true,
      permissions: ALL_MEMBER_PERMISSIONS_ALLOWED,
      changed: false,
    });
    const saved = await put("proj-1", {
      permissions: { "skill.delete": true },
    });
    expect(saved.status).toBe(200);
    expect(setMock).toHaveBeenCalledWith({
      projectId: "proj-1",
      actorUserId: "owner-1",
      patch: { "skill.delete": true },
    });
  });

  it("a member can read but not write", async () => {
    asUser("member-1");
    expect((await get("proj-1")).status).toBe(200);
    expect((await put("proj-1", { permissions: {} })).status).toBe(403);
    expect(setMock).not.toHaveBeenCalled();
  });

  it("a stranger cannot read; an unknown project is 404", async () => {
    asUser("stranger");
    expect((await get("proj-1")).status).toBe(403);
    asUser("owner-1");
    expect((await get("nope")).status).toBe(404);
  });

  it("a bad body is a 400", async () => {
    asUser("owner-1");
    setMock.mockResolvedValue({ ok: false, code: "invalid_value" });
    expect((await put("proj-1", { permissions: { nope: 1 } })).status).toBe(
      400,
    );
  });
});
