import { beforeEach, describe, expect, it, vi } from "vitest";

import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { listProjectMessageLog } from "@/lib/projects/acl/messaging/listProjectMessageLog";
import { resetProjectMessagePurgeForTests } from "@/lib/projects/acl/messaging/purgeExpiredProjectMessages";

const sqlMock = vi.fn();
const logCalls: { q: string; values: unknown[] }[] = [];

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

const fakeSql = async (strings: TemplateStringsArray, ...values: unknown[]) => {
  const q = strings.join("?");
  if (q.includes("FROM project_messages m")) {
    logCalls.push({ q, values });
    return [];
  }
  if (q.includes("archived_at IS NOT NULL") && q.includes("COUNT(*)")) {
    return [{ c: 7 }];
  }
  return [];
};

const viewerSeat = {
  id: "mem-v",
  memberKind: "human",
  role: "viewer",
} as never;

describe("listProjectMessageLog Archived filter", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    sqlMock.mockImplementation(fakeSql);
    logCalls.length = 0;
    vi.mocked(getActiveProjectMembership).mockResolvedValue(null);
    resetProjectAclSchemaEnsureForTests();
    resetProjectMessagePurgeForTests();
  });

  it("Inbox hides archived rows; Archived lists only archived rows", async () => {
    const inbox = await listProjectMessageLog({
      projectId: "proj-1",
      actorUserId: "owner-1",
    });
    const archived = await listProjectMessageLog({
      projectId: "proj-1",
      actorUserId: "owner-1",
      archived: true,
    });
    expect(logCalls[0]?.q).toContain(
      "(m.archived_at IS NOT NULL) = ?::boolean",
    );
    expect(logCalls[0]?.values).toContain(false);
    expect(logCalls[1]?.values).toContain(true);
    expect(inbox).toMatchObject({
      ok: true,
      archived: false,
      archivedCount: 7,
      canRestore: true,
    });
    expect(archived).toMatchObject({
      ok: true,
      archived: true,
      archivedCount: 7,
    });
  });

  it("anyone who could read before can read Archived; only owner can restore", async () => {
    vi.mocked(getActiveProjectMembership).mockResolvedValue(viewerSeat);
    const result = await listProjectMessageLog({
      projectId: "proj-1",
      actorUserId: "viewer-1",
      archived: true,
    });
    expect(result).toMatchObject({
      ok: true,
      archived: true,
      archivedCount: 7,
      canRestore: false,
    });
  });
});
