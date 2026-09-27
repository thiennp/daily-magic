import { describe, expect, it } from "vitest";

import { parseClaudeCliPrintResult } from "./parseClaudeCliPrintResult";

describe("parseClaudeCliPrintResult", () => {
  it("reads the answer and counts cache tokens with input and output", () => {
    const parsed = parseClaudeCliPrintResult(
      '{"type":"result","result":"ok","total_cost_usd":0.05,"usage":{"input_tokens":2,"cache_creation_input_tokens":10,"cache_read_input_tokens":20,"output_tokens":4},"modelUsage":{"claude-sonnet-5":{"inputTokens":2,"outputTokens":4,"cacheReadInputTokens":20,"cacheCreationInputTokens":10}}}',
    );

    expect(parsed?.text).toBe("ok");
    expect(parsed?.inputTokens).toBe(32);
    expect(parsed?.outputTokens).toBe(4);
    expect(parsed?.totalTokens).toBe(36);
    expect(parsed?.model).toBe("claude-sonnet-5");
    expect(parsed?.costUsd).toBe(0.05);
  });

  it("returns null for plain text", () => {
    expect(parseClaudeCliPrintResult("The function subtracts.")).toBeNull();
  });
});
