import { describe, expect, it } from "vitest";

import {
  getAgentWitchHubInstanceId,
  resetAgentWitchHubInstanceIdForTests,
} from "@/lib/agentWitch/getAgentWitchHubInstanceId";

describe("getAgentWitchHubInstanceId", () => {
  it("returns a stable id for the process", () => {
    resetAgentWitchHubInstanceIdForTests();
    const first = getAgentWitchHubInstanceId();
    const second = getAgentWitchHubInstanceId();
    expect(first).toBe(second);
    expect(first.length).toBeGreaterThan(0);
  });
});
