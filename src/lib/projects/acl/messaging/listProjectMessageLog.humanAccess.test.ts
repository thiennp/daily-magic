import { beforeEach, describe, expect, it, vi } from "vitest";

import { listProjectMessageLog } from "@/lib/projects/acl/messaging/listProjectMessageLog";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { resetProjectMessagePurgeForTests } from "@/lib/projects/acl/messaging/purgeExpiredProjectMessages";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
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

vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({
  getActiveProjectMembership: vi.fn(async () => null),
}));

describe("listProjectMessageLog human access", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    vi.mocked(getUserProjectById).mockResolvedValue({
      id: "proj-1",
      ownerUserId: "owner-1",
    } as never);
    vi.mocked(getActiveProjectMembership).mockResolvedValue(null);
    resetProjectAclSchemaEnsureForTests();
    resetProjectMessagePurgeForTests();
  });

  it("forbids strangers and bot seats", async () => {
    vi.mocked(getActiveProjectMembership).mockResolvedValue(null);
    expect(
      await listProjectMessageLog({
        projectId: "proj-1",
        actorUserId: "stranger",
      }),
    ).toEqual({ ok: false, code: "forbidden" });

    vi.mocked(getActiveProjectMembership).mockResolvedValue({
      id: "mem-bot",
      role: "member",
      memberKind: "bot",
      status: "active",
      scopes: ["msg:dispatch"],
      projectDisplayName: "Bot",
    } as never);
    expect(
      await listProjectMessageLog({
        projectId: "proj-1",
        actorUserId: "bot-1",
      }),
    ).toEqual({ ok: false, code: "forbidden" });
  });

  it.each(["member", "viewer"] as const)(
    "allows active human %s to read the project log",
    async (role) => {
      vi.mocked(getActiveProjectMembership).mockResolvedValue({
        id: "mem-h",
        role,
        memberKind: "human",
        status: "active",
        scopes: [],
        projectDisplayName: role === "member" ? "Alex" : null,
      } as never);
      sqlMock.mockResolvedValue([]);
      const result = await listProjectMessageLog({
        projectId: "proj-1",
        actorUserId: "user-h",
      });
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.scope).toBe("project");
        expect(result.messages).toEqual([]);
      }
    },
  );
});
