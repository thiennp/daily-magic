import { describe, expect, it } from "vitest";

import { LocalCodingToolRefusalCode } from "@agent-witch/shared/dispatch";

import { buildLocalCodingToolRefusalResult } from "./buildLocalCodingToolRefusalResult";

describe("buildLocalCodingToolRefusalResult", () => {
  it("builds the normal result frame with the S0 error code", () => {
    expect(
      buildLocalCodingToolRefusalResult({
        code: LocalCodingToolRefusalCode.CODING_TOOLS_PAUSED,
        agentRunId: "run-1",
        requestId: "req-1",
      }),
    ).toEqual({
      type: "command.claude.result",
      payload: {
        exitCode: -1,
        output: "Paused on This computer. Turn it back on in AgentWitch Local.",
        errorCode: "coding_tools_paused",
        agentRunId: "run-1",
      },
      requestId: "req-1",
    });
  });

  it("omits run and request ids when absent", () => {
    const frame = buildLocalCodingToolRefusalResult({
      code: LocalCodingToolRefusalCode.FOLDER_REQUIRED,
    });
    expect(frame.payload).not.toHaveProperty("agentRunId");
    expect(frame).not.toHaveProperty("requestId");
    expect(frame.payload.errorCode).toBe("folder_required");
  });
});
