import { beforeEach, describe, expect, it, vi } from "vitest";

const startRun = vi.hoisted(() => vi.fn());

vi.mock("@/lib/agentWitch/getAgentWitchHub", () => ({
  getAgentWitchHub: () => ({}),
}));
vi.mock("@/lib/workflowOrchestration/startOfficialWorkflowRun", () => ({
  startOfficialWorkflowRun: startRun,
}));

import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import { runAgentAccessWorkflow } from "@/lib/agentAccess/runAgentAccessWorkflow";

const actor: AgentAccessActor = {
  id: "user-1",
  email: "agt@agents.agentwitch.com",
  globalRole: "user",
  name: "Grok",
  registrationMethod: "none",
};

const args = { capabilityId: "cap-1", fieldValues: {} };

const run = async () => {
  const result = await runAgentAccessWorkflow(actor, args);
  return {
    isError: result.isError,
    json: JSON.parse(result.text) as Record<string, unknown>,
  };
};

describe("runAgentAccessWorkflow error shape", () => {
  beforeEach(() => {
    startRun.mockReset();
  });

  it("returns { ok, error, code: not_found } when the capability is missing", async () => {
    startRun.mockResolvedValue({
      ok: false,
      message: "Workflow capability not found.",
      code: "not_found",
    });

    const { isError, json } = await run();

    expect(isError).toBe(true);
    expect(json).toMatchObject({
      ok: false,
      error: "Workflow capability not found.",
      code: "not_found",
    });
  });

  it("falls back to workflow_run_failed when the step has no code or message", async () => {
    startRun.mockResolvedValue({ ok: false });

    const { isError, json } = await run();

    expect(isError).toBe(true);
    expect(json).toMatchObject({
      ok: false,
      error: "Workflow run failed.",
      code: "workflow_run_failed",
    });
  });

  it("passes a successful step through unchanged", async () => {
    startRun.mockResolvedValue({
      ok: true,
      workflowRunId: "run-1",
      currentStep: 0,
    });

    const { isError, json } = await run();

    expect(isError).toBe(false);
    expect(json).toEqual({ ok: true, workflowRunId: "run-1", currentStep: 0 });
  });

  it("keeps invalid_arguments when fieldValues are missing", async () => {
    const result = await runAgentAccessWorkflow(actor, {
      capabilityId: "cap-1",
    });

    expect(result.isError).toBe(true);
    expect(JSON.parse(result.text)).toMatchObject({
      code: "invalid_arguments",
    });
    expect(startRun).not.toHaveBeenCalled();
  });
});
