import { beforeEach, describe, expect, it, vi } from "vitest";

const calls: string[] = [];
const wakeResults = [{ membershipId: "mem-b", result: "http_200" }];

const insertMock = vi.fn(async (input: unknown) => {
  void input;
  calls.push("insert");
  return { messageId: "msg-1", wakeResults };
});
const wakeStepMock = vi.fn((stored: { wakeResults: unknown }) => {
  calls.push("wake");
  return stored.wakeResults;
});
const receiptsMock = vi.fn(async (input: unknown) => {
  void input;
  calls.push("receipts");
});
const activityMock = vi.fn(async (input: unknown) => {
  void input;
  calls.push("activity");
  return { matched: 0, moved: 0 };
});
const watchMock = vi.fn(async (input: unknown) => {
  void input;
  calls.push("watch");
  return 1;
});

vi.mock(
  "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries",
  () => ({
    insertProjectMessageWithDeliveries: (input: unknown) => insertMock(input),
  }),
);
vi.mock("@/lib/projects/acl/messaging/readProjectMessageWakeStep", () => ({
  readProjectMessageWakeStep: (stored: { wakeResults: unknown }) =>
    wakeStepMock(stored),
}));
vi.mock("@/lib/projects/acl/messaging/insertProjectProcessingReceipts", () => ({
  insertProjectProcessingReceipts: (input: unknown) => receiptsMock(input),
}));
vi.mock("@/lib/projects/acl/messaging/recordProjectPeerActivity", () => ({
  recordProjectPeerActivity: (input: unknown) => activityMock(input),
}));
vi.mock("@/lib/projects/acl/messaging/startProjectMessageSilenceWatch", () => ({
  startProjectMessageSilenceWatch: (input: unknown) => watchMock(input),
}));

import { orchestrateProjectBotToBotMessage } from "@/lib/projects/acl/messaging/orchestrateProjectBotToBotMessage";

const now = new Date("2026-10-05T08:00:00.000Z");

const send = (kind: string) =>
  orchestrateProjectBotToBotMessage({
    message: {
      projectId: "proj-1",
      senderMembershipId: "mem-a",
      senderProjectDisplayName: "Bot A",
      senderUserId: "user-a",
      toMembershipId: "mem-b",
      toUserId: "user-b",
      toTeamLabel: null,
      toProjectDisplayName: null,
      kind,
      summary: "do it",
      refsJson: "{}",
      recipients: [{ id: "mem-b", user_id: "user-b" }],
    },
    dispatchRecipients: [{ id: "mem-b", user_id: "user-b" }],
    now,
  });

describe("orchestrateProjectBotToBotMessage", () => {
  beforeEach(() => {
    calls.length = 0;
    vi.clearAllMocks();
  });

  it("runs store, wake, receipt, activity, watch in order", async () => {
    const result = await send("task.assign");
    expect(result).toEqual({ messageId: "msg-1", wakeResults });
    expect(calls).toEqual(["insert", "wake", "receipts", "activity", "watch"]);
    expect(insertMock).toHaveBeenCalledTimes(1);
    expect(wakeStepMock).toHaveBeenCalledTimes(1);
    expect(receiptsMock.mock.calls[0]?.[0]).toEqual(
      expect.objectContaining({ originalMessageId: "msg-1", wakeResults }),
    );
    expect(activityMock.mock.calls[0]?.[0]).toEqual({
      fromMembershipId: "mem-a",
      toMembershipIds: ["mem-b"],
      kind: "task.assign",
      now,
    });
    expect(watchMock.mock.calls[0]?.[0]).toEqual({
      messageId: "msg-1",
      senderMembershipId: "mem-a",
      wakeResults,
      now,
    });
  });

  it("does not start a watch for a reply kind", async () => {
    await send("task.done");
    expect(calls).toEqual(["insert", "wake", "receipts", "activity"]);
  });

  it("does not start a watch when the message answers an open request", async () => {
    activityMock.mockImplementationOnce(async () => {
      calls.push("activity");
      return { matched: 1, moved: 1 };
    });
    await send("free.text");
    expect(watchMock).not.toHaveBeenCalled();
  });
});
