import { beforeEach, describe, expect, it } from "vitest";

import "./agentWitchHub.writerRun.testMocks";
import { AgentWitchHub } from "./agentWitchHub";
import { AgentWitchPairingStore } from "./agentWitchPairingStore";
import {
  createCollector,
  createHubFixture,
  registerPairedClients,
} from "./agentWitchHub.testHelpers";
import { clearAgentWitchCursorLoginDeliveryRegistryForTests } from "@/lib/agentWitch/agentWitchCursorLoginDeliveryRegistry";
import { CURSOR_AUTHENTICATION_REQUIRED_ERROR_SNIPPET } from "@/lib/agentWitch/cursorAuthenticationRequiredErrorSnippet.constant";
import { AGENT_WITCH_MESSAGE_TYPES } from "./types/AgentWitchMessageType.constant";
import { clearWriterSessionsForTests } from "@/lib/dispatch/writerSessionRegistry";

describe("AgentWitchHub cursor authentication login push (AGENT-044)", () => {
  let hub: AgentWitchHub;
  let pairingStore: AgentWitchPairingStore;

  beforeEach(() => {
    const fixture = createHubFixture();
    hub = fixture.hub;
    pairingStore = fixture.pairingStore;
    clearWriterSessionsForTests();
    clearAgentWitchCursorLoginDeliveryRegistryForTests();
  });

  it("pushes writer.ensure when a writer session chunk reports Cursor auth required", async () => {
    const agent = createCollector();
    const dashboard = createCollector();
    await registerPairedClients(hub, pairingStore, agent.send, dashboard.send);

    const start = await hub.handleMessageAsync("dash-1", {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_START,
      payload: { writerAgent: "cursor" },
      requestId: "req-writer-start-cursor-auth",
    });
    const writerSessionId = start?.payload?.writerSessionId;
    expect(typeof writerSessionId).toBe("string");

    await hub.handleMessageAsync("agent-1", {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_CHUNK,
      payload: {
        writerAgent: "cursor",
        writerSessionId,
        chunk: `Error: ${CURSOR_AUTHENTICATION_REQUIRED_ERROR_SNIPPET}\n`,
      },
      requestId: "req-writer-chunk-cursor-auth",
    });

    const writerEnsureMessages = agent.messages.filter(
      (message) => message.type === AGENT_WITCH_MESSAGE_TYPES.WRITER_ENSURE,
    );
    expect(writerEnsureMessages).toHaveLength(1);
    expect(writerEnsureMessages[0]?.payload).toEqual({
      writerAgent: "cursor",
      reason: "cursor-authentication-required",
    });
  });
});
