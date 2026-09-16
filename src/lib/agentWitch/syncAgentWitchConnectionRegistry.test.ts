import { afterEach, describe, expect, it, vi } from "vitest";

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
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("upserts when agent has user and device ids", async () => {
    vi.stubEnv("DATABASE_URL", "postgres://example");
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

  it("skips registry writes when DATABASE_URL is unset", async () => {
    vi.stubEnv("DATABASE_URL", "");
    registryMocks.upsertAgentWitchConnection.mockClear();
    await syncAgentWitchConnectionRegistry({
      clientId: "client-1",
      role: "agent",
      userId: "user-1",
      deviceId: "device-1",
    });

    expect(registryMocks.upsertAgentWitchConnection).not.toHaveBeenCalled();
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
    vi.stubEnv("DATABASE_URL", "postgres://example");
    await removeAgentWitchConnectionRegistry("client-1");
    expect(registryMocks.deleteAgentWitchConnection).toHaveBeenCalledWith(
      "client-1",
    );
  });
});
