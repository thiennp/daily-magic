import { describe, expect, it } from "vitest";

import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { validateSessionContinuationRequiresTargetDevice } from "@/lib/dispatch/validateSessionContinuationRequiresTargetDevice";

describe("validateSessionContinuationRequiresTargetDevice", () => {
  it("requires targetDeviceId when sessionContinuation is true", () => {
    const error = validateSessionContinuationRequiresTargetDevice({
      body: { prompt: "next", sessionContinuation: true },
      requestId: "req-1",
    });

    expect(error?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR);
    expect(error?.payload?.errorMessage).toContain("same Mac");
    expect(error?.requestId).toBe("req-1");
  });

  it("passes when targetDeviceId is provided", () => {
    expect(
      validateSessionContinuationRequiresTargetDevice({
        body: {
          prompt: "next",
          sessionContinuation: true,
          targetDeviceId: "mac-1",
        },
      }),
    ).toBeNull();
  });

  it("ignores non-continuation dispatches", () => {
    expect(
      validateSessionContinuationRequiresTargetDevice({
        body: { prompt: "fresh task" },
      }),
    ).toBeNull();
  });
});
