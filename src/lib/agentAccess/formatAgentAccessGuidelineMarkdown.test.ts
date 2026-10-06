import { describe, expect, it } from "vitest";

import { buildAgentAccessGuideline } from "@/lib/agentAccess/buildAgentAccessGuideline";
import { buildAgentAccessLiveGuide } from "@/lib/agentAccess/buildAgentAccessLiveGuide";
import { formatAgentAccessGuidelineMarkdown } from "@/lib/agentAccess/formatAgentAccessGuidelineMarkdown";

const CHROME_MARKERS = [
  "AppShell",
  "MarketingShell",
  "MarketingHeader",
  "MarketingFooter",
  "MarketingAnnouncementBar",
  "className",
  "<html",
  "<nav",
  "<header",
  "<footer",
  "globals.css",
  "dark:bg-",
] as const;

describe("formatAgentAccessGuidelineMarkdown", () => {
  it("includes title, description, live tools, and guideline sections", () => {
    const guideline = buildAgentAccessGuideline();
    const liveGuide = buildAgentAccessLiveGuide();
    const body = formatAgentAccessGuidelineMarkdown();

    expect(body.startsWith(`# ${guideline.title}\n`)).toBe(true);
    expect(body).toContain(guideline.description);
    expect(body).toContain("## Live tools");
    expect(body).toContain(liveGuide.tools[0]!.name);
    for (const section of guideline.sections) {
      expect(body).toContain(`## ${section.heading}`);
      expect(body).toContain(section.body[0]!);
    }
  });

  it("is plain markdown with no layout chrome markers", () => {
    const body = formatAgentAccessGuidelineMarkdown();
    for (const marker of CHROME_MARKERS) {
      expect(body.includes(marker)).toBe(false);
    }
    // Layout tags only — prose may mention path placeholders like <token>.
    expect(body).not.toMatch(/<\/?(?:html|head|body|nav|header|footer|main|article|div|span|script|link|style)\b/i);
  });
});
