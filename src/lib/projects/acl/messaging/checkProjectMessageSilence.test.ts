import { beforeEach, describe, expect, it, vi } from "vitest";

type Delivery = {
  id: string;
  message_id: string;
  membership_id: string;
  b2b_state: string;
  woken_at: Date;
};

const deliveries = new Map<string, Delivery>();

const fakeSql = async (
  strings: TemplateStringsArray,
  ...values: unknown[]
): Promise<unknown[]> => {
  const query = strings.join("?");
  if (query.includes("SELECT d.id, d.message_id")) {
    const [states, nowIso, secs] = values as [string[], string, number];
    const cutoffMs = Date.parse(nowIso) - secs * 1_000;
    return [...deliveries.values()]
      .filter(
        (d) => states.includes(d.b2b_state) && d.woken_at.getTime() <= cutoffMs,
      )
      .map((d) => ({
        ...d,
        project_id: "proj-1",
        sender_membership_id: "mem-a",
        sender_user_id: "user-a",
        sender_display_name: "Bot A",
        peer_membership_id: d.membership_id,
        peer_user_id: "user-b",
        peer_display_name: "Bot B",
      }));
  }
  if (query.includes("SELECT d.id, d.b2b_state")) {
    const [fromMembershipId, toIds] = values as [string, string[]];
    return toIds.includes("mem-a")
      ? [...deliveries.values()].filter(
          (d) => d.membership_id === fromMembershipId,
        )
      : [];
  }
  if (query.includes("UPDATE project_message_deliveries")) {
    const [to, , id, from] = values as [string, string, string, string];
    const row = deliveries.get(id);
    if (row === undefined || row.b2b_state !== from) {
      return [];
    }
    row.b2b_state = to;
    return [{ id }];
  }
  throw new Error(`unexpected query: ${query}`);
};

vi.mock("@/lib/db", () => ({
  getSql: () => fakeSql,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

const insertMock = vi.fn(async (_input: unknown) => ({
  messageId: "notice",
  wakeResults: [],
}));
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
} from "@/lib/projects/acl/messaging/projectMessage.constants";
import { recordProjectPeerActivity } from "@/lib/projects/acl/messaging/recordProjectPeerActivity";

const wokenAt = new Date("2026-10-05T08:00:00.000Z");
const at = (minutes: number): Date =>
  new Date(wokenAt.getTime() + minutes * 60_000);

const noticeKinds = (): unknown[] =>
  insertMock.mock.calls.map((call) => (call[0] as { kind: string }).kind);

const stateOf = (): string | undefined => deliveries.get("del-1")?.b2b_state;

const replyFromB = (kind: string, now: Date) =>
  recordProjectPeerActivity({
    fromMembershipId: "mem-b",
    toMembershipIds: ["mem-a"],
    kind,
    now,
  });

describe("checkProjectMessageSilence", () => {
  beforeEach(() => {
    insertMock.mockClear();
    deliveries.clear();
    deliveries.set("del-1", {
      id: "del-1",
      message_id: "msg-1",
      membership_id: "mem-b",
      b2b_state: "awaiting_first_activity",
      woken_at: wokenAt,
    });
  });

  it("does nothing before 5 minutes", async () => {
    expect(await checkProjectMessageSilence({ now: at(4) })).toBe(0);
    expect(insertMock).not.toHaveBeenCalled();
    expect(stateOf()).toBe("awaiting_first_activity");
  });

  it("tells A once at 5 minutes, then blocks and tells A at 10 minutes", async () => {
    expect(await checkProjectMessageSilence({ now: at(5) })).toBe(1);
    expect(stateOf()).toBe("silent_5m_notified");
    const notice = insertMock.mock.calls[0]?.[0] as Record<string, unknown>;
    expect(notice).toEqual(
      expect.objectContaining({
        kind: PROJECT_MESSAGE_KIND_PEER_SILENT,
        senderMembershipId: "mem-b",
        toMembershipId: "mem-a",
        refsJson: "{}",
        recipients: [{ id: "mem-a", user_id: "user-a" }],
      }),
    );
    expect(String(notice.summary)).toContain("ask Bot B once");
    expect(String(notice.summary).length).toBeLessThanOrEqual(
      PROJECT_MESSAGE_SUMMARY_MAX_CHARS,
    );

    expect(await checkProjectMessageSilence({ now: at(10) })).toBe(1);
    expect(stateOf()).toBe("blocked_silent_10m");
    expect(noticeKinds()).toEqual([
      PROJECT_MESSAGE_KIND_PEER_SILENT,
      PROJECT_MESSAGE_KIND_PEER_SILENT_BLOCKED,
    ]);

    expect(await checkProjectMessageSilence({ now: at(30) })).toBe(0);
    expect(insertMock).toHaveBeenCalledTimes(2);
  });

  it("asks B only once: repeated checks before 10 minutes add no notice", async () => {
    await checkProjectMessageSilence({ now: at(5) });
    await checkProjectMessageSilence({ now: at(6) });
    await checkProjectMessageSilence({ now: at(9) });
    expect(noticeKinds()).toEqual([PROJECT_MESSAGE_KIND_PEER_SILENT]);
    expect(stateOf()).toBe("silent_5m_notified");
  });

  it("returns to the normal path on activity after the 5 minute notice", async () => {
    await checkProjectMessageSilence({ now: at(5) });
    expect(await replyFromB("task.processing", at(6))).toEqual({
      matched: 1,
      moved: 1,
    });
    expect(stateOf()).toBe("processing");
    expect(await checkProjectMessageSilence({ now: at(10) })).toBe(0);
    expect(noticeKinds()).toEqual([PROJECT_MESSAGE_KIND_PEER_SILENT]);
  });

  it("does not reopen a delivery blocked at 10 minutes on a late reply", async () => {
    await checkProjectMessageSilence({ now: at(5) });
    await checkProjectMessageSilence({ now: at(10) });
    for (const kind of ["task.received", "task.done", "free.text"]) {
      expect(await replyFromB(kind, at(11))).toEqual({ matched: 1, moved: 0 });
    }
    expect(stateOf()).toBe("blocked_silent_10m");
  });

  it("uses only the passed now, with fake timers far in the future", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(at(60));
    try {
      expect(await checkProjectMessageSilence({ now: at(1) })).toBe(0);
      expect(stateOf()).toBe("awaiting_first_activity");
    } finally {
      vi.useRealTimers();
    }
  });
});
