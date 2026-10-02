import { describe, expect, it } from "vitest";

import { parseProjectDispatchPayload } from "@/lib/projects/acl/messaging/parseProjectDispatchPayload";

describe("parseProjectDispatchPayload (A3.4)", () => {
  it("requires toProjectDisplayName or toTeamLabel; rejects broadcast", () => {
    expect(
      parseProjectDispatchPayload({
        kind: "handoff",
        summary: "hi",
        broadcast: true,
      }).ok,
    ).toBe(false);
    expect(
      parseProjectDispatchPayload({
        kind: "handoff",
        summary: "pointer",
        toProjectDisplayName: "Buni",
      }).ok,
    ).toBe(true);
  });

  it("caps summary and allowlists refs", () => {
    expect(
      parseProjectDispatchPayload({
        kind: "x",
        summary: "a".repeat(513),
        toTeamLabel: "builders",
      }).ok,
    ).toBe(false);
    expect(
      parseProjectDispatchPayload({
        kind: "x",
        summary: "ok",
        toTeamLabel: "builders",
        refs: { prUrl: "https://github.com/x/y/pull/1", evil: "no" },
      }).ok,
    ).toBe(false);
  });
});
