import { beforeEach, describe, expect, it, vi } from "vitest";

const resolveMock = vi.fn();
const gateMock = vi.fn();
const bridgeMock = vi.fn();
const orchestrateMock = vi.fn();

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
vi.mock("@/lib/projects/acl/messaging/assertComputerDispatchAssignable", () => ({
  assertComputerDispatchAssignable: (input: unknown) => gateMock(input),
}));
vi.mock("@/lib/projects/acl/messaging/dispatchProjectComputerAgentRun", () => ({
  dispatchProjectComputerAgentRun: (input: unknown) => bridgeMock(input),
}));
vi.mock("@/lib/projects/acl/messaging/orchestrateProjectBotToBotMessage", () => ({
  orchestrateProjectBotToBotMessage: (input: unknown) => orchestrateMock(input),
}));
vi.mock("@/lib/projects/acl/messaging/writeProjectMessageDispatchAudit", () => ({
  writeProjectMessageDispatchAudit: async () => undefined,
}));
vi.mock("@/lib/projects/acl/writeProjectAccessAudit", () => ({
  writeProjectAccessAudit: async () => undefined,
}));

import { dispatchProjectMessage } from "@/lib/projects/acl/messaging/dispatchProjectMessage";

const dispatchTo = (toMembershipId: string, summary: string) =>
  dispatchProjectMessage({
    projectId: "proj-1",
    actorUserId: "user-owner",
    args: { kind: "task.assign", summary, toMembershipId },
  });

describe("member dispatch computer assign→agent-run bridge", () => {
  beforeEach(() => {
    resolveMock.mockReset();
    gateMock.mockReset();
    bridgeMock.mockReset();
    orchestrateMock.mockReset();
  });

  it("rejects too_old computer with computer_not_assignable / too_old", async () => {
    resolveMock.mockResolvedValue({
      ok: true,
      recipients: [
        { id: "mem-mac", user_id: "user-owner", memberKind: "computer", deviceId: "dev-1" },
      ],
    });
    gateMock.mockResolvedValue({
      ok: false,
      code: "computer_not_assignable",
      cause: "too_old",
    });
    const result = await dispatchTo("mem-mac", "run tests");
    expect(result).toEqual({
      ok: false,
      code: "computer_not_assignable",
      cause: "too_old",
    });
    expect(bridgeMock).not.toHaveBeenCalled();
    expect(orchestrateMock).not.toHaveBeenCalled();
  });

  it("bot recipient still uses orchestrate path (no computer bridge)", async () => {
    resolveMock.mockResolvedValue({
      ok: true,
      recipients: [{ id: "mem-bot", user_id: "bot-1", memberKind: "bot", deviceId: null }],
    });
    orchestrateMock.mockResolvedValue({ messageId: "msg-bot", wakeResults: [] });
    const result = await dispatchTo("mem-bot", "bot work");
    expect(result).toMatchObject({ ok: true, messageId: "msg-bot" });
    expect(gateMock).not.toHaveBeenCalled();
    expect(bridgeMock).not.toHaveBeenCalled();
    expect(orchestrateMock).toHaveBeenCalled();
  });
});
