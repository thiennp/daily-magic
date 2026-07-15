import { DROPSHIP_PRODUCT_LISTING_WORKFLOW } from "@/lib/capabilities/templates/workflowCapabilityTemplatesA1Featured.dropshipProductListing.constant";
import { TIKTOK_SERIES_EPISODE_WORKFLOW } from "@/lib/capabilities/templates/workflowCapabilityTemplatesA1Featured.tiktokSeries.constant";
import { WORKFLOW_CAPABILITY_TEMPLATES_A1_FEATURED_SOCIAL } from "@/lib/capabilities/templates/workflowCapabilityTemplatesA1Featured.social.constant";

export const WORKFLOW_CAPABILITY_TEMPLATES_A1_FEATURED = [
  DROPSHIP_PRODUCT_LISTING_WORKFLOW,
  TIKTOK_SERIES_EPISODE_WORKFLOW,
  ...WORKFLOW_CAPABILITY_TEMPLATES_A1_FEATURED_SOCIAL,
] as const;
