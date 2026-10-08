import { describe, expect, it } from "vitest";

import { shouldShowAgentLiveRetry } from "@/features/agent/utils/shouldShowAgentLiveRetry";

describe("shouldShowAgentLiveRetry (73820cb1)", () => {
  it.each([
    ["failed", false, false, true],
    ["timed_out", false, false, true],
    ["passed", false, false, false],
    ["degraded", false, false, false],
    ["stopped", false, false, false],
    ["running", true, false, false],
    ["failed", false, true, false],
    [null, false, false, false],
  ] as const)(
    "%s working=%s stopping=%s -> %s",
    (outcomeKind, isWorking, isStopping, expected) => {
      expect(
        shouldShowAgentLiveRetry({ outcomeKind, isWorking, isStopping }),
      ).toBe(expected);
    },
  );
});
