import { describe, expect, it } from "vitest";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { AWC_PROJECT_ACCESS_FIRST_CONNECT } from "@/features/projects/access/awcProjectAccessFirstConnect.constant";
import { AWC_PROJECT_COWORK_HELP_COPY } from "@/features/projects/access/awcProjectCoworkHelpCopy.constant";
import { AWC_PROJECT_ACTIVITY_ACTIONS } from "@/features/projects/access/awcProjectActivityActions.constant";
import { buildProjectAclAgentGuidelineSection } from "@/lib/agentAccess/buildProjectAclAgentGuidelineSection";
import { PROJECT_PEER_SYNC_GUIDELINE } from "@/lib/projects/peerSync/peerSyncGuideline.constant";

describe("project ACL surface copy", () => {
  it("states ACL-only cloud, local cowork, UI revoke, no token sharing", () => {
    const blobs = [
      AWC_PROJECT_ACCESS_COPY.intro,
      AWC_PROJECT_ACCESS_COPY.revokeHint,
      AWC_PROJECT_ACCESS_COPY.activityHonesty,
      AWC_PROJECT_ACCESS_COPY.membersEmpty,
      AWC_PROJECT_ACCESS_COPY.firstConnectNote,
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
    expect(blobs.toLowerCase()).toMatch(/membership and status events/);
    expect(blobs.toLowerCase()).toMatch(/not a cloud content store/);
    expect(blobs).toMatch(/first bot/i);
    expect(blobs).toMatch(/member role/i);
  });

  it("documents first-connect role for G5 empty state", () => {
    expect(AWC_PROJECT_ACCESS_FIRST_CONNECT.role).toBe("member");
    expect(AWC_PROJECT_ACCESS_COPY.membersEmpty).toContain(
      AWC_PROJECT_ACCESS_FIRST_CONNECT.emptyStateNote,
    );
    expect(AWC_PROJECT_ACCESS_COPY.firstConnectNote).toContain("Revoke");
    expect(AWC_PROJECT_ACCESS_COPY.firstConnectNote).toContain("re-Approve");
  });

  it("allowlists only membership/status activity actions (no content)", () => {
    expect(AWC_PROJECT_ACTIVITY_ACTIONS).toContain("approve");
    expect(AWC_PROJECT_ACTIVITY_ACTIONS).toContain("revoke");
    expect(AWC_PROJECT_ACTIVITY_ACTIONS as readonly string[]).not.toContain(
      "handoff",
    );
    expect(AWC_PROJECT_ACTIVITY_ACTIONS as readonly string[]).not.toContain(
      "run_log",
    );
  });
});
