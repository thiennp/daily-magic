import { describe, expect, it } from "vitest";

import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { DispatchPolicy } from "@/lib/dispatch/DispatchPolicy.constant";
import {
  resolveHomeRunningJobBadgeClassName,
  resolveHomeRunningJobBadgeOverride,
} from "@/features/home/utils/resolveHomeRunningJobBadgeOverride";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

const baseRun: AgentRunRecord = {
  id: "run-1",
  groupId: null,
  requesterUserId: "u1",
  executorUserId: "u1",
  prompt: "demo",
  status: AgentRunStatus.RUNNING,
  dispatchPolicy: DispatchPolicy.OPEN,
  resultOutput: null,
  resultExitCode: null,
  resultOutcomeCode: null,
  denialReason: null,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  startedAt: "2026-01-01T00:00:00.000Z",
  completedAt: null,
  approvalExpiresAt: null,
  capabilityId: null,
  capabilityVersionId: null,
  deviceId: null,
  projectId: null,
  compositionSnapshotId: null,
  writerAgent: "claude-cli",
  lastRunHeartbeatAt: null,
};

describe("resolveHomeRunningJobBadgeOverride", () => {
  it("uses Waiting on you for pending approval", () => {
    expect(
      resolveHomeRunningJobBadgeOverride({
        run: { ...baseRun, status: AgentRunStatus.PENDING_APPROVAL },
        approvalWaitingLabel: null,
      }),
    ).toBe("Waiting on you");
  });

  it("applies blue tone for waiting badge", () => {
    expect(
      resolveHomeRunningJobBadgeClassName({
        run: { ...baseRun, status: AgentRunStatus.PENDING_APPROVAL },
        approvalWaitingLabel: null,
      }),
    ).toContain("brand");
  });
});
