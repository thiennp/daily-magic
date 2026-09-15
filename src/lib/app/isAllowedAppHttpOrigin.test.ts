import { afterEach, describe, expect, it, vi } from "vitest";

import { AGENT_WITCH_DEFAULT_ORIGIN } from "@/lib/agentWitch/constants";
import { isAllowedAppHttpOrigin } from "@/lib/app/isAllowedAppHttpOrigin";

describe("isAllowedAppHttpOrigin", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("allows any origin in non-production", () => {
    vi.stubEnv("NODE_ENV", "development");

    const request = new Request(
      "http://localhost:3000/api/agent-runs/dispatch",
      {
        method: "POST",
        headers: { origin: "https://evil.example" },
      },
    );

    expect(isAllowedAppHttpOrigin(request)).toBe(true);
  });

  it("requires matching origin host in production", () => {
    vi.stubEnv("NODE_ENV", "production");

    const allowed = new Request(
      "https://www.agentwitch.com/api/agent-runs/dispatch",
      {
        method: "POST",
        headers: { origin: AGENT_WITCH_DEFAULT_ORIGIN },
      },
    );
    expect(isAllowedAppHttpOrigin(allowed)).toBe(true);

    const blocked = new Request(
      "https://www.agentwitch.com/api/agent-runs/dispatch",
      {
        method: "POST",
        headers: { origin: "https://evil.example" },
      },
    );
    expect(isAllowedAppHttpOrigin(blocked)).toBe(false);
  });

  it("accepts referer when origin is absent in production", () => {
    vi.stubEnv("NODE_ENV", "production");

    const request = new Request(
      "https://www.agentwitch.com/api/agent-runs/dispatch",
      {
        method: "POST",
        headers: { referer: `${AGENT_WITCH_DEFAULT_ORIGIN}/agent` },
      },
    );

    expect(isAllowedAppHttpOrigin(request)).toBe(true);
  });

  it("rejects production requests without origin or referer", () => {
    vi.stubEnv("NODE_ENV", "production");

    const request = new Request(
      "https://www.agentwitch.com/api/agent-runs/dispatch",
      {
        method: "POST",
      },
    );

    expect(isAllowedAppHttpOrigin(request)).toBe(false);
  });
});
