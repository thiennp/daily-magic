import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

export type AgentRunDetailFetchOutcome =
  | { readonly status: "ok"; readonly run: EnrichedAgentRunRecord }
  | { readonly status: "not_found" }
  | { readonly status: "error" };
