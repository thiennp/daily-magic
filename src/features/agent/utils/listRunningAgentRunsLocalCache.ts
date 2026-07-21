import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { listAgentRunsLocalCache } from "@/features/reports/agentRunLocalCache";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

/** Jobs still in flight on this browser (Home running list / expand). */
export const listRunningAgentRunsLocalCache = (): readonly AgentRunRecord[] =>
  listAgentRunsLocalCache().filter(
    (run) =>
      run.status === AgentRunStatus.RUNNING ||
      run.status === AgentRunStatus.PENDING_APPROVAL,
  );
