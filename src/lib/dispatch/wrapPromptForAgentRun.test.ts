import { describe, expect, it } from "vitest";

import { AGENT_RUN_INPUT_MARKER } from "@/lib/dispatch/agentRunInputGuardrails.constant";
import { AGENT_RUN_NEXT_ACTIONS_MARKER } from "@/lib/dispatch/agentRunNextActions.constant";
import { AGENT_RUN_PROGRESS_MARKER } from "@/lib/dispatch/agentRunProgress.constant";
import {
  AGENT_RUN_WAVE_PLAN_MARKER,
  AGENT_RUN_WAVE_STATUS_MARKER,
} from "@/lib/dispatch/agentRunWavePlan.constant";
import { AGENT_RUN_WORKING_ESTIMATE_MARKER } from "@/lib/dispatch/agentRunWorkingEstimate.constant";
import { wrapPromptForAgentRun } from "@/lib/dispatch/wrapPromptForAgentRun";

describe("wrapPromptForAgentRun", () => {
  it("adds progress and input guardrails by default", () => {
    const wrapped = wrapPromptForAgentRun("run tests");

    expect(wrapped).toContain("run tests");
    expect(wrapped).toContain(AGENT_RUN_WORKING_ESTIMATE_MARKER);
    expect(wrapped).toContain(AGENT_RUN_WAVE_PLAN_MARKER);
    expect(wrapped).toContain(AGENT_RUN_WAVE_STATUS_MARKER);
    expect(wrapped).toContain(AGENT_RUN_PROGRESS_MARKER);
    expect(wrapped).toContain(AGENT_RUN_INPUT_MARKER);
    expect(wrapped).not.toContain("append suggested next steps");
  });

  it("adds next-actions instructions for local Mac runs", () => {
    const wrapped = wrapPromptForAgentRun("run tests", {
      includeNextActions: true,
    });

    expect(wrapped).toContain(AGENT_RUN_NEXT_ACTIONS_MARKER);
    expect(wrapped).toContain(AGENT_RUN_WORKING_ESTIMATE_MARKER);
    expect(wrapped).toContain(AGENT_RUN_WAVE_PLAN_MARKER);
    expect(wrapped).toContain(AGENT_RUN_PROGRESS_MARKER);
    expect(wrapped).toContain(AGENT_RUN_INPUT_MARKER);
  });

  it("adds report-file instructions when agentRunId and project folder are provided", () => {
    const wrapped = wrapPromptForAgentRun("run tests", {
      agentRunId: "run-abc",
      projectFolderPath: "/tmp/project",
    });

    expect(wrapped).toContain("run-abc");
    expect(wrapped).toContain("/tmp/project/.agent-witch/reports/run-abc.json");
    expect(wrapped).toContain("userSummary");
  });
});
