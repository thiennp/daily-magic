import { beforeEach, describe, expect, it, vi } from "vitest";

import { clearAllProjectMessages } from "@/lib/projects/acl/messaging/clearAllProjectMessages";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";

const sqlMock = vi.fn();
const getUserProjectById = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: (...args: unknown[]) => getUserProjectById(...args),
}));

vi.mock("@/lib/projects/acl/writeProjectAccessAudit", () => ({
  writeProjectAccessAudit: vi.fn(async () => undefined),
}));

describe("clearAllProjectMessages errors", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    getUserProjectById.mockReset();
    resetProjectAclSchemaEnsureForTests();
    getUserProjectById.mockResolvedValue({
      id: "proj-1",
      ownerUserId: "owner-1",
    });
  });

  it("requires confirm:true", async () => {
    const result = await clearAllProjectMessages({
      projectId: "proj-1",
      actorUserId: "owner-1",
      confirm: false,
    });
    expect(result).toEqual({ ok: false, code: "confirm_required" });
    expect(sqlMock).not.toHaveBeenCalled();
  });

  it("forbids non-owners", async () => {
    const result = await clearAllProjectMessages({
      projectId: "proj-1",
      actorUserId: "member-1",
      confirm: true,
    });
    expect(result).toEqual({ ok: false, code: "forbidden" });
  });

  it("returns not_found when project missing", async () => {
    getUserProjectById.mockResolvedValueOnce(null);
    const result = await clearAllProjectMessages({
      projectId: "missing",
      actorUserId: "owner-1",
      confirm: true,
    });
    expect(result).toEqual({ ok: false, code: "not_found" });
  });
});
