import { beforeEach, describe, expect, it, vi } from "vitest";

const wakeMock = vi.hoisted(() => vi.fn());
const persistMock = vi.hoisted(() => vi.fn());
vi.mock("@/lib/projects/acl/webhooks/wakeProjectGrokRoutineWebhooks", () => ({
  wakeProjectGrokRoutineWebhooks: wakeMock,
}));
vi.mock(
  "@/lib/projects/acl/webhooks/persistProjectGrokRoutineWakeAttempt",
  () => ({ persistProjectGrokRoutineWakeAttempt: persistMock }),
);

import {
  isProjectMessageAckEventKind,
  isProjectMessageAssignerOnlyWakeKind,
  isProjectMessageNeverWakeKind,
  isProjectMessageWakeSkippedByPolicy,
} from "@/lib/projects/acl/messaging/isProjectMessageWakeSkippedByPolicy";
import { wakeProjectMessageGrokRoutines } from "@/lib/projects/acl/messaging/wakeProjectMessageGrokRoutines";

const ACK_KINDS = [
  "ack",
  "ACK",
  "acked",
  "task.ack",
  "task.acked",
  "msg.ack",
  "message.acknowledged",
  " inbox.ack ",
];
const WAKING_KINDS = [
  "task.request",
  "task",
  "member.dispatch",
  "peer.joined",
  "task.backlog",
  "hack",
  "ack.request",
  "task.ack-me",
];

describe("isProjectMessageWakeSkippedByPolicy ack events (DF-026)", () => {
  it.each(ACK_KINDS)("%s is an ack event and never wakes", (kind) => {
    expect(isProjectMessageAckEventKind(kind)).toBe(true);
    expect(isProjectMessageWakeSkippedByPolicy(kind)).toBe(true);
  });

  it.each(WAKING_KINDS)("%s still wakes", (kind) => {
    expect(isProjectMessageAckEventKind(kind)).toBe(false);
    expect(isProjectMessageWakeSkippedByPolicy(kind)).toBe(false);
  });

  it("no-wake list = received / processing / status + acks; done / blocked are assigner-only", () => {
    for (const kind of [
      "task.received",
      "task.processing",
      "task.status",
      "task.ack",
    ]) {
      expect(isProjectMessageNeverWakeKind(kind)).toBe(true);
    }
    for (const kind of ["task.done", "task.blocked"]) {
      expect(isProjectMessageNeverWakeKind(kind)).toBe(false);
      expect(isProjectMessageAssignerOnlyWakeKind(kind)).toBe(true);
      // Kind-level gate stays on: no broadcast wake, no HMAC receipt.
      expect(isProjectMessageWakeSkippedByPolicy(kind)).toBe(true);
    }
  });

  describe("wake path", () => {
    beforeEach(() => {
      wakeMock.mockReset();
      persistMock.mockReset();
      persistMock.mockResolvedValue(undefined);
    });

    it.each(["task.received", "task.processing", "task.status", "task.ack"])(
      "%s in reply to a terminal done/blocked never wakes (no DB lookup)",
      async (kind) => {
        const results = await wakeProjectMessageGrokRoutines({
          projectId: "proj-1",
          messageId: "msg-status",
          kind,
          summary: "processing 99999999-8888-4777-8666-555555555555",
          senderMembershipId: "mem-lead",
          recipientMembershipIds: ["mem-worker"],
        });
        expect(wakeMock).not.toHaveBeenCalled();
        expect(results).toEqual([
          { membershipId: "mem-worker", result: "skipped_by_policy" },
        ]);
      },
    );

    it("an ack-event message to bots fires no wake and stores skipped_by_policy", async () => {
      const results = await wakeProjectMessageGrokRoutines({
        projectId: "proj-1",
        messageId: "msg-ack",
        kind: "task.ack",
        summary: "acked msg-0",
        senderMembershipId: "mem-kai",
        senderProjectDisplayName: "Kai",
        recipientMembershipIds: ["mem-lead", "mem-other"],
      });
      expect(wakeMock).not.toHaveBeenCalled();
      expect(results).toEqual([
        { membershipId: "mem-lead", result: "skipped_by_policy" },
        { membershipId: "mem-other", result: "skipped_by_policy" },
      ]);
    });
  });
});
