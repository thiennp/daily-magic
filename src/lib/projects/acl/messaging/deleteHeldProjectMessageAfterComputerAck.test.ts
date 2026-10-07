import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();
const pruneMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/projects/acl/messaging/pruneProjectChatMessages", () => ({
  pruneProjectChatMessages: (input: unknown) => pruneMock(input),
}));

import { deleteHeldProjectMessageAfterComputerAck } from "@/lib/projects/acl/messaging/deleteHeldProjectMessageAfterComputerAck";

describe("deleteHeldProjectMessageAfterComputerAck", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    pruneMock.mockReset();
  });

  it("returns false when the message is gone", async () => {
    sqlMock.mockResolvedValueOnce([]);
    expect(
      await deleteHeldProjectMessageAfterComputerAck({
        projectId: "p1",
        messageId: "m1",
      }),
    ).toBe(false);
    expect(pruneMock).not.toHaveBeenCalled();
  });

  it("prunes the chat instead of deleting the held row", async () => {
    sqlMock.mockResolvedValueOnce([
      { chat_key: "bot-1", acked_at: "2026-10-05T00:00:00.000Z" },
    ]);
    pruneMock.mockResolvedValueOnce(2);
    expect(
      await deleteHeldProjectMessageAfterComputerAck({
        projectId: "p1",
        messageId: "m1",
      }),
    ).toBe(true);
    expect(pruneMock).toHaveBeenCalledWith({
      projectId: "p1",
      chatKey: "bot-1",
    });
  });
});
