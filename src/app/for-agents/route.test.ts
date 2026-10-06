import { describe, expect, it } from "vitest";

import { GET } from "@/app/for-agents/route";
import { buildAgentAccessGuideline } from "@/lib/agentAccess/buildAgentAccessGuideline";

const CHROME_MARKERS = [
  "AppShell",
  "MarketingShell",
  "MarketingHeader",
  "MarketingFooter",
  "<html",
  "<nav",
  "className=",
  "globals.css",
] as const;

describe("GET /for-agents", () => {
  it("serves text/markdown with guideline content and no chrome", async () => {
    const response = GET();
    const guideline = buildAgentAccessGuideline();
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe(
      "text/markdown; charset=utf-8",
    );
    expect(body.startsWith(`# ${guideline.title}`)).toBe(true);
    expect(body).toContain("## Live tools");
    expect(body).toContain("## Register");
    for (const marker of CHROME_MARKERS) {
      expect(body.includes(marker)).toBe(false);
    }
  });
});
