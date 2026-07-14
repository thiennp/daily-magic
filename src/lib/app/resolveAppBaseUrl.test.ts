import { afterEach, describe, expect, it, vi } from "vitest";

import { AGENT_WITCH_DEFAULT_ORIGIN } from "@/lib/agentWitch/constants";
import { resolveAppBaseUrl } from "@/lib/app/resolveAppBaseUrl";

describe("resolveAppBaseUrl", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns localhost in non-production", () => {
    vi.stubEnv("NODE_ENV", "development");

    expect(resolveAppBaseUrl()).toBe("http://localhost:3000");
  });

  it("returns www.agentwitch.com in production (HOME-001)", () => {
    vi.stubEnv("NODE_ENV", "production");

    expect(resolveAppBaseUrl()).toBe(AGENT_WITCH_DEFAULT_ORIGIN);
  });
});
