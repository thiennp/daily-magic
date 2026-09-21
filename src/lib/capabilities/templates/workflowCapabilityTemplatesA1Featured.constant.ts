import { WORKFLOW_CAPABILITY_TEMPLATES_A1_FEATURED_PERSONAS } from "@/lib/capabilities/templates/workflowCapabilityTemplatesA1Featured.personas.constant";
import { TIKTOK_SERIES_EPISODE_WORKFLOW } from "@/lib/capabilities/templates/workflowCapabilityTemplatesA1Featured.tiktokSeries.constant";

export const WORKFLOW_CAPABILITY_TEMPLATES_A1_FEATURED = [
  ...WORKFLOW_CAPABILITY_TEMPLATES_A1_FEATURED_PERSONAS,
  TIKTOK_SERIES_EPISODE_WORKFLOW,
] as const;
