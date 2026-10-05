import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();
const deleteWithOutcome = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/projects/acl/messaging/deleteProjectMessageWithOutcome", () => ({
  deleteProjectMessageWithOutcome: (input: unknown) => deleteWithOutcome(input),
}));

import { deleteHeldProjectMessageAfterComputerAck } from "@/lib/projects/acl/messaging/deleteHeldProjectMessageAfterComputerAck";

describe("deleteHeldProjectMessageAfterComputerAck", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    deleteWithOutcome.mockReset();
  });

  it("skips outcome when the recipient has not acked yet", async () => {
    sqlMock.mockResolvedValueOnce([{ acked_at: null }]);
    expect(
      await deleteHeldProjectMessageAfterComputerAck({
        projectId: "p1",
        messageId: "m1",
      }),
    ).toBe(false);
    expect(deleteWithOutcome).not.toHaveBeenCalled();
  });

  it("finalizes through deleteProjectMessageWithOutcome when held", async () => {
    sqlMock.mockResolvedValueOnce([{ acked_at: "2026-10-05T00:00:00.000Z" }]);
    deleteWithOutcome.mockResolvedValueOnce({ ok: true, messageId: "m1" });
    expect(
      await deleteHeldProjectMessageAfterComputerAck({
        projectId: "p1",
        messageId: "m1",
      }),
    ).toBe(true);
    expect(deleteWithOutcome).toHaveBeenCalledWith({
      messageId: "m1",
      deletedReason: "computer_ack",
      finalB2bState: "acked",
    });
  });
});
