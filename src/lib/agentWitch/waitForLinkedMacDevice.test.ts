import { describe, expect, it, vi, beforeEach } from "vitest";

import {
  hasConnectedMacDevice,
  waitForLinkedMacDevice,
} from "@/lib/agentWitch/waitForLinkedMacDevice";

describe("waitForLinkedMacDevice", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("HOME-025: waits for install-connection finished=true", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ok: true,
          finished: false,
          connectedDeviceCount: 0,
          claimedDeviceCount: 1,
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ok: true,
          finished: true,
          connectedDeviceCount: 1,
          claimedDeviceCount: 1,
        }),
      });
    vi.stubGlobal("fetch", fetchMock);

    await expect(hasConnectedMacDevice()).resolves.toBe(false);
    await expect(hasConnectedMacDevice()).resolves.toBe(true);
  });

  it("HOME-025: waitForLinkedMacDevice resolves when the Mac WebSocket is live", async () => {
    vi.useFakeTimers();
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ok: true,
          finished: false,
          connectedDeviceCount: 0,
          claimedDeviceCount: 0,
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ok: true,
          finished: true,
          connectedDeviceCount: 1,
          claimedDeviceCount: 1,
        }),
      });
    vi.stubGlobal("fetch", fetchMock);

    const resultPromise = waitForLinkedMacDevice();
    await vi.advanceTimersByTimeAsync(2_000);
    await expect(resultPromise).resolves.toBe(true);

    vi.useRealTimers();
  });
});
