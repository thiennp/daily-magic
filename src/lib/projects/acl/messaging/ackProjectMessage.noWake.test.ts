import { beforeEach, describe, expect, it, vi } from "vitest";

const insertMessage = vi.hoisted(() => vi.fn());
const wakeRoutines = vi.hoisted(() => vi.fn());
const wakeWebhooks = vi.hoisted(() => vi.fn());
const deliverWebhooks = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", async () => {
  const f =
    await import("@/lib/projects/acl/messaging/ackProjectMessage.idempotent.fixtures");
  return {
    getSql: () => f.ackIdempotentSql,
    asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
  };
});
vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({
  ensureProjectAclSchema: async () => {},
}));
vi.mock("@/lib/projects/acl/getActiveProjectMembership", async () => {
  const f =
    await import("@/lib/projects/acl/messaging/ackProjectMessage.idempotent.fixtures");
  return {
    getActiveProjectMembership: async (_projectId: string, userId: string) =>
      f.ackIdempotentMemberships[userId] ?? null,
  };
});
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: async () => ({ id: "proj-1", ownerUserId: "owner-1" }),
}));
vi.mock("@/lib/projects/acl/writeProjectAccessAudit", () => ({
  writeProjectAccessAudit: async () => undefined,
}));
vi.mock("@/lib/projects/acl/messaging/gateProjectMessageDelete", async () => {
  const f =
    await import("@/lib/projects/acl/messaging/ackProjectMessage.idempotent.fixtures");
  return { gateProjectMessageDelete: async () => f.ackIdempotentState.gate };
});
vi.mock(
  "@/lib/projects/acl/messaging/deleteProjectMessageWithOutcome",
  async () => {
    const f =
      await import("@/lib/projects/acl/messaging/ackProjectMessage.idempotent.fixtures");
    return {
      deleteProjectMessageWithOutcome: f.ackIdempotentDeleteWithOutcome,
    };
  },
);
// Any message insert or wake from the ack path would hit one of these.
vi.mock(
  "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries",
  () => ({ insertProjectMessageWithDeliveries: insertMessage }),
);
vi.mock("@/lib/projects/acl/messaging/wakeProjectMessageGrokRoutines", () => ({
  wakeProjectMessageGrokRoutines: wakeRoutines,
}));
vi.mock("@/lib/projects/acl/webhooks/wakeProjectGrokRoutineWebhooks", () => ({
  wakeProjectGrokRoutineWebhooks: wakeWebhooks,
}));
vi.mock("@/lib/projects/acl/webhooks/deliverProjectMessageWebhooks", () => ({
  deliverProjectMessageWebhooks: deliverWebhooks,
}));

import { ackProjectMessage } from "@/lib/projects/acl/messaging/ackProjectMessage";
import {
  ackIdempotentMessage as message,
  ackIdempotentState as state,
  resetAckIdempotentState,
} from "@/lib/projects/acl/messaging/ackProjectMessage.idempotent.fixtures";

const SPIES = [insertMessage, wakeRoutines, wakeWebhooks, deliverWebhooks];
const ack = (messageId: string) =>
  ackProjectMessage({ messageId, actorUserId: "bot-1" });

describe("ackProjectMessage never creates a message or wake (DF-026)", () => {
  beforeEach(() => {
    resetAckIdempotentState();
    SPIES.forEach((spy) => spy.mockReset());
  });

  it("ack, re-ack, computerAck hold, sibling race and not_found wake nothing", async () => {
    state.messages.set("msg-1", message("msg-1", "bot-1", "mem-1"));
    expect(await ack("msg-1")).toEqual({ ok: true, messageId: "msg-1" });
    expect(await ack("msg-1")).toMatchObject({ alreadyAcked: true });
    state.gate = "deny";
    state.messages.set("msg-2", message("msg-2", "bot-1", "mem-1"));
    expect((await ack("msg-2")).ok).toBe(true);
    state.gate = "allow";
    state.siblingDeletesFirst = true;
    state.messages.set("msg-3", message("msg-3", "bot-1", "mem-1"));
    expect(await ack("msg-3")).toMatchObject({ alreadyAcked: true });
    expect(await ack("nope")).toEqual({ ok: false, code: "not_found" });
    SPIES.forEach((spy) => expect(spy).not.toHaveBeenCalled());
  });
});
