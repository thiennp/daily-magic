import { describe, expect, it } from "vitest";

import {
  buildWakeServerCorsHeaders,
  isAgentWitchWakeServerAllowedOrigin,
} from "./agentWitchWakeAllowedOrigins";

describe("isAgentWitchWakeServerAllowedOrigin", () => {
  it("allows agentwitch.com over https", () => {
    expect(isAgentWitchWakeServerAllowedOrigin("https://agentwitch.com")).toBe(
      true,
    );
    expect(
      isAgentWitchWakeServerAllowedOrigin("https://www.agentwitch.com"),
    ).toBe(true);
  });

  it("allows local dev over http", () => {
    expect(isAgentWitchWakeServerAllowedOrigin("http://localhost:3000")).toBe(
      true,
    );
    expect(isAgentWitchWakeServerAllowedOrigin("http://127.0.0.1:3000")).toBe(
      true,
    );
  });

  it("rejects unknown hosts and insecure production origins", () => {
    expect(
      isAgentWitchWakeServerAllowedOrigin("https://evil.example.com"),
    ).toBe(false);
    expect(
      isAgentWitchWakeServerAllowedOrigin(
        "https://daily-magic-five.vercel.app",
      ),
    ).toBe(false);
    expect(isAgentWitchWakeServerAllowedOrigin("http://agentwitch.com")).toBe(
      false,
    );
    expect(
      isAgentWitchWakeServerAllowedOrigin("http://daily-magic-five.vercel.app"),
    ).toBe(false);
  });
});

describe("buildWakeServerCorsHeaders", () => {
  it("echoes allowed origins for credentialed browser preflights", () => {
    const result = buildWakeServerCorsHeaders("https://agentwitch.com");

    expect(result.allowed).toBe(true);
    expect(result.headers["Access-Control-Allow-Origin"]).toBe(
      "https://agentwitch.com",
    );
    expect(result.headers.Vary).toBe("Origin");
  });

  it("rejects disallowed origins", () => {
    const result = buildWakeServerCorsHeaders("https://evil.example.com");

    expect(result.allowed).toBe(false);
    expect(result.headers["Access-Control-Allow-Origin"]).toBeUndefined();
  });
});
