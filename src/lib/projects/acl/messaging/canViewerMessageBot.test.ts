import { describe, expect, it } from "vitest";

import { canViewerMessageBot } from "@/lib/projects/acl/messaging/canViewerMessageBot";

describe("canViewerMessageBot", () => {
  it("offers an open assistant to everyone", () => {
    expect(
      canViewerMessageBot({ closed: false, invitedByUserId: "a" }, "b"),
    ).toBe(true);
  });
  it("offers a closed assistant only to the person who invited it", () => {
    expect(
      canViewerMessageBot({ closed: true, invitedByUserId: "a" }, "a"),
    ).toBe(true);
    expect(
      canViewerMessageBot({ closed: true, invitedByUserId: "a" }, "b"),
    ).toBe(false);
  });
  it("never closes an assistant with no recorded inviter", () => {
    expect(
      canViewerMessageBot({ closed: true, invitedByUserId: null }, "b"),
    ).toBe(true);
  });
});
