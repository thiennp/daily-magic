import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { PROJECT_PAGE_TAB_IDS } from "@/features/projects/projectPageTabs.constant";
import { PROJECT_PAGE_V5_CHROME_COPY as C } from "@/features/projects/projectPageV5ChromeCopy.constant";
import {
  PROJECT_PAGE_V5_TAB_LABELS,
  PROJECT_PAGE_V5_TAB_ORDER,
  PROJECT_PAGE_V5_TAB_SUBTITLES,
} from "@/features/projects/projectPageV5Tabs.constant";

const P = "src/features/projects";
const read = (relative: string): string =>
  readFileSync(path.join(process.cwd(), P, relative), "utf8");

describe("L3 V5-3 project chrome — Product EN lock", () => {
  it("locks header strings", () => {
    expect(C["header.edit"]).toBe("Edit on this computer");
    expect(C["header.moreActions"]).toBe("More actions");
    expect(C["status.onlineOnThisComputer"]).toBe("Online on this computer");
    expect(C["status.offlineThisComputer"]).toBe("This computer is offline");
    expect(C["tabs.importantCount"](3)).toBe("3 Important");
  });

  it("v5 tab order + labels; live tabs keep that order (no placeholder panels)", () => {
    expect(PROJECT_PAGE_V5_TAB_ORDER.map((id) => PROJECT_PAGE_V5_TAB_LABELS[id])).toEqual([
      "Overview", "Activity", "Reports", "Team", "Library", "Safety rules", "Resources", "Settings",
    ]);
    const live = PROJECT_PAGE_V5_TAB_ORDER.filter((id) =>
      (PROJECT_PAGE_TAB_IDS as readonly string[]).includes(id),
    );
    expect(live).toEqual([...PROJECT_PAGE_TAB_IDS]);
  });

  it("panel subtitles are the locked EN (Reports/Library reuse L6 intros)", () => {
    expect(PROJECT_PAGE_V5_TAB_SUBTITLES).toMatchObject({
      overview: "Chat with your assistants and this computer.",
      activity: "Every conversation, newest first.",
      team: "People, assistants, and computers in this project.",
      pitfalls: "Things your assistants must avoid.",
      resources: "Folders and code repositories for this project.",
      settings: "Name, folder, and delete.",
    });
    const tabs = read("projectPageV5Tabs.constant.ts");
    expect(tabs).toContain('PROJECT_PAGE_REPORTS_COPY["reports.intro"]');
    expect(tabs).toContain('PROJECT_PAGE_LIBRARY_COPY["library.intro"]');
    for (const text of Object.values(PROJECT_PAGE_V5_TAB_SUBTITLES)) {
      expect(text).not.toMatch(/\bbots?\b|\bMac\b/i);
    }
  });

  it("header: breadcrumb, H1, status, role chip, ONE edit action, More actions menu", () => {
    const header = read("AwcProjectDetailHeader.tsx");
    expect(header).toContain("<AwcProjectBreadcrumb");
    expect(header).toContain("<h1");
    expect(header).toContain("<AwcProjectDetailHeaderStatus");
    expect(header).toContain("<AwcProjectRoleChip");
    expect(header.match(/<AwcProjectHeaderEditAction/g)).toHaveLength(1);
    expect(header).not.toContain("AwcProjectEditOnMacActions");
    expect(header).not.toContain("AwcProjectPathDisplay");
    expect(read("AwcProjectDetailHeaderActions.tsx")).toContain('"header.moreActions"');
  });

  it("disabled Edit looks disabled (.awc-disabled) with a visible reason", () => {
    const edit = read("AwcProjectHeaderEditAction.tsx");
    expect(edit).toContain("awc-disabled");
    expect(edit).toContain("aria-describedby");
    expect(edit).toContain('C["header.edit"]');
  });

  it("keeps the live Members rail + mobile Members chip + ask box mounted", () => {
    const panel = read("AwcProjectDetailPanel.tsx");
    expect(panel).toContain("<AwcProjectMembersColumn");
    expect(panel).toContain("<AwcProjectAskBox");
    expect(read("AwcProjectDetailHeader.tsx")).toContain("<AwcProjectMobileMembersChip");
    expect(read("AwcProjectMembersColumn.tsx")).toContain("AwcProjectMembersOwnerContent");
  });

  it("every tab panel renders the sr-only H2 + subtitle intro", () => {
    expect(read("AwcProjectDetailTabPanels.tsx")).toContain("<AwcProjectTabPanelIntro");
    expect(read("AwcProjectTabPanelIntro.tsx")).toContain('className="sr-only"');
    expect(read("reports/AwcProjectReportsPanel.tsx")).not.toContain('C["reports.intro"]');
    expect(read("library/AwcProjectLibraryHeader.tsx")).not.toContain('C["library.intro"]');
  });
});
