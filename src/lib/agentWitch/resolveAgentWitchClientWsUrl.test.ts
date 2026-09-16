import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { AGENT_WITCH_PRODUCTION_WS_URL } from "@/lib/agentWitch/constants";
import { resolveAgentWitchClientWsUrl } from "@/lib/agentWitch/resolveAgentWitchClientWsUrl";

describe("resolveAgentWitchClientWsUrl", () => {
  const previousEnv = process.env.AGENT_WITCH_WS_URL;

  afterEach(() => {
    if (previousEnv === undefined) {
      delete process.env.AGENT_WITCH_WS_URL;
    } else {
      process.env.AGENT_WITCH_WS_URL = previousEnv;
    }
  });

  it("hardcodes production WS for ~/.agent-witch regardless of config", () => {
    expect(
      resolveAgentWitchClientWsUrl({
        installDir: path.join("/Users/me", ".agent-witch"),
        configWsUrl: "wss://wrong.example.com/api/agent-witch/ws",
      }),
    ).toBe(AGENT_WITCH_PRODUCTION_WS_URL);
  });

  it("uses localhost default for local install without config wsUrl", () => {
    expect(
      resolveAgentWitchClientWsUrl({
        installDir: path.join("/Users/me", ".local-agent-witch"),
      }),
    ).toBe("ws://localhost:3000/api/agent-witch/ws");
  });

  it("prefers AGENT_WITCH_WS_URL env override", () => {
    process.env.AGENT_WITCH_WS_URL = "wss://override.test/ws";
    expect(
      resolveAgentWitchClientWsUrl({
        installDir: path.join("/Users/me", ".agent-witch"),
      }),
    ).toBe("wss://override.test/ws");
  });
});
