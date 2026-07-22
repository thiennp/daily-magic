import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";
import type { DispatchPolicyValue } from "@/lib/dispatch/DispatchPolicy.constant";

export default interface AgentRunRecord {
  readonly id: string;
  readonly groupId: string | null;
  readonly requesterUserId: string;
  readonly executorUserId: string;
  readonly prompt: string;
  readonly status: AgentRunStatusValue;
  readonly dispatchPolicy: DispatchPolicyValue;
  readonly resultOutput: string | null;
  readonly resultExitCode: number | null;
  readonly denialReason: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly startedAt: string | null;
  readonly completedAt: string | null;
  readonly approvalExpiresAt: string | null;
  readonly capabilityId: string | null;
  readonly capabilityVersionId: string | null;
  readonly deviceId: string | null;
  readonly writerAgent: string;
  readonly lastRunHeartbeatAt: string | null;
  readonly reportStatus?: string | null;
  readonly reportSummary?: string | null;
}
