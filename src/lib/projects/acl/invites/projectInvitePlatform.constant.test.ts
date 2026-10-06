import { describe, expect, it } from "vitest";

import { parseProjectInvitePlatform } from "@/lib/projects/acl/invites/projectInvitePlatform.constant";

describe("parseProjectInvitePlatform", () => {
  it("allowlists grok | muse; anything else → null", () => {
    expect(parseProjectInvitePlatform("grok")).toBe("grok");
    expect(parseProjectInvitePlatform(" Muse ")).toBe("muse");
    expect(parseProjectInvitePlatform("copilot_studio")).toBeNull();
    expect(parseProjectInvitePlatform("")).toBeNull();
    expect(parseProjectInvitePlatform(undefined)).toBeNull();
    expect(parseProjectInvitePlatform(42)).toBeNull();
  });
});
