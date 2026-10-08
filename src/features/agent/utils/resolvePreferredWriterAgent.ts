import type { AgentWitchDeviceWriter } from "@/lib/agentWitch/deviceWriters";
import {
  HARNESS_WRITER_AGENTS,
  type HarnessWriterAgent,
} from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

const canRun = (writer: AgentWitchDeviceWriter | undefined): boolean =>
  writer !== undefined && writer.ready && writer.loggedIn !== false;

/**
 * 37874fdc: the remembered writer (Codex) was used although the computer's
 * heartbeat said it could not run, while Antigravity was ready. A pick made
 * in this view always wins; otherwise the remembered writer is kept only when
 * it can run, else the first writer that can. Unknown readiness (older host)
 * or no runnable writer keeps the remembered one so the not-ready notice shows.
 */
export const resolvePreferredWriterAgent = (input: {
  readonly writerAgent: HarnessWriterAgent;
  readonly isExplicitPick: boolean;
  readonly writers: readonly AgentWitchDeviceWriter[] | undefined;
}): HarnessWriterAgent => {
  const writers = input.writers ?? [];
  const find = (agent: string) =>
    writers.find((writer) => writer.writerAgent === agent);
  if (
    input.isExplicitPick ||
    writers.length === 0 ||
    canRun(find(input.writerAgent))
  ) {
    return input.writerAgent;
  }
  return (
    HARNESS_WRITER_AGENTS.find((agent) => canRun(find(agent))) ??
    input.writerAgent
  );
};
