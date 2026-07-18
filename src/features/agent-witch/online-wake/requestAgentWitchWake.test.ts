import { describe, expect, it, vi } from "vitest";

import {
  AGENT_WITCH_WAKE_BASE_URL,
  canRequestAgentWitchWake,
  requestAgentWitchWake,
} from "@/features/agent-witch/utils/requestAgentWitchWake";

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
  it("posts to the local wake endpoint", async () => {
    Object.defineProperty(global, "window", {
      value: { location: { hostname: "agentwitch.com" } },
      configurable: true,
    });

    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    await expect(requestAgentWitchWake()).resolves.toBe(true);
    expect(fetchMock).toHaveBeenCalledWith(
      `${AGENT_WITCH_WAKE_BASE_URL}/restart`,
      {
        method: "POST",
        mode: "cors",
        signal: expect.any(AbortSignal),
      },
    );
  });
});
