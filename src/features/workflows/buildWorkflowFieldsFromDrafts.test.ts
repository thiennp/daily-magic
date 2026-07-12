import { describe, expect, it } from "vitest";

import { buildWorkflowFieldsFromDrafts } from "@/features/workflows/buildWorkflowFieldsFromDrafts";

describe("buildWorkflowFieldsFromDrafts", () => {
  it("maps labels to slug keys and skips empty rows", () => {
    const fields = buildWorkflowFieldsFromDrafts([
      {
        id: "1",
        label: "Week of",
        type: "text",
        required: true,
      },
      {
        id: "2",
        label: "",
        type: "textarea",
        required: false,
      },
    ]);

    expect(fields).toEqual([
      {
        key: "week_of",
        label: "Week of",
        type: "text",
        required: true,
      },
    ]);
  });

  it("deduplicates keys when labels slug to the same value", () => {
    const fields = buildWorkflowFieldsFromDrafts([
      {
        id: "1",
        label: "Week Of",
        type: "text",
        required: true,
      },
      {
        id: "2",
        label: "Week  Of",
        type: "textarea",
        required: false,
      },
    ]);

    expect(fields.map((field) => field.key)).toEqual(["week_of", "week_of_2"]);
  });
});
