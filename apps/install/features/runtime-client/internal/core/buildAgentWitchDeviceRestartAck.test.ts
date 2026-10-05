import { describe, expect, it } from "vitest";

import { buildAgentWitchDeviceRestartAckPayload } from "./buildAgentWitchDeviceRestartAck";

describe("buildAgentWitchDeviceRestartAckPayload", () => {
  it("builds accepted ack for Connect/restart", () => {
    expect(
      buildAgentWitchDeviceRestartAckPayload({
        status: "accepted",
        reason: "cloud-device-restart",
      }),
    ).toEqual({
      status: "accepted",
      reason: "cloud-device-restart",
      message: "Restart accepted; Local is restarting.",
    });
  });

  it("builds deferred and in-progress acks", () => {
    expect(
      buildAgentWitchDeviceRestartAckPayload({
        status: "deferred_writer_busy",
        reason: "cloud-device-restart",
      }).status,
    ).toBe("deferred_writer_busy");
    expect(
      buildAgentWitchDeviceRestartAckPayload({
        status: "already_in_progress",
        reason: "cloud-device-restart",
      }).message,
    ).toContain("already in progress");
  });

  it("builds unsupported ack with download guidance", () => {
    expect(
      buildAgentWitchDeviceRestartAckPayload({
        status: "unsupported",
        reason: "connect",
      }).message,
    ).toMatch(/\/download/);
  });
});
