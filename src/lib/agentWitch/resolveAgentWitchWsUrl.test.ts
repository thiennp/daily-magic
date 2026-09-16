import { describe, expect, it } from "vitest";

import { isAgentWitchWebSocketAvailableForHost } from "@/lib/agentWitch/isAgentWitchWebSocketAvailable";
import { resolveAgentWitchWsUrl } from "@/lib/agentWitch/resolveAgentWitchWsUrl";

describe("resolveAgentWitchWsUrl", () => {
  it("prefers AGENT_WITCH_WS_URL when configured", () => {
    const previousValue = process.env.AGENT_WITCH_WS_URL;
    process.env.AGENT_WITCH_WS_URL = "wss://ws.example.com/bridge";

    expect(resolveAgentWitchWsUrl("https://www.agentwitch.com")).toBe(
      "wss://ws.example.com/bridge",
    );

    process.env.AGENT_WITCH_WS_URL = previousValue;
  });

  it("hardcodes production WS for non-local origins when env unset", () => {
    const previousValue = process.env.AGENT_WITCH_WS_URL;
    process.env.AGENT_WITCH_WS_URL = "";

    expect(resolveAgentWitchWsUrl("https://agentwitch.com")).toBe(
      "wss://www.agentwitch.com/api/agent-witch/ws",
    );
    expect(resolveAgentWitchWsUrl("http://localhost:3000")).toBe(
      "ws://localhost:3000/api/agent-witch/ws",
    );

    process.env.AGENT_WITCH_WS_URL = previousValue;
  });
});

describe("isAgentWitchWebSocketAvailableForHost", () => {
  it("treats production hosts as unavailable on Vercel", () => {
    const previousValue = process.env.VERCEL;
    process.env.VERCEL = "1";

    expect(isAgentWitchWebSocketAvailableForHost("www.agentwitch.com")).toBe(
      false,
    );

    process.env.VERCEL = previousValue;
  });
});
