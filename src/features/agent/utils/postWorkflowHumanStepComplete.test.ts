import { afterEach, describe, expect, it, vi } from "vitest";

import { postWorkflowHumanStepComplete } from "@/features/agent/utils/postWorkflowHumanStepComplete";
import { setWorkflowHumanStepPending } from "@/features/dispatch/public-api/presentation";

describe("postWorkflowHumanStepComplete", () => {
  afterEach(() => {
    setWorkflowHumanStepPending(null);
    vi.unstubAllGlobals();
  });

  it("POSTs writerAgent with the human-step reply so the next agent step keeps dispatch context", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      status: 200,
      json: async () => ({ ok: true, workflowRunId: "wr-1" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await postWorkflowHumanStepComplete({
      workflowRunId: "wr-1",
      stepRunId: "sr-1",
      response: "Approved.",
      writerAgent: "antigravity",
      targetDeviceId: "mac-1",
    });

    expect(result.ok).toBe(true);
    expect(fetchMock).toHaveBeenCalledWith("/api/workflow-runs/human-step", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        workflowRunId: "wr-1",
        stepRunId: "sr-1",
        response: "Approved.",
        writerAgent: "antigravity",
        targetDeviceId: "mac-1",
      }),
    });
  });
});
