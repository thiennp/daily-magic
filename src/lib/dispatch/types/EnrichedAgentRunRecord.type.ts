import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

export default interface EnrichedAgentRunRecord extends AgentRunRecord {
  readonly requesterEmail: string;
  readonly executorEmail: string;
  readonly requesterName: string | null;
  readonly executorName: string | null;
}
