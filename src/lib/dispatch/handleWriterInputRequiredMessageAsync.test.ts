import { describe, expect, it, vi } from "vitest";

import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { getAgentRunById } from "@/lib/dispatch/agentRunQueries";
import { handleClaudeInputRequiredMessageAsync } from "@/lib/dispatch/handleWriterInputRequiredMessageAsync";

vi.mock("@/lib/dispatch/agentRunQueries", () => ({ getAgentRunById: vi.fn() }));
vi.mock("@/lib/dispatch/dispatchWriterRunToAgent", () => ({
  notifyDashboardUser: vi.fn(),
}));

describe("handleClaudeInputRequiredMessageAsync", () => {
  it("returns system.error with run_not_awaiting_input and agentRunId when run is missing or not running", async () => {
    vi.mocked(getAgentRunById).mockResolvedValue({
      id: "run-1",
      requesterUserId: "member-1",
      executorUserId: "device-owner",
      status: "completed",
    } as never);

    const sender = { role: "agent", id: "a1", userId: "device-owner" };
    const message = {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_INPUT_REQUIRED,
      payload: { agentRunId: "run-1", question: "yes?" },
      requestId: "req-1",
    };

    const response = await handleClaudeInputRequiredMessageAsync(
      {} as never,
      message,
      sender as never,
    );

    expect(response).toMatchObject({
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage: "Agent run is not eligible for input requests.",
        errorCode: "run_not_awaiting_input",
        agentRunId: "run-1",
      },
    });
  });
});
