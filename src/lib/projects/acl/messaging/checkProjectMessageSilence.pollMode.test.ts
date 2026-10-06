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
} from "@/lib/projects/acl/messaging/projectMessage.constants";

const wokenAt = new Date("2026-10-05T08:00:00.000Z");
const at = (minutes: number): Date =>
  new Date(wokenAt.getTime() + minutes * 60_000);

let db = createProjectB2bFakeSql();

const seed = (deliveryMode: "webhook" | "poll") => {
  db.deliveries.set("del-1", {
    id: "del-1",
    message_id: "msg-1",
    membership_id: "mem-b",
    b2b_state: "awaiting_first_activity",
    last_activity_at: wokenAt,
    delivery_mode: deliveryMode,
  });
};

describe("checkProjectMessageSilence poll-mode (delivery_mode)", () => {
  beforeEach(() => {
    insertMock.mockClear();
    db = createProjectB2bFakeSql();
    fake.sql = db.sql;
  });

  it("skips 5m notify and 10m block for poll peers", async () => {
    seed("poll");
    expect(await checkProjectMessageSilence({ now: at(5) })).toBe(0);
    expect(await checkProjectMessageSilence({ now: at(10) })).toBe(0);
    expect(await checkProjectMessageSilence({ now: at(30) })).toBe(0);
    expect(db.deliveries.get("del-1")?.b2b_state).toBe(
      "awaiting_first_activity",
    );
    expect(insertMock).not.toHaveBeenCalled();
  });

  it("keeps 5m/10m silence for webhook peers", async () => {
    seed("webhook");
    expect(await checkProjectMessageSilence({ now: at(5) })).toBe(1);
    expect(db.deliveries.get("del-1")?.b2b_state).toBe("silent_5m_notified");
    expect(await checkProjectMessageSilence({ now: at(10) })).toBe(1);
    expect(db.deliveries.get("del-1")?.b2b_state).toBe("blocked_silent_10m");
    expect(insertMock.mock.calls.map((c) => (c[0] as { kind: string }).kind)).toEqual([
      PROJECT_MESSAGE_KIND_PEER_SILENT,
      PROJECT_MESSAGE_KIND_PEER_SILENT_BLOCKED,
    ]);
  });
});
