import { beforeEach, describe, expect, it, vi } from "vitest";

import { writeProjectActivityEvent } from "@/lib/projects/acl/activity/writeProjectActivityEvent";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { archiveAllProjectMessages } from "@/lib/projects/acl/messaging/archiveAllProjectMessages";
import { resetProjectMessagePurgeForTests } from "@/lib/projects/acl/messaging/purgeExpiredProjectMessages";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

type FakeRow = {
  readonly id: string;
  readonly project_id: string;
  archived_at: string | null;
  archived_by: string | null;
};

const BATCH = "2026-10-06 11:48:12.123456+00";
const store: { rows: FakeRow[]; queries: string[] } = { rows: [], queries: [] };
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

/** Tiny in-memory project_messages: only the archive UPDATE mutates it. */
const fakeSql = async (strings: TemplateStringsArray, ...values: unknown[]) => {
  const q = strings.join("?");
  store.queries.push(q);
  if (
    q.includes("UPDATE project_messages") &&
    q.includes("archived_at = NOW()")
  ) {
    const [actor, projectId] = values;
    const hit = store.rows.filter(
      (row) => row.project_id === projectId && row.archived_at === null,
    );
    hit.forEach((row) => {
      row.archived_at = BATCH;
      row.archived_by = String(actor);
    });
    return hit.map((row) => ({ id: row.id, archive_batch: BATCH }));
  }
  return [];
};

const seed = (): void => {
  store.queries = [];
  store.rows = [
    { id: "m1", project_id: "proj-1", archived_at: null, archived_by: null },
    { id: "m2", project_id: "proj-1", archived_at: null, archived_by: null },
    {
      id: "m0",
      project_id: "proj-1",
      archived_at: "2026-10-01 08:00:00+00",
      archived_by: "owner-1",
    },
    { id: "x1", project_id: "proj-2", archived_at: null, archived_by: null },
  ];
};

const run = () =>
  archiveAllProjectMessages({
    projectId: "proj-1",
    actorUserId: "owner-1",
    confirm: true,
  });

describe("archiveAllProjectMessages (Clear all → archive)", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    sqlMock.mockImplementation(fakeSql);
    vi.mocked(writeProjectActivityEvent).mockClear();
    vi.mocked(getUserProjectById).mockResolvedValue({
      id: "proj-1",
      ownerUserId: "owner-1",
    } as never);
    resetProjectAclSchemaEnsureForTests();
    resetProjectMessagePurgeForTests();
    seed();
  });

  it("archives every not-yet-archived row; row count unchanged; no DELETE", async () => {
    const before = store.rows.length;
    const result = await run();
    expect(result).toEqual({
      ok: true,
      archivedMessages: 2,
      archiveBatch: BATCH,
    });
    expect(store.rows.length).toBe(before);
    expect(store.rows.find((r) => r.id === "m1")).toMatchObject({
      archived_at: BATCH,
      archived_by: "owner-1",
    });
    expect(store.rows.find((r) => r.id === "m0")?.archived_at).toBe(
      "2026-10-01 08:00:00+00",
    );
    expect(store.rows.find((r) => r.id === "x1")?.archived_at).toBeNull();
    const writes = store.queries.filter((q) => !q.includes("make_interval"));
    expect(writes.some((q) => /DELETE FROM project_messages\b/.test(q))).toBe(
      false,
    );
    expect(
      writes.some((q) => q.includes("DELETE FROM project_message_deliveries")),
    ).toBe(false);
    const dml = writes.filter((q) => !/^\s*(CREATE|ALTER)\b/.test(q));
    expect(dml.some((q) => q.includes("CASCADE"))).toBe(false);
  });

  it("writes one Access log row per Clear all (count only)", async () => {
    await run();
    expect(writeProjectActivityEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        projectId: "proj-1",
        type: "messages.archived",
        actor: { kind: "owner", userId: "owner-1" },
        detail: { count: 2 },
      }),
    );
  });

  it("is idempotent: second Clear all archives 0, rows still all there", async () => {
    await run();
    const second = await run();
    expect(second).toEqual({
      ok: true,
      archivedMessages: 0,
      archiveBatch: null,
    });
    expect(store.rows.length).toBe(4);
    expect(writeProjectActivityEvent).toHaveBeenCalledTimes(2);
  });
});
