import { beforeEach, describe, expect, it, vi } from "vitest";

const resolveMock = vi.fn();
const gateMock = vi.fn();
const bridgeMock = vi.fn();
const insertMock = vi.fn();

vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({
  ensureProjectAclSchema: async () => undefined,
}));
vi.mock("@/lib/projects/acl/messaging/purgeExpiredProjectMessages", () => ({
  purgeExpiredProjectMessages: async () => undefined,
}));
vi.mock(
  "@/lib/projects/acl/messaging/assertProjectMessageDispatchRateLimits",
  () => ({
    assertProjectMessageDispatchRateLimits: async () => ({ ok: true }),
  }),
);
vi.mock("@/lib/projects/acl/messaging/resolveDispatchRecipients", () => ({
  resolveDispatchRecipients: (input: unknown) => resolveMock(input),
}));
vi.mock("@/lib/projects/acl/messaging/assertComputerDispatchAssignable", () => ({
  assertComputerDispatchAssignable: (input: unknown) => gateMock(input),
}));
vi.mock("@/lib/projects/acl/messaging/dispatchProjectComputerAgentRun", () => ({
  dispatchProjectComputerAgentRun: (input: unknown) => bridgeMock(input),
}));
vi.mock("@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries", () => ({
  insertProjectMessageWithDeliveries: (input: unknown) => insertMock(input),
}));
vi.mock("@/lib/projects/acl/writeProjectAccessAudit", () => ({
  writeProjectAccessAudit: async () => undefined,
}));

import { dispatchProjectMessageFromOwner } from "@/lib/projects/acl/messaging/dispatchProjectMessageFromOwner";

const computerRecipient = {
  id: "mem-mac",
  user_id: "user-owner",
  memberKind: "computer" as const,
  deviceId: "dev-1",
};

describe("owner dispatch computer assign→agent-run bridge", () => {
  beforeEach(() => {
    resolveMock.mockReset();
    gateMock.mockReset();
    bridgeMock.mockReset();
    insertMock.mockReset();
    resolveMock.mockResolvedValue({ ok: true, recipients: [computerRecipient] });
  });

  it("rejects offline computer with computer_not_assignable / offline", async () => {
    gateMock.mockResolvedValue({
      ok: false,
      code: "computer_not_assignable",
      cause: "offline",
    });
    const result = await dispatchProjectMessageFromOwner({
      projectId: "proj-1",
      ownerUserId: "user-owner",
      args: { toMembershipId: "mem-mac", summary: "run tests" },
    });
    expect(result).toEqual({
      ok: false,
      code: "computer_not_assignable",
      cause: "offline",
    });
    expect(bridgeMock).not.toHaveBeenCalled();
    expect(insertMock).not.toHaveBeenCalled();
  });

  it("happy path: assignable computer bridges to agent-run (mocked hub)", async () => {
    gateMock.mockResolvedValue({ ok: true });
    bridgeMock.mockResolvedValue({
      ok: true,
      messageId: "msg-1",
      agentRunId: "run-1",
      delivery: "delivered",
    });
    const result = await dispatchProjectMessageFromOwner({
      projectId: "proj-1",
      ownerUserId: "user-owner",
      args: { toMembershipId: "mem-mac", summary: "implement feature" },
    });
    expect(result).toEqual({
      ok: true,
      messageId: "msg-1",
      recipientCount: 1,
      agentRunId: "run-1",
    });
    expect(gateMock).toHaveBeenCalledWith({
      deviceId: "dev-1",
      ownerUserId: "user-owner",
    });
    expect(bridgeMock).toHaveBeenCalledWith(
      expect.objectContaining({
        membershipId: "mem-mac",
        deviceId: "dev-1",
        deviceOwnerUserId: "user-owner",
        summary: "implement feature",
        kind: "task.assign",
      }),
    );
    expect(insertMock).not.toHaveBeenCalled();
  });
});
