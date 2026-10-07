import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/agentAccessToolCallResult.type";
import { executeProjectAclActivityTool } from "@/lib/agentAccess/executeProjectAclActivityTool";
import { executeProjectAclBriefingTool } from "@/lib/agentAccess/executeProjectAclBriefingTool";
import { executeProjectAclCheckMembershipTool } from "@/lib/agentAccess/executeProjectAclCheckMembershipTool";
import { executeProjectAclClaimTools } from "@/lib/agentAccess/executeProjectAclClaimTools";
import { executeProjectAclGetTool } from "@/lib/agentAccess/executeProjectAclGetTool";
import { executeProjectAclInviteHooksTools } from "@/lib/agentAccess/executeProjectAclInviteHooksTools";
import { executeProjectAclRedeemInviteTool } from "@/lib/agentAccess/executeProjectAclRedeemInviteTool";
import { executeProjectAclLeaveTool } from "@/lib/agentAccess/executeProjectAclLeaveTool";
import { executeProjectAclRequestTools } from "@/lib/agentAccess/executeProjectAclRequestTools";
import { executeProjectTaskTools } from "@/lib/agentAccess/executeProjectTaskTools";

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
  const leaveResult = await executeProjectAclLeaveTool(input);
  if (leaveResult !== null) {
    return leaveResult;
  }
  const requestResult = await executeProjectAclRequestTools(input);
  if (requestResult !== null) {
    return requestResult;
  }
  const briefingResult = await executeProjectAclBriefingTool(input);
  if (briefingResult !== null) {
    return briefingResult;
  }
  const getResult = await executeProjectAclGetTool(input);
  if (getResult !== null) {
    return getResult;
  }
  const checkResult = await executeProjectAclCheckMembershipTool(input);
  if (checkResult !== null) {
    return checkResult;
  }
  const taskResult = await executeProjectTaskTools(input);
  if (taskResult !== null) {
    return taskResult;
  }
  const activityResult = await executeProjectAclActivityTool(input);
  if (activityResult !== null) {
    return activityResult;
  }
  return executeProjectAclClaimTools(input);
};
