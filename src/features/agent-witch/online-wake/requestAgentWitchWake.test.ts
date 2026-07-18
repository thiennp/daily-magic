import { describe, expect, it, vi } from "vitest";

import {
  canRequestAgentWitchWake,
  requestAgentWitchWake,
} from "./requestAgentWitchWake";

describe("canRequestAgentWitchWake", () => {
  it("is available in the browser", () => {
    Object.defineProperty(global, "window", {
      value: {},
      configurable: true,
    });

    expect(canRequestAgentWitchWake()).toBe(true);
  });
});

describe("requestAgentWitchWake", () => {
  it("AGENT-021: posts cloud device restart over HTTPS", async () => {
    Object.defineProperty(global, "window", {
      value: {},
      configurable: true,
    });

    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    await expect(requestAgentWitchWake("device-1")).resolves.toBe(true);
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/agent-witch/devices/device-1/restart",
      {
        method: "POST",
        signal: expect.any(AbortSignal),
      },
    );
  });

  it("returns false without a device id", async () => {
    Object.defineProperty(global, "window", {
      value: {},
      configurable: true,
    });

    await expect(requestAgentWitchWake("")).resolves.toBe(false);
  });
});
