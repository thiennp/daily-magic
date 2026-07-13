import "./agentWitchHub.claude.testMocks";
import { describe, expect, it, beforeEach, vi } from "vitest";

import { AgentWitchHub } from "./agentWitchHub";
import { AgentWitchPairingStore } from "./agentWitchPairingStore";
import {
  USER_ID,
  createCollector,
  createHubFixture,
  registerPairedClients,
} from "./agentWitchHub.testHelpers";
import { AGENT_WITCH_MESSAGE_TYPES } from "./types/AgentWitchMessageType.constant";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";

vi.mock("@/lib/dispatch/agentRunQueries", () => ({
  getAgentRunById: vi.fn(async () => ({
    id: "run-1",
    groupId: null,
    requesterUserId: USER_ID,
    executorUserId: USER_ID,
    prompt: "run lint",
    status: AgentRunStatus.RUNNING,
    dispatchPolicy: "open",
    resultOutput: null,
    resultExitCode: null,
    denialReason: null,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    startedAt: null,
    completedAt: null,
    approvalExpiresAt: null,
    capabilityId: null,
    capabilityVersionId: null,
  })),
}));

describe("AgentWitchHub Claude input requests", () => {
  let hub: AgentWitchHub;
  let pairingStore: AgentWitchPairingStore;

  beforeEach(() => {
    const fixture = createHubFixture();
    hub = fixture.hub;
    pairingStore = fixture.pairingStore;
  });

  it("forwards input-required events from paired agent to dashboard", async () => {
    const dashboard = createCollector();
    await registerPairedClients(
      hub,
      pairingStore,
      () => undefined,
      dashboard.send,
    );

    const response = await hub.handleMessageAsync("agent-1", {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_INPUT_REQUIRED,
      payload: {
        agentRunId: "run-1",
        question: "Which branch?",
        partialOutput: "Checked out main.",
      },
      requestId: "req-input-1",
    });

    expect(response?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK);
    expect(dashboard.messages).toHaveLength(1);
    expect(dashboard.messages[0]?.type).toBe(
      AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_INPUT_REQUIRED,
    );
    expect(dashboard.messages[0]?.payload?.question).toBe("Which branch?");
  });
});
