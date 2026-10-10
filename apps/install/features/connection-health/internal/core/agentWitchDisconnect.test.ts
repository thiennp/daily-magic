import { describe, expect, it } from "vitest";

import {
  AGENT_WITCH_DEFAULT_MAX_DELAY_MS,
  AGENT_WITCH_NOT_LINKED_RETRY_MS,
  AGENT_WITCH_SERVER_DOWN_MAX_DELAY_MS,
  classifyAgentWitchDisconnect,
  computeAgentWitchReconnectDelayMs,
} from "./agentWitchDisconnect";

const base = { socketWasOpen: false, notLinked: false } as const;

describe("classifyAgentWitchDisconnect", () => {
  it("treats Railway fallback 404 as server down", () => {
    expect(
      classifyAgentWitchDisconnect({
        ...base,
        statusCode: 404,
        railwayFallback: "true",
      }),
    ).toBe("server_down");
  });

  it("treats 5xx and 429 as server down", () => {
    expect(classifyAgentWitchDisconnect({ ...base, statusCode: 502 })).toBe(
      "server_down",
    );
    expect(classifyAgentWitchDisconnect({ ...base, statusCode: 429 })).toBe(
      "server_down",
    );
  });

  it("separates DNS failures from other network errors", () => {
    expect(
      classifyAgentWitchDisconnect({ ...base, errorCode: "ENOTFOUND" }),
    ).toBe("dns");
    expect(
      classifyAgentWitchDisconnect({ ...base, errorCode: "ECONNREFUSED" }),
    ).toBe("server_down");
  });

  it("treats a close before the socket opened as server down", () => {
    expect(classifyAgentWitchDisconnect({ ...base, closeCode: 1006 })).toBe(
      "server_down",
    );
  });

  it("reports a socket that opened but never acked", () => {
    expect(classifyAgentWitchDisconnect({ ...base, socketWasOpen: true })).toBe(
      "closed_before_ack",
    );
  });

  it("lets an identity rejection win over transport signals", () => {
    expect(
      classifyAgentWitchDisconnect({
        ...base,
        socketWasOpen: true,
        notLinked: true,
        statusCode: 404,
      }),
    ).toBe("device_not_linked");
  });
});

describe("computeAgentWitchReconnectDelayMs", () => {
  const low = () => 0;
  const high = () => 1;

  it("waits about five minutes when not linked, jittered", () => {
    const minMs = computeAgentWitchReconnectDelayMs({
      attempt: 0,
      kind: "device_not_linked",
      random: low,
    });
    const maxMs = computeAgentWitchReconnectDelayMs({
      attempt: 9,
      kind: "device_not_linked",
      random: high,
    });
    expect(minMs).toBe(AGENT_WITCH_NOT_LINKED_RETRY_MS * 0.8);
    expect(maxMs).toBe(AGENT_WITCH_NOT_LINKED_RETRY_MS * 1.2);
  });

  it("backs off server-down retries up to the cap", () => {
    const first = computeAgentWitchReconnectDelayMs({
      attempt: 0,
      kind: "server_down",
      random: () => 0.5,
    });
    const capped = computeAgentWitchReconnectDelayMs({
      attempt: 20,
      kind: "server_down",
      random: () => 0.5,
    });
    expect(first).toBe(5_000);
    expect(capped).toBe(AGENT_WITCH_SERVER_DOWN_MAX_DELAY_MS);
  });

  it("grows the delay for a socket that closes before ack", () => {
    const delays = [0, 1, 2, 3].map((attempt) =>
      computeAgentWitchReconnectDelayMs({
        attempt,
        kind: "closed_before_ack",
        random: () => 0.5,
      }),
    );
    expect(delays).toEqual([1_000, 2_000, 4_000, 8_000]);
    expect(
      computeAgentWitchReconnectDelayMs({
        attempt: 30,
        kind: "closed_before_ack",
        random: () => 0.5,
      }),
    ).toBe(AGENT_WITCH_DEFAULT_MAX_DELAY_MS);
  });
});
