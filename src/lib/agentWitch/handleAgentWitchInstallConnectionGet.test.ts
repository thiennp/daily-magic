import { describe, expect, it, vi } from "vitest";

import { handleAgentWitchInstallConnectionGet } from "@/lib/agentWitch/handleAgentWitchInstallConnectionGet";

vi.mock("@/lib/agentWitch/ensureAgentWitchDeviceSchema", () => ({
  ensureAgentWitchDeviceSchema: vi.fn(),
}));

vi.mock("@/lib/agentWitch/listAgentWitchDevicesForUser", () => ({
  listAgentWitchDevicesForUser: vi.fn(),
}));

vi.mock("@/lib/agentWitch/collectLiveAgentWitchDeviceIdsForUser", () => ({
  collectLiveAgentWitchDeviceIdsForUser: vi.fn(),
}));

vi.mock("@/lib/agentWitch/getAgentWitchHub", () => ({
  getAgentWitchHub: vi.fn(() => ({})),
}));

import { collectLiveAgentWitchDeviceIdsForUser } from "@/lib/agentWitch/collectLiveAgentWitchDeviceIdsForUser";
import { listAgentWitchDevicesForUser } from "@/lib/agentWitch/listAgentWitchDevicesForUser";

describe("handleAgentWitchInstallConnectionGet", () => {
  it("HOME-025: reports finished when a live Mac WebSocket exists", async () => {
    vi.mocked(listAgentWitchDevicesForUser).mockResolvedValue([
      {
        id: "device-1",
        userId: "user-1",
        deviceLabel: null,
        displayName: "Office Mac",
        dispatchPolicy: null,
        claimedAt: "2026-01-01T00:00:00.000Z",
        lastSeenAt: "2026-01-01T00:00:00.000Z",
        revokedAt: null,
        lastWakeError: null,
        installBundleVersion: "36",
      },
    ]);
    vi.mocked(collectLiveAgentWitchDeviceIdsForUser).mockResolvedValue(
      new Set(["device-1"]),
    );

    const response = await handleAgentWitchInstallConnectionGet({
      id: "user-1",
    });
    const payload: unknown = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toEqual({
      ok: true,
      finished: true,
      connectedDeviceCount: 1,
      claimedDeviceCount: 1,
    });
  });
});
