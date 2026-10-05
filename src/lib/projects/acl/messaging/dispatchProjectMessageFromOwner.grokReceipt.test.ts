import { beforeEach, describe, expect, it, vi } from "vitest";

const completeMock = vi.fn();
const resolveMock = vi.fn();
const rateMock = vi.fn();
const auditMock = vi.fn();

vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({
  ensureProjectAclSchema: async () => undefined,
}));
vi.mock("@/lib/projects/acl/messaging/purgeExpiredProjectMessages", () => ({
  purgeExpiredProjectMessages: async () => undefined,
}));
vi.mock(
  "@/lib/projects/acl/messaging/assertProjectMessageDispatchRateLimits",
  () => ({
    assertProjectMessageDispatchRateLimits: (input: unknown) => rateMock(input),
  }),
);
vi.mock("@/lib/projects/acl/messaging/resolveDispatchRecipients", () => ({
  resolveDispatchRecipients: (input: unknown) => resolveMock(input),
}));
vi.mock(
  "@/lib/projects/acl/messaging/completeOwnerProjectMessageInsert",
  () => ({
    completeOwnerProjectMessageInsert: (input: unknown) => completeMock(input),
  }),
);
vi.mock("@/lib/projects/acl/writeProjectAccessAudit", () => ({
  writeProjectAccessAudit: (input: unknown) => auditMock(input),
}));

import { dispatchProjectMessageFromOwner } from "@/lib/projects/acl/messaging/dispatchProjectMessageFromOwner";

describe("dispatchProjectMessageFromOwner Grok processing receipt", () => {
  beforeEach(() => {
    completeMock.mockReset();
    resolveMock.mockReset();
    rateMock.mockReset();
    auditMock.mockReset();
    rateMock.mockResolvedValue({ ok: true });
    resolveMock.mockResolvedValue({
      ok: true,
      recipients: [{ id: "mem-b", user_id: "user-b" }],
    });
    completeMock.mockResolvedValue({
      messageId: "msg-1",
      wakeResults: [{ membershipId: "mem-b", result: "http_200" }],
    });
    auditMock.mockResolvedValue(undefined);
  });

  it("stores via completeOwnerProjectMessageInsert (wake receipts included)", async () => {
    const result = await dispatchProjectMessageFromOwner({
      projectId: "proj-1",
      ownerUserId: "user-owner",
      args: {
        kind: "task.assign",
        summary: "do the thing",
        toMembershipId: "mem-b",
      },
    });
    expect(result).toEqual({
      ok: true,
      messageId: "msg-1",
      recipientCount: 1,
    });
    expect(completeMock).toHaveBeenCalledTimes(1);
    const arg = completeMock.mock.calls[0]?.[0] as {
      dispatchRecipients: unknown;
      message: { senderMembershipId: unknown };
    };
    expect(arg.message.senderMembershipId).toBeNull();
    expect(arg.dispatchRecipients).toEqual([
      { id: "mem-b", user_id: "user-b" },
    ]);
  });
});
