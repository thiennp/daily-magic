import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();
const writeEventMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/acl/activity/writeProjectActivityEvent", () => ({
  writeProjectActivityEvent: (input: unknown) => writeEventMock(input),
}));

import { resetProjectMemberPermissionsSchemaForTests } from "@/lib/projects/acl/memberPermissions/ensureProjectMemberPermissionsSchema";
import { authorizeProjectMemberPermission } from "@/lib/projects/acl/memberPermissions/authorizeProjectMemberPermission";
import {
  ALL_MEMBER_PERMISSIONS_ALLOWED,
  NO_MEMBER_PERMISSIONS,
} from "@/lib/projects/acl/memberPermissions/projectMemberPermission.constant";
import { readProjectMemberPermissions } from "@/lib/projects/acl/memberPermissions/readProjectMemberPermissions";
import { setProjectMemberPermissions } from "@/lib/projects/acl/memberPermissions/setProjectMemberPermissions";

import {
  fakeSql,
  projects,
} from "@/lib/projects/acl/memberPermissions/memberPermissions.fixtures";

describe("read / set member permissions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetProjectMemberPermissionsSchemaForTests();
    sqlMock.mockImplementation(fakeSql);
    projects.clear();
    projects.set("proj-1", { owner: "owner-1", stored: {} });
  });

  const set = (actor: string, patch: unknown, projectId = "proj-1") =>
    setProjectMemberPermissions({ projectId, actorUserId: actor, patch });

  it("an untouched project allows everything; missing project or db error denies", async () => {
    expect(await readProjectMemberPermissions("proj-1")).toEqual(
      ALL_MEMBER_PERMISSIONS_ALLOWED,
    );
    expect(await readProjectMemberPermissions("missing")).toEqual(
      NO_MEMBER_PERMISSIONS,
    );
    sqlMock.mockRejectedValue(new Error("db down"));
    expect(await readProjectMemberPermissions("proj-1")).toEqual(
      NO_MEMBER_PERMISSIONS,
    );
  });

  it("owner turns one off then on; each real change writes one Access log row", async () => {
    const off = await set("owner-1", { "skill.delete": false });
    expect(off).toEqual({
      ok: true,
      permissions: { ...ALL_MEMBER_PERMISSIONS_ALLOWED, "skill.delete": false },
      changed: true,
    });
    expect(projects.get("proj-1")?.stored).toEqual({ "skill.delete": false });
    expect(
      await authorizeProjectMemberPermission({
        projectId: "proj-1",
        role: "member",
        key: "skill.delete",
      }),
    ).toBe(false);

    expect(await set("owner-1", { "skill.delete": true })).toMatchObject({
      ok: true,
      changed: true,
    });
    expect(projects.get("proj-1")?.stored).toEqual({});
    expect(writeEventMock).toHaveBeenCalledTimes(2);
    expect(writeEventMock.mock.calls[0]?.[0]).toEqual({
      projectId: "proj-1",
      type: "project.member_permissions_changed",
      actor: { kind: "owner", userId: "owner-1" },
      detail: {},
    });
  });

  it("a no-op change logs nothing and keeps other keys", async () => {
    expect(await set("owner-1", { "skill.delete": true })).toMatchObject({
      ok: true,
      changed: false,
    });
    expect(writeEventMock).not.toHaveBeenCalled();
    await set("owner-1", { "skill.delete": false });
    await set("owner-1", { "autoSkill.manage": false });
    expect(projects.get("proj-1")?.stored).toEqual({
      "skill.delete": false,
      "autoSkill.manage": false,
    });
  });

  it("only the owner can change it; bad bodies and missing projects are rejected", async () => {
    expect(await set("member-1", { "skill.delete": false })).toEqual({
      ok: false,
      code: "forbidden",
    });
    expect(projects.get("proj-1")?.stored).toEqual({});
    expect(await set("owner-1", { nope: false })).toEqual({
      ok: false,
      code: "invalid_value",
    });
    expect(await set("owner-1", { "skill.delete": false }, "missing")).toEqual({
      ok: false,
      code: "not_found",
    });
    expect(writeEventMock).not.toHaveBeenCalled();
  });
});
