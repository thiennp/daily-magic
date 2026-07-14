import { describe, expect, it } from "vitest";

import {
  acceptTerminalStream,
  clearTerminalStreamState,
  isTerminalStreamAccepted,
  queueTerminalStreamChunk,
} from "./agentWitchTerminalStreamState";

describe("agentWitchTerminalStreamState", () => {
  it("buffers chunks until the stream is accepted", () => {
    clearTerminalStreamState("run-1");
    queueTerminalStreamChunk("run-1", "early\n");
    expect(isTerminalStreamAccepted("run-1")).toBe(false);

    const pending = acceptTerminalStream("run-1");
    expect(pending).toEqual(["early\n"]);
    expect(isTerminalStreamAccepted("run-1")).toBe(true);
  });
});
