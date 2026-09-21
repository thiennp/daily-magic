import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { CONTRACT_SUMMARIZER_PRESET } from "@/lib/capabilities/templates/harnessProfiles/workflowB2.contractSummarizer";
import { PERSONAL_WEEKLY_REVIEW_PRESET } from "@/lib/capabilities/templates/harnessProfiles/workflowB2.personalWeeklyReview";
import { TRAVEL_PLANNER_PRESET } from "@/lib/capabilities/templates/harnessProfiles/workflowB2.travelPlanner";

export const WORKFLOW_B2_PART5: readonly PresetHarnessSeed[] = [
  PERSONAL_WEEKLY_REVIEW_PRESET,
  CONTRACT_SUMMARIZER_PRESET,
  TRAVEL_PLANNER_PRESET,
];
