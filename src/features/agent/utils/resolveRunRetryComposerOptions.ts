import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

export interface RunRetryComposerOptions {
  readonly prompt: string;
  readonly customTask: true;
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
 * the same things the floater Retry keeps, instead of a blank picker.
 */
export const resolveRunRetryComposerOptions = (
  run: Pick<
    AgentRunRecord,
    "prompt" | "deviceId" | "writerAgent" | "projectId"
  > | null,
): RunRetryComposerOptions | null => {
  const prompt = nonEmpty(run?.prompt);
  if (run === null || prompt === undefined) {
    return null;
  }
  return {
    prompt,
    customTask: true,
    deviceId: nonEmpty(run.deviceId),
    writerAgent: nonEmpty(run.writerAgent),
    projectId: nonEmpty(run.projectId),
  };
};
