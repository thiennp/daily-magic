import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";

describe("AwcProjectAccessPanel redesign", () => {
  it("groups People, Invites, Inbox, Folders with shared section chrome", () => {
    const body = readFileSync(
      join(
        process.cwd(),
        "src/features/projects/access/AwcProjectAccessPanelBody.tsx",
      ),
      "utf8",
    );
    expect(body).toContain("peopleHeading");
    expect(body).toContain("invitesHeading");
    expect(body).toContain("AwcProjectInboxSection");
    expect(body).toContain("AwcProjectAccessFoldersSection");
    expect(AWC_PROJECT_ACCESS_COPY.peopleHeading).toBe("People");
    expect(AWC_PROJECT_ACCESS_COPY.eyebrow).toBe("Collaboration");
  });

  it("does not mount Access Activity feed", () => {
    const panel = readFileSync(
      join(process.cwd(), "src/features/projects/access/AwcProjectAccessPanel.tsx"),
      "utf8",
    );
    const body = readFileSync(
      join(
        process.cwd(),
        "src/features/projects/access/AwcProjectAccessPanelBody.tsx",
      ),
      "utf8",
    );
    expect(panel).not.toContain("AwcProjectActivityFeed");
    expect(panel).not.toContain("activityRefreshSignal");
    expect(body).not.toContain("onMutate");
    expect(AWC_PROJECT_ACCESS_COPY).not.toHaveProperty("activityHeading");
  });
});
