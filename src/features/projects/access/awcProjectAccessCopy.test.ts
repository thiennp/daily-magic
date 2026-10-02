import { describe, expect, it } from "vitest";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { AWC_PROJECT_COWORK_HELP_COPY } from "@/features/projects/access/awcProjectCoworkHelpCopy.constant";
import { buildProjectAclAgentGuidelineSection } from "@/lib/agentAccess/buildProjectAclAgentGuidelineSection";
import { PROJECT_ACL_FIRST_CONNECT } from "@/lib/projects/acl/projectAclFirstConnect.constant";
import { PROJECT_PEER_SYNC_GUIDELINE } from "@/lib/projects/peerSync/peerSyncGuideline.constant";

describe("project ACL surface copy", () => {
  it("states ACL-only cloud, local cowork, UI revoke, no token sharing", () => {
    const blobs = [
      AWC_PROJECT_ACCESS_COPY.intro,
      AWC_PROJECT_ACCESS_COPY.revokeHint,
      AWC_PROJECT_ACCESS_COPY.membersLeaveHint,
      AWC_PROJECT_ACCESS_COPY.membersEmpty,
      AWC_PROJECT_ACCESS_COPY.firstConnectNote,
      AWC_PROJECT_COWORK_HELP_COPY.short,
      buildProjectAclAgentGuidelineSection().body.join(" "),
      PROJECT_PEER_SYNC_GUIDELINE.ownerControls,
      PROJECT_PEER_SYNC_GUIDELINE.awcStoresOnly.join(","),
    ].join("\n");

    expect(blobs).toMatch(/name/i);
    expect(blobs).toMatch(/folder refs/i);
    expect(blobs).toMatch(/local/i);
    expect(blobs).toMatch(/Revoke/i);
    expect(blobs.toLowerCase()).toMatch(/token/);
    expect(blobs.toLowerCase()).not.toMatch(/share.*token.*with teammates/);
    expect(blobs.toLowerCase()).toMatch(/acl/);
    expect(blobs.toLowerCase()).toMatch(/members \+ pending|list_project_peers/);
    expect(blobs.toLowerCase()).toMatch(/not a cloud content store/);
    expect(blobs.toLowerCase()).not.toMatch(/activity feed/);
    expect(blobs).toMatch(/do not rely on list_project_activity|Prefer list_project_peers/);
    expect(AWC_PROJECT_COWORK_HELP_COPY.short.toLowerCase()).not.toMatch(
      /list_project_activity/,
    );
    expect(AWC_PROJECT_ACCESS_COPY.intro.toLowerCase()).not.toMatch(/audit/);
    expect(AWC_PROJECT_COWORK_HELP_COPY.short.toLowerCase()).not.toMatch(
      /\baudit\b/,
    );
    expect(blobs).toMatch(/first bot/i);
    expect(blobs).toMatch(/member role/i);
    expect(blobs).toMatch(/leave on their own|leave_project/i);
    expect(blobs).toMatch(/Revoke is for kicking|kick/i);
    expect(AWC_PROJECT_ACCESS_COPY.membersLeaveHint).toMatch(
      /no owner Approve|leave_project/i,
    );
    expect(AWC_PROJECT_ACCESS_COPY.membersLeaveHint).toMatch(/Left project/i);
    expect(AWC_PROJECT_ACCESS_COPY.membersLeaveHint).toMatch(/Members/i);
    expect(AWC_PROJECT_ACCESS_COPY).not.toHaveProperty("activityHeading");
    expect(AWC_PROJECT_ACCESS_COPY).not.toHaveProperty("activityHonesty");
  });

  it("documents first-connect role for G5 empty state from API constant", () => {
    expect(PROJECT_ACL_FIRST_CONNECT.role).toBe("member");
    expect([...PROJECT_ACL_FIRST_CONNECT.scopes]).toEqual([
      "acl:self",
      "project:meta",
      "peer_sync",
      "msg:dispatch",
    ]);
    expect(AWC_PROJECT_ACCESS_COPY.membersEmpty).toContain(
      PROJECT_ACL_FIRST_CONNECT.emptyStateNote,
    );
    expect(AWC_PROJECT_ACCESS_COPY.firstConnectNote).toContain("Revoke");
    expect(AWC_PROJECT_ACCESS_COPY.firstConnectNote).toContain("re-Approve");
    expect(AWC_PROJECT_ACCESS_COPY.firstConnectRole).toBe("member");
  });

  it("folder refs empty state and field labels guide owners past bare zero", () => {
    expect(AWC_PROJECT_ACCESS_COPY.folderRefsEmpty).toMatch(
      /No folder refs yet/i,
    );
    expect(AWC_PROJECT_ACCESS_COPY.folderRefsEmpty.toLowerCase()).not.toBe("0");
    expect(AWC_PROJECT_ACCESS_COPY.machineRefLabel).toMatch(/Machine/i);
    expect(AWC_PROJECT_ACCESS_COPY.folderPathLabel).toMatch(/Folder path/i);
    expect(AWC_PROJECT_ACCESS_COPY.folderRefsFormHint).toMatch(
      /mapping|registry|paths/i,
    );
    expect(AWC_PROJECT_ACCESS_COPY.addFolderRef).toMatch(/Add folder ref/i);
    expect(AWC_PROJECT_ACCESS_COPY.machineRefPlaceholder).toMatch(/e\.g\./i);
    expect(AWC_PROJECT_ACCESS_COPY.folderPathPlaceholder).toMatch(/e\.g\./i);
  });
});
