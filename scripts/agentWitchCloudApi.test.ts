import { describe, expect, it } from "vitest";

import { parseAgentWitchHeartbeatResponse } from "./agentWitchCloudApi";

describe("parseAgentWitchHeartbeatResponse", () => {
  it("reads restartRequested from heartbeat payloads", () => {
    expect(
      parseAgentWitchHeartbeatResponse({
        ok: true,
        restartRequested: true,
      }),
    ).toEqual({
      ok: true,
      restartRequested: true,
    });
  });

  it("defaults restartRequested to false for invalid payloads", () => {
    expect(parseAgentWitchHeartbeatResponse(null)).toEqual({
      ok: false,
      restartRequested: false,
    });
  });
});
