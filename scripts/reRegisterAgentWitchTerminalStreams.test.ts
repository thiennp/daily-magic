import { beforeEach, describe, expect, it } from "vitest";

import {
  acceptTerminalStream,
  beginTerminalStream,
  clearTerminalStreamState,
  isTerminalStreamAccepted,
  isTerminalStreamStarted,
  queueTerminalStreamChunk,
} from "./agentWitchTerminalStreamState";
import {
  isInactiveTerminalStreamError,
  reRegisterAgentWitchTerminalStreams,
} from "./reRegisterAgentWitchTerminalStreams";

describe("reRegisterAgentWitchTerminalStreams", () => {
  beforeEach(() => {
    clearTerminalStreamState("run-a");
    clearTerminalStreamState("run-b");
  });

  it("re-sends terminal.stream.start for every live stream after a reconnect", () => {
    beginTerminalStream("run-a", "req-a");
    beginTerminalStream("run-b", "req-b", { shellSessionId: "shell-1" });
    acceptTerminalStream("run-a");
    const sent: Record<string, unknown>[] = [];

    const count = reRegisterAgentWitchTerminalStreams((message) => {
      sent.push(message);
    });

    expect(count).toBe(2);
    expect(sent).toEqual([
      {
        type: "terminal.stream.start",
        payload: { runId: "run-a" },
        requestId: "req-a",
      },
      {
        type: "terminal.stream.start",
        payload: { runId: "run-b", shellSessionId: "shell-1" },
        requestId: "req-b",
      },
    ]);
    expect(isTerminalStreamAccepted("run-a")).toBe(false);
  });

  it("queues chunks until the server re-accepts, then flushes them", () => {
    beginTerminalStream("run-a", "req-a");
    acceptTerminalStream("run-a");
    reRegisterAgentWitchTerminalStreams(() => undefined);

    queueTerminalStreamChunk("run-a", "final output\n");

    expect(acceptTerminalStream("run-a")).toEqual(["final output\n"]);
    expect(isTerminalStreamAccepted("run-a")).toBe(true);
  });

  it("only re-registers the stream whose requestId was rejected", () => {
    beginTerminalStream("run-a", "req-a");
    beginTerminalStream("run-b", "req-b");
    const sent: Record<string, unknown>[] = [];

    reRegisterAgentWitchTerminalStreams((message) => {
      sent.push(message);
    }, "req-b");

    expect(sent).toHaveLength(1);
    expect(sent[0]?.payload).toEqual({ runId: "run-b" });
  });

  it("forgets finished streams", () => {
    beginTerminalStream("run-a", "req-a");
    clearTerminalStreamState("run-a");

    expect(isTerminalStreamStarted("run-a")).toBe(false);
    expect(reRegisterAgentWitchTerminalStreams(() => undefined)).toBe(0);
  });

  it("recognises the server's inactive-stream error", () => {
    expect(
      isInactiveTerminalStreamError({
        type: "system.error",
        payload: {
          errorMessage: "Terminal stream is not active for this run.",
        },
      }),
    ).toBe(true);
    expect(
      isInactiveTerminalStreamError({
        type: "system.error",
        payload: { errorMessage: "Other" },
      }),
    ).toBe(false);
  });
});
