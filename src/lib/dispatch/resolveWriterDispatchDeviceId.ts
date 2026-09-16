import {
  AGENT_WITCH_DISPATCH_ERROR_CODES,
  MAC_REPLACED_ERROR,
} from "@/lib/agentWitch/agentWitchDispatchErrorCode.constant";
import { classifyAgentWitchDispatchUnavailability } from "@/lib/agentWitch/classifyAgentWitchDispatchUnavailability";
import { listAgentWitchDevicesForUser } from "@/lib/agentWitch/listAgentWitchDevicesForUser";
import { MAC_OFFLINE_FOR_ACCOUNT_ERROR } from "@/lib/agentWitch/macOfflineForAccountErrorMessage.constant";
import { resolveCurrentAgentWitchDeviceId } from "@/lib/agentWitch/resolveCurrentAgentWitchDeviceId";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";

export type WriterDispatchDeviceResolution =
  | { readonly ok: true; readonly deviceId: string }
  | {
      readonly ok: false;
      readonly error: ReturnType<typeof buildDispatchError>;
    };

export const resolveWriterDispatchDeviceId = async (input: {
  readonly executorUserId: string;
  readonly senderUserId: string;
  readonly targetDeviceId: string | undefined;
  readonly requestId?: string;
}): Promise<WriterDispatchDeviceResolution> => {
  const devices = await listAgentWitchDevicesForUser(input.executorUserId);

  if (devices.length === 0) {
    return {
      ok: false,
      error: buildDispatchError(MAC_OFFLINE_FOR_ACCOUNT_ERROR, input.requestId),
    };
  }

  const explicitTarget =
    input.targetDeviceId !== undefined && input.targetDeviceId.length > 0
      ? input.targetDeviceId
      : undefined;

  if (
    explicitTarget === undefined &&
    input.executorUserId === input.senderUserId &&
    devices.length > 1
  ) {
    return {
      ok: false,
      error: buildDispatchError(
        "Select which Mac should run this task.",
        input.requestId,
      ),
    };
  }

  const deviceId = explicitTarget ?? devices[0]?.id;

  if (deviceId === undefined || deviceId.length === 0) {
    return {
      ok: false,
      error: buildDispatchError(MAC_OFFLINE_FOR_ACCOUNT_ERROR, input.requestId),
    };
  }

  const currentDeviceId = await resolveCurrentAgentWitchDeviceId(deviceId);
  const unavailability =
    await classifyAgentWitchDispatchUnavailability(currentDeviceId);

  if (unavailability === "replaced") {
    return {
      ok: false,
      error: buildDispatchError(
        MAC_REPLACED_ERROR,
        input.requestId,
        AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_REPLACED,
      ),
    };
  }

  return { ok: true, deviceId: currentDeviceId };
};
