import { describe, expect, it } from "vitest";

import { createDraftWorkflowField } from "@/features/workflows/createDraftWorkflowField";
import { WorkflowFieldInputType } from "@/lib/workflows/types/WorkflowFieldInputType.constant";

describe("createDraftWorkflowField", () => {
  it("starts a required text question", () => {
    const field = createDraftWorkflowField();
    expect(field.label).toBe("");
    expect(field.type).toBe(WorkflowFieldInputType.TEXT);
    expect(field.required).toBe(true);
    expect(field.options).toEqual([]);
    expect(field.id.length).toBeGreaterThan(0);
  });
});
