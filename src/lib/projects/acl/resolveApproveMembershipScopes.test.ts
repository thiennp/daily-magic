import { describe, expect, it } from "vitest";

import { PROJECT_ACL_DEFAULT_MEMBER_SCOPES } from "@/lib/projects/acl/projectAclScopes.constant";
import { resolveApproveMembershipScopes } from "@/lib/projects/acl/resolveApproveMembershipScopes";

describe("resolveApproveMembershipScopes", () => {
  it("force-appends msg:dispatch for agents when pending requestedScopes omit it", () => {
    const scopes = resolveApproveMembershipScopes({
      ownerScopes: null,
      requestedScopes: ["acl:self", "project:meta", "peer_sync"],
      requesterIsAgent: true,
    });
    expect(scopes).toEqual([
      "acl:self",
      "project:meta",
      "peer_sync",
      "msg:dispatch",
    ]);
  });

  it("force-appends msg:dispatch when UI ownerScopes strip it for agents", () => {
    const scopes = resolveApproveMembershipScopes({
      ownerScopes: ["acl:self", "project:meta", "peer_sync"],
      requestedScopes: ["acl:self", "project:meta", "peer_sync", "msg:dispatch"],
      requesterIsAgent: true,
    });
    expect(scopes).toEqual([
      "acl:self",
      "project:meta",
      "peer_sync",
      "msg:dispatch",
    ]);
  });

  it("does not duplicate msg:dispatch when already present", () => {
    const scopes = resolveApproveMembershipScopes({
      ownerScopes: null,
      requestedScopes: [...PROJECT_ACL_DEFAULT_MEMBER_SCOPES],
      requesterIsAgent: true,
    });
    expect(scopes).toEqual([...PROJECT_ACL_DEFAULT_MEMBER_SCOPES]);
    expect(scopes.filter((s) => s === "msg:dispatch")).toHaveLength(1);
  });

  it("uses DEFAULT when both owner and requested are empty", () => {
    const scopes = resolveApproveMembershipScopes({
      ownerScopes: [],
      requestedScopes: [],
      requesterIsAgent: true,
    });
    expect(scopes).toEqual([...PROJECT_ACL_DEFAULT_MEMBER_SCOPES]);
  });

  it("does not force msg:dispatch for non-agents when requestedScopes omit it", () => {
    const scopes = resolveApproveMembershipScopes({
      ownerScopes: null,
      requestedScopes: ["acl:self", "project:meta", "peer_sync"],
      requesterIsAgent: false,
    });
    expect(scopes).toEqual(["acl:self", "project:meta", "peer_sync"]);
    expect(scopes).not.toContain("msg:dispatch");
  });
});
