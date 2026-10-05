import { describe, expect, it } from "vitest";

import { isClaudeCliAuthBlockerInOutput } from "@/lib/dispatch/isClaudeCliAuthBlockerInOutput";

describe("isClaudeCliAuthBlockerInOutput", () => {
  it("detects OAuth 401 expired copy from Claude CLI", () => {
    const output =
      "Failed to authenticate. API Error: 401 OAuth access token has expired. Re-authenticate to continue.";

    expect(isClaudeCliAuthBlockerInOutput(output)).toBe(true);
  });

  it("detects Claude CLI not-logged-in /login prompt", () => {
    expect(
      isClaudeCliAuthBlockerInOutput("Not logged in · Please run /login"),
    ).toBe(true);
  });

  it("returns false for unrelated agent output", () => {
    expect(isClaudeCliAuthBlockerInOutput("Implemented README note.")).toBe(
      false,
    );
  });

  it("detects ensure-writer login timeout (Testi state 3 @ 08cbffb)", () => {
    const output =
      "Failed to prepare claude-cli: ensure-writer.sh timed out after 120s";

    expect(isClaudeCliAuthBlockerInOutput(output)).toBe(true);
  });
});
