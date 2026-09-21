import { describe, expect, it } from "vitest";

import { validateWorkflowFieldValue } from "@/lib/workflows/validateWorkflowFieldValue";
import { WorkflowFieldInputType } from "@/lib/workflows/types/WorkflowFieldInputType.constant";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

const field = (
  type: WorkflowFieldDefinition["type"],
  options?: readonly string[],
): WorkflowFieldDefinition => ({
  key: "field",
  label: "Field",
  type,
  required: true,
  ...(options !== undefined ? { options } : {}),
});

describe("validateWorkflowFieldValue", () => {
  it("requires a value when the field is required", () => {
    expect(
      validateWorkflowFieldValue(field(WorkflowFieldInputType.TEXT), "   "),
    ).toBe("Field is required.");
  });

  it("skips type checks when an optional field is empty", () => {
    expect(
      validateWorkflowFieldValue(
        { ...field(WorkflowFieldInputType.EMAIL), required: false },
        "",
      ),
    ).toBeNull();
  });

  it("rejects malformed typed values", () => {
    expect(
      validateWorkflowFieldValue(field(WorkflowFieldInputType.NUMBER), "12px"),
    ).toBe("Field must be a number.");
    expect(
      validateWorkflowFieldValue(field(WorkflowFieldInputType.PHONE), "123"),
    ).toBe("Field must be a phone number.");
    expect(
      validateWorkflowFieldValue(field(WorkflowFieldInputType.EMAIL), "ops@"),
    ).toBe("Field must be an email address.");
    expect(
      validateWorkflowFieldValue(
        field(WorkflowFieldInputType.URL),
        "javascript:alert(1)",
      ),
    ).toBe("Field must be a link.");
    expect(
      validateWorkflowFieldValue(
        field(WorkflowFieldInputType.DATE),
        "2026-02-31",
      ),
    ).toBe("Field must be a date.");
    expect(
      validateWorkflowFieldValue(field(WorkflowFieldInputType.BOOLEAN), "true"),
    ).toBe("Field must be yes or no.");
    expect(
      validateWorkflowFieldValue(
        field(WorkflowFieldInputType.SELECT, ["A", "B"]),
        "C",
      ),
    ).toBe("Field must be one of the listed choices.");
    expect(
      validateWorkflowFieldValue(field(WorkflowFieldInputType.SELECT), "A"),
    ).toBe("Field must be one of the listed choices.");
  });
});
