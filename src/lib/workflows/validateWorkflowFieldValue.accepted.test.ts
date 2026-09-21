import { describe, expect, it } from "vitest";

import { validateWorkflowFieldValue } from "@/lib/workflows/validateWorkflowFieldValue";
import { WorkflowFieldInputType } from "@/lib/workflows/types/WorkflowFieldInputType.constant";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

const cases: readonly (readonly [WorkflowFieldDefinition, string])[] = [
  [
    {
      key: "count",
      label: "Count",
      type: WorkflowFieldInputType.NUMBER,
      required: true,
    },
    "3.5",
  ],
  [
    {
      key: "when",
      label: "When",
      type: WorkflowFieldInputType.DATE,
      required: true,
    },
    "2026-09-21",
  ],
  [
    {
      key: "ok",
      label: "OK",
      type: WorkflowFieldInputType.BOOLEAN,
      required: true,
    },
    "yes",
  ],
  [
    {
      key: "email",
      label: "Email",
      type: WorkflowFieldInputType.EMAIL,
      required: true,
    },
    "ops@agentwitch.com",
  ],
  [
    {
      key: "site",
      label: "Site",
      type: WorkflowFieldInputType.URL,
      required: true,
    },
    "https://agentwitch.com",
  ],
  [
    {
      key: "phone",
      label: "Phone",
      type: WorkflowFieldInputType.PHONE,
      required: true,
    },
    "+1 415-555-2671",
  ],
  [
    {
      key: "size",
      label: "Size",
      type: WorkflowFieldInputType.SELECT,
      required: true,
      options: ["A", "B"],
    },
    "B",
  ],
  [
    {
      key: "note",
      label: "Note",
      type: WorkflowFieldInputType.TEXT,
      required: true,
    },
    "ok",
  ],
  [
    {
      key: "repo",
      label: "Repo",
      type: WorkflowFieldInputType.PROJECT,
      required: true,
    },
    "/tmp/app",
  ],
];

describe("validateWorkflowFieldValue accepted values", () => {
  it("accepts well-formed values", () => {
    cases.forEach(([definition, value]) => {
      expect(validateWorkflowFieldValue(definition, value)).toBeNull();
    });
  });
});
