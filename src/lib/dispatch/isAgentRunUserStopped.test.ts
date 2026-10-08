import { describe, expect, it } from "vitest";

import { isAgentRunUserStopped } from "@/lib/dispatch/isAgentRunUserStopped";

describe("isAgentRunUserStopped", () => {
  it("returns true when exit code indicates stop", () => {
    expect(isAgentRunUserStopped("", 130)).toBe(true);
  });

  it("returns true when output ends with stopped by user", () => {
    expect(isAgentRunUserStopped("Some long output\nStopped by user.", 1)).toBe(
      true,
    );
    expect(isAgentRunUserStopped("Stopped by user.", 0)).toBe(true);
  });

  it("returns false for regular failures or completions", () => {
    expect(isAgentRunUserStopped("Normal completion.", 0)).toBe(false);
    expect(isAgentRunUserStopped("Fatal error occurred.", 1)).toBe(false);
    expect(isAgentRunUserStopped(null, null)).toBe(false);
    expect(isAgentRunUserStopped(undefined, undefined)).toBe(false);
  });
});
