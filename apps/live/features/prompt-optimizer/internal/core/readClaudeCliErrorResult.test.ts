import { describe, expect, it } from "vitest";

import { readClaudeCliErrorResult } from "./readClaudeCliErrorResult";
import { readPromptSdlcWriterOutput } from "./readPromptSdlcWriterOutput";

const SPEND_LIMIT_JSON = JSON.stringify({
  type: "result",
  subtype: "success",
  is_error: true,
  result:
    'API Error: 429 {"type":"error","error":{"type":"rate_limit_error","message":"You\'ve hit your org\'s monthly spend limit"}}',
  usage: { input_tokens: 0, output_tokens: 0 },
});

describe("DF-035 (a) Claude CLI error envelope", () => {
  it("returns the CLI message verbatim for is_error results", () => {
    expect(readClaudeCliErrorResult(SPEND_LIMIT_JSON)).toContain(
      "You've hit your org's monthly spend limit",
    );
  });

  it("ignores successful results", () => {
    expect(
      readClaudeCliErrorResult(
        JSON.stringify({ type: "result", is_error: false, result: "8/10" }),
      ),
    ).toBeNull();
    expect(readClaudeCliErrorResult("plain text")).toBeNull();
  });

  it("judge sees the 429 spend-limit error, not a parse error", () => {
    const result = readPromptSdlcWriterOutput({
      writerAgent: "claude-cli",
      stdout: SPEND_LIMIT_JSON,
      stderr: "",
      replyFileText: null,
    });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errorMessage).toContain("monthly spend limit");
    expect(result.errorMessage).not.toContain("needs a score");
    expect(result.errorKind).toBe("usage_limit");
  });
});
