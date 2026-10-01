import { describe, expect, it } from "vitest";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { AWC_PROJECT_COWORK_HELP_COPY } from "@/features/projects/access/awcProjectCoworkHelpCopy.constant";
import { buildProjectAclAgentGuidelineSection } from "@/lib/agentAccess/buildProjectAclAgentGuidelineSection";
import { PROJECT_PEER_SYNC_GUIDELINE } from "@/lib/projects/peerSync/peerSyncGuideline.constant";

describe("project ACL surface copy", () => {
  it("states ACL-only cloud, local cowork, UI revoke, no token sharing", () => {
    const blobs = [
      AWC_PROJECT_ACCESS_COPY.intro,
      AWC_PROJECT_ACCESS_COPY.revokeHint,
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
  });
});
