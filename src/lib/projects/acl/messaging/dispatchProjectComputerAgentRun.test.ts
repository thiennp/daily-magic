import { beforeEach, describe, expect, it, vi } from "vitest";

const insertMock = vi.fn();
const persistMock = vi.fn();
const deliverMock = vi.fn();
const buildCmd = vi.fn();
const policyMock = vi.fn();
const flagMock = vi.fn();
const requestApprovalMock = vi.fn();

vi.mock(
  "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries",
  () => ({
    insertProjectMessageWithDeliveries: (input: unknown) => insertMock(input),
  }),
);
vi.mock("@/lib/dispatch/persistAgentRun", () => ({
  persistAgentRun: (input: unknown) => persistMock(input),
}));
vi.mock("@/lib/agentWitch/deliverOrQueueAgentWitchDispatchMessage", () => ({
  deliverOrQueueAgentWitchDispatchMessage: (input: unknown) =>
    deliverMock(input),
}));
vi.mock("@/lib/dispatch/buildCommandClaudeRunDispatchMessage", () => ({
  buildCommandClaudeRunDispatchMessage: (input: unknown) => buildCmd(input),
}));
vi.mock("@/lib/dispatch/resolveDispatchPolicyForExecutor", () => ({
  resolveDispatchPolicyForExecutor: (input: unknown) => policyMock(input),
}));
vi.mock(
  "@/lib/projects/acl/runsWithoutApproval/readProjectRunsWithoutApproval",
  () => ({
    readProjectRunsWithoutApproval: (projectId: string) => flagMock(projectId),
  }),
);
vi.mock("@/lib/projects/acl/messaging/requestComputerRunApproval", () => ({
  requestComputerRunApproval: (input: unknown) => requestApprovalMock(input),
}));

import { dispatchProjectComputerAgentRun } from "@/lib/projects/acl/messaging/dispatchProjectComputerAgentRun";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { DISPATCH_APPROVAL_TTL_MS } from "@/lib/dispatch/dispatchApprovalTtl.constant";

const baseInput = {
  projectId: "proj-1",
  senderMembershipId: null,
  membershipId: "mem-mac",
  deviceId: "dev-1",
  deviceOwnerUserId: "user-owner",
  kind: "task.assign",
  summary: "do it",
  refsJson: "{}",
  toProjectDisplayName: null,
} as const;

const asOwner = { ...baseInput, actorUserId: "user-owner" };
const asBot = {
  ...baseInput,
  actorUserId: "bot-user-1",
  senderMembershipId: "mem-bot",
  senderProjectDisplayName: "Buni",
};

