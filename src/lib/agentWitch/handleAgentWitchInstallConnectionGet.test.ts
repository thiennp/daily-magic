import { describe, expect, it, vi } from "vitest";

import { installConnectionGetDevice as device } from "@/lib/agentWitch/handleAgentWitchInstallConnectionGet.fixtures";
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
    vi.mocked(listAgentWitchDevicesForUser).mockResolvedValue([device()]);
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

  it("returns HTTP 409 when a live Mac is too old for Connect", async () => {
    vi.mocked(listAgentWitchDevicesForUser).mockResolvedValue([
      device({
        id: "device-old",
        displayName: "Old Mac",
        installBundleVersion: null,
      }),
    ]);
    vi.mocked(collectLiveAgentWitchDeviceIdsForUser).mockResolvedValue(
      new Set(["device-old"]),
    );

    const response = await handleAgentWitchInstallConnectionGet({
      id: "user-1",
    });
    const payload: unknown = await response.json();

    expect(response.status).toBe(409);
    expect(payload).toMatchObject({
      error: "agent_witch_local_too_old",
      downloadUrl: "/download",
      installBundleVersion: null,
    });
  });

  it("HOME-065 Soft HOLD: finished is false when only another account Mac is live", async () => {
    vi.mocked(listAgentWitchDevicesForUser).mockResolvedValue([
      device({
        id: "other",
        tokenHash: "hash-other",
        deviceLabel: "Other#user",
        displayName: "Other Mac",
        installBundleVersion: "267",
      }),
      device({
        id: "minted",
        tokenHash: "hash-minted",
        displayName: null,
        lastSeenAt: null,
        claimedAt: "2026-01-02T00:00:00.000Z",
        installBundleVersion: null,
      }),
    ]);
    vi.mocked(collectLiveAgentWitchDeviceIdsForUser).mockResolvedValue(
      new Set(["other"]),
    );

    const response = await handleAgentWitchInstallConnectionGet(
      { id: "user-1" },
      { expectedTokenHash: "hash-minted" },
    );
    const payload: unknown = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toEqual({
      ok: true,
      finished: false,
      connectedDeviceCount: 1,
      claimedDeviceCount: 2,
    });
  });
});
