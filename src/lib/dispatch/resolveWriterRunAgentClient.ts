import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";
import { resolveLiveWriterAgentForRun } from "@/lib/dispatch/resolveLiveWriterAgentForRun";
import { resolveWriterDispatchDeviceId } from "@/lib/dispatch/resolveWriterDispatchDeviceId";
import { validateWriterRunDeviceSelection } from "@/lib/dispatch/validateWriterRunDeviceSelection";

export const resolveTargetDeviceId = (
  payload: Readonly<Record<string, unknown>>,
): string | undefined =>
  typeof payload.targetDeviceId === "string" &&
  payload.targetDeviceId.length > 0
    ? payload.targetDeviceId
    : undefined;

export type ClaudeRunAgentResolution =
  | {
      readonly ok: true;
      readonly agentClient?: AgentWitchHubClient;
      readonly deviceId: string | null;
    }
  | {
      readonly ok: false;
      readonly error: ReturnType<typeof buildDispatchError>;
    };

export const resolveClaudeRunAgentClient = async (input: {
  readonly runtime: AgentWitchHubRuntime;
  readonly senderUserId: string;
  readonly executorUserId: string;
  readonly targetDeviceId: string | undefined;
  readonly requestId?: string;
}): Promise<ClaudeRunAgentResolution> => {
  const validationError = await validateWriterRunDeviceSelection(input);
  if (validationError !== undefined) {
    return validationError;
  }

  const resolved = await resolveLiveWriterAgentForRun({
    runtime: input.runtime,
    executorUserId: input.executorUserId,
    targetDeviceId: input.targetDeviceId,
  });

  if (resolved !== undefined) {
    return {
      ok: true,
      agentClient: resolved.agentClient,
      deviceId: resolved.deviceId,
    };
  }

  const deviceResolution = await resolveWriterDispatchDeviceId({
    executorUserId: input.executorUserId,
    senderUserId: input.senderUserId,
    targetDeviceId: input.targetDeviceId,
    requestId: input.requestId,
  });

  if (!deviceResolution.ok) {
    return deviceResolution;
  }

  return {
    ok: true,
    deviceId: deviceResolution.deviceId,
  };
};
