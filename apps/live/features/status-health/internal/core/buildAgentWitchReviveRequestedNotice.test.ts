import { describe, expect, it } from "vitest";

import { buildAgentWitchReviveRequestedNotice } from "./buildAgentWitchReviveRequestedNotice";

describe("buildAgentWitchReviveRequestedNotice", () => {
  it("keeps the launchd wording on macOS", () => {
    expect(buildAgentWitchReviveRequestedNotice("darwin")).toBe(
      "Revive requested. The bridge will reconnect if this Mac can reach launchd.",
    );
  });

  it.each(["linux", "win32", "freebsd"])(
    "uses neutral wording without launchd on %s",
    (platform) => {
      const notice = buildAgentWitchReviveRequestedNotice(platform);
      expect(notice).toContain("this computer");
      expect(notice).not.toContain("launchd");
      expect(notice).not.toMatch(/this Mac/);
    },
  );
});
