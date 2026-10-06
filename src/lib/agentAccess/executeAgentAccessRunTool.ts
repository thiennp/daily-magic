import { isNonEmptyString, isType } from "guardz";

import { getAgentRunForParticipant } from "@/lib/dispatch/getAgentRunForParticipant";
import { listAgentRunsForUser } from "@/lib/dispatch/listAgentRunsForUser";

import type { AgentAccessToolCallResult } from "@/lib/agentAccess/handleAgentAccessMcpRequest";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import { summarizeAgentAccessRun } from "@/lib/agentAccess/summarizeAgentAccessRun";

const runIdArgs = isType<{ readonly runId: string }>({
  runId: isNonEmptyString,
});

export const executeAgentAccessRunTool = async (
  actor: AgentAccessActor,
  name: string,
  args: unknown,
): Promise<AgentAccessToolCallResult | null> => {
  if (name === "list_runs") {
    const runs = await listAgentRunsForUser(actor.id, { limit: 20 });
    return agentAccessTextResult({
      ok: true,
      runs: runs.map(summarizeAgentAccessRun),
    });
  }

  if (name !== "get_run") {
    return null;
  }

  if (!runIdArgs(args)) {
    return agentAccessTextResult(
      { ok: false, error: "runId is required.", code: "invalid_arguments" },
      true,
    );
  }

  const run = await getAgentRunForParticipant(args.runId, actor.id);

  return run === null
    ? agentAccessTextResult(
        { ok: false, error: "Run not found.", code: "not_found" },
        true,
      )
    : agentAccessTextResult({ ok: true, run: summarizeAgentAccessRun(run) });
};
