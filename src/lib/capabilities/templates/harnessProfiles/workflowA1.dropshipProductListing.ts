import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { DROPSHIP_PRODUCT_LISTING_OPERATOR_STEPS } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.dropshipProductListing.operatorSteps";

export const DROPSHIP_PRODUCT_LISTING_PRESET: PresetHarnessSeed = {
  id: "dropship-product-listing",
  name: "Dropship product listing",
  category: "Commerce",
  description:
    "Research margins, draft a channel-ready product listing, and avoid repeating angles from your listing history — publish only after you approve.",
  exampleRequest:
    "Prepare a dropshipping listing from the workflow inputs. Read supplierUrl and listingHistoryPath, calculate margin vs targetSellPrice, draft copy for salesChannel, and wait for my approval before treating the listing as final.",
  operatorSteps: DROPSHIP_PRODUCT_LISTING_OPERATOR_STEPS,
  profile: {
    ruleFocus: [
      "Ground cost and shipping in supplierUrl and unitCostAndShipping; flag mismatches.",
      "Read listingHistoryPath; do not reuse the same positioning as recent SKUs.",
      "Follow salesChannel listing rules (length limits, prohibited claims, variant fields).",
      "Show margin math: cost + shipping + estimated fees vs targetSellPrice.",
      "Pause with [[AWAITING_INPUT]] for listing approval before calling it final.",
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
