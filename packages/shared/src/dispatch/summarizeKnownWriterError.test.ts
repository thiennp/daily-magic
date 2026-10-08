import { describe, expect, it } from "vitest";

import { summarizeKnownWriterError } from "./summarizeKnownWriterError";

const AGY_QUOTA = `error: Individual quota reached. Please upgrade your subscription to increase your limits. Resets in 44m20s.
AGY_ERROR: {"short_error":"RESOURCE_EXHAUSTED (code 429): Individual quota reached. Please upgrade your subscription to increase your limits. Resets in 44m20s.","status":"RESOURCE_EXHAUSTED","error_code":429,"code_kind":"http","retryable":true}`;

describe("summarizeKnownWriterError (9b3947bc)", () => {
  it("Testi ec563160: agy 429 quota becomes one sentence", () => {
    expect(summarizeKnownWriterError(AGY_QUOTA)).toBe(
      "Antigravity quota reached; resets in 44m.",
    );
  });

  it("agy quota with hours, and with only the AGY_ERROR line", () => {
    expect(
      summarizeKnownWriterError(
        'AGY_ERROR: {"status":"RESOURCE_EXHAUSTED","error_code":429} Resets in 1h5m3s.',
      ),
    ).toBe("Antigravity quota reached; resets in 1h 5m.");
  });

  it("agy quota without a reset time", () => {
    expect(summarizeKnownWriterError("error: Individual quota reached.")).toBe(
      "Antigravity quota reached.",
    );
  });

  it("Claude session limit", () => {
    expect(
      summarizeKnownWriterError("You've hit your session limit · resets 3pm"),
    ).toBe("Claude usage limit reached; resets 3pm.");
  });

  it("unknown errors stay null", () => {
    expect(summarizeKnownWriterError("error: ENOENT spawn agy")).toBeNull();
    expect(summarizeKnownWriterError("")).toBeNull();
  });
});
