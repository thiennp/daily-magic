import type { useDemoPreview } from "@/features/demo/DemoPreviewContext";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

export const findDemoAgentRun = (
  demoPreview: NonNullable<ReturnType<typeof useDemoPreview>>,
  runId: string,
): EnrichedAgentRunRecord | null =>
  demoPreview.agentRuns.find((item) => item.id === runId) ??
  demoPreview.agentRuns[0] ??
  null;

export const toEnrichedAgentRun = (
  run: AgentRunRecord,
): EnrichedAgentRunRecord => ({
  ...run,
  requesterEmail: run.requesterUserId,
  executorEmail: run.executorUserId,
  requesterName: null,
  executorName: null,
});
