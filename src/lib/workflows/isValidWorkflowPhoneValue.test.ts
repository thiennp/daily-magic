import { describe, expect, it } from "vitest";

import { isValidWorkflowPhoneValue } from "@/lib/workflows/isValidWorkflowPhoneValue";

describe("isValidWorkflowPhoneValue", () => {
  it("accepts international numbers with punctuation", () => {
    expect(isValidWorkflowPhoneValue("+1 415-555-2671")).toBe(true);
    expect(isValidWorkflowPhoneValue("(415) 555-2671")).toBe(true);
  });

  it("rejects letters and too few digits", () => {
    expect(isValidWorkflowPhoneValue("call me")).toBe(false);
    expect(isValidWorkflowPhoneValue("123")).toBe(false);
    expect(isValidWorkflowPhoneValue("1234567890123456")).toBe(false);
  });
});
