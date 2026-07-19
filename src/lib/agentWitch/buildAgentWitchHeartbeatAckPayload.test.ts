import { describe, expect, it } from "vitest";

import { buildAgentWitchHeartbeatAckPayload } from "@/lib/agentWitch/buildAgentWitchHeartbeatAckPayload";

describe("buildAgentWitchHeartbeatAckPayload", () => {
  it("always includes installBundleVersion (AGENT-030)", () => {
    expect(
      buildAgentWitchHeartbeatAckPayload({
        installBundleVersion: "32",
        pendingAccountLink: null,
      }),
    ).toEqual({ installBundleVersion: "32" });
  });

  it("merges pendingAccountLink when present (AGENT-030)", () => {
    expect(
      buildAgentWitchHeartbeatAckPayload({
        installBundleVersion: "32",
        pendingAccountLink: {
          linkToken: "tok",
          email: "a@b.com",
          appOrigin: "https://www.agentwitch.com",
        },
      }),
    ).toEqual({
      installBundleVersion: "32",
      pendingAccountLink: {
        linkToken: "tok",
        email: "a@b.com",
        appOrigin: "https://www.agentwitch.com",
      },
    });
  });
});
