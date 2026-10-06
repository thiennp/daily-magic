import { beforeEach, describe, expect, it, vi } from "vitest";

import { completeWebhookAutomationDispatch } from "@/lib/automations/completeWebhookAutomationDispatch.util";
import type AgentAutomationRecord from "@/lib/automations/types/AgentAutomationRecord.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

const mocks = vi.hoisted(() => ({
  dispatch: vi.fn(),
  ensureDefaultUserProject: vi.fn(),
  recordAgentAutomationRun: vi.fn(),
}));

vi.mock("@/lib/dispatch/dispatchWriterRunForDashboardUser", () => ({
  dispatchClaudeRunForDashboardUser: mocks.dispatch,
}));
vi.mock("@/lib/projects/ensureDefaultUserProject", () => ({
  ensureDefaultUserProject: mocks.ensureDefaultUserProject,
}));
vi.mock("@/lib/auth/userRepository", () => ({
  getUserById: vi.fn().mockResolvedValue({ email: "owner@example.com" }),
}));
vi.mock("@/lib/automations/buildAutomationDispatchPrompt", () => ({
  buildAutomationDispatchPromptAsync: vi.fn().mockResolvedValue("do it"),
}));
vi.mock("@/lib/automations/recordAgentAutomationRun", () => ({
  linkAgentRunToAutomation: vi.fn(),
  recordAgentAutomationRun: mocks.recordAgentAutomationRun,
}));

const automation = (projectId: string | null) =>
  ({
    id: "auto-1",
    ownerUserId: "u1",
    capabilityId: "cap-1",
    deviceId: "mac-1",
    executorUserId: "u1",
    projectId,
  }) as unknown as AgentAutomationRecord;

const capability = (projectId: string | null) =>
  ({ id: "cap-1", projectId }) as unknown as PublishedCapabilityRecord;

const run = (a: AgentAutomationRecord, c: PublishedCapabilityRecord) =>
  completeWebhookAutomationDispatch({
    automation: a,
    capability: c,
    runtime: {} as AgentWitchHubRuntime,
    fieldValues: {},
  });

const sentProjectId = (): unknown =>
  mocks.dispatch.mock.calls[0][0].body.projectId;

describe("completeWebhookAutomationDispatch project binding", () => {
  beforeEach(() => {
    mocks.dispatch.mockReset();
    mocks.ensureDefaultUserProject.mockReset();
    mocks.recordAgentAutomationRun.mockReset();
    mocks.dispatch.mockResolvedValue({ ok: true, run: { id: "run-1" } });
  });

  it("sends the automation's own project", async () => {
    await run(automation("proj-auto"), capability("proj-cap"));
    expect(sentProjectId()).toBe("proj-auto");
  });

  it("falls back to the capability project", async () => {
    await run(automation(null), capability("proj-cap"));
    expect(sentProjectId()).toBe("proj-cap");
  });

  it("falls back to the owner's Default on the automation computer", async () => {
    mocks.ensureDefaultUserProject.mockResolvedValue({ id: "proj-default" });
    await run(automation(null), capability(null));
    expect(mocks.ensureDefaultUserProject).toHaveBeenCalledWith(
      "u1",
      "owner@example.com",
      "mac-1",
    );
    expect(sentProjectId()).toBe("proj-default");
  });

  it("records project_required with the hint instead of throwing", async () => {
    mocks.ensureDefaultUserProject.mockResolvedValue(null);
    mocks.dispatch.mockResolvedValue({
      ok: false,
      message: {
        payload: { errorMessage: "project_id is required.", hint: "Pick one." },
      },
    });
    const result = await run(automation(null), capability(null));
    expect(result.ok).toBe(false);
    expect(result.errorMessage).toBe("project_id is required. Pick one.");
  });
});
