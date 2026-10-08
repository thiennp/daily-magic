import isHarnessWriterAgent from "@/lib/agentWitch/harness/isHarnessWriterAgent";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

/**
 * 9bad2e07 (Magi rule): an explicit `?writerAgent=` is honored, preselected
 * even when not Ready (the pre-send warning still shows). A resumed run's
 * writer is only a preset, so the ready-only rule applies to it.
 */
export const resolveSendTaskLinkWriterChoice = (input: {
  readonly writerAgentFromUrl: string | null;
  readonly writerAgentFromRun: string | null;
}): {
  readonly writerAgent: HarnessWriterAgent;
  readonly isExplicit: boolean;
} | null => {
  if (isHarnessWriterAgent(input.writerAgentFromUrl)) {
    return { writerAgent: input.writerAgentFromUrl, isExplicit: true };
  }
  return isHarnessWriterAgent(input.writerAgentFromRun)
    ? { writerAgent: input.writerAgentFromRun, isExplicit: false }
    : null;
};

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
