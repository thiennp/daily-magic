import { describe, expect, it, vi } from "vitest";

const registryMocks = vi.hoisted(() => ({
  upsertAgentWitchConnection: vi.fn().mockResolvedValue(undefined),
  touchAgentWitchConnection: vi.fn(),
  deleteAgentWitchConnection: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/lib/agentWitch/agentWitchConnectionRegistry", () => registryMocks);

import {
  removeAgentWitchConnectionRegistry,
  syncAgentWitchConnectionRegistry,
} from "@/lib/agentWitch/syncAgentWitchConnectionRegistry";

describe("syncAgentWitchConnectionRegistry", () => {
  it("no-ops when DATABASE_URL is unset", async () => {
    const previousDatabaseUrl = process.env.DATABASE_URL;
    delete process.env.DATABASE_URL;

    await syncAgentWitchConnectionRegistry({
      clientId: "client-1",
      role: "agent",
      userId: "user-1",
      deviceId: "device-1",
    });

    expect(registryMocks.upsertAgentWitchConnection).not.toHaveBeenCalled();

    if (previousDatabaseUrl !== undefined) {
      process.env.DATABASE_URL = previousDatabaseUrl;
    }
  });

  it("upserts when agent has user and device ids", async () => {
    process.env.DATABASE_URL =
      process.env.DATABASE_URL ?? "postgresql://local/test";
    await syncAgentWitchConnectionRegistry({
      clientId: "client-1",
      role: "agent",
      userId: "user-1",
      deviceId: "device-1",
    });

    expect(registryMocks.upsertAgentWitchConnection).toHaveBeenCalledWith({
      clientId: "client-1",
      deviceId: "device-1",
      userId: "user-1",
    });
  });

  it("skips dashboard clients", async () => {
    registryMocks.upsertAgentWitchConnection.mockClear();
    await syncAgentWitchConnectionRegistry({
      clientId: "client-1",
      role: "dashboard",
      userId: "user-1",
      deviceId: "device-1",
    });

    expect(registryMocks.upsertAgentWitchConnection).not.toHaveBeenCalled();
  });

  it("removes registry rows on disconnect", async () => {
    await removeAgentWitchConnectionRegistry("client-1");
    expect(registryMocks.deleteAgentWitchConnection).toHaveBeenCalledWith(
      "client-1",
    );
  });
});
