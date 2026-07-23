import "./agentWitchHub.writerRun.testMocks";
import { beforeEach, describe, expect, it } from "vitest";

import { AgentWitchHub } from "./agentWitchHub";
import { AgentWitchPairingStore } from "./agentWitchPairingStore";
import {
  createCollector,
  createHubFixture,
  registerPairedClients,
} from "./agentWitchHub.testHelpers";
import { AGENT_WITCH_MESSAGE_TYPES } from "./types/AgentWitchMessageType.constant";
import { clearWriterSessionsForTests } from "@/lib/dispatch/writerSessionRegistry";

describe("AgentWitchHub writer session chunk", () => {
  let hub: AgentWitchHub;
  let pairingStore: AgentWitchPairingStore;

  beforeEach(() => {
    const fixture = createHubFixture();
    hub = fixture.hub;
    pairingStore = fixture.pairingStore;
    clearWriterSessionsForTests();
  });

  it("broadcasts writer session chunks from agent to subscribed dashboard", async () => {
    const agent = createCollector();
    const dashboard = createCollector();
    await registerPairedClients(hub, pairingStore, agent.send, dashboard.send);

    const start = await hub.handleMessageAsync("dash-1", {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_START,
      payload: { writerAgent: "claude-cli" },
      requestId: "req-writer-start-chunk",
    });
    const writerSessionId = start?.payload?.writerSessionId;
    expect(typeof writerSessionId).toBe("string");

    const response = await hub.handleMessageAsync("agent-1", {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_CHUNK,
      payload: {
        writerAgent: "claude-cli",
        writerSessionId,
        chunk: "2.1.161 (Claude Code)\n",
      },
      requestId: "req-writer-chunk-1",
    });

    expect(response?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK);
    expect(dashboard.messages).toHaveLength(1);
    expect(dashboard.messages[0]?.type).toBe(
      AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_CHUNK,
    );
    expect(dashboard.messages[0]?.payload?.chunk).toBe(
      "2.1.161 (Claude Code)\n",
    );
  });

  it("broadcasts chunks when the agent omits deviceId", async () => {
    const agent = createCollector();
    const dashboard = createCollector();
    await registerPairedClients(hub, pairingStore, agent.send, dashboard.send);

    const start = await hub.handleMessageAsync("dash-1", {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_START,
      payload: { writerAgent: "claude-cli" },
      requestId: "req-writer-start-deviceless-agent",
    });
    const writerSessionId = start?.payload?.writerSessionId;
    expect(typeof writerSessionId).toBe("string");

    hub.updateClient("agent-1", { deviceId: undefined });

    const response = await hub.handleMessageAsync("agent-1", {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_CHUNK,
      payload: {
        writerAgent: "claude-cli",
        writerSessionId,
        chunk: "Preparing claude-cli CLI on your Mac…\n",
      },
      requestId: "req-writer-chunk-deviceless-agent",
    });

    expect(response?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK);
    expect(dashboard.messages).toHaveLength(1);
    expect(dashboard.messages[0]?.payload?.chunk).toContain("Preparing");
  });
});
