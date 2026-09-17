import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { DROPSHIP_PRODUCT_LISTING_OPERATOR_STEPS } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.dropshipProductListing.operatorSteps";

export const DROPSHIP_PRODUCT_LISTING_PRESET: PresetHarnessSeed = {
  id: "dropship-product-listing",
  name: "Dropship product listing",
  category: "Commerce",
  description:
    "Research margins, draft a channel-ready product listing, and avoid repeating angles from your listing history — publish only after you approve.",
  exampleRequest: [
    "Prepare a dropshipping listing from the workflow inputs.",
    "",
    "## Supplier and margin (after you verify supplierUrl)",
    "Read supplierUrl and listingHistoryPath on the Mac. Validate unitCostAndShipping against what the operator confirmed. Calculate margin vs targetSellPrice for salesChannel including estimated fees. Note positioning to avoid repeating from listing history.",
    "",
    "## Listing copy for approval",
    "Draft SEO title, five bullets, and description for nicheOrAudience on salesChannel. Differentiate using competitorListingUrls when provided. Summarize margin math in plain language. Do not treat the listing as final until the operator approves at the next checkpoint.",
    "",
    "## Publish pack and history log",
    "After the operator publishes in their store, append a concise listing summary to listingHistoryPath when they confirm publish is complete. Include SKU positioning, price, and channel for future deduplication.",
  ].join("\n"),
  operatorSteps: DROPSHIP_PRODUCT_LISTING_OPERATOR_STEPS,
  profile: {
    ruleFocus: [
      "Ground cost and shipping in supplierUrl and unitCostAndShipping; flag mismatches.",
      "Read listingHistoryPath; do not reuse the same positioning as recent SKUs.",
      "Follow salesChannel listing rules (length limits, prohibited claims, variant fields).",
      "Show margin math: cost + shipping + estimated fees vs targetSellPrice.",
      "Use workflow human checkpoints for listing approval — do not rely on [[AWAITING_INPUT]] mid-run.",
    ],
    skillSections: [
      {
        heading: "Supplier and margin check",
        bullets: [
          "Summarize supplier shipping windows and variant SKUs you can map.",
          "Estimate platform/payment fees when salesChannel is known.",
          "Call out break-even price and suggested sell price range.",
        ],
      },
      {
        heading: "Listing copy",
        bullets: [
          "Write SEO title, 5 bullets, and description focused on nicheOrAudience pain.",
          "Differentiate from competitorListingUrls without copying phrasing.",
          "Avoid medical, guaranteed-results, or false in-stock warehouse claims.",
        ],
      },
      {
        heading: "Publish pack",
        bullets: [
          "Provide image brief, alt text, and variant option labels.",
          "List compliance notes for ads and checkout (disclosures, shipping text).",
          "Append listing summary to listingHistoryPath after operator confirms publish.",
        ],
      },
    ],
    commandSteps: [
      "Load listingHistoryPath and note positioning to avoid.",
      "Review supplierUrl facts and validate unitCostAndShipping.",
      "Draft channel-ready listing and margin table.",
      "Present package and wait for listing approval.",
      "Update listingHistoryPath when the operator confirms publish.",
    ],
    instructionAddendum:
      "Store login and publish actions stay with the operator; the agent prepares listing and margin packs.",
    subagentMission:
      "You are the dropship product listing subagent. Turn supplier inputs into a compliant, differentiated listing with clear margin math.",
    subagentExpertise: [
      "E-commerce listing SEO",
      "Dropshipping margin and fee modeling",
      "Marketplace policy-safe copy",
    ],
    outputFormat:
      "Margin table, title, bullets, description, variant map, image brief, compliance notes, history append draft.",
  },
};
