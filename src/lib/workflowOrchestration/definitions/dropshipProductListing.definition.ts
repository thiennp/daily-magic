import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const SUPPLIER_MARGIN_AND_DRAFT = `Continue from the operator’s supplier verification (see checkpoint responses above).

Read from the workflow form: storeName, productName, nicheOrAudience, supplierUrl, unitCostAndShipping, targetSellPrice, salesChannel, listingHistoryPath, and competitorListingUrls when provided.

## Supplier and margin (this step only)
- Load listingHistoryPath on the Mac; note recent SKU positioning you must not repeat.
- Ground costs in unitCostAndShipping and facts from supplierUrl; flag mismatches the operator corrected.
- Build a margin table: unit cost + shipping + estimated platform/payment fees vs targetSellPrice; show break-even and suggested range for salesChannel.

## Listing draft (this step only)
- Draft channel-ready SEO title, five bullets, and description for nicheOrAudience under salesChannel rules (length limits, prohibited claims).
- Differentiate from competitorListingUrls without copying phrasing.
- Summarize the package in [[PROGRESS]] in plain language.
- Do not use [[AWAITING_INPUT]] for approval — the workflow pauses at the next human checkpoint.`;

const FINALIZE_AFTER_APPROVAL = `Continue from prior operator answers, especially listing approval feedback.

## Finalize listing pack (this step only)
- Apply any fixes the operator requested to title, bullets, description, and margin math.
- Add variant option labels, image brief and alt text (use assetsFolderPath when provided).
- List compliance notes for ads and checkout on salesChannel (shipping disclosures, no false in-stock warehouse claims).
- Prepare a draft block to append to listingHistoryPath after publish — do not write the file until the operator confirms publish at a later checkpoint.`;

const APPEND_LISTING_HISTORY = `The operator has published the listing in their store (see latest checkpoint).

## History log (this step only)
- Append a concise entry to listingHistoryPath: productName, salesChannel, sell price, positioning angle, and date.
- Confirm what was written in [[PROGRESS]].
- Store login and marketplace publish actions stay with the operator; you only update listingHistoryPath when asked.`;

export const OFFICIAL_WORKFLOW_DEFINITION: OfficialWorkflowDefinition = {
  templateId: "dropship-product-listing",
  version: 2,
  capabilityName: "Dropship product listing",
  nodes: [
    buildOfficialWorkflowHumanNode(
      0,
      "Verify supplier details in the browser",
      [
        "1. Open supplierUrl and confirm unit cost, shipping time, and variant options.",
        "2. Note any MOQ, banned regions, or branding limits that affect the listing.",
        "3. Reply ready with corrected unitCostAndShipping if the page differs from inputs.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      0,
      "Margin math and channel-ready listing draft",
      SUPPLIER_MARGIN_AND_DRAFT,
    ),
    buildOfficialWorkflowHumanNode(
      1,
      "Approve listing copy and pricing",
      [
        "1. Review title, bullets, description, and margin math for salesChannel rules.",
        "2. Reject unrealistic shipping claims or policy-risky benefit statements.",
        "3. Reply approve when you are ready to publish this listing.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      1,
      "Finalize publish pack and history draft",
      FINALIZE_AFTER_APPROVAL,
    ),
    buildOfficialWorkflowHumanNode(
      2,
      "Publish and log the listing",
      [
        "1. Create or update the product in your store; the agent does not log in for you.",
        "2. Upload images from assetsFolderPath or supplier assets as needed.",
        "3. Ask the agent to append this SKU to listingHistoryPath after publish.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      2,
      "Append listing summary to history file",
      APPEND_LISTING_HISTORY,
    ),
    buildOfficialWorkflowHumanNode(
      3,
      "Confirm listing history entry",
      [
        "1. Open listingHistoryPath and verify the new SKU entry matches what you published.",
        "2. Ask for edits if positioning or price summary is wrong.",
        "3. Reply done when history is accurate for the next listing run.",
      ].join("\n"),
    ),
  ],
};

export default OFFICIAL_WORKFLOW_DEFINITION;
