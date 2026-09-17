import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { SLACK_THREAD_SUMMARY_WORKFLOW } from "@/lib/capabilities/templates/workflowCapabilityTemplatesA2.slackThreadSummary.constant";

describe("slack-thread-summary workflow", () => {
  it("matches marketplace template id and fields", () => {
    const template = findCapabilityTemplateById("slack-thread-summary");
    expect(template?.type).toBe(CapabilityType.WORKFLOW);
    if (template?.type !== CapabilityType.WORKFLOW) {
      return;
    }

    expect(template.id).toBe(SLACK_THREAD_SUMMARY_WORKFLOW.id);
    expect(template.workflowFields.map((f) => f.key)).toEqual(
      SLACK_THREAD_SUMMARY_WORKFLOW.workflowFields.map((f) => f.key),
    );
    expect(template.description).not.toMatch(/\bdemo(s)?\b/i);
  });
});
