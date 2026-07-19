import isHarnessWriterAgent from "@/lib/agentWitch/harness/isHarnessWriterAgent";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

/** Open Send-a-task scoped to a finished job on this Mac/browser. */
export const buildAgentRunContinueHref = (input: {
  readonly run: Pick<
    AgentRunRecord,
    "id" | "deviceId" | "writerAgent" | "capabilityId"
  >;
  readonly prompt?: string;
  readonly pathname?: string;
}): string =>
  buildAgentComposerHref({
    pathname: input.pathname,
    continueSession: true,
    sourceRunId: input.run.id,
    deviceId: input.run.deviceId ?? undefined,
    writerAgent: isHarnessWriterAgent(input.run.writerAgent)
      ? input.run.writerAgent
      : undefined,
    libraryCapabilityId: input.run.capabilityId ?? undefined,
    prompt: input.prompt,
  });
