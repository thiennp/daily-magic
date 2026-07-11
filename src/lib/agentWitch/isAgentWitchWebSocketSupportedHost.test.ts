import { describe, expect, it } from "vitest";

import {
  isAgentWitchProductionHost,
  isAgentWitchWebSocketSupportedOrigin,
  normalizeAgentWitchHost,
} from "@/lib/agentWitch/isAgentWitchWebSocketSupportedHost";
import isAgentWitchWebSocketSupportedHost from "@/lib/agentWitch/isAgentWitchWebSocketSupportedHost";

describe("isAgentWitchWebSocketSupportedHost", () => {
  it("rejects Vercel preview and production hosts", () => {
    expect(
      isAgentWitchWebSocketSupportedHost("daily-magic-five.vercel.app"),
    ).toBe(false);
  });

  it("supports agentwitch.com production hosts", () => {
    expect(isAgentWitchWebSocketSupportedHost("agentwitch.com")).toBe(true);
    expect(isAgentWitchWebSocketSupportedHost("www.agentwitch.com")).toBe(true);
    expect(isAgentWitchProductionHost("www.agentwitch.com")).toBe(true);
    expect(normalizeAgentWitchHost("WWW.AgentWitch.com:443")).toBe(
      "www.agentwitch.com",
    );
  });

  it("allows local and long-running Node hosts", () => {
    expect(isAgentWitchWebSocketSupportedHost("localhost:3000")).toBe(true);
    expect(isAgentWitchWebSocketSupportedHost("daily-magic.example.com")).toBe(
      true,
    );
  });

  it("checks full origins", () => {
    expect(
      isAgentWitchWebSocketSupportedOrigin(
        "https://daily-magic-five.vercel.app",
      ),
    ).toBe(false);
    expect(isAgentWitchWebSocketSupportedOrigin("https://agentwitch.com")).toBe(
      true,
    );
    expect(isAgentWitchWebSocketSupportedOrigin("http://localhost:3000")).toBe(
      true,
    );
  });
});
