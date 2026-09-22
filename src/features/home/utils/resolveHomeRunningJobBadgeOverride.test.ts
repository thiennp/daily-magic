import { describe, expect, it } from "vitest";

import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { DispatchPolicy } from "@/lib/dispatch/DispatchPolicy.constant";
import {
  resolveHomeRunningJobBadgeClassName,
  resolveHomeRunningJobBadgeOverride,
} from "@/features/home/utils/resolveHomeRunningJobBadgeOverride";
import { MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY } from "@/lib/marketplace/runRecipe/marketplacePlanEstimateReasonCode.constant";
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

  it("shows In progress for running jobs", () => {
    expect(
      resolveHomeRunningJobBadgeOverride({
        run: { ...baseRun, status: AgentRunStatus.RUNNING },
        approvalWaitingLabel: null,
      }),
    ).toBe("In progress");
  });

  it("uses honesty chip for terminal failed runs with cli-fallback output", () => {
    const output = [
      "[[MARKETPLACE_PLAN_ESTIMATE]]",
      "marketplacePlanEstimateBackend=cli-fallback-missing-anthropic-writer-api-key",
      `marketplacePlanEstimateReasonCode=${MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY}`,
    ].join("\n");

    expect(
      resolveHomeRunningJobBadgeOverride({
        run: {
          ...baseRun,
          status: AgentRunStatus.FAILED,
          resultOutput: output,
        },
        approvalWaitingLabel: null,
      }),
    ).toBe("Completed with fallback");
    expect(
      resolveHomeRunningJobBadgeClassName({
        run: {
          ...baseRun,
          status: AgentRunStatus.FAILED,
          resultOutput: output,
        },
        approvalWaitingLabel: null,
      }),
    ).toContain("amber");
  });
});
