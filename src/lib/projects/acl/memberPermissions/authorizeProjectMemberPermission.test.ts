import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

import { authorizeProjectMemberPermission } from "@/lib/projects/acl/memberPermissions/authorizeProjectMemberPermission";
import { resetProjectMemberPermissionsSchemaForTests } from "@/lib/projects/acl/memberPermissions/ensureProjectMemberPermissionsSchema";
import {
  fakeSql,
  projects,
} from "@/lib/projects/acl/memberPermissions/memberPermissions.fixtures";

describe("authorizeProjectMemberPermission", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetProjectMemberPermissionsSchemaForTests();
    sqlMock.mockImplementation(fakeSql);
    projects.clear();
    projects.set("proj-1", { owner: "owner-1", stored: {} });
  });

  it("authorize reads settings only for members; owner passes, viewer fails", async () => {
    projects.get("proj-1")!.stored = { "autoSkill.manage": false };
    const check = (role: "owner" | "member" | "viewer" | "none") =>
      authorizeProjectMemberPermission({
        projectId: "proj-1",
        role,
        key: "autoSkill.manage",
      });
    expect(await check("owner")).toBe(true);
    expect(await check("member")).toBe(false);
    expect(await check("viewer")).toBe(false);
    expect(await check("none")).toBe(false);
  });
});
