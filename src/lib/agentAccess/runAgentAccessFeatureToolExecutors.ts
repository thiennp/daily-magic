import type { AgentAccessFeatureToolExecutor } from "@/lib/agentAccess/agentAccessFeatureToolExecutor.type";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/agentAccessToolCallResult.type";
import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";

/** First injected feature executor that handles the tool wins; null = none did. */
export const runAgentAccessFeatureToolExecutors = async (input: {
  readonly executors: readonly AgentAccessFeatureToolExecutor[];
  readonly actor: AgentAccessActor;
  readonly name: string;
  readonly args: unknown;
}): Promise<AgentAccessToolCallResult | null> => {
  const [first, ...rest] = input.executors;
  if (first === undefined) {
    return null;
  }
  const result = await first({
    actor: input.actor,
    name: input.name,
    args: input.args,
  });
  if (result !== null) {
    return result;
  }
  return runAgentAccessFeatureToolExecutors({ ...input, executors: rest });
};
