import { beforeEach, describe, expect, it, vi } from "vitest";

const insertMock = vi.fn();
const receiptMock = vi.fn();

vi.mock(
  "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries",
  () => ({
    insertProjectMessageWithDeliveries: (input: unknown) => insertMock(input),
  }),
);
vi.mock(
  "@/lib/projects/acl/messaging/insertOwnerGrokWakeProcessingReceipts",
  () => ({
    insertOwnerGrokWakeProcessingReceipts: (input: unknown) =>
      receiptMock(input),
  }),
);

import { completeOwnerProjectMessageInsert } from "@/lib/projects/acl/messaging/completeOwnerProjectMessageInsert";

describe("completeOwnerProjectMessageInsert", () => {
  beforeEach(() => {
    insertMock.mockReset();
    receiptMock.mockReset();
    insertMock.mockResolvedValue({
      messageId: "msg-1",
      wakeResults: [{ membershipId: "mem-b", result: "http_200" }],
    });
    receiptMock.mockResolvedValue(undefined);
  });

  it("inserts then asks for Owner Grok wake processing receipts", async () => {
    const message = {
      projectId: "proj-1",
      senderMembershipId: null,
      senderUserId: "user-owner",
      toMembershipId: "mem-b",
      toUserId: "user-b",
      toTeamLabel: null,
      toProjectDisplayName: null,
      kind: "task.assign",
      summary: "do it",
      refsJson: "{}",
      recipients: [{ id: "mem-b", user_id: "user-b" }],
    };
    const recipients = [{ id: "mem-b", user_id: "user-b" }];
    const stored = await completeOwnerProjectMessageInsert({
      message,
      dispatchRecipients: recipients,
    });
    expect(stored.messageId).toBe("msg-1");
    expect(insertMock).toHaveBeenCalledWith(message);
    expect(receiptMock).toHaveBeenCalledWith({
      projectId: "proj-1",
      recipients,
      originalMessageId: "msg-1",
      wakeResults: [{ membershipId: "mem-b", result: "http_200" }],
    });
  });
});
