import { describe, expect, it } from "vitest";

import { scrubOutboundRunFrame } from "./scrubOutboundRunFrame";

const FAKE_KEY = `sk-${"FAKE".repeat(6)}`;

describe("scrubOutboundRunFrame", () => {
  it("scrubs stream chunks", () => {
    const frame = scrubOutboundRunFrame({
      type: "terminal.stream.chunk",
      payload: { runId: "run-1", chunk: `export API_KEY=${FAKE_KEY}\n` },
      requestId: "req-1",
    });
    expect(JSON.stringify(frame)).not.toContain(FAKE_KEY);
    expect(frame).toMatchObject({
      type: "terminal.stream.chunk",
      payload: { runId: "run-1" },
      requestId: "req-1",
    });
  });

  it("scrubs nested report history on run heartbeats", () => {
    const frame = scrubOutboundRunFrame({
      type: "run.heartbeat",
      payload: {
        agentRunId: "run-1",
        reportHistory: [{ summary: `used ${FAKE_KEY}` }],
      },
    });
    expect(JSON.stringify(frame)).not.toContain(FAKE_KEY);
  });

  it("hides result output when a key-block tail survives", () => {
    const frame = scrubOutboundRunFrame({
      type: "command.claude.result",
      payload: { exitCode: 0, output: "x\n-----END " + "PRIVATE KEY-----" },
    });
    expect(frame.payload).toMatchObject({
      exitCode: 0,
      output:
        "Output hidden: it looked like it had a secret. Open the report on This computer.",
    });
  });

  it("leaves register / auth frames untouched", () => {
    const register = {
      type: "agent.register",
      payload: { pairingToken: "pt_FAKE_FAKE_FAKE" },
    };
    expect(scrubOutboundRunFrame(register)).toEqual(register);
  });
});
