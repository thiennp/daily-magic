import { beforeEach, describe, expect, it, vi } from "vitest";

const wakeMock = vi.fn();
const persistMock = vi.fn();
vi.mock("@/lib/projects/acl/webhooks/wakeProjectGrokRoutineWebhooks", () => ({
  wakeProjectGrokRoutineWebhooks: (input: unknown) => wakeMock(input),
}));
vi.mock(
  "@/lib/projects/acl/webhooks/persistProjectGrokRoutineWakeAttempt",
  () => ({
    persistProjectGrokRoutineWakeAttempt: (input: unknown) =>
      persistMock(input),
  }),
);

import { isProjectMessageWakeSkippedByPolicy } from "@/lib/projects/acl/messaging/isProjectMessageWakeSkippedByPolicy";
import { STORED_GROK_WAKE_RESULT } from "@/lib/projects/acl/messaging/storedGrokWakeResult.constant";
import { wakeProjectMessageGrokRoutines } from "@/lib/projects/acl/messaging/wakeProjectMessageGrokRoutines";

const STATUS_KINDS = [
  "task.received",
  "task.processing",
  "task.status",
  "task.done",
  "task.blocked",
] as const;

const base = {
  projectId: "proj-1",
  messageId: "msg-1",
  summary: "processing msg-0",
  senderMembershipId: "mem-kai",
  senderProjectDisplayName: "Kai",
  recipientMembershipIds: ["mem-lead", "mem-lead", "mem-other"],
};

describe("wakeProjectMessageGrokRoutines status-kind policy (DF-022)", () => {
  beforeEach(() => {
    wakeMock.mockReset();
    persistMock.mockReset();
    persistMock.mockResolvedValue(undefined);
  });

  it.each(STATUS_KINDS)(
    "%s to a bot fires no wake and stores skipped_by_policy",
    async (kind) => {
      const results = await wakeProjectMessageGrokRoutines({ ...base, kind });
      expect(wakeMock).not.toHaveBeenCalled();
      expect(results).toEqual([
        { membershipId: "mem-lead", result: "skipped_by_policy" },
        { membershipId: "mem-other", result: "skipped_by_policy" },
      ]);
      expect(persistMock.mock.calls.map((call) => call[0])).toEqual([
        {
          messageId: "msg-1",
          membershipId: "mem-lead",
          result: "skipped_by_policy",
        },
        {
          messageId: "msg-1",
          membershipId: "mem-other",
          result: "skipped_by_policy",
        },
      ]);
    },
  );

  it.each(["task.assign", "chat.note", "task.ping"])(
    "%s still fires the wake",
    async (kind) => {
      wakeMock.mockResolvedValue([
        { membershipId: "mem-lead", result: "http_200" },
      ]);
      const results = await wakeProjectMessageGrokRoutines({ ...base, kind });
      expect(wakeMock).toHaveBeenCalledTimes(1);
      expect(persistMock).not.toHaveBeenCalled();
      expect(results).toEqual([
        { membershipId: "mem-lead", result: "http_200" },
      ]);
    },
  );

  it("never throws when storing the skip fails", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    persistMock.mockRejectedValue(new Error("db_down"));
    const results = await wakeProjectMessageGrokRoutines({
      ...base,
      kind: "task.done",
    });
    expect(results).toEqual([]);
    expect(wakeMock).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it("skipped_by_policy is an accepted stored wake result", () => {
    expect(STORED_GROK_WAKE_RESULT.test("skipped_by_policy")).toBe(true);
    expect(STORED_GROK_WAKE_RESULT.test("not_postable")).toBe(true);
    expect(STORED_GROK_WAKE_RESULT.test("skipped")).toBe(false);
  });

  it("policy covers exactly the status kinds", () => {
    for (const kind of STATUS_KINDS) {
      expect(isProjectMessageWakeSkippedByPolicy(kind)).toBe(true);
    }
    for (const kind of [
      "task.assign",
      "peer.joined",
      "project.updated",
      "task",
    ]) {
      expect(isProjectMessageWakeSkippedByPolicy(kind)).toBe(false);
    }
  });
});
