import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/db", () => ({
  getSql: () => vi.fn(),
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

import { isComputerAckSatisfiedForCloudDelete } from "@/lib/projects/acl/messaging/isComputerAckSatisfiedForCloudDelete";
import { PROJECT_MESSAGE_HISTORY_COMPUTER_ACK_MODE } from "@/lib/projects/acl/messaging/projectMessage.constants";

describe("isComputerAckSatisfiedForCloudDelete", () => {
  it("is a no-op allow while History computerAck mode is off", async () => {
    expect(PROJECT_MESSAGE_HISTORY_COMPUTER_ACK_MODE).toBe("off");
    await expect(
      isComputerAckSatisfiedForCloudDelete({
        projectId: "proj-1",
        messageId: "msg-1",
      }),
    ).resolves.toBe(true);
  });
});
