import { describe, expect, it } from "vitest";

import { parseWorkflowFieldDefinitions } from "@/lib/workflows/parseWorkflowFieldDefinitions";
import { WorkflowFieldInputType } from "@/lib/workflows/types/WorkflowFieldInputType.constant";

describe("parseWorkflowFieldDefinitions", () => {
  it("returns an empty list for non-arrays", () => {
    expect(parseWorkflowFieldDefinitions(null)).toEqual([]);
    expect(parseWorkflowFieldDefinitions({})).toEqual([]);
  });

  it("skips entries without a key or label", () => {
    expect(
      parseWorkflowFieldDefinitions([
        { key: "", label: "Phone", type: "phone", required: true },
        { key: "phone", label: "  ", type: "phone", required: true },
        { key: "phone", label: "Phone", type: "phone", required: true },
        "skip",
      ]),
    ).toEqual([
      {
        key: "phone",
        label: "Phone",
        type: WorkflowFieldInputType.PHONE,
        required: true,
      },
    ]);
  });

  it("defaults unknown types to text and keeps select options", () => {
    expect(
      parseWorkflowFieldDefinitions([
        { key: "note", label: "Note", type: "mystery", required: false },
        {
          key: "size",
          label: "Size",
          type: "select",
          required: true,
          options: [" S ", "", "M", "S"],
        },
      ]),
    ).toEqual([
      {
        key: "note",
        label: "Note",
        type: WorkflowFieldInputType.TEXT,
        required: false,
      },
      {
        key: "size",
        label: "Size",
        type: WorkflowFieldInputType.SELECT,
        required: true,
        options: ["S", "M", "S"],
      },
    ]);
  });
});
