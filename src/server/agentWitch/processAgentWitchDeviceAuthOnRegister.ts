import type { AgentWitchHub } from "@/lib/agentWitch/agentWitchHub";
import {
  buildServerDeviceAuthAttestation,
  verifyDeviceAuthHello,
} from "@/lib/agentWitch/deviceAuth/verifyDeviceAuthHello";
import { getAgentWitchServerPublicKeyRaw } from "@/lib/agentWitch/deviceAuth/agentWitchServerSigningKey";
import {
  getAgentWitchDevicePublicKey,
  updateAgentWitchDevicePublicKey,
} from "@/lib/agentWitch/updateAgentWitchDeviceAuthFields";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import type { AgentWitchConnectionState } from "@/server/agentWitch/processAgentWitchRegisterMessage";
import { sendAgentWitchSocketMessage } from "@/server/agentWitch/sendAgentWitchSocketMessage";
import type { WebSocket } from "ws";

const readString = (
  payload: Record<string, unknown> | undefined,
  key: string,
): string => {
  const value = payload?.[key];
  return typeof value === "string" ? value.trim() : "";
};

const devicePublicKeysMatch = (pinned: string, presented: string): boolean =>
  pinned.trim() === presented.trim();

const rejectDeviceAuth = (
  socket: WebSocket,
  message: AgentWitchMessage,
  errorMessage: string,
): false => {
  sendAgentWitchSocketMessage(socket, {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
    payload: {
      errorMessage,
    },
    requestId: message.requestId,
  });
  socket.close();
  return false;
};

export const processAgentWitchDeviceAuthOnRegister = async (
  _hub: AgentWitchHub,
  socket: WebSocket,
  connectionState: AgentWitchConnectionState,
  message: AgentWitchMessage,
): Promise<boolean> => {
  const payload = message.payload;
  if (payload === undefined) {
    return true;
  }

  const devicePublicKey = readString(payload, "devicePublicKey");
  const nonce = readString(payload, "nonce");
  const signature = readString(payload, "signature");
  const origin = readString(payload, "origin");

  const helloMissing =
    devicePublicKey.length === 0 ||
    nonce.length === 0 ||
    signature.length === 0 ||
    origin.length === 0;

  if (helloMissing) {
    if (connectionState.deviceId !== undefined) {
      const pinnedKey = await getAgentWitchDevicePublicKey({
        deviceId: connectionState.deviceId,
      });
      if (pinnedKey !== null) {
        return rejectDeviceAuth(
          socket,
          message,
          "Device authentication is required for this computer.",
        );
      }
    }
    // Older clients without device auth still connect via pairingToken.
    return true;
  }

  const helloOk = verifyDeviceAuthHello({
    devicePublicKey,
    nonce,
    signature,
    origin,
  });

  if (!helloOk) {
    return rejectDeviceAuth(
      socket,
      message,
      "Device authentication signature was invalid.",
    );
  }

  if (connectionState.deviceId !== undefined) {
    const pinnedKey = await getAgentWitchDevicePublicKey({
      deviceId: connectionState.deviceId,
    });

    if (pinnedKey === null) {
      await updateAgentWitchDevicePublicKey({
        deviceId: connectionState.deviceId,
        publicKey: devicePublicKey,
      });
    } else if (devicePublicKeysMatch(pinnedKey, devicePublicKey)) {
      await updateAgentWitchDevicePublicKey({
        deviceId: connectionState.deviceId,
        publicKey: devicePublicKey,
      });
    } else {
      return rejectDeviceAuth(
        socket,
        message,
        "Device public key does not match the pinned key for this computer. Re-pair to replace the key.",
      );
    }
  }

  const attestation = buildServerDeviceAuthAttestation({
    origin,
    devicePublicKey,
    serverPublicKey: getAgentWitchServerPublicKeyRaw(),
  });

  sendAgentWitchSocketMessage(socket, {
    type: AGENT_WITCH_MESSAGE_TYPES.DEVICE_AUTH_ATTESTATION,
    payload: {
      ...attestation,
      devicePublicKey,
    },
    requestId: message.requestId,
  });

  return true;
};
