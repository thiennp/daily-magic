import { describe, expect, it } from "vitest";

import {
  parseOfficialWorkflowHumanStepBody,
  SKIPPED_HUMAN_STEP_RESPONSE,
} from "@/lib/workflowOrchestration/parseOfficialWorkflowHumanStepBody";

describe("parseOfficialWorkflowHumanStepBody", () => {
  it("keeps writerAgent and targetDeviceId so the next agent step uses them", () => {
    expect(
      parseOfficialWorkflowHumanStepBody({
        workflowRunId: "wf-1",
        stepRunId: "step-1",
        response: "ready",
        writerAgent: "antigravity",
        targetDeviceId: "device-1",
      }),
    ).toEqual({
      workflowRunId: "wf-1",
      stepRunId: "step-1",
      response: "ready",
      writerAgent: "antigravity",
      targetDeviceId: "device-1",
    });
  });

  it("omits empty optional dispatch fields", () => {
    expect(
      parseOfficialWorkflowHumanStepBody({
        workflowRunId: "wf-1",
        stepRunId: "step-1",
        response: "ready",
        writerAgent: "",
        targetDeviceId: "",
      }),
    ).toEqual({
      workflowRunId: "wf-1",
      stepRunId: "step-1",
      response: "ready",
    });
  });

  it("fills the skip response and rejects missing ids", () => {
    expect(
      parseOfficialWorkflowHumanStepBody({
        workflowRunId: "wf-1",
        stepRunId: "step-1",
        skipped: true,
      }),
    ).toEqual({
      workflowRunId: "wf-1",
      stepRunId: "step-1",
      response: SKIPPED_HUMAN_STEP_RESPONSE,
      skipped: true,
    });

    expect(
      parseOfficialWorkflowHumanStepBody({
        stepRunId: "step-1",
        response: "x",
      }),
    ).toBeNull();
  });
});
