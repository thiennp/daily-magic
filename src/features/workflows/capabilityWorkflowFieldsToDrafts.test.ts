import { describe, expect, it, vi } from "vitest";

import { capabilityWorkflowFieldsToDrafts } from "@/features/workflows/capabilityWorkflowFieldsToDrafts";
import { WorkflowFieldInputType } from "@/lib/workflows/types/WorkflowFieldInputType.constant";

describe("capabilityWorkflowFieldsToDrafts", () => {
  it("copies label, type, required, and select options", () => {
    vi.spyOn(crypto, "randomUUID").mockReturnValue(
      "11111111-1111-1111-1111-111111111111",
    );

    expect(
      capabilityWorkflowFieldsToDrafts([
        {
          key: "size",
          label: "Size",
          type: WorkflowFieldInputType.SELECT,
          required: true,
          options: ["S", "M"],
        },
        {
          key: "note",
          label: "Note",
          type: WorkflowFieldInputType.TEXT,
          required: false,
        },
      ]),
    ).toEqual([
      {
        id: "11111111-1111-1111-1111-111111111111",
        label: "Size",
        type: WorkflowFieldInputType.SELECT,
        required: true,
        options: ["S", "M"],
      },
      {
        id: "11111111-1111-1111-1111-111111111111",
        label: "Note",
        type: WorkflowFieldInputType.TEXT,
        required: false,
        options: [],
      },
    ]);
  });
});
