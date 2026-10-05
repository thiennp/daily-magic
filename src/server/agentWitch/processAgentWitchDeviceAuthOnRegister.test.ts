import { beforeEach, describe, expect, it } from "vitest";

import {
  PINNED_KEY,
  OTHER_KEY,
  connection,
  createSocket,
  getAgentWitchDevicePublicKey,
  hello,
  helloLess,
  resetDeviceAuthRegisterMocks,
  sendAgentWitchSocketMessage,
  updateAgentWitchDevicePublicKey,
  verifyDeviceAuthHello,
} from "@/server/agentWitch/agentWitchDeviceAuthOnRegisterTestSupport";
import { processAgentWitchDeviceAuthOnRegister } from "@/server/agentWitch/processAgentWitchDeviceAuthOnRegister";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

describe("processAgentWitchDeviceAuthOnRegister wiring", () => {
  beforeEach(() => {
    resetDeviceAuthRegisterMocks();
  });

  it("pins on first register and sends attestation", async () => {
    getAgentWitchDevicePublicKey.mockResolvedValue(null);
    const socket = createSocket();
    await expect(
      processAgentWitchDeviceAuthOnRegister(
        {} as never,
        socket as never,
        connection(),
        hello(),
      ),
    ).resolves.toBe(true);
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

  it("rejects mismatch and hello-less-when-pinned without overwrite", async () => {
    getAgentWitchDevicePublicKey.mockResolvedValue(PINNED_KEY);
    const mismatchSocket = createSocket();
    await expect(
      processAgentWitchDeviceAuthOnRegister(
        {} as never,
        mismatchSocket as never,
        connection(),
        hello(OTHER_KEY),
      ),
    ).resolves.toBe(false);
    expect(updateAgentWitchDevicePublicKey).not.toHaveBeenCalled();
    expect(mismatchSocket.close).toHaveBeenCalledTimes(1);

    verifyDeviceAuthHello.mockClear();
    const helloLessSocket = createSocket();
    await expect(
      processAgentWitchDeviceAuthOnRegister(
        {} as never,
        helloLessSocket as never,
        connection(),
        helloLess(),
      ),
    ).resolves.toBe(false);
    expect(verifyDeviceAuthHello).not.toHaveBeenCalled();
    expect(helloLessSocket.close).toHaveBeenCalledTimes(1);
  });

  it("allows matching pin refresh and legacy hello-less", async () => {
    getAgentWitchDevicePublicKey.mockResolvedValue(PINNED_KEY);
    const matchSocket = createSocket();
    await expect(
      processAgentWitchDeviceAuthOnRegister(
        {} as never,
        matchSocket as never,
        connection(),
        hello(),
      ),
    ).resolves.toBe(true);
    expect(updateAgentWitchDevicePublicKey).toHaveBeenCalledWith({
      deviceId: "device-1",
      publicKey: PINNED_KEY,
    });

    getAgentWitchDevicePublicKey.mockResolvedValue(null);
    updateAgentWitchDevicePublicKey.mockClear();
    sendAgentWitchSocketMessage.mockClear();
    const legacySocket = createSocket();
    await expect(
      processAgentWitchDeviceAuthOnRegister(
        {} as never,
        legacySocket as never,
        connection(),
        helloLess(),
      ),
    ).resolves.toBe(true);
    expect(updateAgentWitchDevicePublicKey).not.toHaveBeenCalled();
    expect(sendAgentWitchSocketMessage).not.toHaveBeenCalled();
    expect(legacySocket.close).not.toHaveBeenCalled();
  });
});
