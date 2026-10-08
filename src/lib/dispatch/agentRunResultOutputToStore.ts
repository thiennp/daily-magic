import { stripAgentRunWriterExecutionHonesty } from "@agent-witch/shared/dispatch";

import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";

/** The writer-execution header only explains a failure; never keep it on success. */
export const agentRunResultOutputToStore = (
  status: AgentRunStatusValue,
  output: string,
): string =>
  status === AgentRunStatus.COMPLETED
    ? stripAgentRunWriterExecutionHonesty(output)
    : output;
