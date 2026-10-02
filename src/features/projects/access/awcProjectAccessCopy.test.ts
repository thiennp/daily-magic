import { describe, expect, it } from "vitest";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { AWC_PROJECT_ACTIVITY_ACTIONS } from "@/features/projects/access/awcProjectActivityActions.constant";
import { AWC_PROJECT_COWORK_HELP_COPY } from "@/features/projects/access/awcProjectCoworkHelpCopy.constant";
import { buildProjectAclAgentGuidelineSection } from "@/lib/agentAccess/buildProjectAclAgentGuidelineSection";
import { PROJECT_ACL_FIRST_CONNECT } from "@/lib/projects/acl/projectAclFirstConnect.constant";
import { PROJECT_ACTIVITY_ALLOWLISTED_ACTIONS } from "@/lib/projects/acl/projectActivityAllowlist.constant";
import { PROJECT_PEER_SYNC_GUIDELINE } from "@/lib/projects/peerSync/peerSyncGuideline.constant";

describe("project ACL surface copy", () => {
  it("states ACL-only cloud, local cowork, UI revoke, no token sharing", () => {
    const blobs = [
      AWC_PROJECT_ACCESS_COPY.intro,
      AWC_PROJECT_ACCESS_COPY.revokeHint,
      AWC_PROJECT_ACCESS_COPY.membersLeaveHint,
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
    expect(blobs.toLowerCase()).toMatch(/list_project_activity/);
    expect(blobs).toMatch(/first bot/i);
    expect(blobs).toMatch(/member role/i);
    expect(blobs).toMatch(/leave on their own|leave_project/i);
    expect(blobs).toMatch(/Revoke is for kicking|kick/i);
    expect(AWC_PROJECT_ACCESS_COPY.membersLeaveHint).toMatch(
      /no owner Approve|leave_project/i,
    );
    expect(AWC_PROJECT_ACCESS_COPY.membersLeaveHint).toMatch(/Left project/i);
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

  it("allowlists only membership/status activity actions matching API (no content)", () => {
    expect([...AWC_PROJECT_ACTIVITY_ACTIONS]).toEqual([
      ...PROJECT_ACTIVITY_ALLOWLISTED_ACTIONS,
    ]);
    expect(AWC_PROJECT_ACTIVITY_ACTIONS).toContain("approve");
    expect(AWC_PROJECT_ACTIVITY_ACTIONS).toContain("revoke");
    expect(AWC_PROJECT_ACTIVITY_ACTIONS).toContain("leave");
    expect(AWC_PROJECT_ACTIVITY_ACTIONS as readonly string[]).not.toContain(
      "handoff",
    );
    expect(AWC_PROJECT_ACTIVITY_ACTIONS as readonly string[]).not.toContain(
      "run_log",
    );
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
