import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const DROPSHIP_PRODUCT_LISTING_OPERATOR_STEPS: readonly OperatorStepDefinition[] =
  [
    {
      id: "dropship-product-listing-operator-supplier",
      title: "Verify supplier details in the browser",
      content: [
        "1. Open supplierUrl and confirm unit cost, shipping time, and variant options.",
        "2. Note any MOQ, banned regions, or branding limits that affect the listing.",
        "3. Reply ready with corrected unitCostAndShipping if the page differs from inputs.",
      ].join("\n"),
    },
    {
      id: "dropship-product-listing-operator-approve",
      title: "Approve listing copy and pricing",
      content: [
        "1. Review title, bullets, description, and margin math for salesChannel rules.",
        "2. Reject unrealistic shipping claims or policy-risky benefit statements.",
        "3. Reply approve when you are ready to publish this listing.",
      ].join("\n"),
    },
    {
      id: "dropship-product-listing-operator-publish",
      title: "Publish and log the listing",
      content: [
        "1. Create or update the product in your store; the agent does not log in for you.",
        "2. Upload images from assetsFolderPath or supplier assets as needed.",
        "3. Ask the agent to append this SKU to listingHistoryPath after publish.",
      ].join("\n"),
    },
  ];
