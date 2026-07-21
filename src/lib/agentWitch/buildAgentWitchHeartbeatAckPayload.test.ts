import { describe, expect, it } from "vitest";

import { buildAgentWitchHeartbeatAckPayload } from "@/lib/agentWitch/buildAgentWitchHeartbeatAckPayload";

describe("buildAgentWitchHeartbeatAckPayload", () => {
  it("returns install bundle version for heartbeat acks", () => {
    expect(
      buildAgentWitchHeartbeatAckPayload({
        installBundleVersion: "40",
      }),
    ).toEqual({
      installBundleVersion: "40",
    });
  });
});
