import {
  MAC_OFFLINE_FOR_ACCOUNT_ERROR,
  TEAMMATE_MAC_OFFLINE_ERROR,
} from "@/lib/agentWitch/macOfflineForAccountErrorMessage.constant";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { buildTargetMacOfflineDispatchError } from "@/lib/dispatch/buildTargetMacOfflineDispatchError";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";
import { resolveLiveWriterAgentForRun } from "@/lib/dispatch/resolveLiveWriterAgentForRun";
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

  if (input.targetDeviceId !== undefined) {
    return {
      ok: false,
      error: await buildTargetMacOfflineDispatchError(
        input.targetDeviceId,
        input.executorUserId,
        input.requestId,
      ),
    };
  }

  return {
    ok: false,
    error: buildDispatchError(
      input.executorUserId === input.senderUserId
        ? MAC_OFFLINE_FOR_ACCOUNT_ERROR
        : TEAMMATE_MAC_OFFLINE_ERROR,
      input.requestId,
    ),
  };
};
