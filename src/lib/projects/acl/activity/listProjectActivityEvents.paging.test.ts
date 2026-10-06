import { beforeEach, describe, expect, it, vi } from "vitest";

import { listProjectActivityEvents } from "@/lib/projects/acl/activity/listProjectActivityEvents";
import { createActivityPagingStore } from "@/lib/projects/acl/activity/projectActivityPaging.fixtures";
import { trimProjectActivityEvents } from "@/lib/projects/acl/activity/trimProjectActivityEvents";

const store = { current: createActivityPagingStore() };

vi.mock("@/lib/db", () => ({
  getSql: () =>
    Object.assign(
      (strings: TemplateStringsArray, ...values: unknown[]) =>
        store.current.sql(strings, ...values),
      { unsafe: (s: string) => s },
    ),
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async () => ({ id: "proj-1", ownerUserId: "owner-1" })),
}));

const page = (cursor: string | null, limit: number) =>
  listProjectActivityEvents({ projectId: "proj-1", actorUserId: "owner-1", cursor, limit });

const ids = (result: Awaited<ReturnType<typeof page>>) =>
  result.ok ? result.events.map((e) => e.id) : [];

describe("Access log keyset paging across retention trims", () => {
  beforeEach(() => {
    store.current = createActivityPagingStore();
    for (const n of [1, 2, 3, 4, 5, 6]) {
      store.current.add(`e${n}`, `2026-10-06T09:0${n}:00.000000Z`);
    }
  });

  it("continues with older rows after new writes + a trim between pages", async () => {
    const first = await page(null, 2);
    expect(ids(first)).toEqual(["e6", "e5"]);
    store.current.add("e7", "2026-10-06T09:07:00.000000Z");
    store.current.add("e8", "2026-10-06T09:08:00.000000Z");
    await trimProjectActivityEvents("proj-1", { maxEvents: 6, maxAgeDays: 180 });
    const second = await page(first.ok ? first.nextCursor : null, 2);
    expect(ids(second)).toEqual(["e4", "e3"]);
    // e1/e2 were trimmed: the log simply ends, no duplicates of e7/e8.
    expect(second.ok && second.nextCursor).toBeNull();
  });

  it("returns an empty last page (not an error) when the cursor row itself was trimmed", async () => {
    const first = await page(null, 2);
    store.current.add("e7", "2026-10-06T09:07:00.000000Z");
    store.current.add("e8", "2026-10-06T09:08:00.000000Z");
    await trimProjectActivityEvents("proj-1", { maxEvents: 2, maxAgeDays: 180 });
    expect(store.current.rows.map((r) => r.id).sort()).toEqual(["e7", "e8"]);
    const second = await page(first.ok ? first.nextCursor : null, 2);
    expect(second).toMatchObject({ ok: true, events: [], nextCursor: null });
  });

  it("does not skip rows that share a millisecond (microsecond cursor)", async () => {
    store.current.add("t-a", "2026-10-06T09:03:30.123100Z");
    store.current.add("t-b", "2026-10-06T09:03:30.123456Z");
    const seen: string[] = [];
    const walk = async (cursor: string | null): Promise<void> => {
      const result = await page(cursor, 1);
      seen.push(...ids(result));
      if (result.ok && result.nextCursor !== null) await walk(result.nextCursor);
    };
    await walk(null);
    expect(seen).toEqual(["e6", "e5", "e4", "t-b", "t-a", "e3", "e2", "e1"]);
  });

  it("rejects a malformed cursor", async () => {
    expect(await page("not-a-cursor", 2)).toEqual({ ok: false, code: "invalid_cursor" });
  });
});
