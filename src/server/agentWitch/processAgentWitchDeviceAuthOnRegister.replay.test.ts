import { beforeEach, describe, expect, it } from "vitest";

import {
  PINNED_KEY,
  connection,
  createSocket,
  getAgentWitchDevicePublicKey,
  hello,
  resetDeviceAuthRegisterMocks,
} from "@/server/agentWitch/agentWitchDeviceAuthOnRegisterTestSupport";
import { processAgentWitchDeviceAuthOnRegister } from "@/server/agentWitch/processAgentWitchDeviceAuthOnRegister";

describe("processAgentWitchDeviceAuthOnRegister replay", () => {
  beforeEach(resetDeviceAuthRegisterMocks);

  it("refuses a captured hello that is sent a second time", async () => {
    getAgentWitchDevicePublicKey.mockResolvedValue(PINNED_KEY);
    const first = createSocket();
    await processAgentWitchDeviceAuthOnRegister(
      {} as never,
      first as never,
      connection(),
      hello(),
    );
    const replay = createSocket();
    await expect(
      processAgentWitchDeviceAuthOnRegister(
        {} as never,
        replay as never,
        connection(),
        hello(),
      ),
    ).resolves.toBe(false);
    expect(replay.close).toHaveBeenCalled();
  });
});
