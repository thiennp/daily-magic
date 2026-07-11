import { describe, expect, it, beforeEach, vi } from "vitest";

vi.mock("@/lib/harness/syncHarnessCatalogFromReport", () => ({
  syncHarnessCatalogFromReport: vi.fn(async () => undefined),
}));

import { AgentWitchHub } from "./agentWitchHub";
import { AgentWitchPairingStore } from "./agentWitchPairingStore";
import {
  createCollector,
  createHubFixture,
  registerPairedClients,
} from "./agentWitchHub.testHelpers";
import { AGENT_WITCH_MESSAGE_TYPES } from "./types/AgentWitchMessageType.constant";

describe("AgentWitchHub harness", () => {
  let hub: AgentWitchHub;
  let pairingStore: AgentWitchPairingStore;

  beforeEach(() => {
    const fixture = createHubFixture();
    hub = fixture.hub;
    pairingStore = fixture.pairingStore;
  });

  it("dispatches harness requests from authenticated dashboard to paired agent", async () => {
    const agent = createCollector();
    await registerPairedClients(hub, pairingStore, agent.send, () => undefined);

    const response = hub.handleMessage("dash-1", {
      type: AGENT_WITCH_MESSAGE_TYPES.HARNESS_REQUEST,
      payload: {
        writerAgent: "claude-cli",
        instruction: "write harness",
        spec: {
          name: "Rules",
          slug: "rules",
          items: [
            {
              id: "item-1",
              kind: "rule",
              title: "Prefer Const",
              content: "Prefer const.",
            },
          ],
        },
      },
      requestId: "req-harness-1",
    });

    expect(response?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.HARNESS_REQUEST_ACK);
    expect(agent.messages).toHaveLength(1);
    expect(agent.messages[0]?.type).toBe(
      AGENT_WITCH_MESSAGE_TYPES.HARNESS_REQUEST,
    );
    expect(agent.messages[0]?.payload?.writerAgent).toBe("claude-cli");
  });

  it("stores and forwards harness manifest reports to matching dashboards", async () => {
    const dashboard = createCollector();
    await registerPairedClients(
      hub,
      pairingStore,
      () => undefined,
      dashboard.send,
    );

    const response = hub.handleMessage("agent-1", {
      type: AGENT_WITCH_MESSAGE_TYPES.HARNESS_MANIFEST_REPORT,
      payload: {
        hostname: "local-mac",
        manifest: {
          version: 1,
          hostname: "local-mac",
          updatedAt: "2026-07-11T21:00:00.000Z",
          activeSetSlugs: ["rules"],
          sets: {},
        },
      },
    });

    expect(response?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK);
    expect(dashboard.messages).toHaveLength(1);
    expect(hub.listHarnessManifestReports()).toHaveLength(1);
    expect(hub.listHarnessManifestReports()[0]?.hostname).toBe("local-mac");
  });

  it("forwards harness request results from paired agent to matching dashboard", async () => {
    const dashboard = createCollector();
    await registerPairedClients(
      hub,
      pairingStore,
      () => undefined,
      dashboard.send,
    );

    hub.handleMessage("agent-1", {
      type: AGENT_WITCH_MESSAGE_TYPES.HARNESS_REQUEST_RESULT,
      payload: {
        success: true,
        writerAgent: "claude-cli",
        exitCode: 0,
        output: "done",
      },
      requestId: "req-harness-2",
    });

    expect(dashboard.messages).toHaveLength(1);
    expect(dashboard.messages[0]?.payload?.success).toBe(true);
  });
});
