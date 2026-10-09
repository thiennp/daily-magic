import { afterEach, describe, expect, it, vi } from "vitest";

import { isAgentWitchWakeServerAllowedOrigin } from "./wakeServerCors";

describe("wake server origins", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("an installed bridge trusts agentwitch.com, not any local web app", () => {
    vi.stubEnv("NODE_ENV", "production");
    expect(
      isAgentWitchWakeServerAllowedOrigin("https://www.agentwitch.com"),
    ).toBe(true);
    expect(isAgentWitchWakeServerAllowedOrigin("http://localhost:5173")).toBe(
      false,
    );
    expect(isAgentWitchWakeServerAllowedOrigin("http://127.0.0.1:8080")).toBe(
      false,
    );
  });

  it("allows local origins in development or when asked for on purpose", () => {
    vi.stubEnv("NODE_ENV", "development");
    expect(isAgentWitchWakeServerAllowedOrigin("http://localhost:3000")).toBe(
      true,
    );
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("AGENT_WITCH_WAKE_ALLOW_LOCALHOST_ORIGINS", "1");
    expect(isAgentWitchWakeServerAllowedOrigin("http://localhost:3000")).toBe(
      true,
    );
  });

  it("never allows a look-alike host", () => {
    vi.stubEnv("NODE_ENV", "development");
    expect(
      isAgentWitchWakeServerAllowedOrigin(
        "https://agentwitch.com.evil.example",
      ),
    ).toBe(false);
  });
});
