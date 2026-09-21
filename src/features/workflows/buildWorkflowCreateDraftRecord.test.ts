import { describe, expect, it } from "vitest";

import { buildWorkflowCreateDraftRecord } from "@/features/workflows/buildWorkflowCreateDraftRecord";
import { WorkflowFieldInputType } from "@/lib/workflows/types/WorkflowFieldInputType.constant";

describe("buildWorkflowCreateDraftRecord", () => {
  it("rejects when no labeled questions exist", () => {
    const result = buildWorkflowCreateDraftRecord({
      name: "Weekly",
      exampleRequest: "",
      draftFields: [
        { id: "1", label: "  ", type: "text", required: true, options: [] },
      ],
      harnessReadyItems: [],
      trialFieldValues: {},
    });

    expect(result.ok).toBe(false);
  });

  it("requires trial answers for required fields", () => {
    const result = buildWorkflowCreateDraftRecord({
      name: "Weekly",
      exampleRequest: "Be concise",
      draftFields: [
        {
          id: "1",
          label: "Topic",
          type: WorkflowFieldInputType.TEXT,
          required: true,
          options: [],
        },
      ],
      harnessReadyItems: [],
      trialFieldValues: {},
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errorMessage.length).toBeGreaterThan(0);
    }
  });

  it("builds a draft record with operator steps", () => {
    const result = buildWorkflowCreateDraftRecord({
      name: "",
      exampleRequest: "Tone: friendly",
      draftFields: [
        {
          id: "1",
          label: "Client",
          type: WorkflowFieldInputType.TEXT,
          required: true,
          options: [],
        },
      ],
      harnessReadyItems: [
        {
          id: "op-1",
          kind: "operator",
          title: "Review",
          content: "Check the draft",
        },
      ],
      trialFieldValues: { client: "Acme" },
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.record.name).toBe("Untitled workflow");
      expect(result.record.workflowFields).toHaveLength(1);
      expect(result.record.operatorSteps).toHaveLength(1);
      expect(result.record.trialFieldValues.client).toBe("Acme");
    }
  });
});
