import { describe, expect, it } from "vitest";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { PROJECT_ACL_FIRST_CONNECT } from "@/lib/projects/acl/projectAclFirstConnect.constant";
import { AWC_PROJECT_COWORK_HELP_COPY } from "@/features/projects/access/awcProjectCoworkHelpCopy.constant";
import { buildProjectAclAgentGuidelineSection } from "@/lib/agentAccess/buildProjectAclAgentGuidelineSection";
import { PROJECT_PEER_SYNC_GUIDELINE } from "@/lib/projects/peerSync/peerSyncGuideline.constant";

describe("project ACL surface copy", () => {
  it("states ACL-only cloud, local cowork, UI revoke, no token sharing", () => {
    const blobs = [
      AWC_PROJECT_ACCESS_COPY.intro,
      AWC_PROJECT_ACCESS_COPY.revokeHint,
      AWC_PROJECT_ACCESS_COPY.proposedFeedCallout,
      AWC_PROJECT_COWORK_HELP_COPY.short,
      buildProjectAclAgentGuidelineSection().body.join(" "),
      PROJECT_PEER_SYNC_GUIDELINE.ownerControls,
      PROJECT_PEER_SYNC_GUIDELINE.awcStoresOnly.join(","),
    ].join("\n");

    expect(blobs).toMatch(/name/i);
    expect(blobs).toMatch(/folder refs/i);
    expect(blobs).toMatch(/audit/i);
    expect(blobs).toMatch(/local/i);
    expect(blobs).toMatch(/Revoke/i);
    expect(blobs.toLowerCase()).toMatch(/token/);
    expect(blobs.toLowerCase()).not.toMatch(/share.*token.*with teammates/);
    expect(blobs.toLowerCase()).toMatch(/acl/);
    expect(blobs.toLowerCase()).toMatch(/activity/);
    expect(blobs.toLowerCase()).toMatch(/membership/);
    expect(blobs.toLowerCase()).toMatch(/list_project_activity/);
  });

  it("documents first-connect member role on Access empty state", () => {
    expect(AWC_PROJECT_ACCESS_COPY.membersEmpty).toContain(
      PROJECT_ACL_FIRST_CONNECT.emptyStateNote,
    );
    expect(AWC_PROJECT_ACCESS_COPY.firstConnectRole).toBe("member");
  });
});
