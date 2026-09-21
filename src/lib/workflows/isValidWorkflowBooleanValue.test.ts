import { describe, expect, it } from "vitest";

import {
  isValidWorkflowBooleanValue,
  WORKFLOW_BOOLEAN_NO,
  WORKFLOW_BOOLEAN_YES,
} from "@/lib/workflows/isValidWorkflowBooleanValue";

describe("isValidWorkflowBooleanValue", () => {
  it("accepts yes and no", () => {
    expect(isValidWorkflowBooleanValue(WORKFLOW_BOOLEAN_YES)).toBe(true);
    expect(isValidWorkflowBooleanValue(WORKFLOW_BOOLEAN_NO)).toBe(true);
  });

  it("rejects other truthy strings", () => {
    expect(isValidWorkflowBooleanValue("true")).toBe(false);
    expect(isValidWorkflowBooleanValue("1")).toBe(false);
  });
});
