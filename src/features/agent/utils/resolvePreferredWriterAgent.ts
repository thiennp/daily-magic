import type { AgentWitchDeviceWriter } from "@/lib/agentWitch/deviceWriters";
import {
  HARNESS_WRITER_AGENTS,
  type HarnessWriterAgent,
} from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

const canRun = (writer: AgentWitchDeviceWriter | undefined): boolean =>
  writer !== undefined && writer.ready && writer.loggedIn !== false;

/**
 * 37874fdc / 72ae6076 (Magi rule): preselect the last-picked writer only if
 * it is Ready, else the first Ready writer; never preselect a not-ready writer
 * while a Ready one exists. A link / source-run writer is a preset and follows
 * the same rule. Only a click in this view sticks to a not-ready writer.
 * Unknown readiness (older host) or no Ready writer keeps the remembered one
 * so the not-ready notice shows.
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
