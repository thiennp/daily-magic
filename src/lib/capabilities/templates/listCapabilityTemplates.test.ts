import { describe, expect, it } from "vitest";

import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import {
  listCapabilityTemplateSummaries,
  default as allCapabilityTemplates,
} from "@/lib/capabilities/templates/listCapabilityTemplates";

describe("capability templates catalog", () => {
  it("ships 27 workflow and 20 agent presets with harness bundles", () => {
    const summaries = listCapabilityTemplateSummaries();
    const workflows = summaries.filter(
      (template) => template.type === CapabilityType.WORKFLOW,
    );
    const agents = summaries.filter(
      (template) => template.type === CapabilityType.AGENT,
    );

    expect(allCapabilityTemplates).toHaveLength(47);
    expect(workflows).toHaveLength(27);
    expect(agents).toHaveLength(20);
    expect(summaries[0]?.id).toBe("job-application-pack");
    expect(summaries.every((template) => template.harnessItemCount >= 5)).toBe(
      true,
    );
    expect(summaries.every((template) => template.outcomes.length >= 3)).toBe(
      true,
    );
  });

  it("finds templates by stable id", () => {
    expect(findCapabilityTemplateById("weekly-team-status")?.name).toBe(
      "Weekly team status",
    );
    expect(findCapabilityTemplateById("customer-success-copilot")?.type).toBe(
      CapabilityType.AGENT,
    );
    expect(findCapabilityTemplateById("missing-template")).toBeUndefined();
  });

  it("uses enriched harness with subagent per preset", () => {
    const jobApplication = findCapabilityTemplateById("job-application-pack");
    const dropship = findCapabilityTemplateById("dropship-product-listing");
    const tiktok = findCapabilityTemplateById("tiktok-series-episode");
    const facebook = findCapabilityTemplateById("facebook-page-post");
    const email = findCapabilityTemplateById("email-inbox-reply");
    const finance = findCapabilityTemplateById("finance-sheet-qa");
    const weekly = findCapabilityTemplateById("weekly-team-status");
    const subagent = weekly?.harness.items.find(
      (item) => item.kind === "agent",
    );

    expect(
      jobApplication?.harness.items.filter((item) => item.kind === "operator"),
    ).toHaveLength(3);
    expect(
      dropship?.harness.items.filter((item) => item.kind === "operator"),
    ).toHaveLength(3);
    expect(
      tiktok?.harness.items.filter((item) => item.kind === "operator"),
    ).toHaveLength(3);
    expect(
      facebook?.harness.items.filter((item) => item.kind === "operator"),
    ).toHaveLength(3);
    expect(
      email?.harness.items.filter((item) => item.kind === "operator"),
    ).toHaveLength(3);
    expect(
      finance?.harness.items.filter((item) => item.kind === "operator"),
    ).toHaveLength(3);
    expect(subagent?.title).toContain("subagent");
    expect(subagent?.content).toContain("weekly status subagent");
    expect(
      weekly?.harness.items.find((item) => item.kind === "rule")?.content,
    ).toContain("shipped outcomes");
  });
});
