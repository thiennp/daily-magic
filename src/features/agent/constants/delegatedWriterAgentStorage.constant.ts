import {
  HARNESS_WRITER_AGENTS,
  type HarnessWriterAgent,
} from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export const DELEGATED_WRITER_AGENT_STORAGE_KEY =
  "agent-witch.delegated-writer-agent";

export const DEFAULT_DELEGATED_WRITER_AGENT: HarnessWriterAgent =
  HARNESS_WRITER_AGENTS[0];
