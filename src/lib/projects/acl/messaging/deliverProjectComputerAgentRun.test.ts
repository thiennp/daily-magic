import { beforeEach, describe, expect, it, vi } from "vitest";

const deliverMock = vi.fn();
const buildCmd = vi.fn();

vi.mock("@/lib/agentWitch/deliverOrQueueAgentWitchDispatchMessage", () => ({
  deliverOrQueueAgentWitchDispatchMessage: (input: unknown) =>
    deliverMock(input),
}));
vi.mock("@/lib/dispatch/buildCommandClaudeRunDispatchMessage", () => ({
  buildCommandClaudeRunDispatchMessage: (input: unknown) => buildCmd(input),
}));

import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { deliverProjectComputerAgentRun } from "@/lib/projects/acl/messaging/deliverProjectComputerAgentRun";

const input = {
  agentRunId: "run-1",
  prompt: "do it",
  projectId: "proj-1",
  messageId: "msg-1",
  deviceOwnerUserId: "user-owner",
  deviceId: "dev-1",
} as const;

describe("deliverProjectComputerAgentRun", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    buildCmd.mockReturnValue({
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RUN,
    });
    deliverMock.mockResolvedValue({ kind: "delivered" });
  });

  it("sends COMMAND_CLAUDE_RUN to the owner's computer with no permission/limit override", async () => {
    expect(await deliverProjectComputerAgentRun(input)).toBe("delivered");
    expect(buildCmd).toHaveBeenCalledWith({
      prompt: "do it",
      agentRunId: "run-1",
      writerAgent: "claude-cli",
      projectId: "proj-1",
      requestId: "msg-1",
    });
    expect(deliverMock).toHaveBeenCalledWith({
      userId: "user-owner",
      deviceId: "dev-1",
      idempotencyKey: "project-computer-task:msg-1",
      message: { type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RUN },
    });
  });

  it("maps queued and anything else to queued / unavailable", async () => {
    deliverMock.mockResolvedValue({ kind: "queued", outboxId: "ob-1" });
    expect(await deliverProjectComputerAgentRun(input)).toBe("queued");
    deliverMock.mockResolvedValue({ kind: "no_device" });
    expect(await deliverProjectComputerAgentRun(input)).toBe("unavailable");
  });
});
