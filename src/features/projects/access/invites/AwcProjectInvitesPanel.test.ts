import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const readSrc = (relativePath: string): string =>
  readFileSync(join(process.cwd(), relativePath), "utf8");

describe("AwcProjectInvitesPanel (usable-only list)", () => {
  it("renders the server list only — no inactive section", () => {
    const panel = readSrc(
      "src/features/projects/access/invites/AwcProjectInvitesPanel.tsx",
    );
    const sections = readSrc(
      "src/features/projects/access/invites/AwcProjectInviteListSections.tsx",
    );
    expect(panel).toContain("AwcProjectInviteListSections");
    expect(panel).toContain("invites={invites}");
    expect(panel).not.toContain("inactive");
    expect(panel).not.toContain("partitionInvitesByStatus");
    expect(panel).not.toContain("isInviteStillUsable");
    expect(sections).not.toContain("invitesInactiveHeading");
    expect(sections).not.toContain("inactive");
    expect(sections).toContain("invitesActiveHeading");
  });

  it("shows the Copy prompt banner only while createdInviteUrl is set", () => {
    const panel = readSrc(
      "src/features/projects/access/invites/AwcProjectInvitesPanel.tsx",
    );
    expect(panel).toContain("createdInviteUrl ? (");
    expect(panel).toContain("AwcProjectInviteCreatedBanner");
    expect(panel).toContain("onClearCreatedUrl");
  });
});
