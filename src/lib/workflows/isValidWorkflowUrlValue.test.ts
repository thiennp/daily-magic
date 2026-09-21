import { describe, expect, it } from "vitest";

import { isValidWorkflowUrlValue } from "@/lib/workflows/isValidWorkflowUrlValue";

describe("isValidWorkflowUrlValue", () => {
  it("accepts http URLs and hostnames without a protocol", () => {
    expect(isValidWorkflowUrlValue("https://agentwitch.com")).toBe(true);
    expect(isValidWorkflowUrlValue("http://localhost:3000")).toBe(true);
    expect(isValidWorkflowUrlValue("agentwitch.com/docs")).toBe(true);
  });

  it("rejects non-http schemes and empty hosts", () => {
    expect(isValidWorkflowUrlValue("javascript:alert(1)")).toBe(false);
    expect(isValidWorkflowUrlValue("://")).toBe(false);
  });
});
