import { describe, expect, it } from "vitest";

import { AGENT_WITCH_CONNECTION_STALE_MS } from "./agentWitchConnectionHealth.constants";
import { shouldReviveAgentWitchWebSocketFromHealth } from "./shouldReviveAgentWitchWebSocketFromHealth";

describe("shouldReviveAgentWitchWebSocketFromHealth", () => {
  const nowMs = Date.parse("2026-01-01T12:00:00.000Z");
  const freshHealth = {
    lastAckAt: "2026-01-01T11:59:30.000Z",
    wsUrl: "wss://www.agentwitch.com/api/agent-witch/ws",
    connectedAt: null,
  };

  it("does not revive when health is fresh", () => {
    expect(
      shouldReviveAgentWitchWebSocketFromHealth(freshHealth, {
        socketOpen: true,
        staleAfterMs: AGENT_WITCH_CONNECTION_STALE_MS,
        nowMs,
      }),
    ).toBe(false);
  });

  it("does not revive when the socket is open but cloud ack is pending", () => {
    expect(
      shouldReviveAgentWitchWebSocketFromHealth(null, {
        socketOpen: true,
        staleAfterMs: AGENT_WITCH_CONNECTION_STALE_MS,
        nowMs,
      }),
    ).toBe(false);
  });

  it("revives when disconnected and health is missing", () => {
    expect(
      shouldReviveAgentWitchWebSocketFromHealth(null, {
        socketOpen: false,
        staleAfterMs: AGENT_WITCH_CONNECTION_STALE_MS,
        nowMs,
      }),
    ).toBe(true);
  });

  it("revives when health is stale even if the socket flag is open", () => {
    expect(
      shouldReviveAgentWitchWebSocketFromHealth(
        {
          lastAckAt: "2026-01-01T11:57:00.000Z",
          wsUrl: null,
          connectedAt: null,
        },
        {
          socketOpen: true,
          staleAfterMs: AGENT_WITCH_CONNECTION_STALE_MS,
          nowMs,
        },
      ),
    ).toBe(true);
  });
});
