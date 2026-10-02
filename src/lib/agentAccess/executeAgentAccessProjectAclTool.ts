import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/handleAgentAccessMcpRequest";
import { executeProjectAclActivityTool } from "@/lib/agentAccess/executeProjectAclActivityTool";
import { executeProjectAclCheckMembershipTool } from "@/lib/agentAccess/executeProjectAclCheckMembershipTool";
import { executeProjectAclClaimTools } from "@/lib/agentAccess/executeProjectAclClaimTools";
import { executeProjectAclGetTool } from "@/lib/agentAccess/executeProjectAclGetTool";
import { executeProjectAclInviteHooksTools } from "@/lib/agentAccess/executeProjectAclInviteHooksTools";
import { executeProjectAclRedeemInviteTool } from "@/lib/agentAccess/executeProjectAclRedeemInviteTool";
import { executeProjectAclRequestTools } from "@/lib/agentAccess/executeProjectAclRequestTools";

export const executeAgentAccessProjectAclTool = async (input: {
  readonly actor: AgentAccessActor;
  readonly name: string;
  readonly args: unknown;
}): Promise<AgentAccessToolCallResult | null> => {
  const hooksResult = await executeProjectAclInviteHooksTools(input);
  if (hooksResult !== null) {
    return hooksResult;
  }
  const redeemResult = await executeProjectAclRedeemInviteTool(input);
  if (redeemResult !== null) {
    return redeemResult;
  }
  const requestResult = await executeProjectAclRequestTools(input);
  if (requestResult !== null) {
    return requestResult;
  }
  const getResult = await executeProjectAclGetTool(input);
  if (getResult !== null) {
    return getResult;
  }
  const checkResult = await executeProjectAclCheckMembershipTool(input);
  if (checkResult !== null) {
    return checkResult;
  }
  const activityResult = await executeProjectAclActivityTool(input);
  if (activityResult !== null) {
    return activityResult;
  }
  return executeProjectAclClaimTools(input);
};
