import { beforeEach, describe, expect, it, vi } from "vitest";

import { getProjectAclPayload } from "@/lib/projects/acl/getProjectAclPayload";
import { getProjectAclPayloadRepoUrlsBaseProject } from "@/lib/projects/acl/getProjectAclPayload.repoUrls.fixtures";
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

describe("getProjectAclPayload repoUrls forbidden", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
    vi.mocked(getUserProjectById).mockReset();
  });

  it("non-member cannot read repoUrls", async () => {
    vi.mocked(getUserProjectById).mockResolvedValue(
      getProjectAclPayloadRepoUrlsBaseProject,
    );
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE")) return [];
      if (q.includes("FROM project_memberships")) return [];
      return [];
    });

    const payload = await getProjectAclPayload({
      projectId: "proj-1",
      actorUserId: "stranger-1",
    });
    expect(payload).toEqual({ ok: false, code: "forbidden" });
  });
});
