import { beforeEach, describe, expect, it, vi } from "vitest";

import { createProjectB2bFakeSql } from "@/lib/projects/acl/messaging/projectB2bFakeSql.fixtures";

const fake = vi.hoisted(() => ({ sql: null as unknown }));

vi.mock("@/lib/db", () => ({
  getSql: () => fake.sql,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

const insertMock = vi.fn(async (input: unknown) => {
  void input;
  return { messageId: "notice", wakeResults: [] };
});
vi.mock(
  "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries",
  () => ({
    insertProjectMessageWithDeliveries: (input: unknown) => insertMock(input),
  }),
);

import { checkProjectMessageSilence } from "@/lib/projects/acl/messaging/checkProjectMessageSilence";
import {
  PROJECT_MESSAGE_KIND_PEER_SILENT,
  PROJECT_MESSAGE_KIND_PEER_SILENT_BLOCKED,
  PROJECT_MESSAGE_SUMMARY_MAX_CHARS,
  PROJECT_MESSAGE_SYSTEM_SENDER_DISPLAY_NAME,
} from "@/lib/projects/acl/messaging/projectMessage.constants";
import { recordProjectPeerActivity } from "@/lib/projects/acl/messaging/recordProjectPeerActivity";

const wokenAt = new Date("2026-10-05T08:00:00.000Z");
const at = (minutes: number): Date =>
  new Date(wokenAt.getTime() + minutes * 60_000);

let db = createProjectB2bFakeSql();

const noticeKinds = (): unknown[] =>
  insertMock.mock.calls.map((call) => (call[0] as { kind: string }).kind);
const stateOf = (): string | undefined => db.deliveries.get("del-1")?.b2b_state;
const check = (minutes: number) =>
  checkProjectMessageSilence({ now: at(minutes) });
const fromB = (kind: string, minutes: number) =>
  recordProjectPeerActivity({
    fromMembershipId: "mem-b",
    toMembershipIds: ["mem-a"],
    kind,
    now: at(minutes),
  });

describe("checkProjectMessageSilence", () => {
  beforeEach(() => {
    insertMock.mockClear();
    db = createProjectB2bFakeSql();
    fake.sql = db.sql;
    db.deliveries.set("del-1", {
      id: "del-1",
      message_id: "msg-1",
      membership_id: "mem-b",
      b2b_state: "awaiting_first_activity",
      last_activity_at: wokenAt,
    });
  });

  it("does nothing before 5 minutes", async () => {
    expect(await check(4)).toBe(0);
    expect(insertMock).not.toHaveBeenCalled();
  });

  it("tells A at 5 minutes from the system, then blocks at 10", async () => {
    expect(await check(5)).toBe(1);
    expect(stateOf()).toBe("silent_5m_notified");
    const notice = insertMock.mock.calls[0]?.[0] as Record<string, unknown>;
    expect(notice).toEqual(
      expect.objectContaining({
        kind: PROJECT_MESSAGE_KIND_PEER_SILENT,
        senderMembershipId: null,
        senderProjectDisplayName: PROJECT_MESSAGE_SYSTEM_SENDER_DISPLAY_NAME,
        senderUserId: "user-a",
        toMembershipId: "mem-a",
        refsJson: "{}",
        recipients: [{ id: "mem-a", user_id: "user-a" }],
      }),
    );
    expect(String(notice.summary)).toContain("ask Bot B once");
    expect(String(notice.summary).length).toBeLessThanOrEqual(
      PROJECT_MESSAGE_SUMMARY_MAX_CHARS,
    );
    expect(await check(10)).toBe(1);
    expect(stateOf()).toBe("blocked_silent_10m");
    expect(await check(30)).toBe(0);
    expect(noticeKinds()).toEqual([
      PROJECT_MESSAGE_KIND_PEER_SILENT,
      PROJECT_MESSAGE_KIND_PEER_SILENT_BLOCKED,
    ]);
  });

  it("asks once per silence window", async () => {
    await check(5);
    await check(6);
    await check(9);
    expect(noticeKinds()).toEqual([PROJECT_MESSAGE_KIND_PEER_SILENT]);
  });

  it("sends one notice when two runs read the same row concurrently", async () => {
    const counts = await Promise.all([check(5), check(5)]);
    expect(counts.reduce((sum, n) => sum + n, 0)).toBe(1);
    expect(noticeKinds()).toEqual([PROJECT_MESSAGE_KIND_PEER_SILENT]);
    const blocked = await Promise.all([check(10), check(10)]);
    expect(blocked.reduce((sum, n) => sum + n, 0)).toBe(1);
    expect(stateOf()).toBe("blocked_silent_10m");
    expect(insertMock).toHaveBeenCalledTimes(2);
  });

  it("restarts the clock on each status: 5 then 10 minutes after the last one", async () => {
    await fromB("task.processing", 3);
    expect(stateOf()).toBe("processing");
    expect(await check(7)).toBe(0);
    await fromB("task.status", 7);
    expect(stateOf()).toBe("status_reporting");
    expect(db.deliveries.get("del-1")?.last_activity_at).toEqual(at(7));
    expect(await check(11)).toBe(0);
    expect(await check(12)).toBe(1);
    expect(stateOf()).toBe("silent_5m_notified");
    expect(await check(16)).toBe(0);
    expect(await check(17)).toBe(1);
    expect(stateOf()).toBe("blocked_silent_10m");
  });

  it("re-allows one ask after B speaks in the 5 minute window", async () => {
    await check(5);
    await fromB("task.status", 6);
    expect(stateOf()).toBe("status_reporting");
    expect(await check(10)).toBe(0);
    expect(await check(11)).toBe(1);
    expect(await check(12)).toBe(0);
    expect(noticeKinds()).toEqual([
      PROJECT_MESSAGE_KIND_PEER_SILENT,
      PROJECT_MESSAGE_KIND_PEER_SILENT,
    ]);
  });

  it("rejects a late reply after the 10 minute block", async () => {
    await check(5);
    await check(10);
    for (const kind of ["task.received", "task.status", "task.done", "x"]) {
      expect(await fromB(kind, 11)).toEqual({ matched: 1, moved: 0 });
    }
    expect(stateOf()).toBe("blocked_silent_10m");
    expect(db.deliveries.get("del-1")?.last_activity_at).toEqual(wokenAt);
  });

  it("uses only the passed now, even with fake timers far ahead", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(at(60));
    try {
      expect(await check(1)).toBe(0);
      expect(stateOf()).toBe("awaiting_first_activity");
    } finally {
      vi.useRealTimers();
    }
  });
});
