import { beforeEach, describe, expect, it, vi } from "vitest";

const insertMock = vi.fn();
const persistMock = vi.fn();
const deliverMock = vi.fn();
const buildCmd = vi.fn();

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

import { dispatchProjectComputerAgentRun } from "@/lib/projects/acl/messaging/dispatchProjectComputerAgentRun";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

describe("dispatchProjectComputerAgentRun", () => {
  beforeEach(() => {
    insertMock.mockReset();
    persistMock.mockReset();
    deliverMock.mockReset();
    buildCmd.mockReset();
    insertMock.mockResolvedValue({ messageId: "msg-1", wakeResults: [] });
    persistMock.mockResolvedValue({ id: "run-1" });
    buildCmd.mockReturnValue({
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RUN,
      payload: { agentRunId: "run-1", prompt: "do it" },
    });
    deliverMock.mockResolvedValue({ kind: "delivered" });
  });

  it("persists message, creates agent run, delivers COMMAND_CLAUDE_RUN", async () => {
    const result = await dispatchProjectComputerAgentRun({
      projectId: "proj-1",
      actorUserId: "user-owner",
      senderMembershipId: null,
      membershipId: "mem-mac",
      deviceId: "dev-1",
      deviceOwnerUserId: "user-owner",
      kind: "task.assign",
      summary: "do it",
      refsJson: "{}",
      toProjectDisplayName: null,
    });
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
  });

  it("reports queued delivery when hub queues outbox", async () => {
    deliverMock.mockResolvedValue({ kind: "queued", outboxId: "ob-1" });
    const result = await dispatchProjectComputerAgentRun({
      projectId: "proj-1",
      actorUserId: "user-owner",
      senderMembershipId: null,
      membershipId: "mem-mac",
      deviceId: "dev-1",
      deviceOwnerUserId: "user-owner",
      kind: "task.assign",
      summary: "do it",
      refsJson: "{}",
      toProjectDisplayName: null,
    });
    expect(result).toMatchObject({ ok: true, delivery: "queued" });
  });
});
