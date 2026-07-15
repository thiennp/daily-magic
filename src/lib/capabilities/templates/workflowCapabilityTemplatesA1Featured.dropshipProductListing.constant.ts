import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const DROPSHIP_PRODUCT_LISTING_WORKFLOW: WorkflowCapabilityTemplate =
  buildWorkflowTemplate(
    "dropship-product-listing",
    "Commerce",
    "Dropship product listing",
    "Research margins, draft a channel-ready product listing, and avoid repeating angles from your listing history — publish only after you approve.",
    "Prepare a dropshipping listing from the workflow inputs. Read supplierUrl and listingHistoryPath, calculate margin vs targetSellPrice, draft copy for salesChannel, and wait for my approval before treating the listing as final.",
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
