import { describe, expect, it } from "vitest";

import shouldSubmitContinueMessageOnKeyDown from "@/features/reports/utils/shouldSubmitContinueMessageOnKeyDown";

describe("shouldSubmitContinueMessageOnKeyDown", () => {
  it("REPORTS-004 submits on Enter without Shift", () => {
    expect(
      shouldSubmitContinueMessageOnKeyDown({ key: "Enter", shiftKey: false }),
    ).toBe(true);
  });

  it("REPORTS-004 keeps newline on Shift+Enter", () => {
    expect(
      shouldSubmitContinueMessageOnKeyDown({ key: "Enter", shiftKey: true }),
    ).toBe(false);
  });

  it("REPORTS-004 ignores non-Enter keys and IME composition", () => {
    expect(
      shouldSubmitContinueMessageOnKeyDown({ key: "a", shiftKey: false }),
    ).toBe(false);
    expect(
      shouldSubmitContinueMessageOnKeyDown({
        key: "Enter",
        shiftKey: false,
        isComposing: true,
      }),
    ).toBe(false);
  });
});
