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
import { consumeDeviceAuthNonce } from "@/server/agentWitch/consumeDeviceAuthNonce";
import { resolveAgentWitchDeviceKeyPin } from "@/server/agentWitch/resolveAgentWitchDeviceKeyPin";
import { sendAgentWitchSocketMessage } from "@/server/agentWitch/sendAgentWitchSocketMessage";
import type { WebSocket } from "ws";

const readString = (
  payload: Record<string, unknown> | undefined,
  key: string,
): string => {
  const value = payload?.[key];
  return typeof value === "string" ? value.trim() : "";
};

const rejectDeviceAuth = (
  socket: WebSocket,
  message: AgentWitchMessage,
  errorMessage: string,
): false => {
  sendAgentWitchSocketMessage(socket, {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
    payload: { errorMessage },
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

  const deviceId = connectionState.deviceId;
  const pinnedPublicKey =
    deviceId !== undefined
      ? await getAgentWitchDevicePublicKey({ deviceId })
      : null;

  if (helloMissing) {
    const decision = resolveAgentWitchDeviceKeyPin({
      deviceId,
      pinnedPublicKey,
      presentedPublicKey: devicePublicKey,
      helloMissing: true,
    });
    if (decision.outcome === "reject") {
      return rejectDeviceAuth(socket, message, decision.errorMessage);
    }
    // Older clients without device auth still connect via pairingToken.
    return true;
  }

  if (!verifyDeviceAuthHello({ devicePublicKey, nonce, signature, origin })) {
    return rejectDeviceAuth(
      socket,
      message,
      "Device authentication signature was invalid.",
    );
  }

  if (!consumeDeviceAuthNonce(devicePublicKey, nonce)) {
    return rejectDeviceAuth(
      socket,
      message,
      "Device authentication was already used. Reconnect to try again.",
    );
  }

  const decision = resolveAgentWitchDeviceKeyPin({
    deviceId,
    pinnedPublicKey,
    presentedPublicKey: devicePublicKey,
    helloMissing: false,
  });
  if (decision.outcome === "reject") {
    return rejectDeviceAuth(socket, message, decision.errorMessage);
  }
  if (decision.outcome === "write-pin" && deviceId !== undefined) {
    await updateAgentWitchDevicePublicKey({
      deviceId,
      publicKey: decision.publicKey,
    });
  }

  const attestation = buildServerDeviceAuthAttestation({
    origin,
    devicePublicKey,
    serverPublicKey: getAgentWitchServerPublicKeyRaw(),
  });
  sendAgentWitchSocketMessage(socket, {
    type: AGENT_WITCH_MESSAGE_TYPES.DEVICE_AUTH_ATTESTATION,
    payload: { ...attestation, devicePublicKey },
    requestId: message.requestId,
  });
  return true;
};
