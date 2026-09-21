import { describe, expect, it } from "vitest";

import {
  isAgentRunSessionLimitExceeded,
  parseAgentRunSessionLimit,
} from "@/lib/dispatch/types/AgentRunSessionLimit.type";

describe("AgentRunSessionLimit (P0 hard stop wire)", () => {
  it("parses positive session limits", () => {
    expect(parseAgentRunSessionLimit(120)).toEqual({ limitSeconds: 120 });
    expect(parseAgentRunSessionLimit(null)).toBeNull();
  });

  it("hard-stops when workedMs exceeds limit", () => {
    const limit = parseAgentRunSessionLimit(60);
    expect(limit).not.toBeNull();
    if (limit === null) {
      return;
    }

    expect(
      isAgentRunSessionLimitExceeded({ sessionLimit: limit, workedMs: 59_999 }),
    ).toBe(false);
    expect(
      isAgentRunSessionLimitExceeded({ sessionLimit: limit, workedMs: 60_000 }),
    ).toBe(true);
  });
});
