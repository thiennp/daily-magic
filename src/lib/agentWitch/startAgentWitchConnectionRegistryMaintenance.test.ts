import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const ensureAgentWitchPresenceSchema = vi.hoisted(() => vi.fn());
const processAgentWitchHubDispatchRelaysForHub = vi.hoisted(() => vi.fn());

vi.mock("@/lib/agentWitch/ensureAgentWitchPresenceSchema", () => ({
  ensureAgentWitchPresenceSchema,
}));

vi.mock("@/lib/agentWitch/processAgentWitchHubDispatchRelaysForHub", () => ({
  processAgentWitchHubDispatchRelaysForHub,
}));

vi.mock("@/lib/agentWitch/agentWitchConnectionRegistry", () => ({
  deleteAgentWitchConnectionsForInstance: vi.fn().mockResolvedValue(undefined),
  sweepStaleAgentWitchConnections: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/lib/agentWitch/drainAgentWitchDispatchOutboxForHub", () => ({
  drainAgentWitchDispatchOutboxForHub: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/lib/agentWitch/updateAgentWitchHubDispatchRelayStatus", () => ({
  expireStaleAgentWitchHubDispatchRelays: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/lib/db", () => ({
  isDatabaseUrlConfigured: () => true,
}));

vi.mock("@/lib/agentWitch/getAgentWitchHub", () => ({
  getAgentWitchHub: () => ({}),
}));

vi.mock("@/lib/agentWitch/getAgentWitchHubInstanceId", () => ({
  getAgentWitchHubInstanceId: () => "instance-test",
}));

import { startAgentWitchConnectionRegistryMaintenance } from "@/lib/agentWitch/startAgentWitchConnectionRegistryMaintenance";

describe("startAgentWitchConnectionRegistryMaintenance", () => {
  beforeEach(() => {
    ensureAgentWitchPresenceSchema.mockReset();
    processAgentWitchHubDispatchRelaysForHub.mockReset();
    Reflect.deleteProperty(
      globalThis,
      "__dailyMagicAgentWitchConnectionRegistryMaintenance",
    );
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not start relay polling when presence schema ensure fails", async () => {
    ensureAgentWitchPresenceSchema.mockRejectedValue(
      new Error('relation "agent_witch_devices" does not exist'),
    );

    startAgentWitchConnectionRegistryMaintenance();

    await vi.runOnlyPendingTimersAsync();

    vi.advanceTimersByTime(5_000);
    await vi.runOnlyPendingTimersAsync();

    expect(processAgentWitchHubDispatchRelaysForHub).not.toHaveBeenCalled();
  });

  it("starts relay polling after presence schema is ensured", async () => {
    ensureAgentWitchPresenceSchema.mockResolvedValue(undefined);
    processAgentWitchHubDispatchRelaysForHub.mockResolvedValue(undefined);

    startAgentWitchConnectionRegistryMaintenance();

    await vi.runOnlyPendingTimersAsync();

    vi.advanceTimersByTime(1_100);
    await vi.runOnlyPendingTimersAsync();

    expect(processAgentWitchHubDispatchRelaysForHub).toHaveBeenCalled();
  });
});
