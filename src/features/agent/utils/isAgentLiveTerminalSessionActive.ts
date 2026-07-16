import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export const isAgentLiveTerminalSessionActive = (
  sessionWriterAgent: HarnessWriterAgent | null,
): boolean => sessionWriterAgent !== null;
