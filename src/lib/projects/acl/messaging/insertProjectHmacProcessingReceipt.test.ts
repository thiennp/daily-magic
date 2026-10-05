import { beforeEach, describe, expect, it, vi } from "vitest";

const insertMock = vi.fn();
const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

vi.mock("@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries", () => ({
  insertProjectMessageWithDeliveries: (input: unknown) => insertMock(input),
}));

import { insertProjectHmacProcessingReceipt } from "@/lib/projects/acl/messaging/insertProjectHmacProcessingReceipt";
import { PROJECT_MESSAGE_KIND_TASK_PROCESSING } from "@/lib/projects/acl/messaging/projectMessage.constants";

describe("insertProjectHmacProcessingReceipt", () => {
  beforeEach(() => {
    insertMock.mockReset();
    sqlMock.mockReset();
    insertMock.mockResolvedValue({ messageId: "receipt-1", wakeResults: [] });
  });

  it("inserts one task.processing receipt from peer to sender", async () => {
    sqlMock.mockResolvedValue([
      {
        id: "mem-a",
        user_id: "user-a",
        project_display_name: "Sender Bot",
      },
      {
        id: "mem-b",
        user_id: "user-b",
        project_display_name: "Peer B",
      },
    ]);
    await insertProjectHmacProcessingReceipt({
      projectId: "proj-1",
      originalMessageId: "msg-1",
      senderMembershipId: "mem-a",
      peerMembershipId: "mem-b",
    });
    expect(insertMock).toHaveBeenCalledTimes(1);
    expect(insertMock.mock.calls[0]?.[0]).toEqual({
      projectId: "proj-1",
      senderMembershipId: "mem-b",
      senderUserId: "user-b",
      senderProjectDisplayName: "Peer B",
      toMembershipId: "mem-a",
      toUserId: "user-a",
      toTeamLabel: null,
      toProjectDisplayName: "Sender Bot",
      kind: PROJECT_MESSAGE_KIND_TASK_PROCESSING,
      summary: "processing msg-1",
      refsJson: "{}",
      recipients: [{ id: "mem-a", user_id: "user-a" }],
    });
  });

  it("skips when peer is the sender or a membership is missing", async () => {
    await insertProjectHmacProcessingReceipt({
      projectId: "proj-1",
      originalMessageId: "msg-1",
      senderMembershipId: "mem-a",
      peerMembershipId: "mem-a",
    });
    expect(sqlMock).not.toHaveBeenCalled();
    expect(insertMock).not.toHaveBeenCalled();

    sqlMock.mockResolvedValue([
      { id: "mem-a", user_id: "user-a", project_display_name: "A" },
    ]);
    await insertProjectHmacProcessingReceipt({
      projectId: "proj-1",
      originalMessageId: "msg-1",
      senderMembershipId: "mem-a",
      peerMembershipId: "mem-b",
    });
    expect(insertMock).not.toHaveBeenCalled();
  });
});
