import { describe, expect, it, vi } from "vitest";

import {
  AGENT_WITCH_WAKE_BASE_URL,
  canRequestAgentWitchWake,
  requestAgentWitchWake,
} from "@/lib/agentWitch/requestAgentWitchWake";

describe("canRequestAgentWitchWake", () => {
  it("allows localhost hostnames", () => {
    Object.defineProperty(global, "window", {
      value: { location: { hostname: "localhost" } },
      configurable: true,
    });

    expect(canRequestAgentWitchWake()).toBe(true);
  });

  it("rejects remote hostnames", () => {
    Object.defineProperty(global, "window", {
      value: { location: { hostname: "agentwitch.com" } },
      configurable: true,
    });

    expect(canRequestAgentWitchWake()).toBe(false);
  });
});

describe("requestAgentWitchWake", () => {
  it("posts to the wake endpoint on localhost", async () => {
    Object.defineProperty(global, "window", {
      value: { location: { hostname: "127.0.0.1" } },
      configurable: true,
    });

    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    await expect(requestAgentWitchWake()).resolves.toBe(true);
    expect(fetchMock).toHaveBeenCalledWith(
      `${AGENT_WITCH_WAKE_BASE_URL}/wake`,
      {
        method: "POST",
        mode: "cors",
        signal: expect.any(AbortSignal),
      },
    );
  });
});
