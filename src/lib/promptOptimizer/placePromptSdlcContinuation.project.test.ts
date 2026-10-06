import { beforeEach, describe, expect, it, vi } from "vitest";

import { CURSOR_CLOUD_EXECUTOR_DEVICE_ID } from "@/lib/cursorCloud/cursorCloudExecutorDeviceId.constant";
import type { PromptSdlcContinuation } from "@/lib/promptOptimizer/continuePromptSdlc";
import { placePromptSdlcContinuation } from "@/lib/promptOptimizer/placePromptSdlcContinuation";
import type PromptSdlcCycleRecord from "@/lib/promptOptimizer/types/PromptSdlcCycleRecord.type";

const mocks = vi.hoisted(() => ({
  dispatch: vi.fn(),
  ensureDefaultUserProject: vi.fn(),
  save: vi.fn(),
}));

vi.mock("@/lib/dispatch/dispatchWriterRunForDashboardUser", () => ({
  dispatchClaudeRunForDashboardUser: mocks.dispatch,
}));
vi.mock("@/lib/projects/ensureDefaultUserProject", () => ({
  ensureDefaultUserProject: mocks.ensureDefaultUserProject,
}));
vi.mock("@/lib/auth/userRepository", () => ({ getUserById: vi.fn() }));
vi.mock("@/lib/agentWitch/getAgentWitchHub", () => ({
  getAgentWitchHub: () => ({}),
}));
vi.mock("@/lib/promptOptimizer/promptSdlcCycleQueries", () => ({
  savePromptSdlcCycleProgress: mocks.save,
}));

const cycle = {
  id: "cy-1",
  ownerUserId: "u1",
  deviceId: "mac-1",
} as unknown as PromptSdlcCycleRecord;

const call = (writerAgent: string) =>
  ({
    type: "call",
    role: "judge",
    prompt: "judge it",
    choice: { kind: "writer", writerAgent },
  }) as unknown as PromptSdlcContinuation;

describe("placePromptSdlcContinuation project binding", () => {
  beforeEach(() => {
    mocks.dispatch.mockReset();
    mocks.ensureDefaultUserProject.mockReset();
    mocks.save.mockReset();
    mocks.ensureDefaultUserProject.mockResolvedValue({ id: "proj-default" });
    mocks.dispatch.mockResolvedValue({ ok: true, run: { id: "run-1" } });
  });

  it("dispatches into the owner's Default on the cycle computer", async () => {
    await placePromptSdlcContinuation({
      cycle,
      continuation: call("claude"),
      requesterEmail: "owner@example.com",
      currentRound: 1,
    });
    expect(mocks.ensureDefaultUserProject).toHaveBeenCalledWith(
      "u1",
      "owner@example.com",
      "mac-1",
    );
    expect(mocks.dispatch.mock.calls[0][0].body).toMatchObject({
      projectId: "proj-default",
      targetDeviceId: "mac-1",
    });
  });

  it("uses the cycle Mac for Default when the writer is cursor-cloud", async () => {
    await placePromptSdlcContinuation({
      cycle,
      continuation: call("cursor-cloud"),
      requesterEmail: "owner@example.com",
      currentRound: 1,
    });
    expect(mocks.ensureDefaultUserProject).toHaveBeenCalledWith(
      "u1",
      "owner@example.com",
      "mac-1",
    );
    expect(mocks.dispatch.mock.calls[0][0].body).toMatchObject({
      projectId: "proj-default",
      targetDeviceId: CURSOR_CLOUD_EXECUTOR_DEVICE_ID,
    });
  });

  it("saves project_required + hint as the cycle error", async () => {
    mocks.ensureDefaultUserProject.mockResolvedValue(null);
    mocks.dispatch.mockResolvedValue({
      ok: false,
      message: {
        payload: { errorMessage: "project_id is required.", hint: "Pick one." },
      },
    });
    await placePromptSdlcContinuation({
      cycle,
      continuation: call("claude"),
      requesterEmail: "owner@example.com",
      currentRound: 1,
    });
    expect(mocks.save).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "failed",
        errorMessage: "project_id is required. Pick one.",
      }),
    );
  });
});
