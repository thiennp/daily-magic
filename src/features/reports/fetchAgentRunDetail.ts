import type { AgentRunDetailFetchOutcome } from "@/features/reports/types/AgentRunDetailFetchOutcome.type";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

export async function fetchAgentRunDetail(
  runId: string,
): Promise<AgentRunDetailFetchOutcome> {
  const response = await fetch(`/api/agent-runs/${runId}`);
  if (response.status === 404) {
    return { status: "not_found" };
  }
  if (!response.ok) {
    return { status: "error" };
  }

  const data: unknown = await response.json();
  if (
    typeof data === "object" &&
    data !== null &&
    "run" in data &&
    typeof (data as { run: EnrichedAgentRunRecord }).run === "object"
  ) {
    return {
      status: "ok",
      run: (data as { run: EnrichedAgentRunRecord }).run,
    };
  }

  return { status: "error" };
}
