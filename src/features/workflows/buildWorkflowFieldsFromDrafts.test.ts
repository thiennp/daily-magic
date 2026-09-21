import { describe, expect, it } from "vitest";

import { buildWorkflowFieldsFromDrafts } from "@/features/workflows/buildWorkflowFieldsFromDrafts";
import { WorkflowFieldInputType } from "@/lib/workflows/types/WorkflowFieldInputType.constant";

describe("buildWorkflowFieldsFromDrafts", () => {
  it("maps labels to slug keys and skips empty rows", () => {
    const fields = buildWorkflowFieldsFromDrafts([
      {
        id: "1",
        label: "Week of",
        type: WorkflowFieldInputType.TEXT,
        required: true,
        options: [],
      },
      {
        id: "2",
        label: "",
        type: WorkflowFieldInputType.TEXTAREA,
        required: false,
        options: [],
      },
    ]);

    expect(fields).toEqual([
      {
        key: "week_of",
        label: "Week of",
        type: WorkflowFieldInputType.TEXT,
        required: true,
      },
    ]);
  });

  it("deduplicates keys when labels slug to the same value", () => {
    const fields = buildWorkflowFieldsFromDrafts([
      {
        id: "1",
        label: "Week Of",
        type: WorkflowFieldInputType.TEXT,
        required: true,
        options: [],
      },
      {
        id: "2",
        label: "Week  Of",
        type: WorkflowFieldInputType.TEXTAREA,
        required: false,
        options: [],
      },
    ]);

    expect(fields.map((field) => field.key)).toEqual(["week_of", "week_of_2"]);
  });

  it("stores unique trimmed choices on select fields", () => {
    expect(
      buildWorkflowFieldsFromDrafts([
        {
          id: "1",
          label: "Size",
          type: WorkflowFieldInputType.SELECT,
          required: true,
          options: [" S ", "M", "S", ""],
        },
      ]),
    ).toEqual([
      {
        key: "size",
        label: "Size",
        type: WorkflowFieldInputType.SELECT,
        required: true,
        options: ["S", "M"],
      },
    ]);
  });
});
