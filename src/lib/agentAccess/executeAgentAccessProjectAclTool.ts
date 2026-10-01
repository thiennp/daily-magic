import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/handleAgentAccessMcpRequest";
import { executeProjectAclClaimTools } from "@/lib/agentAccess/executeProjectAclClaimTools";
import { executeProjectAclRequestTools } from "@/lib/agentAccess/executeProjectAclRequestTools";

export const executeAgentAccessProjectAclTool = async (input: {
  readonly actor: AgentAccessActor;
  readonly name: string;
  readonly args: unknown;
}): Promise<AgentAccessToolCallResult | null> => {
  const requestResult = await executeProjectAclRequestTools(input);
  if (requestResult !== null) {
    return requestResult;
  }
  return executeProjectAclClaimTools(input);
};
