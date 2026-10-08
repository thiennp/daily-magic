import isHarnessWriterAgent from "@/lib/agentWitch/harness/isHarnessWriterAgent";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

/** 37874fdc: `?writerAgent=` applies on its own and wins over the source run. */
export const resolveSendTaskLinkWriterAgent = (input: {
  readonly writerAgentFromUrl: string | null;
  readonly writerAgentFromRun: string | null;
}): HarnessWriterAgent | null => {
  if (isHarnessWriterAgent(input.writerAgentFromUrl)) {
    return input.writerAgentFromUrl;
  }
  return isHarnessWriterAgent(input.writerAgentFromRun)
    ? input.writerAgentFromRun
    : null;
};
