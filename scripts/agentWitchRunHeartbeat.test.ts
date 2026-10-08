import { afterEach, describe, expect, it, vi } from "vitest";

import {
  clearRunHeartbeatTimersForTests,
  startRunHeartbeat,
  stopRunHeartbeat,
} from "./agentWitchRunHeartbeat";

describe("startRunHeartbeat", () => {
  afterEach(() => {
    clearRunHeartbeatTimersForTests();
    vi.useRealTimers();
  });

  it("sends run.heartbeat while isAlive is true (AGENT-055)", () => {
    const sent: string[] = [];
    const socket = {
      readyState: 1,
      send: (raw: string) => {
        sent.push(raw);
      },
    };

    startRunHeartbeat(socket as never, "run-1", () => true);

    expect(sent).toHaveLength(1);
    expect(JSON.parse(sent[0] ?? "{}")).toEqual({
      type: "run.heartbeat",
      payload: { agentRunId: "run-1" },
    });
  });

  it("includes awaitingInput on checkpoint heartbeats (AGENT-056)", () => {
    const sent: string[] = [];
    const socket = {
      readyState: 1,
      send: (raw: string) => {
        sent.push(raw);
      },
    };

    startRunHeartbeat(socket as never, "run-wait", () => true, {
      awaitingInput: true,
    });

    expect(JSON.parse(sent[0] ?? "{}")).toEqual({
      type: "run.heartbeat",
      payload: { agentRunId: "run-wait", awaitingInput: true },
    });
  });

  it("stops sending when isAlive becomes false (AGENT-055)", () => {
    vi.useFakeTimers();
    const sent: string[] = [];
    const socket = {
      readyState: 1,
      send: (raw: string) => {
        sent.push(raw);
      },
    };
    let alive = true;

    startRunHeartbeat(socket as never, "run-2", () => alive);
    expect(sent).toHaveLength(1);

    alive = false;
    vi.advanceTimersByTime(15_000);
    expect(sent).toHaveLength(1);

    stopRunHeartbeat("run-2");
  });

  it("sends to new socket after rebind", async () => {
    const sent1: string[] = [];
    const socket1 = {
      readyState: 3, // CLOSED
      send: (raw: string) => sent1.push(raw),
    };
    const sent2: string[] = [];
    const socket2 = {
      readyState: 1, // OPEN
      send: (raw: string) => sent2.push(raw),
    };

    const { bindAgentWitchLiveRunSocket } =
      await import("./agentWitchLiveRunSocket");
    bindAgentWitchLiveRunSocket("test-profile", socket1 as never);
    bindAgentWitchLiveRunSocket("test-profile", socket2 as never);

    startRunHeartbeat(socket1 as never, "run-rebind", () => true);

    expect(sent1).toHaveLength(0);
    expect(sent2).toHaveLength(1);
    expect(JSON.parse(sent2[0] ?? "{}")).toEqual({
      type: "run.heartbeat",
      payload: { agentRunId: "run-rebind" },
    });
  });
});
