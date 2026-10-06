import { executeAgentAccessAccountTools } from "@/lib/agentAccess/executeAgentAccessAccountTools";
import { executeAgentAccessGuideTool } from "@/lib/agentAccess/executeAgentAccessGuideTool";
import { executeAgentAccessProjectAclTool } from "@/lib/agentAccess/executeAgentAccessProjectAclTool";
import { executeAgentAccessRegisterTool } from "@/lib/agentAccess/executeAgentAccessRegisterTool";
import { executeAgentAccessRunTool } from "@/lib/agentAccess/executeAgentAccessRunTool";
import { executeAgentAccessSendTask } from "@/lib/agentAccess/executeAgentAccessSendTask";
import { executeAgentAccessWorkflowTool } from "@/lib/agentAccess/executeAgentAccessWorkflowTool";
import { guardAgentAccessToolUse } from "@/lib/agentAccess/guardAgentAccessToolUse";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/handleAgentAccessMcpRequest";
import { readBearerAgentAccessToken } from "@/lib/agentAccess/hashAgentAccessToken";
import {
  agentAccessTextResult,
  agentAccessUnauthorized,
  isAgentAccessActor,
  requireAgentAccessActor,
} from "@/lib/agentAccess/requireAgentAccessActor";

export const executeAgentAccessTool = async (input: {
  readonly name: string;
  readonly args: unknown;
  readonly authorization: string | null;
  readonly ip: string;
}): Promise<AgentAccessToolCallResult> => {
  if (input.name === "register_account") {
    return executeAgentAccessRegisterTool(input.args, input.ip);
  }

  const actor = await requireAgentAccessActor(input.authorization);
  if (!isAgentAccessActor(actor)) {
    return actor;
  }

  const token = readBearerAgentAccessToken(input.authorization);
  if (token === null) return agentAccessUnauthorized();

  const gated = await guardAgentAccessToolUse({
    name: input.name,
    token,
    userId: actor.id,
  });
  if (gated !== null) {
    return gated;
  }

  const accountResult = await executeAgentAccessAccountTools({
    actor,
    name: input.name,
  });
  if (accountResult !== null) {
    return accountResult;
  }

  if (input.name === "send_task") {
    return executeAgentAccessSendTask(actor, input.args);
  }

  const projectAclResult = await executeAgentAccessProjectAclTool({
    actor,
    name: input.name,
    args: input.args,
  });
  if (projectAclResult !== null) {
    return projectAclResult;
  }

  const guideResult = await executeAgentAccessGuideTool({
    actor,
    name: input.name,
    args: input.args,
    token,
  });
  if (guideResult !== null) {
    return guideResult;
  }

  const workflowResult = await executeAgentAccessWorkflowTool({
    actor,
    name: input.name,
    args: input.args,
  });
  if (workflowResult !== null) {
    return workflowResult;
  }

  const runResult = await executeAgentAccessRunTool(
    actor,
    input.name,
    input.args,
  );
  if (runResult !== null) {
    return runResult;
  }

  return agentAccessTextResult(
    { ok: false, error: "Unknown tool.", code: "unknown_tool" },
    true,
  );
};
