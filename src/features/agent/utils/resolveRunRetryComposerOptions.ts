import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

export interface RunRetryComposerOptions {
  readonly prompt: string;
  /** Blank custom task; omitted when the run came from a workflow. */
  readonly customTask?: true;
  /** The workflow (capability) the run came from, so Retry reopens that workflow. */
  readonly libraryCapabilityId?: string;
  readonly deviceId?: string;
  readonly writerAgent?: string;
  readonly projectId?: string;
}

const nonEmpty = (value: string | null | undefined): string | undefined => {
  const trimmed = value?.trim() ?? "";
  return trimmed.length > 0 ? trimmed : undefined;
};

/**
 * 7a3086f1: Retry from a task page or Home refills the run's full ask (a
 * workflow ask already carries its inputs), computer, writer and project,
 * the same things the floater Retry keeps, instead of a blank picker. A run
 * from a workflow also keeps its workflow (893c3055).
 */
export const resolveRunRetryComposerOptions = (
  run: Pick<
    AgentRunRecord,
    "prompt" | "deviceId" | "writerAgent" | "projectId" | "capabilityId"
  > | null,
): RunRetryComposerOptions | null => {
  const prompt = nonEmpty(run?.prompt);
  if (run === null || prompt === undefined) {
    return null;
  }
  const libraryCapabilityId = nonEmpty(run.capabilityId);
  return {
    prompt,
    // A workflow run reopens its workflow with the run's own inputs as the
    // prompt; only a plain task falls back to a blank custom task.
    ...(libraryCapabilityId !== undefined
      ? { libraryCapabilityId }
      : { customTask: true as const }),
    deviceId: nonEmpty(run.deviceId),
    writerAgent: nonEmpty(run.writerAgent),
    projectId: nonEmpty(run.projectId),
  };
};
