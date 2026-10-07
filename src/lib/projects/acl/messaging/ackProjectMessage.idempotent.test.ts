import { beforeEach, describe, expect, it, vi } from "vitest";

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

import { ackProjectMessage } from "@/lib/projects/acl/messaging/ackProjectMessage";
import {
  ackIdempotentMessage as message,
  ackIdempotentState as state,
  resetAckIdempotentState,
} from "@/lib/projects/acl/messaging/ackProjectMessage.idempotent.fixtures";

const ack = (messageId: string, actorUserId: string) =>
  ackProjectMessage({ messageId, actorUserId });
const NOT_FOUND = { ok: false, code: "not_found" };
const okAck = (messageId: string) => ({ ok: true, messageId });
const alreadyAcked = (messageId: string) => ({
  ok: true,
  messageId,
  alreadyAcked: true,
});

describe("ackProjectMessage idempotent (DF-020/021)", () => {
  beforeEach(() => {
    resetAckIdempotentState();
  });

  it("first ack ok; second ack ok with alreadyAcked", async () => {
    state.messages.set("msg-1", message("msg-1", "bot-1", "mem-1"));
    expect(await ack("msg-1", "bot-1")).toEqual(okAck("msg-1"));
    expect(state.messages.has("msg-1")).toBe(false);
    expect(await ack("msg-1", "bot-1")).toEqual(alreadyAcked("msg-1"));
  });

  it("unknown id is not_found", async () => {
    expect(await ack("nope", "bot-1")).toEqual(NOT_FOUND);
  });

  it("another recipient's already-acked id is not_found", async () => {
    state.messages.set("msg-2", message("msg-2", "bot-2", "mem-2"));
    expect((await ack("msg-2", "bot-2")).ok).toBe(true);
    expect(await ack("msg-2", "bot-1")).toEqual(NOT_FOUND);
  });

  it("matches the caller's membership when the outcome has no user id", async () => {
    state.outcomes.set("msg-3", {
      project_id: "proj-1",
      recipient_user_id: null,
      recipient_membership_id: "mem-1",
    });
    expect(await ack("msg-3", "bot-1")).toEqual(alreadyAcked("msg-3"));
    expect(await ack("msg-3", "bot-2")).toEqual(NOT_FOUND);
  });

  it("a sibling wake deleting between SELECT and DELETE reads as alreadyAcked", async () => {
    state.messages.set("msg-4", message("msg-4", "bot-1", "mem-1"));
    state.siblingDeletesFirst = true;
    expect(await ack("msg-4", "bot-1")).toEqual(alreadyAcked("msg-4"));
  });

  it("a row held for computerAck reports alreadyAcked on the repeat", async () => {
    state.gate = "deny";
    state.messages.set("msg-5", message("msg-5", "bot-1", "mem-1"));
    expect(await ack("msg-5", "bot-1")).toEqual(okAck("msg-5"));
    expect(await ack("msg-5", "bot-1")).toEqual(alreadyAcked("msg-5"));
  });
});
