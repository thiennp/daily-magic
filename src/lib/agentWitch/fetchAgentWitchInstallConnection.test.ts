import { describe, expect, it, vi } from "vitest";

import { fetchAgentWitchInstallConnection } from "@/lib/agentWitch/fetchAgentWitchInstallConnection";

describe("fetchAgentWitchInstallConnection", () => {
  it("HOME-025: treats finished=true as a live Mac WebSocket", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => ({
        ok: true,
        finished: true,
        connectedDeviceCount: 1,
        claimedDeviceCount: 1,
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(fetchAgentWitchInstallConnection()).resolves.toEqual({
      ok: true,
      finished: true,
      connectedDeviceCount: 1,
      claimedDeviceCount: 1,
    });
  });

  it("HOME-025: treats finished=false as install still in progress", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => ({
        ok: true,
        finished: false,
        connectedDeviceCount: 0,
        claimedDeviceCount: 1,
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(fetchAgentWitchInstallConnection()).resolves.toEqual({
      ok: true,
      finished: false,
      connectedDeviceCount: 0,
      claimedDeviceCount: 1,
    });
  });
});
