import { beforeEach, describe, expect, it, vi } from "vitest";

import { archiveAllProjectMessages } from "@/lib/projects/acl/messaging/archiveAllProjectMessages";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async () => ({
    id: "proj-1",
    ownerUserId: "owner-1",
  })),
}));

vi.mock("@/lib/projects/acl/activity/writeProjectActivityEvent", () => ({
  writeProjectActivityEvent: vi.fn(async () => undefined),
}));

describe("archiveAllProjectMessages errors", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    vi.mocked(getUserProjectById).mockResolvedValue({
      id: "proj-1",
      ownerUserId: "owner-1",
    } as never);
    resetProjectAclSchemaEnsureForTests();
  });

  it("requires confirm:true", async () => {
    const result = await archiveAllProjectMessages({
      projectId: "proj-1",
      actorUserId: "owner-1",
      confirm: false,
    });
    expect(result).toEqual({ ok: false, code: "confirm_required" });
    expect(sqlMock).not.toHaveBeenCalled();
  });

  it("forbids non-owners", async () => {
    const result = await archiveAllProjectMessages({
      projectId: "proj-1",
      actorUserId: "member-1",
      confirm: true,
    });
    expect(result).toEqual({ ok: false, code: "forbidden" });
  });

  it("returns not_found when project missing", async () => {
    vi.mocked(getUserProjectById).mockResolvedValueOnce(null);
    const result = await archiveAllProjectMessages({
      projectId: "missing",
      actorUserId: "owner-1",
      confirm: true,
    });
    expect(result).toEqual({ ok: false, code: "not_found" });
  });
});
