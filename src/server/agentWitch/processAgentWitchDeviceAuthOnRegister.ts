import type { AgentWitchHub } from "@/lib/agentWitch/agentWitchHub";
import {
  buildServerDeviceAuthAttestation,
  verifyDeviceAuthHello,
} from "@/lib/agentWitch/deviceAuth/verifyDeviceAuthHello";
import { getAgentWitchServerPublicKeyRaw } from "@/lib/agentWitch/deviceAuth/agentWitchServerSigningKey";
import { updateAgentWitchDevicePublicKey } from "@/lib/agentWitch/updateAgentWitchDeviceAuthFields";
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

  if (
    devicePublicKey.length === 0 ||
    nonce.length === 0 ||
    signature.length === 0 ||
    origin.length === 0
  ) {
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
    sendAgentWitchSocketMessage(socket, {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage: "Device authentication signature was invalid.",
      },
      requestId: message.requestId,
    });
    socket.close();
    return false;
  }

  if (connectionState.deviceId !== undefined) {
    await updateAgentWitchDevicePublicKey({
      deviceId: connectionState.deviceId,
      publicKey: devicePublicKey,
    });
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
