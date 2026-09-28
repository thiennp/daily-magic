import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const readSource = (relativePath: string): string =>
  readFileSync(join(process.cwd(), relativePath), "utf8");

/** AGENT-ACCESS-001 — /for-agents is a static document with no site chrome. */
describe("for-agents static guideline page", () => {
  it("renders the guideline without marketing header, footer, or app chrome", () => {
    const pageSource = readSource(
      "src/features/agent-access/AgentAccessGuidelinePage.tsx",
    );
    const routeSource = readSource("src/app/for-agents/page.tsx");
    const rootLayoutSource = readSource("src/app/layout.tsx");
    const appChromeSource = readSource("src/app/(app)/layout.tsx");

    expect(pageSource.includes("MarketingShell")).toBe(false);
    expect(pageSource.includes("MarketingHeader")).toBe(false);
    expect(pageSource.includes("MarketingFooter")).toBe(false);
    expect(pageSource.includes("MarketingAnnouncementBar")).toBe(false);
    expect(routeSource.includes('dynamic = "force-static"')).toBe(true);
    expect(rootLayoutSource.includes("AgentAccessWebMcpBridge")).toBe(false);
    expect(rootLayoutSource.includes("AppGoogleAnalytics")).toBe(false);
    expect(rootLayoutSource.includes("AuthSessionProvider")).toBe(false);
    expect(appChromeSource.includes("AuthSessionProvider")).toBe(true);
    expect(appChromeSource.includes("AppGoogleAnalytics")).toBe(true);
  });
});
