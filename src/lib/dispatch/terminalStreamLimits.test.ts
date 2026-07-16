import { afterEach, describe, expect, it } from "vitest";

import {
  TERMINAL_STREAM_LIMITS,
  clearTerminalStreamRateLimitsForTests,
  validateTerminalStreamChunkLimits,
} from "@/lib/dispatch/terminalStreamLimits";

describe("terminalStreamLimits", () => {
  afterEach(() => {
    clearTerminalStreamRateLimitsForTests();
  });

  it("rejects chunks larger than the byte limit", () => {
    const chunk = "x".repeat(TERMINAL_STREAM_LIMITS.maxChunkBytes + 1);

    const result = validateTerminalStreamChunkLimits("run-1", chunk);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errorMessage).toContain("exceeds");
    }
  });

  it("rejects chunks above the per-run rate limit", () => {
    for (
      let index = 0;
      index < TERMINAL_STREAM_LIMITS.maxChunksPerSecond;
      index += 1
    ) {
      const result = validateTerminalStreamChunkLimits("run-1", "a");
      expect(result.ok).toBe(true);
    }

    const rejected = validateTerminalStreamChunkLimits("run-1", "a");
    expect(rejected.ok).toBe(false);
    if (!rejected.ok) {
      expect(rejected.errorMessage).toContain("rate exceeded");
    }
  });
});
