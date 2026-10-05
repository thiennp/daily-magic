import { beforeEach, describe, expect, it, vi } from "vitest";

import { acceptProjectMessageComputerAck } from "@/lib/projects/acl/messaging/acceptProjectMessageComputerAck";
import { createProjectComputerHistoryFakeSql } from "@/lib/projects/acl/messaging/projectComputerHistoryFakeSql.fixtures";

const fake = vi.hoisted(() => ({
  current: null as ReturnType<
    typeof createProjectComputerHistoryFakeSql
  > | null,
}));

vi.mock("@/lib/db", () => ({
  getSql: () => fake.current?.sql,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/projects/acl/messaging/deleteProjectMessageWithOutcome", () => ({
  deleteProjectMessageWithOutcome: async (input: {
    readonly messageId: string;
    readonly deletedReason: string;
  }) => {
    const message = fake.current?.messages.get(input.messageId);
    if (message === undefined) {
      return { ok: false, code: "not_found" as const };
    }
    fake.current?.messages.delete(input.messageId);
    return { ok: true, messageId: input.messageId };
  },
}));

const addMessage = (id: string, ackedAt: Date | null = null): void => {
  fake.current?.messages.set(id, {
    id,
    project_id: "p1",
    created_at: new Date("2026-10-05T08:00:00.000Z"),
    acked_at: ackedAt,
  });
};

const ack = (messageId: string) =>
  acceptProjectMessageComputerAck({
    projectId: "p1",
    messageId,
    deviceId: "dev-1",
  });

describe("acceptProjectMessageComputerAck", () => {
  beforeEach(() => {
    fake.current = createProjectComputerHistoryFakeSql();
    fake.current.states.set("p1", "on_ready");
  });

  it("posting computerAck twice is idempotent", async () => {
    addMessage("m1");
    const first = await ack("m1");
    const second = await ack("m1");
    expect(first).toMatchObject({ ok: true, alreadyAcked: false });
    expect(second).toMatchObject({ ok: true, alreadyAcked: true });
    expect(fake.current?.acks.size).toBe(1);
    expect(fake.current?.messages.has("m1")).toBe(true);
  });

  it("a repeat ack still succeeds after the message row is gone", async () => {
    addMessage("m1", new Date());
    const first = await ack("m1");
    expect(first).toMatchObject({ ok: true, deleted: true });
    expect(fake.current?.messages.has("m1")).toBe(false);
    expect(await ack("m1")).toMatchObject({
      ok: true,
      alreadyAcked: true,
      deleted: false,
    });
  });

  it("rejects a message that is not in the project", async () => {
    expect(await ack("missing")).toEqual({ ok: false, code: "not_found" });
    expect(fake.current?.acks.size).toBe(0);
  });

  it("deletes a held message once the recipient has acked it", async () => {
    addMessage("held", new Date());
    addMessage("open");
    expect(await ack("held")).toMatchObject({ deleted: true });
    expect(await ack("open")).toMatchObject({ deleted: false });
    expect(fake.current?.messages.has("open")).toBe(true);
  });

  it("degraded goes back to on_ready once the backlog is acked", async () => {
    fake.current?.states.set("p1", "degraded");
    addMessage("m1");
    addMessage("m2");
    expect(await ack("m1")).toMatchObject({ state: "degraded" });
    expect(await ack("m2")).toMatchObject({ state: "on_ready" });
    expect(fake.current?.states.get("p1")).toBe("on_ready");
  });
});
