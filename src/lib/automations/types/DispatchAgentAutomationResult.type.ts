import type AgentAutomationRecord from "@/lib/automations/types/AgentAutomationRecord.type";

export default interface DispatchAgentAutomationResult {
  readonly ok: boolean;
  readonly automation: AgentAutomationRecord;
  readonly agentRunId: string | null;
  readonly errorMessage: string | null;
}
