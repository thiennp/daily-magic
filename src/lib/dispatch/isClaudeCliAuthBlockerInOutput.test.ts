import { describe, expect, it } from "vitest";

import { isClaudeCliAuthBlockerInOutput } from "@/lib/dispatch/isClaudeCliAuthBlockerInOutput";

describe("isClaudeCliAuthBlockerInOutput", () => {
  it("detects OAuth 401 expired copy from Claude CLI", () => {
    const output =
      "Failed to authenticate. API Error: 401 OAuth access token has expired. Re-authenticate to continue.";

    expect(isClaudeCliAuthBlockerInOutput(output)).toBe(true);
  });

  it("returns false for unrelated agent output", () => {
    expect(isClaudeCliAuthBlockerInOutput("Implemented README note.")).toBe(
      false,
    );
  });
});
