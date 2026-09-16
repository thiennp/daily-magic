import { vi } from "vitest";

vi.mock("@/lib/agentWitch/isAgentWitchDeviceOwnedByUser", () => ({
  default: vi.fn(async () => true),
}));

vi.mock("@/lib/agentWitch/findAgentWitchDeviceByToken", () => ({
  findAgentWitchDeviceByToken: vi.fn(),
}));

vi.mock("@/lib/agentWitch/findAgentWitchDeviceById", () => ({
  findAgentWitchDeviceById: vi.fn(async () => null),
}));

vi.mock("@/lib/agentWitch/agentWitchConnectionRegistryQueries", () => ({
  isDeviceLiveOnAnotherInstance: vi.fn(async () => false),
}));

vi.mock("@/lib/agentWitch/resolveCurrentAgentWitchDeviceId", () => ({
  resolveCurrentAgentWitchDeviceId: async (id: string) => id,
}));

vi.mock("@/lib/agentWitch/listAgentWitchDevicesForUser", () => ({
  listAgentWitchDevicesForUser: vi.fn(async () => [
    {
      id: "device-1",
      userId: "user-1",
      deviceLabel: "Studio-Mac",
      displayName: null,
      claimedAt: "2026-01-01T00:00:00.000Z",
      lastSeenAt: null,
      revokedAt: null,
      dispatchPolicy: null,
    },
  ]),
}));
