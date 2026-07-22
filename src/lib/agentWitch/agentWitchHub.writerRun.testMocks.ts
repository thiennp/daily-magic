import { vi } from "vitest";

import { USER_ID } from "./agentWitchHub.testHelpers";
import { DispatchPolicy } from "@/lib/dispatch/DispatchPolicy.constant";

const mockAgentRun = {
  id: "run-1",
  groupId: null,
  requesterUserId: USER_ID,
  executorUserId: USER_ID,
  prompt: "run lint",
  status: "running",
  dispatchPolicy: DispatchPolicy.OPEN,
  resultOutput: null,
  resultExitCode: null,
  denialReason: null,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  startedAt: null,
  completedAt: null,
  approvalExpiresAt: null,
  capabilityId: null,
  capabilityVersionId: null,
  deviceId: null,
  writerAgent: "claude-cli",
};

vi.mock("@/lib/agentWitch/findAgentWitchDeviceByToken", () => ({
  findAgentWitchDeviceByToken: vi.fn(async () => null),
}));

vi.mock("@/lib/dispatch/persistAgentRun", () => ({
  persistAgentRun: vi.fn(async () => mockAgentRun),
}));

vi.mock("@/lib/dispatch/agentRunQueries", () => ({
  getAgentRunById: vi.fn(async () => mockAgentRun),
}));

vi.mock("@/lib/dispatch/agentRunSessionRegistry", () => ({
  registerAgentRunSession: vi.fn(),
}));

vi.mock("@/lib/dispatch/broadcastAgentRunRecord", () => ({
  broadcastAgentRunRecord: vi.fn(),
}));

vi.mock("@/lib/dispatch/resolveDispatchPolicyForExecutor", () => ({
  resolveDispatchPolicyForExecutor: vi.fn(async () => DispatchPolicy.OPEN),
}));

vi.mock("@/lib/dispatch/dispatchWriterRunToAgent", async () => {
  const actual = await vi.importActual<
    typeof import("@/lib/dispatch/dispatchWriterRunToAgent")
  >("@/lib/dispatch/dispatchWriterRunToAgent");

  return {
    ...actual,
    markAgentRunRunning: vi.fn(async () => undefined),
    markAgentRunCompleted: vi.fn(async () => undefined),
  };
});
