import { describe, expect, it } from "vitest";

import { isClaudeCliNonWorkErrorJsonLine } from "@/lib/dispatch/isClaudeCliNonWorkErrorJsonLine";

describe("isClaudeCliNonWorkErrorJsonLine", () => {
  it("detects is_error JSON with zero output tokens", () => {
    const line = JSON.stringify({
      is_error: true,
      terminal_reason: "api_error",
      usage: { output_tokens: 0 },
    });

    expect(isClaudeCliNonWorkErrorJsonLine(line)).toBe(true);
  });

  it("returns false when output tokens are present", () => {
    const line = JSON.stringify({
      is_error: true,
      usage: { output_tokens: 12 },
    });

    expect(isClaudeCliNonWorkErrorJsonLine(line)).toBe(false);
  });
});
