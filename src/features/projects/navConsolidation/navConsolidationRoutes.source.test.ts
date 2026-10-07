import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { PRIMARY_NAV } from "@/features/shell/appNav.constant";
import { BOTTOM_NAV } from "@/features/shell/appBottomNav.constant";

const readApp = (relativePath: string): string =>
  readFileSync(join(process.cwd(), relativePath), "utf8");

describe("nav consolidation routes (scope 1)", () => {
  it("drops My bots, New task, Library, Reports from primary and mobile nav", () => {
    const primary = PRIMARY_NAV.map((item) => item.label);
    const bottom = BOTTOM_NAV.map((item) => item.label);
    for (const label of ["My bots", "New task", "Library", "Reports"]) {
      expect(primary).not.toContain(label);
      expect(bottom).not.toContain(label);
    }
  });

  it("library page redirects and does not mount create UI", () => {
    const source = readApp("src/app/(app)/library/page.tsx");
    expect(source).toContain("runNavConsolidationPageRedirect");
    expect(source).toContain('"library"');
    expect(source).not.toContain("LibraryPageLayout");
    expect(source).not.toContain("CreatePlaybookPanel");
  });

  it("reports and my-bots pages redirect with intents", () => {
    expect(readApp("src/app/(app)/reports/page.tsx")).toContain(
      '"reports"',
    );
    expect(readApp("src/app/(app)/my-bots/page.tsx")).toContain('"bots"');
    expect(readApp("src/app/(app)/new-task/page.tsx")).toContain(
      '"new-task"',
    );
  });
});

  it("308s /my-bots to projects intent=bots in next.config", () => {
    const source = readApp("next.config.ts");
    expect(source).toContain('source: "/my-bots"');
    expect(source).toContain("/projects?intent=bots");
    expect(source).toContain("permanent: true");
  });

  it("hosts Claim/owned bots on projects intent=bots", () => {
    const source = readApp("src/features/projects/AwcProjectsPanel.tsx");
    expect(source).toContain("MyBotsPanel");
    expect(source).toContain('intent === "bots"');
    expect(
      readApp("src/lib/shell/navConsolidationIntent.constant.ts"),
    ).toContain("Claim or remove an assistant here.");
  });

  it("retargets /agent plain entry to projects new-task intent", () => {
    const source = readApp("src/app/(app)/agent/page.tsx");
    expect(source).toContain("buildNavConsolidationNewTaskHref");
  });

