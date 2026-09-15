import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) =>
    Array.isArray(rows) ? (rows as Record<string, unknown>[]) : [],
}));

vi.mock("@/lib/agentWitch/ensureAgentWitchPresenceSchema", () => ({
  ensureAgentWitchPresenceSchema: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/lib/agentWitch/getAgentWitchHubInstanceId", () => ({
  getAgentWitchHubInstanceId: () => "instance-a",
}));

import {
  deleteAgentWitchConnection,
  isDeviceLiveOnAnotherInstance,
  listFreshRegistryDeviceIdsOnOtherInstances,
  upsertAgentWitchConnection,
} from "@/lib/agentWitch/agentWitchConnectionRegistry";

describe("agentWitchConnectionRegistry", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("upserts a connection row for this instance", async () => {
    sqlMock.mockResolvedValue([]);

    await upsertAgentWitchConnection({
      clientId: "client-1",
      deviceId: "device-1",
      userId: "user-1",
    });

    expect(sqlMock).toHaveBeenCalledTimes(1);
  });

  it("deletes a connection by client id", async () => {
    sqlMock.mockResolvedValue([]);

    await deleteAgentWitchConnection("client-1");

    expect(sqlMock).toHaveBeenCalledTimes(1);
  });

  it("detects devices live on other instances", async () => {
    sqlMock.mockResolvedValue([{ device_id: "device-remote" }]);

    const deviceIds =
      await listFreshRegistryDeviceIdsOnOtherInstances("user-1");

    expect(deviceIds.has("device-remote")).toBe(true);
  });

  it("isDeviceLiveOnAnotherInstance returns true when a fresh row exists", async () => {
    sqlMock.mockResolvedValue([{ client_id: "client-remote" }]);

    const liveElsewhere = await isDeviceLiveOnAnotherInstance(
      "user-1",
      "device-1",
    );

    expect(liveElsewhere).toBe(true);
  });
});
