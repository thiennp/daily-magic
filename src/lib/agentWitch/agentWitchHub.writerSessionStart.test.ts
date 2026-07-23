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

describe("AgentWitchHub writer session start", () => {
  let hub: AgentWitchHub;
  let pairingStore: AgentWitchPairingStore;

  beforeEach(() => {
    const fixture = createHubFixture();
    hub = fixture.hub;
    pairingStore = fixture.pairingStore;
    clearWriterSessionsForTests();
  });

  it("relays writer session start from dashboard to paired agent", async () => {
    const agent = createCollector();
    await registerPairedClients(hub, pairingStore, agent.send, () => undefined);

    const response = await hub.handleMessageAsync("dash-1", {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_START,
      payload: { writerAgent: "cursor" },
      requestId: "req-writer-start-1",
    });

    expect(response?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK);
    expect(typeof response?.payload?.writerSessionId).toBe("string");
    expect(agent.messages).toHaveLength(1);
    expect(agent.messages[0]?.type).toBe(
      AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_START,
    );
    expect(agent.messages[0]?.payload?.writerAgent).toBe("cursor");
    expect(agent.messages[0]?.payload?.writerSessionId).toBe(
      response?.payload?.writerSessionId,
    );
  });

  it("broadcasts writer session ready from agent to dashboard", async () => {
    const agent = createCollector();
    const dashboard = createCollector();
    await registerPairedClients(hub, pairingStore, agent.send, dashboard.send);

    const start = await hub.handleMessageAsync("dash-1", {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_START,
      payload: { writerAgent: "cursor" },
      requestId: "req-writer-start-2",
    });
    const writerSessionId = start?.payload?.writerSessionId;
    expect(typeof writerSessionId).toBe("string");

    const response = await hub.handleMessageAsync("agent-1", {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_READY,
      payload: {
        writerAgent: "cursor",
        writerSessionId,
        output: "Cursor is ready on your Mac.\n",
        exitCode: 0,
      },
      requestId: "req-writer-ready-1",
    });

    expect(response?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK);
    expect(dashboard.messages).toHaveLength(1);
    expect(dashboard.messages[0]?.type).toBe(
      AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_READY,
    );
    expect(dashboard.messages[0]?.payload?.writerSessionId).toBe(
      writerSessionId,
    );
  });
});
