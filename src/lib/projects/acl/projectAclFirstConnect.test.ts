import { describe, expect, it } from "vitest";

import { PROJECT_ACL_FIRST_CONNECT } from "@/lib/projects/acl/projectAclFirstConnect.constant";
import { PROJECT_ACL_DEFAULT_MEMBER_SCOPES } from "@/lib/projects/acl/projectAclScopes.constant";
import { buildProjectAclAgentGuidelineSection } from "@/lib/agentAccess/buildProjectAclAgentGuidelineSection";

describe("PROJECT_ACL_FIRST_CONNECT (G5)", () => {
  it("documents first-connect member role and scopes for Product empty state", () => {
    expect(PROJECT_ACL_FIRST_CONNECT.role).toBe("member");
    expect(PROJECT_ACL_FIRST_CONNECT.scopes).toEqual(
      PROJECT_ACL_DEFAULT_MEMBER_SCOPES,
    );
    expect(PROJECT_ACL_FIRST_CONNECT.emptyStateNote).toMatch(/member role/i);
    expect(PROJECT_ACL_FIRST_CONNECT.emptyStateNote).toMatch(/Revoke/i);
    const guideline = buildProjectAclAgentGuidelineSection().body.join(" ");
    expect(guideline).toMatch(/first bot/i);
    expect(guideline).toMatch(/member role/i);
    expect(guideline).toMatch(/list_project_peers/);
    expect(guideline).toMatch(/Members \+ Pending|get_project_acl/);
    expect(guideline).not.toMatch(/list_project_activity for/);
    expect(guideline).toMatch(/list_project_activity is the owner-only access change log/);
  });
});
