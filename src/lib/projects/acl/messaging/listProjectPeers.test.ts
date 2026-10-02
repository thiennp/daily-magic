import { beforeEach, describe, expect, it, vi } from "vitest";

import { listProjectPeers } from "@/lib/projects/acl/messaging/listProjectPeers";
import { listProjectPeersBaseProject } from "@/lib/projects/acl/messaging/listProjectPeers.fixtures";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(),
}));

describe("listProjectPeers", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
    vi.mocked(getUserProjectById).mockReset();
    vi.mocked(getUserProjectById).mockResolvedValue(listProjectPeersBaseProject);
  });

  it("forbids non-members", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE")) return [];
      if (q.includes("FROM project_memberships")) return [];
      return [];
    });

    await expect(
      listProjectPeers({ projectId: "proj-1", actorUserId: "bot-1" }),
    ).resolves.toEqual({ ok: false, code: "forbidden" });
  });
});
