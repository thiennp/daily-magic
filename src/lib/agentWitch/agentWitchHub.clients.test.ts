import { describe, expect, it, beforeEach } from "vitest";

import { AgentWitchHub } from "./agentWitchHub";
import { USER_ID, createHubFixture } from "./agentWitchHub.testHelpers";

describe("AgentWitchHub clients", () => {
  let hub: AgentWitchHub;

  beforeEach(() => {
    hub = createHubFixture().hub;
  });

  it("lists connected clients with roles and timestamps", () => {
    hub.registerClient({
      id: "agent-1",
      role: "agent",
      send: () => undefined,
    });
    hub.registerClient({
      id: "dash-1",
      role: "dashboard",
      userId: USER_ID,
      send: () => undefined,
    });

    const clients = hub.listConnectedClients();

    expect(clients).toHaveLength(2);
    expect(clients.map((client) => client.role).sort()).toEqual([
      "agent",
      "dashboard",
    ]);
    expect(clients[0]?.connectedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it("tracks connected roles in status", () => {
    hub.registerClient({
      id: "agent-1",
      role: "agent",
      send: () => undefined,
    });
    hub.registerClient({
      id: "dash-1",
      role: "dashboard",
      userId: USER_ID,
      send: () => undefined,
    });

    expect(hub.getStatus()).toEqual({
      agentCount: 1,
      dashboardCount: 1,
    });
  });

  it("resolves register roles from payload", () => {
    expect(hub.resolveRoleFromRegisterPayload({ role: "agent" })).toBe("agent");
    expect(hub.resolveRoleFromRegisterPayload({ role: "invalid" })).toBeNull();
    expect(hub.resolveRoleFromRegisterPayload(undefined)).toBeNull();
  });
});
