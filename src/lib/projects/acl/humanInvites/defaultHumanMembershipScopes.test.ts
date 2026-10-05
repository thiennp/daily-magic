import { describe, expect, it } from "vitest";

import { defaultHumanMembershipScopes } from "@/lib/projects/acl/humanInvites/defaultHumanMembershipScopes";

describe("defaultHumanMembershipScopes", () => {
  it("returns empty scopes for member (Dispatch: human post is role-gated)", () => {
    expect(defaultHumanMembershipScopes("member")).toEqual([]);
  });

  it("returns empty scopes for viewer (Dispatch: viewer_read_only by role)", () => {
    expect(defaultHumanMembershipScopes("viewer")).toEqual([]);
  });
});
