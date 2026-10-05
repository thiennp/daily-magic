import { beforeEach, describe, expect, it, vi } from "vitest";

const deleteWithOutcome = vi.hoisted(() =>
  vi.fn(async (input: { messageId: string }) => ({
    ok: true as const,
    messageId: input.messageId,
  })),
);

vi.mock("@/lib/projects/acl/messaging/deleteProjectMessageWithOutcome", () => ({
  deleteProjectMessageWithOutcome: deleteWithOutcome,
}));

import { deleteProjectMessageThroughLifecycle } from "@/lib/projects/acl/messaging/lifecycle/deleteProjectMessageThroughLifecycle";

const READ_AT = "2026-10-05T08:00:00.000Z";

describe("deleteProjectMessageThroughLifecycle", () => {
  beforeEach(() => {
    deleteWithOutcome.mockClear();
  });

  it("stops before delete when DOR is not ready", async () => {
    const result = await deleteProjectMessageThroughLifecycle({
      snapshot: {
        messageId: "m1",
        readAt: READ_AT,
        deliveryStates: ["processing"],
        kind: "task.assign",
      },
      deletedReason: "delete_on_read",
    });
    expect(result).toEqual({ ok: false, code: "not_ready_for_delete_on_read" });
    expect(deleteWithOutcome).not.toHaveBeenCalled();
  });

  it("delegates to deleteProjectMessageWithOutcome (History gate inside)", async () => {
    deleteWithOutcome.mockResolvedValueOnce({
      ok: false,
      code: "computer_ack_required",
    } as never);
    const blocked = await deleteProjectMessageThroughLifecycle({
      snapshot: {
        messageId: "m2",
        readAt: READ_AT,
        deliveryStates: [],
        kind: "peer.joined",
      },
      deletedReason: "delete_on_read",
    });
    expect(blocked).toEqual({ ok: false, code: "computer_ack_required" });
    const ok = await deleteProjectMessageThroughLifecycle({
      snapshot: {
        messageId: "m3",
        readAt: READ_AT,
        deliveryStates: ["done"],
        kind: "task.assign",
      },
      deletedReason: "delete_on_read",
    });
    expect(ok).toEqual({ ok: true, messageId: "m3" });
    expect(deleteWithOutcome).toHaveBeenLastCalledWith({
      messageId: "m3",
      deletedReason: "delete_on_read",
    });
  });
});
