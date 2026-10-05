import type { AgentAccessToolCallResult } from "@/lib/agentAccess/handleAgentAccessMcpRequest";
import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";

/**
 * Tool executor owned by an FSA feature slice. src/lib may not import
 * features, so route handlers inject these into executeAgentAccessTool.
 * Return null when the tool name is not handled.
 */
export type AgentAccessFeatureToolExecutor = (input: {
  readonly actor: AgentAccessActor;
  readonly name: string;
  readonly args: unknown;
}) => Promise<AgentAccessToolCallResult | null>;
