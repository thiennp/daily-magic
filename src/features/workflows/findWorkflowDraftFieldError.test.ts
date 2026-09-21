import { describe, expect, it } from "vitest";

import { findWorkflowDraftFieldError } from "@/features/workflows/findWorkflowDraftFieldError";
import { WorkflowFieldInputType } from "@/lib/workflows/types/WorkflowFieldInputType.constant";

describe("findWorkflowDraftFieldError", () => {
  it("ignores unlabeled rows and reports the first labeled select error", () => {
    expect(
      findWorkflowDraftFieldError([
        {
          id: "empty",
          label: "  ",
          type: WorkflowFieldInputType.SELECT,
          required: true,
          options: [],
        },
        {
          id: "size",
          label: "Size",
          type: WorkflowFieldInputType.SELECT,
          required: true,
          options: ["S"],
        },
      ]),
    ).toBe("Size needs at least two choices.");
  });

  it("returns null when labeled fields are valid", () => {
    expect(
      findWorkflowDraftFieldError([
        {
          id: "count",
          label: "Count",
          type: WorkflowFieldInputType.NUMBER,
          required: true,
          options: [],
        },
      ]),
    ).toBeNull();
  });
});
