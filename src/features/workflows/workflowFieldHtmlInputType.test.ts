import { describe, expect, it } from "vitest";

import { workflowFieldHtmlInputType } from "@/features/workflows/workflowFieldHtmlInputType";
import { WorkflowFieldInputType } from "@/lib/workflows/types/WorkflowFieldInputType.constant";

describe("workflowFieldHtmlInputType", () => {
  it("maps typed fields onto native input types", () => {
    expect(workflowFieldHtmlInputType(WorkflowFieldInputType.TEXT)).toBe(
      "text",
    );
    expect(workflowFieldHtmlInputType(WorkflowFieldInputType.NUMBER)).toBe(
      "number",
    );
    expect(workflowFieldHtmlInputType(WorkflowFieldInputType.PHONE)).toBe(
      "tel",
    );
    expect(workflowFieldHtmlInputType(WorkflowFieldInputType.EMAIL)).toBe(
      "email",
    );
    expect(workflowFieldHtmlInputType(WorkflowFieldInputType.URL)).toBe("url");
    expect(workflowFieldHtmlInputType(WorkflowFieldInputType.DATE)).toBe(
      "date",
    );
  });

  it("returns null for widgets that are not a single input", () => {
    expect(workflowFieldHtmlInputType(WorkflowFieldInputType.TEXTAREA)).toBe(
      null,
    );
    expect(workflowFieldHtmlInputType(WorkflowFieldInputType.BOOLEAN)).toBe(
      null,
    );
    expect(workflowFieldHtmlInputType(WorkflowFieldInputType.SELECT)).toBe(
      null,
    );
    expect(workflowFieldHtmlInputType(WorkflowFieldInputType.PROJECT)).toBe(
      null,
    );
  });
});
