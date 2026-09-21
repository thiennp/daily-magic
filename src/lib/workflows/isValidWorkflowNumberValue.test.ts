import { describe, expect, it } from "vitest";

import { isValidWorkflowNumberValue } from "@/lib/workflows/isValidWorkflowNumberValue";

describe("isValidWorkflowNumberValue", () => {
  it("accepts integers and decimals", () => {
    expect(isValidWorkflowNumberValue("12")).toBe(true);
    expect(isValidWorkflowNumberValue("-3.5")).toBe(true);
  });

  it("rejects empty and non-numeric strings", () => {
    expect(isValidWorkflowNumberValue("")).toBe(false);
    expect(isValidWorkflowNumberValue("12px")).toBe(false);
  });
});
