import { describe, expect, it } from "vitest";

import { isValidWorkflowEmailValue } from "@/lib/workflows/isValidWorkflowEmailValue";

describe("isValidWorkflowEmailValue", () => {
  it("accepts a simple email", () => {
    expect(isValidWorkflowEmailValue("ops@agentwitch.com")).toBe(true);
  });

  it("rejects missing local or domain parts", () => {
    expect(isValidWorkflowEmailValue("ops@")).toBe(false);
    expect(isValidWorkflowEmailValue("agentwitch.com")).toBe(false);
  });
});
