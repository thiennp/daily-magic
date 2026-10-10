import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { PROJECT_PAGE_OVERVIEW_COPY as C } from "@/features/projects/overview/projectPageOverviewCopy.constant";
import { PROJECT_PAGE_TAB_IDS } from "@/features/projects/projectPageTabs.constant";
import { PROJECT_PAGE_V5_TAB_SUBTITLES } from "@/features/projects/projectPageV5Tabs.constant";
import { AWC_PROJECT_PITFALLS_COPY } from "@/features/projects/pitfalls/public-api/types";

const P = "src/features/projects";
const read = (relative: string): string =>
  readFileSync(path.join(process.cwd(), P, relative), "utf8");

describe("L3 V5-5 Overview — mount + Product EN lock", () => {
  it("mounts Overview as first live tab (no placeholder); Team still deferred", () => {
    expect(PROJECT_PAGE_TAB_IDS[0]).toBe("overview");
    expect(PROJECT_PAGE_TAB_IDS).not.toContain("team");
    expect(read("AwcProjectDetailTabPanelBody.tsx")).toContain(
      "AwcProjectOverviewPanel",
    );
    expect(read("AwcProjectDetailPanel.tsx")).toContain(
      "<AwcProjectMembersColumn",
    );
  });

  it("locks Overview EN keys + revised subtitle", () => {
    expect(PROJECT_PAGE_V5_TAB_SUBTITLES.overview).toBe(
      "What's happening in this project and what needs you.",
    );
    expect(C["overview.assistantsCard"]).toBe("Assistants");
    expect(C["overview.importantCount"](3)).toBe("3 Important");
    expect(C["disabled.viewerMessage"]).toBe("Viewers can't send messages.");
    expect(C.safetyTitle).toBe(AWC_PROJECT_PITFALLS_COPY.title);
    expect(C.thisComputer).toBe("This computer");
    const copy = read("overview/projectPageOverviewCopy.constant.ts");
    expect(copy).not.toMatch(/\bmust fix\b/i);
    expect(copy).not.toMatch(/\bbots?\b/i);
    expect(copy).toMatch(/AgentWitch|assistant|Assistants|This computer/);
  });

  it("facts/attention/setup/assistants/safety/recent are wired", () => {
    const panel = read("overview/AwcProjectOverviewPanel.tsx");
    expect(panel).toContain("AwcProjectOverviewStatsStrip");
    expect(panel).toContain("AwcProjectOverviewAttentionBanner");
    expect(panel).toContain("AwcProjectOverviewSetupCard");
    expect(panel).toContain("AwcProjectOverviewAssistantsCard");
    expect(panel).toContain("AwcProjectOverviewPitfallsCard");
    expect(panel).toContain("AwcProjectOverviewRecentCard");
  });
});
