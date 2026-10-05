import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

describe("HomeAuthenticatedView showcases", () => {
  it("includes marketing showcase articles like the guest landing (behind a collapsible wrapper for returning users)", () => {
    const source = readFileSync(
      join(
        dirname(fileURLToPath(import.meta.url)),
        "HomeAuthenticatedView.tsx",
      ),
      "utf8",
    );

    expect(source).toContain(
      'from "@/features/home/HomeCollapsibleMarketingShowcases"',
    );
    expect(source).toContain("<HomeCollapsibleMarketingShowcases");

    const wrapperSource = readFileSync(
      join(
        dirname(fileURLToPath(import.meta.url)),
        "HomeCollapsibleMarketingShowcases.tsx",
      ),
      "utf8",
    );

    expect(wrapperSource).toContain(
      'from "@/features/home/HomeMarketingShowcases"',
    );
    expect(wrapperSource).toContain("<HomeMarketingShowcases");
  });

  it("HOME-048: shows projects panel in the dashboard main column", () => {
    const source = readFileSync(
      join(
        dirname(fileURLToPath(import.meta.url)),
        "HomeAuthenticatedView.tsx",
      ),
      "utf8",
    );

    expect(source).toContain('from "@/features/home/HomeProjectsPanel"');
    expect(source).toContain("<HomeDashboardGrid");
    expect(source).toMatch(/main=\{[\s\S]*<HomeProjectsPanel/);
  });

  it("does not render the guest-only For your AI prompt on signed-in home", () => {
    const source = readFileSync(
      join(
        dirname(fileURLToPath(import.meta.url)),
        "HomeAuthenticatedView.tsx",
      ),
      "utf8",
    );

    expect(source).not.toContain("HomeAgentAccessPrompt");
    expect(source).not.toContain(
      'from "@/features/agent-access/HomeAgentAccessPrompt"',
    );
  });

  it("shows only the prompt optimizer CTA box (no compose form) on signed-in home", () => {
    const source = readFileSync(
      join(
        dirname(fileURLToPath(import.meta.url)),
        "HomeAuthenticatedView.tsx",
      ),
      "utf8",
    );

    expect(source).toContain("<HomePromptOptimizerCtaBox />");
    expect(source).not.toContain("showComposeForm");
    expect(source).not.toContain("HomePromptOptimizerComposeCard");
  });

  it("HOME-023: keeps showcases in the main center column, not full shell width", () => {
    const source = readFileSync(
      join(
        dirname(fileURLToPath(import.meta.url)),
        "HomeAuthenticatedView.tsx",
      ),
      "utf8",
    );

    expect(source).toContain("<HomeDashboardLowerSection>");
    expect(source).toMatch(
      /HomeDashboardLowerSection[\s\S]*HomeCollapsibleMarketingShowcases/,
    );

    const lowerSectionSource = readFileSync(
      join(
        dirname(fileURLToPath(import.meta.url)),
        "HomeDashboardLowerSection.tsx",
      ),
      "utf8",
    );
    const gridSource = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "HomeDashboardGrid.tsx"),
      "utf8",
    );

    expect(lowerSectionSource).toContain("layout.mainColumnClassName");
    expect(gridSource).toContain("layout.showLeftRail");
    expect(gridSource).toMatch(/layout\.showLeftRail \? \([\s\S]*<aside/);
  });
});
