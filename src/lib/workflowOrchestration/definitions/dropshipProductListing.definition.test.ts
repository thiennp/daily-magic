import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";
import { OFFICIAL_WORKFLOW_DEFINITION } from "@/lib/workflowOrchestration/definitions/dropshipProductListing.definition";

const REQUIRED_FIELD_KEYS = [
  "storeName",
  "productName",
  "nicheOrAudience",
  "supplierUrl",
  "unitCostAndShipping",
  "targetSellPrice",
  "salesChannel",
  "listingHistoryPath",
] as const;

describe("dropship-product-listing official workflow definition", () => {
  it("aligns human nodes with harness operator steps", () => {
    const template = findCapabilityTemplateById("dropship-product-listing");
    expect(template?.type).toBe(CapabilityType.WORKFLOW);
    if (template?.type !== CapabilityType.WORKFLOW) {
      return;
    }

    const operatorSteps = mapHarnessItemsToOperatorSteps(
      template.harness.items,
    );
    const humanNodes = OFFICIAL_WORKFLOW_DEFINITION.nodes.filter(
      (node) => node.kind === "human",
    );

    expect(humanNodes.map((node) => node.title)).toEqual(
      operatorSteps.map((step) => step.title),
    );
    expect(
      OFFICIAL_WORKFLOW_DEFINITION.nodes.filter((n) => n.kind === "agent"),
    ).toHaveLength(3);
    expect(OFFICIAL_WORKFLOW_DEFINITION.version).toBeGreaterThanOrEqual(2);
  });

  it("references required workflow fields in agent prompt sections", () => {
    const agentText = OFFICIAL_WORKFLOW_DEFINITION.nodes
      .filter((node) => node.kind === "agent")
      .map((node) => node.promptSection)
      .join("\n");

    REQUIRED_FIELD_KEYS.forEach((key) => {
      expect(agentText).toContain(key);
    });
    expect(agentText).toContain("competitorListingUrls");
    expect(agentText).toContain("assetsFolderPath");
  });

  it("does not instruct awaiting-input stops in agent prompt sections", () => {
    OFFICIAL_WORKFLOW_DEFINITION.nodes
      .filter((node) => node.kind === "agent")
      .forEach((node) => {
        expect(node.promptSection).not.toMatch(
          /Stop with \[\[AWAITING_INPUT\]\]/,
        );
      });
  });
});
