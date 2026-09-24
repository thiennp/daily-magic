import { describe, expect, it } from "vitest";

import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import buildUsageGuideForTemplate from "@/lib/capabilities/templates/buildUsageGuideForTemplate";
import type { AgentCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

const agentTemplate: AgentCapabilityTemplate = {
  id: "code-reviewer",
  type: CapabilityType.AGENT,
  category: "Engineering",
  name: "Code reviewer",
  description: "Review diffs for risks.",
  detail: "Detail",
  exampleRequest: "Review my PR",
  outcomes: ["Clear review notes"],
  harness: { slug: "template-code-reviewer", name: "Code reviewer", items: [] },
};

describe("buildUsageGuideForTemplate", () => {
  it("includes four writer options and project-first steps", () => {
    const guide = buildUsageGuideForTemplate(agentTemplate);

    expect(guide.supportedWriters).toEqual([
      "anthropic",
      "openai",
      "cursor",
      "google",
    ]);
    expect(guide.steps[0]?.title).toBe("Install to a project");
    expect(guide.prerequisites.some((line) => line.includes("project"))).toBe(
      true,
    );
  });
});
