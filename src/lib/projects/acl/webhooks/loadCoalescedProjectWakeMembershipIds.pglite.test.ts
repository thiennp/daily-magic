import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

const holder = vi.hoisted(() => ({
  sql: null as null | ((...args: never[]) => unknown),
}));
vi.mock("@/lib/db", () => ({
  getSql: () => holder.sql,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

import { loadCoalescedProjectWakeMembershipIds } from "@/lib/projects/acl/webhooks/loadCoalescedProjectWakeMembershipIds";
import {
  createWakeCoalesceDb,
  WAKE_COALESCE_MEMBERSHIP_ID,
  WAKE_COALESCE_PROJECT_ID,
  type WakeCoalesceDb,
} from "@/lib/projects/acl/webhooks/wakeCoalescePglite.fixtures";

const state: { db?: WakeCoalesceDb } = {};

const coalesced = async (messageId: string): Promise<string[]> => [
  ...(await loadCoalescedProjectWakeMembershipIds({
    projectId: WAKE_COALESCE_PROJECT_ID,
    messageId,
    membershipIds: [WAKE_COALESCE_MEMBERSHIP_ID],
  })),
];

const db = (): WakeCoalesceDb => {
  if (state.db === undefined) {
    throw new Error("db not ready");
  }
  return state.db;
};

describe("loadCoalescedProjectWakeMembershipIds (real SQL, PGlite)", () => {
  beforeAll(async () => {
    state.db = await createWakeCoalesceDb();
    holder.sql = state.db.sql;
  }, 60_000);

  afterEach(async () => {
    await db().reset();
  });

  it("coalesces behind an accepted, unread wake", async () => {
    await db().message({ id: "m1", agoSeconds: 30 });
    await db().attempt({ messageId: "m1", result: "http_200", agoSeconds: 29 });
    await db().message({ id: "m2", agoSeconds: 0 });
    expect(await coalesced("m2")).toEqual([WAKE_COALESCE_MEMBERSHIP_ID]);
    expect(await coalesced("m1")).toEqual([]);
  });

  it("coalesces behind a first-of-batch leader still in flight", async () => {
    await db().message({ id: "m1", agoSeconds: 3 });
    await db().message({ id: "m2", agoSeconds: 0 });
    expect(await coalesced("m2")).toEqual([WAKE_COALESCE_MEMBERSHIP_ID]);
  });

  it("wakes once the bot has read the leader", async () => {
    await db().message({ id: "m1", agoSeconds: 30, read: true });
    await db().attempt({ messageId: "m1", result: "http_200", agoSeconds: 29 });
    await db().message({ id: "m2", agoSeconds: 0 });
    expect(await coalesced("m2")).toEqual([]);
  });

  it("FIX 1: 429 stored, m1 deferred, m2 after the cooldown wakes", async () => {
    await db().message({ id: "m0", agoSeconds: 61, read: true });
    await db().attempt({ messageId: "m0", result: "http_429", agoSeconds: 61 });
    await db().message({ id: "m1", agoSeconds: 11 });
    await db().message({ id: "m2", agoSeconds: 0 });
    expect(await coalesced("m2")).toEqual([]);
  });

  it("FIX 1: an unstored row behind an older unread leader is not in flight", async () => {
    // m1 was coalesced behind m0 (within 120s of it); m0 has now left the window.
    await db().message({ id: "m0", agoSeconds: 125 });
    await db().attempt({
      messageId: "m0",
      result: "http_200",
      agoSeconds: 125,
    });
    await db().message({ id: "m1", agoSeconds: 8 });
    await db().message({ id: "m2", agoSeconds: 0 });
    expect(await coalesced("m2")).toEqual([]);
  });

  it.each(["task.done", "task.blocked", "task.ack", "ack", "msg.Acknowledged"])(
    "FIX 2: a lone unstored %s row does not coalesce a later task",
    async (kind) => {
      await db().message({ id: "m1", kind, agoSeconds: 3 });
      await db().message({ id: "m2", agoSeconds: 0 });
      expect(await coalesced("m2")).toEqual([]);
    },
  );

  it("FIX 2: an unread status row does not stop a real leader counting as in flight", async () => {
    await db().message({ id: "s1", kind: "task.received", agoSeconds: 20 });
    await db().message({ id: "m1", agoSeconds: 3 });
    await db().message({ id: "m2", agoSeconds: 0 });
    expect(await coalesced("m2")).toEqual([WAKE_COALESCE_MEMBERSHIP_ID]);
  });
});
