import type { AgentAccessFeatureToolExecutor } from "@/lib/agentAccess/agentAccessFeatureToolExecutor.type";
import { executeIssueClaimBotCodeTool } from "@/lib/agentAccess/claimBot/executeIssueClaimBotCodeTool";
import { executeAgentAccessAccountTools } from "@/lib/agentAccess/executeAgentAccessAccountTools";
import { executeAgentAccessGuideTool } from "@/lib/agentAccess/executeAgentAccessGuideTool";
import { executeAgentAccessProjectAclTool } from "@/lib/agentAccess/executeAgentAccessProjectAclTool";
import { executeAgentAccessRegisterTool } from "@/lib/agentAccess/executeAgentAccessRegisterTool";
import { executeAgentAccessRunTool } from "@/lib/agentAccess/executeAgentAccessRunTool";
import { executeAgentAccessSendTask } from "@/lib/agentAccess/executeAgentAccessSendTask";
import { executeAgentAccessWorkflowTool } from "@/lib/agentAccess/executeAgentAccessWorkflowTool";
import { guardAgentAccessToolUse } from "@/lib/agentAccess/guardAgentAccessToolUse";
import { guardProjectApiKeyToolUse } from "@/lib/agentAccess/guardProjectApiKeyToolUse";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/handleAgentAccessMcpRequest";
import {
  isMcpBearerAuth,
  resolveMcpBearerAuth,
} from "@/lib/agentAccess/resolveMcpBearerAuth";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import { runAgentAccessFeatureToolExecutors } from "@/lib/agentAccess/runAgentAccessFeatureToolExecutors";

export const executeAgentAccessTool = async (input: {
  readonly name: string;
  readonly args: unknown;
  readonly authorization: string | null;
  readonly ip: string;
  /** FSA feature tools (e.g. project skill share), injected by route handlers. */
  readonly featureToolExecutors?: readonly AgentAccessFeatureToolExecutor[];
}): Promise<AgentAccessToolCallResult> => {
  if (input.name === "register_account") {
    return executeAgentAccessRegisterTool(input.args, input.ip);
  }

  const auth = await resolveMcpBearerAuth(input.authorization);
  if (!isMcpBearerAuth(auth)) {
    return auth;
  }

  if (auth.kind === "project_api_key") {
    const projectGate = guardProjectApiKeyToolUse({
      name: input.name,
      args: input.args,
      projectAuth: auth.projectAuth,
    });
    if (projectGate !== null) {
      return projectGate;
    }
  }

  const gated = await guardAgentAccessToolUse({
    name: input.name,
    token: auth.token,
    userId: auth.actor.id,
  });
  if (gated !== null) {
    return gated;
  }

  const actor = auth.actor;
  const token = auth.token;

  const accountResult = await executeAgentAccessAccountTools({
    actor,
    name: input.name,
  });
  if (accountResult !== null) {
    return accountResult;
  }

  if (input.name === "issue_bot_claim_code") {
    return executeIssueClaimBotCodeTool({ token });
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

  const featureResult = await runAgentAccessFeatureToolExecutors({
    executors: input.featureToolExecutors ?? [],
    actor,
    name: input.name,
    args: input.args,
  });
  if (featureResult !== null) {
    return featureResult;
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
