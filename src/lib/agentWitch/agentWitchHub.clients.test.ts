import { describe, expect, it, beforeEach } from "vitest";

import { AgentWitchHub } from "./agentWitchHub";
import { resolveRoleFromRegisterPayload } from "./resolveAgentWitchRegisterPayload";
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
    expect(resolveRoleFromRegisterPayload({ role: "agent" })).toBe("agent");
    expect(resolveRoleFromRegisterPayload({ role: "invalid" })).toBeNull();
    expect(resolveRoleFromRegisterPayload(undefined)).toBeNull();
  });

  it("finds the requested online Mac for a user", () => {
    hub.registerClient({
      id: "agent-a",
      role: "agent",
      userId: USER_ID,
      deviceId: "device-a",
      lastHeartbeatAt: "2026-01-01T00:00:00.000Z",
      send: () => undefined,
    });
    hub.registerClient({
      id: "agent-b",
      role: "agent",
      userId: USER_ID,
      deviceId: "device-b",
      lastHeartbeatAt: "2026-01-02T00:00:00.000Z",
      send: () => undefined,
    });

    expect(hub.findAgentClientForUser(USER_ID, "device-a")?.id).toBe("agent-a");
    expect(hub.findAgentClientForUser(USER_ID)?.id).toBe("agent-b");
  });

  it("lists online agent clients for a user", () => {
    hub.registerClient({
      id: "agent-1",
      role: "agent",
      userId: USER_ID,
      deviceId: "device-1",
      send: () => undefined,
    });
    hub.registerClient({
      id: "agent-2",
      role: "agent",
      userId: "other-user",
      deviceId: "device-2",
      send: () => undefined,
    });

    expect(hub.listOnlineAgentClientsForUser(USER_ID)).toHaveLength(1);
    expect(hub.listOnlineAgentClientsForUser(USER_ID)[0]?.deviceId).toBe(
      "device-1",
    );
  });
});
