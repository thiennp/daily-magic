import { describe, expect, it } from "vitest";

import {
  isAuthorableWorkflowFieldInputType,
  isWorkflowFieldInputType,
} from "@/lib/workflows/isWorkflowFieldInputType";
import { WorkflowFieldInputType } from "@/lib/workflows/types/WorkflowFieldInputType.constant";

describe("isWorkflowFieldInputType", () => {
  it("accepts known types and rejects others", () => {
    expect(isWorkflowFieldInputType(WorkflowFieldInputType.PHONE)).toBe(true);
    expect(isWorkflowFieldInputType("mystery")).toBe(false);
    expect(isWorkflowFieldInputType(1)).toBe(false);
  });
});

describe("isAuthorableWorkflowFieldInputType", () => {
  it("excludes the platform-owned project type", () => {
    expect(
      isAuthorableWorkflowFieldInputType(WorkflowFieldInputType.NUMBER),
    ).toBe(true);
    expect(
      isAuthorableWorkflowFieldInputType(WorkflowFieldInputType.PROJECT),
    ).toBe(false);
  });
});
