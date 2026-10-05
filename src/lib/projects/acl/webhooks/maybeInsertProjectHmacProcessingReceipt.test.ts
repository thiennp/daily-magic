import { beforeEach, describe, expect, it, vi } from "vitest";

const insertMock = vi.fn();
vi.mock("@/lib/projects/acl/messaging/insertProjectProcessingReceipt", () => ({
  insertProjectProcessingReceipt: (...args: unknown[]) => insertMock(...args),
}));

import { maybeInsertProjectHmacProcessingReceipt } from "@/lib/projects/acl/webhooks/maybeInsertProjectHmacProcessingReceipt";
import { PROJECT_MESSAGE_KIND_TASK_PROCESSING } from "@/lib/projects/acl/messaging/projectMessage.constants";

const payload = {
  projectId: "proj-1",
  messageId: "msg-1",
  kind: "task.ping",
  fromMembershipId: "mem-sender" as string | null,
};

describe("maybeInsertProjectHmacProcessingReceipt", () => {
  beforeEach(() => {
    insertMock.mockReset();
    insertMock.mockResolvedValue(undefined);
  });

  it("inserts when deliveryOk and sender is a peer membership", async () => {
    await maybeInsertProjectHmacProcessingReceipt({
      payload,
      peerMembershipId: "mem-a",
      deliveryOk: true,
    });
    expect(insertMock).toHaveBeenCalledWith({
      projectId: "proj-1",
      peer: "mem-a",
      sender: "mem-sender",
      originalMessageId: "msg-1",
    });
  });

  it("inserts when deliveryOk and sender is Owner (fromMembershipId null)", async () => {
    await maybeInsertProjectHmacProcessingReceipt({
      payload: { ...payload, fromMembershipId: null },
      peerMembershipId: "mem-a",
      deliveryOk: true,
    });
    expect(insertMock).toHaveBeenCalledWith({
      projectId: "proj-1",
      peer: "mem-a",
      sender: null,
      originalMessageId: "msg-1",
    });
  });

  it("skips failed delivery", async () => {
    await maybeInsertProjectHmacProcessingReceipt({
      payload,
      peerMembershipId: "mem-a",
      deliveryOk: false,
    });
    expect(insertMock).not.toHaveBeenCalled();
  });

  it("skips processing kind", async () => {
    await maybeInsertProjectHmacProcessingReceipt({
      payload: { ...payload, kind: PROJECT_MESSAGE_KIND_TASK_PROCESSING },
      peerMembershipId: "mem-a",
      deliveryOk: true,
    });
    expect(insertMock).not.toHaveBeenCalled();
  });
});
