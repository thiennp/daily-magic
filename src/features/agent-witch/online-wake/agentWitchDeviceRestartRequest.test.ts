import { describe, expect, it } from "vitest";

import {
  acknowledgeAgentWitchDeviceRestart,
  isAgentWitchDeviceRestartRequested,
  requestAgentWitchDeviceRestart,
} from "./agentWitchDeviceRestartRequest";

describe("agentWitchDeviceRestartRequest", () => {
  it("exports restart request helpers", () => {
    expect(typeof requestAgentWitchDeviceRestart).toBe("function");
    expect(typeof isAgentWitchDeviceRestartRequested).toBe("function");
    expect(typeof acknowledgeAgentWitchDeviceRestart).toBe("function");
  });
});
