import { describe, expect, it } from "vitest";

import { isValidWorkflowDateValue } from "@/lib/workflows/isValidWorkflowDateValue";

describe("isValidWorkflowDateValue", () => {
  it("accepts real calendar dates", () => {
    expect(isValidWorkflowDateValue("2026-09-21")).toBe(true);
  });

  it("rejects impossible days and non-ISO strings", () => {
    expect(isValidWorkflowDateValue("2026-02-31")).toBe(false);
    expect(isValidWorkflowDateValue("21/09/2026")).toBe(false);
  });
});