describe("dispatchProjectComputerAgentRun", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    insertMock.mockResolvedValue({ messageId: "msg-1", wakeResults: [] });
    persistMock.mockResolvedValue({ id: "run-1" });
    buildCmd.mockReturnValue({
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RUN,
      payload: { agentRunId: "run-1", prompt: "do it" },
    });
    deliverMock.mockResolvedValue({ kind: "delivered" });
    policyMock.mockResolvedValue("approval");
    flagMock.mockResolvedValue(false);
    requestApprovalMock.mockResolvedValue(undefined);
  });

  it("owner's own assign: persists, runs, delivers COMMAND_CLAUDE_RUN (never OPEN)", async () => {
    const result = await dispatchProjectComputerAgentRun(asOwner);
    expect(result).toEqual({
      ok: true,
      messageId: "msg-1",
      agentRunId: "run-1",
      delivery: "delivered",
    });
    expect(persistMock).toHaveBeenCalledWith(
      expect.objectContaining({
        deviceId: "dev-1",
        projectId: "proj-1",
        prompt: "do it",
        status: "running",
        dispatchPolicy: "approval",
        approvalExpiresAt: null,
      }),
    );
    expect(buildCmd).toHaveBeenCalledWith(
      expect.objectContaining({
        agentRunId: "run-1",
        prompt: "do it",
        projectId: "proj-1",
      }),
    );
    expect(deliverMock).toHaveBeenCalledWith(
      expect.objectContaining({
        deviceId: "dev-1",
        userId: "user-owner",
        idempotencyKey: "project-computer-task:msg-1",
      }),
    );
    expect(deliverMock.mock.calls[0][0].message.type).toBe(
      AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RUN,
    );
    expect(requestApprovalMock).not.toHaveBeenCalled();
    expect(flagMock).not.toHaveBeenCalled();
  });

  it("reports queued delivery when hub queues outbox", async () => {
    deliverMock.mockResolvedValue({ kind: "queued", outboxId: "ob-1" });
    const result = await dispatchProjectComputerAgentRun(asOwner);
    expect(result).toMatchObject({ ok: true, delivery: "queued" });
  });

  it("bot assign with the setting OFF (default): pending approval, 15 min, nothing sent to the computer", async () => {
    const before = Date.now();
    const result = await dispatchProjectComputerAgentRun(asBot);
    expect(result).toEqual({
      ok: true,
      messageId: "msg-1",
      agentRunId: "run-1",
      delivery: "pending_approval",
    });
    const persisted = persistMock.mock.calls[0][0];
    expect(persisted).toMatchObject({
      requesterUserId: "bot-user-1",
      executorUserId: "user-owner",
      status: "pending_approval",
      dispatchPolicy: "approval",
    });
    const ttl = Date.parse(persisted.approvalExpiresAt) - before;
    expect(ttl).toBeGreaterThanOrEqual(DISPATCH_APPROVAL_TTL_MS - 1000);
    expect(ttl).toBeLessThanOrEqual(DISPATCH_APPROVAL_TTL_MS + 1000);
    expect(policyMock).toHaveBeenCalledWith({ executorUserId: "user-owner" });
    expect(flagMock).toHaveBeenCalledWith("proj-1");
    expect(requestApprovalMock).toHaveBeenCalledWith(
      expect.objectContaining({
        runId: "run-1",
        requesterUserId: "bot-user-1",
        requesterLabel: "Buni",
        executorUserId: "user-owner",
        deviceId: "dev-1",
        projectId: "proj-1",
        requestId: "msg-1",
        approvalExpiresAt: persisted.approvalExpiresAt,
      }),
    );
    expect(deliverMock).not.toHaveBeenCalled();
    expect(buildCmd).not.toHaveBeenCalled();
  });

  it("human member assign also needs approval", async () => {
    const result = await dispatchProjectComputerAgentRun({
      ...baseInput,
      actorUserId: "user-member",
      senderMembershipId: "mem-human",
    });
    expect(result).toMatchObject({ delivery: "pending_approval" });
  });

  it("setting ON: bot assign skips approval but sends the very same run command (flags and limits are applied on the computer)", async () => {
    flagMock.mockResolvedValue(true);
    const result = await dispatchProjectComputerAgentRun(asBot);
    expect(result).toMatchObject({ ok: true, delivery: "delivered" });
    expect(persistMock).toHaveBeenCalledWith(
      expect.objectContaining({ status: "running", dispatchPolicy: "open" }),
    );
    expect(requestApprovalMock).not.toHaveBeenCalled();
    const botCommand = buildCmd.mock.calls[0][0];
    buildCmd.mockClear();
    flagMock.mockResolvedValue(false);
    await dispatchProjectComputerAgentRun(asOwner);
    const ownerCommand = buildCmd.mock.calls[0][0];
    // No permission/limit override travels on the wire: AWL's workspace-write
    // profile and limits are unconditional (scripts/buildWriterCliInvocation).
    expect(botCommand).toEqual(ownerCommand);
    expect(Object.keys(botCommand).sort()).toEqual(
      ["agentRunId", "projectId", "prompt", "requestId", "writerAgent"].sort(),
    );
  });
});
