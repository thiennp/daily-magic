import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const DROPSHIP_PRODUCT_LISTING_WORKFLOW: WorkflowCapabilityTemplate =
  buildWorkflowTemplate(
    "dropship-product-listing",
    "Commerce",
    "Dropship product listing",
    "Research margins, draft a channel-ready product listing, and avoid repeating angles from your listing history — publish only after you approve.",
    [
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
    [
      ["storeName", "Store or brand name", "text"],
      ["productName", "Product name", "text"],
      ["nicheOrAudience", "Niche or target buyer", "textarea"],
      ["supplierUrl", "Supplier product URL", "text"],
      ["unitCostAndShipping", "Unit cost and shipping (from supplier)", "text"],
      ["targetSellPrice", "Target sell price", "text"],
      [
        "salesChannel",
        "Sales channel (Shopify, Amazon, eBay, TikTok Shop, etc.)",
        "text",
      ],
      [
        "competitorListingUrls",
        "Competitor listing URLs (optional)",
        "textarea",
        false,
      ],
      [
        "listingHistoryPath",
        "Listing history file on your Mac (JSON or markdown)",
        "text",
      ],
      [
        "assetsFolderPath",
        "Product images folder on your Mac (optional)",
        "text",
        false,
      ],
    ],
  );
