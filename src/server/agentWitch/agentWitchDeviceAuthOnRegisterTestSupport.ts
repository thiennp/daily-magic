import { resetDeviceAuthNonceCacheForTests } from "@/server/agentWitch/consumeDeviceAuthNonce";
import { vi } from "vitest";

import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import type { AgentWitchConnectionState } from "@/server/agentWitch/processAgentWitchRegisterMessage";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";

export const PINNED_KEY = "pinned-device-public-key";
export const OTHER_KEY = "other-device-public-key";

export const verifyDeviceAuthHello = vi.fn();
export const buildServerDeviceAuthAttestation = vi.fn();
export const getAgentWitchServerPublicKeyRaw = vi.fn(() => "server-public-key");
export const getAgentWitchDevicePublicKey = vi.fn();
export const updateAgentWitchDevicePublicKey = vi.fn();
export const sendAgentWitchSocketMessage = vi.fn();

vi.mock("@/lib/agentWitch/deviceAuth/verifyDeviceAuthHello", () => ({
  verifyDeviceAuthHello: (...args: readonly unknown[]) =>
    verifyDeviceAuthHello(...args),
  buildServerDeviceAuthAttestation: (...args: readonly unknown[]) =>
    buildServerDeviceAuthAttestation(...args),
}));

vi.mock("@/lib/agentWitch/deviceAuth/agentWitchServerSigningKey", () => ({
  getAgentWitchServerPublicKeyRaw: () => getAgentWitchServerPublicKeyRaw(),
}));

vi.mock("@/lib/agentWitch/updateAgentWitchDeviceAuthFields", () => ({
  getAgentWitchDevicePublicKey: (...args: readonly unknown[]) =>
    getAgentWitchDevicePublicKey(...args),
  updateAgentWitchDevicePublicKey: (...args: readonly unknown[]) =>
    updateAgentWitchDevicePublicKey(...args),
}));

vi.mock("@/server/agentWitch/sendAgentWitchSocketMessage", () => ({
  sendAgentWitchSocketMessage: (...args: readonly unknown[]) =>
    sendAgentWitchSocketMessage(...args),
}));

export const createSocket = () => ({
  close: vi.fn(),
  readyState: 1,
  OPEN: 1,
  send: vi.fn(),
});

export const connection = (): AgentWitchConnectionState => ({
  registered: false,
  role: "agent",
  deviceId: "device-1",
});

export const hello = (devicePublicKey = PINNED_KEY): AgentWitchMessage =>
  ({
    type: AGENT_WITCH_MESSAGE_TYPES.AGENT_REGISTER,
    requestId: "req-1",
    payload: {
      devicePublicKey,
      nonce: "nonce-1",
      signature: "signature-1",
      origin: "https://www.agentwitch.com",
    },
  }) as AgentWitchMessage;

export const helloLess = (): AgentWitchMessage =>
  ({
    type: AGENT_WITCH_MESSAGE_TYPES.AGENT_REGISTER,
    requestId: "req-1",
    payload: { pairingToken: "pairing-token-present" },
  }) as AgentWitchMessage;

export const resetDeviceAuthRegisterMocks = (): void => {
  resetDeviceAuthNonceCacheForTests();
  verifyDeviceAuthHello.mockReset();
  buildServerDeviceAuthAttestation.mockReset();
  getAgentWitchDevicePublicKey.mockReset();
  updateAgentWitchDevicePublicKey.mockReset();
  sendAgentWitchSocketMessage.mockReset();
  getAgentWitchServerPublicKeyRaw.mockClear();
  verifyDeviceAuthHello.mockReturnValue(true);
  buildServerDeviceAuthAttestation.mockReturnValue({
    challenge: "challenge-1",
    serverAttestation: "attestation-1",
    serverPublicKey: "server-public-key",
    origin: "https://www.agentwitch.com",
  });
  updateAgentWitchDevicePublicKey.mockResolvedValue(undefined);
};
