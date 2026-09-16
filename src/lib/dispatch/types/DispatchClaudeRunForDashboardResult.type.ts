import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";

export type DispatchClaudeRunForDashboardResult =
  | {
      readonly ok: true;
      readonly message: AgentWitchMessage;
      readonly run: AgentRunRecord;
    }
  | {
      readonly ok: false;
      readonly message: AgentWitchMessage;
    };
