import { describe, expect, it } from "vitest";

import {
  AGENT_RUN_WRITER_EXECUTION_CLI_MISSING_WRITER_API_KEY_BACKEND,
  AGENT_RUN_WRITER_EXECUTION_HONESTY_MARKER,
  AGENT_RUN_WRITER_EXECUTION_MISSING_WRITER_API_KEY_REASON_CODE,
} from "./agentRunWriterExecutionHonesty.constant";
import { parseAgentRunWriterExecutionHonestyFromOutput } from "./parseAgentRunWriterExecutionHonestyFromOutput";

describe("parseAgentRunWriterExecutionHonestyFromOutput", () => {
  it("parses writer execution honesty block", () => {
    const output = [
      AGENT_RUN_WRITER_EXECUTION_HONESTY_MARKER,
      `agentRunWriterExecutionBackend=${AGENT_RUN_WRITER_EXECUTION_CLI_MISSING_WRITER_API_KEY_BACKEND}`,
      `agentRunWriterExecutionReasonCode=${AGENT_RUN_WRITER_EXECUTION_MISSING_WRITER_API_KEY_REASON_CODE}`,
      "claude output",
    ].join("\n");

    expect(parseAgentRunWriterExecutionHonestyFromOutput(output)).toEqual({
      backend: AGENT_RUN_WRITER_EXECUTION_CLI_MISSING_WRITER_API_KEY_BACKEND,
      reasonCode: AGENT_RUN_WRITER_EXECUTION_MISSING_WRITER_API_KEY_REASON_CODE,
    });
  });
});
