import isHarnessWriterAgent from "@/lib/agentWitch/harness/isHarnessWriterAgent";
import {
  HARNESS_WRITER_AGENTS,
  type HarnessWriterAgent,
} from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export const DEFAULT_DELEGATED_WRITER_AGENT: HarnessWriterAgent =
  HARNESS_WRITER_AGENTS[0];

export const resolveDelegatedWriterAgent = (
  payload: Readonly<Record<string, unknown>>,
): HarnessWriterAgent =>
  isHarnessWriterAgent(payload.writerAgent)
    ? payload.writerAgent
    : DEFAULT_DELEGATED_WRITER_AGENT;
