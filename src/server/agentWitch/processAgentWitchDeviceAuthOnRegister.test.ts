import { beforeEach, describe, expect, it, vi } from "vitest";

const verifyDeviceAuthHello = vi.fn();
const buildServerDeviceAuthAttestation = vi.fn();
const getAgentWitchServerPublicKeyRaw = vi.fn(() => "server-public-key");
const getAgentWitchDevicePublicKey = vi.fn();
const updateAgentWitchDevicePublicKey = vi.fn();
const sendAgentWitchSocketMessage = vi.fn();

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

import { processAgentWitchDeviceAuthOnRegister } from "@/server/agentWitch/processAgentWitchDeviceAuthOnRegister";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import type { AgentWitchConnectionState } from "@/server/agentWitch/processAgentWitchRegisterMessage";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";

const PINNED_KEY = "pinned-device-public-key";
const OTHER_KEY = "other-device-public-key";

const createSocket = () => ({
  close: vi.fn(),
  readyState: 1,
  OPEN: 1,
  send: vi.fn(),
});

const baseConnection = (): AgentWitchConnectionState => ({
  registered: false,
  role: "agent",
  deviceId: "device-1",
});

const helloMessage = (
  overrides: Partial<Record<string, string>> = {},
): AgentWitchMessage =>
  ({
    type: AGENT_WITCH_MESSAGE_TYPES.AGENT_REGISTER,
    requestId: "req-1",
    payload: {
      devicePublicKey: PINNED_KEY,
      nonce: "nonce-1",
      signature: "signature-1",
      origin: "https://www.agentwitch.com",
      ...overrides,
    },
  }) as AgentWitchMessage;

const helloLessMessage = (): AgentWitchMessage =>
  ({
    type: AGENT_WITCH_MESSAGE_TYPES.AGENT_REGISTER,
    requestId: "req-1",
    payload: {
      pairingToken: "pairing-token-present",
    },
  }) as AgentWitchMessage;

describe("processAgentWitchDeviceAuthOnRegister device-key pinning", () => {
  beforeEach(() => {
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
  });

  it("pins the device public key on the first successful register", async () => {
    getAgentWitchDevicePublicKey.mockResolvedValue(null);
    const socket = createSocket();

    const ok = await processAgentWitchDeviceAuthOnRegister(
      {} as never,
      socket as never,
      baseConnection(),
      helloMessage(),
    );

    expect(ok).toBe(true);
    expect(updateAgentWitchDevicePublicKey).toHaveBeenCalledWith({
      deviceId: "device-1",
      publicKey: PINNED_KEY,
    });
    expect(sendAgentWitchSocketMessage).toHaveBeenCalledWith(
      socket,
      expect.objectContaining({
        type: AGENT_WITCH_MESSAGE_TYPES.DEVICE_AUTH_ATTESTATION,
      }),
    );
    expect(socket.close).not.toHaveBeenCalled();
  });

  it("allows a register when the presented key matches the pinned key", async () => {
    getAgentWitchDevicePublicKey.mockResolvedValue(PINNED_KEY);
    const socket = createSocket();

    const ok = await processAgentWitchDeviceAuthOnRegister(
      {} as never,
      socket as never,
      baseConnection(),
      helloMessage(),
    );

    expect(ok).toBe(true);
    expect(updateAgentWitchDevicePublicKey).toHaveBeenCalledWith({
      deviceId: "device-1",
      publicKey: PINNED_KEY,
    });
    expect(socket.close).not.toHaveBeenCalled();
  });

  it("rejects a mismatched key and does not overwrite the pinned key", async () => {
    getAgentWitchDevicePublicKey.mockResolvedValue(PINNED_KEY);
    const socket = createSocket();

    const ok = await processAgentWitchDeviceAuthOnRegister(
      {} as never,
      socket as never,
      baseConnection(),
      helloMessage({ devicePublicKey: OTHER_KEY }),
    );

    expect(ok).toBe(false);
    expect(updateAgentWitchDevicePublicKey).not.toHaveBeenCalled();
    expect(sendAgentWitchSocketMessage).toHaveBeenCalledWith(
      socket,
      expect.objectContaining({
        type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
        payload: expect.objectContaining({
          errorMessage: expect.stringMatching(/does not match the pinned key/i),
        }),
      }),
    );
    expect(socket.close).toHaveBeenCalledTimes(1);
  });

  it("rejects hello-less register when a key is already pinned", async () => {
    getAgentWitchDevicePublicKey.mockResolvedValue(PINNED_KEY);
    const socket = createSocket();

    const ok = await processAgentWitchDeviceAuthOnRegister(
      {} as never,
      socket as never,
      baseConnection(),
      helloLessMessage(),
    );

    expect(ok).toBe(false);
    expect(verifyDeviceAuthHello).not.toHaveBeenCalled();
    expect(updateAgentWitchDevicePublicKey).not.toHaveBeenCalled();
    expect(sendAgentWitchSocketMessage).toHaveBeenCalledWith(
      socket,
      expect.objectContaining({
        type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
        payload: expect.objectContaining({
          errorMessage: "Device authentication is required for this computer.",
        }),
      }),
    );
    expect(socket.close).toHaveBeenCalledTimes(1);
  });

  it("allows hello-less register when no key is pinned (legacy pairingToken)", async () => {
    getAgentWitchDevicePublicKey.mockResolvedValue(null);
    const socket = createSocket();

    const ok = await processAgentWitchDeviceAuthOnRegister(
      {} as never,
      socket as never,
      baseConnection(),
      helloLessMessage(),
    );

    expect(ok).toBe(true);
    expect(verifyDeviceAuthHello).not.toHaveBeenCalled();
    expect(updateAgentWitchDevicePublicKey).not.toHaveBeenCalled();
    expect(sendAgentWitchSocketMessage).not.toHaveBeenCalled();
    expect(socket.close).not.toHaveBeenCalled();
  });
});
