import { afterEach, describe, expect, it, vi } from "vitest";

import { postOfficialWorkflowRunStart } from "@/features/agent/utils/postOfficialWorkflowRunStart";
import {
  getWorkflowHumanStepPendingSnapshot,
  setWorkflowHumanStepPending,
} from "@/features/dispatch/utils/workflowHumanStepPendingStore";

describe("postOfficialWorkflowRunStart", () => {
  afterEach(() => {
    setWorkflowHumanStepPending(null);
    vi.unstubAllGlobals();
  });

  it("POSTs field values to workflow-runs/start and queues human step from response", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      status: 200,
      json: async () => ({
        ok: true,
        workflowRunId: "wr-1",
        humanStep: {
          stepRunId: "sr-1",
          stepIndex: 0,
          title: "Review draft",
          instructions: "Paste the client name.",
        },
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const raw = await postOfficialWorkflowRunStart({
      capabilityId: "cap-workflow",
      fieldValues: { clientName: "Acme" },
      writerAgent: "claude-cli",
      targetDeviceId: "mac-1",
    });

    expect(fetchMock).toHaveBeenCalledWith("/api/workflow-runs/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        capabilityId: "cap-workflow",
        fieldValues: { clientName: "Acme" },
        writerAgent: "claude-cli",
        targetDeviceId: "mac-1",
      }),
    });

    expect(getWorkflowHumanStepPendingSnapshot()).toEqual({
      workflowRunId: "wr-1",
      stepRunId: "sr-1",
      stepIndex: 0,
      title: "Review draft",
      instructions: "Paste the client name.",
    });

    expect(raw).toContain("system.ack");
  });
});
