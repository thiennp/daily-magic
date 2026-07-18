import isAgentWitchDeviceOwnedByUser from "@/lib/agentWitch/isAgentWitchDeviceOwnedByUser";
import {
  MAC_OFFLINE_FOR_ACCOUNT_ERROR,
  TEAMMATE_MAC_OFFLINE_ERROR,
} from "@/lib/agentWitch/macOfflineForAccountErrorMessage.constant";
import { isMacDeviceReachableViaHeartbeat } from "@/lib/agentWitch/resolveMacDeviceReachability";
import { findAgentWitchDeviceById } from "@/lib/agentWitch/findAgentWitchDeviceById";
import { findEnrichedAgentClientForUser } from "@/lib/agentWitch/findEnrichedAgentClientForUser";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";

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
  if (
    input.targetDeviceId !== undefined &&
    input.executorUserId === input.senderUserId &&
    !(await isAgentWitchDeviceOwnedByUser(
      input.targetDeviceId,
      input.senderUserId,
    ))
  ) {
    return {
      ok: false,
      error: buildDispatchError(
        "The selected Mac is not connected to your account.",
        input.requestId,
      ),
    };
  }

  if (input.targetDeviceId === undefined) {
    const onlineAgents = input.runtime.listOnlineAgentClientsForUser(
      input.executorUserId,
    );

    if (
      input.executorUserId === input.senderUserId &&
      onlineAgents.length > 1
    ) {
      return {
        ok: false,
        error: buildDispatchError(
          "Select which Mac should run this task.",
          input.requestId,
        ),
      };
    }
  }

  const agentClient = await findEnrichedAgentClientForUser(
    input.runtime,
    input.executorUserId,
    input.targetDeviceId,
  );

  if (agentClient !== undefined) {
    const deviceId =
      input.targetDeviceId ??
      (agentClient.deviceId !== undefined ? agentClient.deviceId : null);
    return { ok: true, agentClient, deviceId: deviceId ?? null };
  }

  if (input.targetDeviceId !== undefined) {
    const device = await findAgentWitchDeviceById(input.targetDeviceId);

    if (
      device !== null &&
      device.userId === input.executorUserId &&
      device.revokedAt === null &&
      isMacDeviceReachableViaHeartbeat({ lastSeenAt: device.lastSeenAt })
    ) {
      return {
        ok: true,
        deviceId: device.id,
      };
    }

    return {
      ok: false,
      error: buildDispatchError(
        "The selected Mac is not online right now.",
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
