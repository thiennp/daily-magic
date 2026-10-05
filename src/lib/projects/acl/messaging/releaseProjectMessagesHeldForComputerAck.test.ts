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

import { releaseProjectMessagesHeldForComputerAck } from "@/lib/projects/acl/messaging/releaseProjectMessagesHeldForComputerAck";

describe("releaseProjectMessagesHeldForComputerAck", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    deleteWithOutcome.mockReset();
  });

  it("returns 0 when nothing is held", async () => {
    sqlMock.mockResolvedValueOnce([]);
    expect(
      await releaseProjectMessagesHeldForComputerAck({ projectId: "p1" }),
    ).toBe(0);
    expect(deleteWithOutcome).not.toHaveBeenCalled();
  });

  it("finalizes each held row through deleteProjectMessageWithOutcome", async () => {
    sqlMock.mockResolvedValueOnce([{ id: "a" }, { id: "b" }]);
    deleteWithOutcome
      .mockResolvedValueOnce({ ok: true, messageId: "a" })
      .mockResolvedValueOnce({ ok: false, code: "not_found" });
    expect(
      await releaseProjectMessagesHeldForComputerAck({ projectId: "p1" }),
    ).toBe(1);
    expect(deleteWithOutcome).toHaveBeenNthCalledWith(1, {
      messageId: "a",
      deletedReason: "ack",
      finalB2bState: "acked",
    });
    expect(deleteWithOutcome).toHaveBeenNthCalledWith(2, {
      messageId: "b",
      deletedReason: "ack",
      finalB2bState: "acked",
    });
  });
});
