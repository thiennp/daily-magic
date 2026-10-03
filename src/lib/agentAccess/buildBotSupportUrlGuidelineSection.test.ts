import { describe, expect, it } from "vitest";

import { buildAgentAccessGuideline } from "@/lib/agentAccess/buildAgentAccessGuideline";
import { buildBotSupportUrlGuidelineSection } from "@/lib/agentAccess/buildBotSupportUrlGuidelineSection";
import { BOT_SUPPORT_URL_INSTRUCTION } from "@/lib/projects/botSupportUrlKind.constant";

describe("support URL guideline", () => {
  it("gives bots one instruction per predefined kind", () => {
    const section = buildBotSupportUrlGuidelineSection();
    const blob = section.body.join("\n");
    expect(section.heading).toBe("Support URLs");
    expect(blob).toContain(BOT_SUPPORT_URL_INSTRUCTION.github);
    expect(blob).toContain(BOT_SUPPORT_URL_INSTRUCTION.linkedin);
    expect(blob).toContain(BOT_SUPPORT_URL_INSTRUCTION.notebooklm);
    expect(blob).toContain(BOT_SUPPORT_URL_INSTRUCTION.link);
    expect(blob).toMatch(/\(github\)/);
    expect(blob).toMatch(/\(linkedin\)/);
    expect(blob).toMatch(/\(notebooklm\)/);
    expect(blob).toMatch(/\(link\)/);
  });

  it("is on the agent guideline bots already read", () => {
    const headings = buildAgentAccessGuideline().sections.map(
      (section) => section.heading,
    );
    expect(headings).toContain("Support URLs");
  });
});
