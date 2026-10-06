import { listPublishedCapabilitiesForOwner } from "@/lib/capabilities/capabilityQueries";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { listAgentRunsForUser } from "@/lib/dispatch/listAgentRunsForUser";

import {
  AGENT_ACCESS_MUTATIONS_PER_HOUR,
  AGENT_ACCESS_TOOL_CALLS_PER_HOUR,
} from "@/lib/agentAccess/agentAccess.constant";
import { AGENT_ACCESS_TOOLS } from "@/lib/agentAccess/agentAccessTools.constant";
import { consumeAgentAccessBucket } from "@/lib/agentAccess/consumeAgentAccessBucket";
import {
  isAgentAccessMutatingTool,
  isAgentAccessRunCapacityFull,
  isAgentAccessWorkflowCapacityFull,
} from "@/lib/agentAccess/decideAgentAccessAllowance";
import { hashAgentAccessToken } from "@/lib/agentAccess/hashAgentAccessToken";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/handleAgentAccessMcpRequest";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";

const KNOWN_TOOLS = new Set<string>(
  AGENT_ACCESS_TOOLS.map((tool) => tool.name),
);

const limited = (): AgentAccessToolCallResult =>
  agentAccessTextResult(
    {
      ok: false,
      error: "Too many requests. Wait before trying again.",
      code: "rate_limited",
    },
    true,
  );

const countOpenRuns = async (userId: string): Promise<number> => {
  const [running, pending] = await Promise.all([
    listAgentRunsForUser(userId, { status: AgentRunStatus.RUNNING, limit: 4 }),
    listAgentRunsForUser(userId, {
      status: AgentRunStatus.PENDING_APPROVAL,
      limit: 4,
    }),
  ]);

  return running.length + pending.length;
};

export const guardAgentAccessToolUse = async (input: {
  readonly name: string;
  readonly token: string;
  readonly userId: string;
}): Promise<AgentAccessToolCallResult | null> => {
  if (!KNOWN_TOOLS.has(input.name)) {
    return agentAccessTextResult(
      { ok: false, error: "Unknown tool.", code: "unknown_tool" },
      true,
    );
  }

  const subjectHash = hashAgentAccessToken(input.token);
  const toolAllowed = await consumeAgentAccessBucket({
    subjectHash,
    bucket: "tool",
    limit: AGENT_ACCESS_TOOL_CALLS_PER_HOUR,
  });

  if (!toolAllowed) {
    return limited();
  }

  if (!isAgentAccessMutatingTool(input.name)) {
    return null;
  }

  const mutationAllowed = await consumeAgentAccessBucket({
    subjectHash,
    bucket: "mutate",
    limit: AGENT_ACCESS_MUTATIONS_PER_HOUR,
  });

  if (!mutationAllowed) {
    return limited();
  }

  if (input.name === "send_task" || input.name === "run_workflow") {
    const open = await countOpenRuns(input.userId);

    if (isAgentAccessRunCapacityFull(open)) {
      return agentAccessTextResult(
        {
          ok: false,
          error:
            "A Run is already open. Wait for it to finish before starting another.",
          code: "busy",
        },
        true,
      );
    }
  }

  if (input.name !== "create_workflow") {
    return null;
  }

  const workflows = (
    await listPublishedCapabilitiesForOwner(input.userId)
  ).filter((capability) => capability.type === CapabilityType.WORKFLOW);

  return isAgentAccessWorkflowCapacityFull(workflows.length)
    ? agentAccessTextResult(
        {
          ok: false,
          error: "Workflow limit reached for this account.",
          code: "capacity",
        },
        true,
      )
    : null;
};
