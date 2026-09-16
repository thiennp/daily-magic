import { describe, expect, it } from "vitest";

import { buildPostAuthReturn } from "@/lib/auth/buildPostAuthReturn";

describe("buildPostAuthReturn", () => {
  it("defaults to home", () => {
    expect(buildPostAuthReturn()).toBe("/");
  });

  it("preserves marketplace preset capabilityId (AW-ONBOARD-1)", () => {
    expect(
      buildPostAuthReturn({
        next: "/marketplace",
        capabilityId: "preset:vibe-coding-app-feature",
      }),
    ).toBe("/marketplace?capabilityId=preset%3Avibe-coding-app-feature");
  });

  it("opens New task composer after auth", () => {
    expect(buildPostAuthReturn({ sendTask: true })).toBe("/?sendTask=1");
  });

  it("merges sendTask with an explicit next path", () => {
    expect(buildPostAuthReturn({ next: "/library", sendTask: true })).toBe(
      "/library?sendTask=1",
    );
  });
});
