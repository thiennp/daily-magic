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
vi.mock("@/lib/projects/acl/writeProjectAccessAudit", async () => ({
  writeProjectAccessAudit: (
    await import("@/lib/projects/acl/messaging/ackProjectMessage.idempotent.fixtures")
  ).ackIdempotentAudit,
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
const okAck = (messageId: string) => ({ ok: true, messageId });
const alreadyAcked = (messageId: string) => ({
  ok: true,
  messageId,
  alreadyAcked: true,
});

describe("ackProjectMessage first ack is atomic (Arch FIX 3b)", () => {
  beforeEach(() => {
    resetAckIdempotentState();
  });

  it("concurrent first acks on a held row write exactly 1 audit (FIX 3b)", async () => {
    state.gate = "deny";
    state.messages.set("msg-7", message("msg-7", "bot-1", "mem-1"));
    const results = await Promise.all([
      ack("msg-7", "bot-1"),
      ack("msg-7", "bot-1"),
    ]);
    expect(state.audits).toBe(1);
    expect(results).toContainEqual(okAck("msg-7"));
    expect(results).toContainEqual(alreadyAcked("msg-7"));
  });

  it("a first ack on the computer_ack_required delete path writes 1 audit", async () => {
    state.messages.set("msg-8", message("msg-8", "bot-1", "mem-1"));
    state.deleteCode = "computer_ack_required";
    expect(await ack("msg-8", "bot-1")).toEqual(okAck("msg-8"));
    expect(state.audits).toBe(1);
  });
});
