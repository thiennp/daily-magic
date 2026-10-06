import { beforeEach, describe, expect, it, vi } from "vitest";

import { writeProjectActivityEvent } from "@/lib/projects/acl/activity/writeProjectActivityEvent";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { resetProjectMessagePurgeForTests } from "@/lib/projects/acl/messaging/purgeExpiredProjectMessages";
import { restoreProjectMessages } from "@/lib/projects/acl/messaging/restoreProjectMessages";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

const sqlMock = vi.fn();
const restoreCalls: { q: string; values: unknown[] }[] = [];

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

const fakeSql = async (strings: TemplateStringsArray, ...values: unknown[]) => {
  const q = strings.join("?");
  if (q.includes("SET archived_at = NULL")) {
    restoreCalls.push({ q, values });
    return [{ id: "m1" }, { id: "m2" }];
  }
  return [];
};

describe("restoreProjectMessages (owner-only Restore)", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    sqlMock.mockImplementation(fakeSql);
    restoreCalls.length = 0;
    vi.mocked(writeProjectActivityEvent).mockClear();
    vi.mocked(getUserProjectById).mockResolvedValue({
      id: "proj-1",
      ownerUserId: "owner-1",
    } as never);
    resetProjectAclSchemaEnsureForTests();
    resetProjectMessagePurgeForTests();
  });

  it("forbids non-owners (members and viewers) and writes nothing", async () => {
    const result = await restoreProjectMessages({
      projectId: "proj-1",
      actorUserId: "member-1",
      target: { kind: "all" },
    });
    expect(result).toEqual({ ok: false, code: "forbidden" });
    expect(sqlMock).not.toHaveBeenCalled();
    expect(writeProjectActivityEvent).not.toHaveBeenCalled();
  });

  it("returns not_found for a missing project", async () => {
    vi.mocked(getUserProjectById).mockResolvedValueOnce(null);
    const result = await restoreProjectMessages({
      projectId: "gone",
      actorUserId: "owner-1",
      target: { kind: "all" },
    });
    expect(result).toEqual({ ok: false, code: "not_found" });
  });

  it("restores all: clears archived_at, never deletes, logs Restore", async () => {
    const result = await restoreProjectMessages({
      projectId: "proj-1",
      actorUserId: "owner-1",
      target: { kind: "all" },
    });
    expect(result).toEqual({ ok: true, restoredMessages: 2 });
    expect(restoreCalls).toHaveLength(1);
    expect(restoreCalls[0]?.q).not.toMatch(/DELETE/);
    expect(restoreCalls[0]?.values).toEqual(["proj-1", null, null, null, null]);
    expect(writeProjectActivityEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "messages.restored",
        actor: { kind: "owner", userId: "owner-1" },
        detail: { count: 2 },
      }),
    );
  });

  it("scopes one message and one Undo batch", async () => {
    await restoreProjectMessages({
      projectId: "proj-1",
      actorUserId: "owner-1",
      target: { kind: "one", messageId: "m1" },
    });
    await restoreProjectMessages({
      projectId: "proj-1",
      actorUserId: "owner-1",
      target: { kind: "batch", archiveBatch: "2026-10-06 11:48:12.123456+00" },
    });
    expect(restoreCalls[0]?.values).toEqual(["proj-1", "m1", "m1", null, null]);
    expect(restoreCalls[1]?.values).toEqual([
      "proj-1",
      null,
      null,
      "2026-10-06 11:48:12.123456+00",
      "2026-10-06 11:48:12.123456+00",
    ]);
  });
});
