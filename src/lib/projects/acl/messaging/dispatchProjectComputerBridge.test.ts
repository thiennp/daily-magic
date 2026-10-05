import { beforeEach, describe, expect, it, vi } from "vitest";

const resolveMock = vi.fn();
const gateMock = vi.fn();
const bridgeMock = vi.fn();
const insertMock = vi.fn();
const orchestrateMock = vi.fn();
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
    assertProjectMessageDispatchRateLimits: async () => ({ ok: true }),
  }),
);
vi.mock("@/lib/projects/acl/messaging/checkProjectMessageSilence", () => ({
  checkProjectMessageSilence: async () => 0,
}));
vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({
  getActiveProjectMembership: async () => ({
    id: "mem-human",
    projectId: "proj-1",
    userId: "user-owner",
    role: "member",
    status: "active",
    memberKind: "human",
    teamLabel: null,
    scopes: ["msg:dispatch"],
    projectDisplayName: "Thien",
    createdAt: "2026-01-01T00:00:00.000Z",
    revokedAt: null,
  }),
}));
vi.mock("@/lib/projects/acl/messaging/resolveDispatchRecipients", () => ({
  resolveDispatchRecipients: (input: unknown) => resolveMock(input),
}));
vi.mock(
  "@/lib/projects/acl/messaging/assertComputerDispatchAssignable",
  () => ({
    assertComputerDispatchAssignable: (input: unknown) => gateMock(input),
  }),
);
vi.mock(
  "@/lib/projects/acl/messaging/dispatchProjectComputerAgentRun",
  () => ({
    dispatchProjectComputerAgentRun: (input: unknown) => bridgeMock(input),
  }),
);
vi.mock(
  "@/lib/projects/acl/messaging/orchestrateProjectBotToBotMessage",
  () => ({
    orchestrateProjectBotToBotMessage: (input: unknown) =>
      orchestrateMock(input),
  }),
);
vi.mock("@/lib/projects/acl/messaging/writeProjectMessageDispatchAudit", () => ({
  writeProjectMessageDispatchAudit: (input: unknown) => auditMock(input),
}));
vi.mock(
  "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries",
  () => ({
    insertProjectMessageWithDeliveries: (input: unknown) => insertMock(input),
  }),
);
vi.mock("@/lib/projects/acl/writeProjectAccessAudit", () => ({
  writeProjectAccessAudit: async () => undefined,
}));

import { dispatchProjectMessage } from "@/lib/projects/acl/messaging/dispatchProjectMessage";
import { dispatchProjectMessageFromOwner } from "@/lib/projects/acl/messaging/dispatchProjectMessageFromOwner";

const computerRecipient = {
  id: "mem-mac",
  user_id: "user-owner",
  memberKind: "computer" as const,
  deviceId: "dev-1",
};

describe("dispatch computer assign→agent-run bridge", () => {
  beforeEach(() => {
    resolveMock.mockReset();
    gateMock.mockReset();
    bridgeMock.mockReset();
    insertMock.mockReset();
    orchestrateMock.mockReset();
    auditMock.mockReset();
    auditMock.mockResolvedValue(undefined);
  });

  it("rejects offline computer with computer_not_assignable / offline", async () => {
    resolveMock.mockResolvedValue({
      ok: true,
      recipients: [computerRecipient],
    });
    gateMock.mockResolvedValue({
      ok: false,
      code: "computer_not_assignable",
      cause: "offline",
    });
    const result = await dispatchProjectMessageFromOwner({
      projectId: "proj-1",
      ownerUserId: "user-owner",
      args: {
        toMembershipId: "mem-mac",
        summary: "run tests",
      },
    });
    expect(result).toEqual({
      ok: false,
      code: "computer_not_assignable",
      cause: "offline",
    });
    expect(bridgeMock).not.toHaveBeenCalled();
    expect(insertMock).not.toHaveBeenCalled();
  });

  it("rejects too_old computer with computer_not_assignable / too_old", async () => {
    resolveMock.mockResolvedValue({
      ok: true,
      recipients: [computerRecipient],
    });
    gateMock.mockResolvedValue({
      ok: false,
      code: "computer_not_assignable",
      cause: "too_old",
    });
    const result = await dispatchProjectMessage({
      projectId: "proj-1",
      actorUserId: "user-owner",
      args: {
        kind: "task.assign",
        summary: "run tests",
        toMembershipId: "mem-mac",
      },
    });
    expect(result).toEqual({
      ok: false,
      code: "computer_not_assignable",
      cause: "too_old",
    });
    expect(bridgeMock).not.toHaveBeenCalled();
    expect(orchestrateMock).not.toHaveBeenCalled();
  });

  it("happy path: assignable computer bridges to agent-run (mocked hub)", async () => {
    resolveMock.mockResolvedValue({
      ok: true,
      recipients: [computerRecipient],
    });
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
      args: {
        toMembershipId: "mem-mac",
        summary: "implement feature",
      },
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

  it("bot recipient still uses orchestrate path (no computer bridge)", async () => {
    resolveMock.mockResolvedValue({
      ok: true,
      recipients: [
        {
          id: "mem-bot",
          user_id: "bot-1",
          memberKind: "bot",
          deviceId: null,
        },
      ],
    });
    orchestrateMock.mockResolvedValue({
      messageId: "msg-bot",
      wakeResults: [],
    });
    const result = await dispatchProjectMessage({
      projectId: "proj-1",
      actorUserId: "user-owner",
      args: {
        kind: "task.assign",
        summary: "bot work",
        toMembershipId: "mem-bot",
      },
    });
    expect(result).toMatchObject({ ok: true, messageId: "msg-bot" });
    expect(gateMock).not.toHaveBeenCalled();
    expect(bridgeMock).not.toHaveBeenCalled();
    expect(orchestrateMock).toHaveBeenCalled();
  });
});
