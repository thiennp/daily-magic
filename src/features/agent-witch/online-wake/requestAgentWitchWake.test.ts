import { describe, expect, it, vi } from "vitest";

import {
  canRequestAgentWitchWake,
  requestAgentWitchWake,
  resolveAgentWitchWakeBaseUrlForPage,
} from "./requestAgentWitchWake";

describe("canRequestAgentWitchWake", () => {
  it("is available in the browser", () => {
    Object.defineProperty(global, "window", {
      value: { location: { hostname: "agentwitch.com" } },
      configurable: true,
    });

    expect(canRequestAgentWitchWake()).toBe(true);
  });
});

describe("requestAgentWitchWake", () => {
  it("posts to the prod wake port on agentwitch.com", async () => {
    Object.defineProperty(global, "window", {
      value: { location: { hostname: "www.agentwitch.com" } },
      configurable: true,
    });

    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    await expect(requestAgentWitchWake()).resolves.toBe(true);
    expect(fetchMock).toHaveBeenCalledWith(
      `${resolveAgentWitchWakeBaseUrlForPage()}/restart`,
      {
        method: "POST",
        mode: "cors",
        signal: expect.any(AbortSignal),
      },
    );
    expect(resolveAgentWitchWakeBaseUrlForPage()).toBe(
      "http://127.0.0.1:47892",
    );
  });

  it("posts to the local wake port on localhost", async () => {
    Object.defineProperty(global, "window", {
      value: { location: { hostname: "localhost" } },
      configurable: true,
    });

    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    await expect(requestAgentWitchWake()).resolves.toBe(true);
    expect(fetchMock).toHaveBeenCalledWith("http://127.0.0.1:47893/restart", {
      method: "POST",
      mode: "cors",
      signal: expect.any(AbortSignal),
    });
  });
});
