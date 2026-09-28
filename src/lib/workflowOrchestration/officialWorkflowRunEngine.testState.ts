import { randomUUID } from "node:crypto";

import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { DEFAULT_DISPATCH_POLICY } from "@/lib/dispatch/DispatchPolicy.constant";
import { registerAgentRunSession } from "@/lib/dispatch/agentRunSessionRegistry";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

/** Mutable dispatch outcome shared by orchestration engine tests and their mock. */
export const officialWorkflowDispatchTestState: {
  shouldFail: boolean;
  lastRunId: string;
} = {
  shouldFail: false,
  lastRunId: "",
};

export const buildMockedDispatchResult = (): Record<string, unknown> => {
  if (officialWorkflowDispatchTestState.shouldFail) {
    return {
      ok: false,
      message: {
        type: "system.error",
        payload: { message: "No Mac connected." },
      },
    };
  }

  officialWorkflowDispatchTestState.lastRunId = `agent-run-${randomUUID()}`;
  const now = new Date().toISOString();
  const mockedRun: AgentRunRecord = {
    id: officialWorkflowDispatchTestState.lastRunId,
    groupId: null,
    requesterUserId: "user-1",
    executorUserId: "user-1",
    prompt: "workflow step",
    status: AgentRunStatus.RUNNING,
    dispatchPolicy: DEFAULT_DISPATCH_POLICY,
    resultOutput: null,
    resultExitCode: null,
    resultOutcomeCode: null,
    denialReason: null,
    createdAt: now,
    updatedAt: now,
    startedAt: now,
    completedAt: null,
    approvalExpiresAt: null,
    capabilityId: "capability-1",
    capabilityVersionId: null,
    deviceId: "device-1",
    projectId: null,
    compositionSnapshotId: null,
    writerAgent: "claude-cli",
    lastRunHeartbeatAt: null,
  };
  registerAgentRunSession(mockedRun);

  return {
    ok: true,
    message: { type: "command.claude.result" },
    run: { id: officialWorkflowDispatchTestState.lastRunId },
  };
};
