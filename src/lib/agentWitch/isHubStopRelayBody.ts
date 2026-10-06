import type { HubStopRelayBody } from "@/lib/agentWitch/types/HubStopRelayBody.type";

export const isHubStopRelayBody = (body: unknown): body is HubStopRelayBody => {
  if (typeof body !== "object" || body === null) {
    return false;
  }
  const candidate = body as { kind?: unknown; agentRunId?: unknown };
  return (
    candidate.kind === "stop" &&
    typeof candidate.agentRunId === "string" &&
    candidate.agentRunId.length > 0
  );
};
