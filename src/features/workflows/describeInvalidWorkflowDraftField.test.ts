import { describe, expect, it } from "vitest";

import { describeInvalidWorkflowDraftField } from "@/features/workflows/describeInvalidWorkflowDraftField";
import { WorkflowFieldInputType } from "@/lib/workflows/types/WorkflowFieldInputType.constant";

describe("describeInvalidWorkflowDraftField", () => {
  it("requires two unique choices for select fields", () => {
    expect(
      describeInvalidWorkflowDraftField({
        id: "1",
        label: "Size",
        type: WorkflowFieldInputType.SELECT,
        required: true,
        options: ["S", " S ", ""],
      }),
    ).toBe("Size needs at least two choices.");
  });

  it("ignores non-select fields and complete choice lists", () => {
    expect(
      describeInvalidWorkflowDraftField({
        id: "1",
        label: "Count",
        type: WorkflowFieldInputType.NUMBER,
        required: true,
        options: [],
      }),
    ).toBeNull();
    expect(
      describeInvalidWorkflowDraftField({
        id: "2",
        label: "",
        type: WorkflowFieldInputType.SELECT,
        required: true,
        options: ["A", "B"],
      }),
    ).toBeNull();
    expect(
      describeInvalidWorkflowDraftField({
        id: "3",
        label: "  ",
        type: WorkflowFieldInputType.SELECT,
        required: true,
        options: ["A"],
      }),
    ).toBe("This choice list needs at least two choices.");
  });
});
