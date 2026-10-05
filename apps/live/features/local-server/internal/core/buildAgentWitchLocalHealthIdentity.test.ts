import { describe, expect, it } from "vitest";

import { buildAgentWitchLocalHealthIdentity } from "./buildAgentWitchLocalHealthIdentity";

describe("buildAgentWitchLocalHealthIdentity", () => {
  it("exposes the process uid and only the install root folder name", () => {
    expect(
      buildAgentWitchLocalHealthIdentity({
        uid: 501,
        installDir: "/Users/alice/.agent-witch",
      }),
    ).toEqual({ osUid: 501, installRootName: ".agent-witch" });
  });

  it("does not leak the home path or username", () => {
    const identity = buildAgentWitchLocalHealthIdentity({
      uid: 502,
      installDir: "/Users/alice/.local-agent-witch/",
    });

    expect(identity.installRootName).toBe(".local-agent-witch");
    expect(JSON.stringify(identity)).not.toContain("alice");
  });

  it("returns a null uid when the platform has none", () => {
    expect(
      buildAgentWitchLocalHealthIdentity({
        uid: undefined,
        installDir: "/home/bob/.agent-witch",
      }).osUid,
    ).toBeNull();
    expect(
      buildAgentWitchLocalHealthIdentity({ uid: -1, installDir: "/x/.agent-witch" })
        .osUid,
    ).toBeNull();
  });
});
