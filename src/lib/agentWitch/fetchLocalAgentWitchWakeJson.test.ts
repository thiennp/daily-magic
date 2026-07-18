import { afterEach, describe, expect, it, vi } from "vitest";

import { resolveLocalAgentWitchWakeBaseUrl } from "@/lib/agentWitch/fetchLocalAgentWitchWakeJson";
import {
  AGENT_WITCH_LOCAL_WAKE_PORT,
  AGENT_WITCH_PROD_WAKE_PORT,
} from "@/lib/agentWitch/resolveAgentWitchAppHome";

describe("resolveLocalAgentWitchWakeBaseUrl", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("uses AGENT_WITCH_WAKE_PORT when set", () => {
    vi.stubEnv("AGENT_WITCH_WAKE_PORT", "47999");
    expect(resolveLocalAgentWitchWakeBaseUrl()).toBe("http://127.0.0.1:47999");
  });

  it("uses local wake port outside production Vercel", () => {
    vi.stubEnv("VERCEL", "");
    vi.stubEnv("NODE_ENV", "development");
    expect(resolveLocalAgentWitchWakeBaseUrl()).toBe(
      `http://127.0.0.1:${AGENT_WITCH_LOCAL_WAKE_PORT}`,
    );
  });

  it("uses prod wake port in production", () => {
    vi.stubEnv("VERCEL", "1");
    vi.stubEnv("NODE_ENV", "production");
    expect(resolveLocalAgentWitchWakeBaseUrl()).toBe(
      `http://127.0.0.1:${AGENT_WITCH_PROD_WAKE_PORT}`,
    );
  });
});
