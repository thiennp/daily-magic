import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

export async function fetchAgentRunDetail(
  runId: string,
): Promise<EnrichedAgentRunRecord | null> {
  const response = await fetch(`/api/agent-runs/${runId}`);
  if (!response.ok) {
    return null;
  }

  const data: unknown = await response.json();
  if (
    typeof data === "object" &&
    data !== null &&
    "run" in data &&
    typeof (data as { run: EnrichedAgentRunRecord }).run === "object"
  ) {
    return (data as { run: EnrichedAgentRunRecord }).run;
  }

  return null;
}
