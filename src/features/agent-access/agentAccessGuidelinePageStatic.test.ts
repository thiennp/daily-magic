import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const readSource = (relativePath: string): string =>
  readFileSync(join(process.cwd(), relativePath), "utf8");

/** AGENT-ACCESS-001 — /for-agents is plain markdown with no site chrome. */
describe("for-agents plain guideline route", () => {
  it("is a route handler, not a React page wrapped in marketing/app chrome", () => {
    const routeSource = readSource("src/app/for-agents/route.ts");
    const rootLayoutSource = readSource("src/app/layout.tsx");
    const appChromeSource = readSource("src/app/(app)/layout.tsx");

    expect(existsSync(join(process.cwd(), "src/app/for-agents/page.tsx"))).toBe(
      false,
    );
    expect(
      existsSync(
        join(
          process.cwd(),
          "src/features/agent-access/AgentAccessGuidelinePage.tsx",
        ),
      ),
    ).toBe(false);

    expect(routeSource.includes("formatAgentAccessGuidelineMarkdown")).toBe(
      true,
    );
    expect(routeSource.includes('dynamic = "force-static"')).toBe(true);
    expect(routeSource.includes("text/markdown")).toBe(true);
    expect(routeSource.includes("AppShell")).toBe(false);
    expect(routeSource.includes("MarketingShell")).toBe(false);
    expect(routeSource.includes("MarketingHeader")).toBe(false);
    expect(routeSource.includes("MarketingFooter")).toBe(false);
    expect(routeSource.includes("className")).toBe(false);

    expect(rootLayoutSource.includes("AgentAccessWebMcpBridge")).toBe(false);
    expect(rootLayoutSource.includes("AppGoogleAnalytics")).toBe(false);
    expect(rootLayoutSource.includes("AuthSessionProvider")).toBe(false);
    expect(appChromeSource.includes("AuthSessionProvider")).toBe(true);
    expect(appChromeSource.includes("AppGoogleAnalytics")).toBe(true);
  });
});
