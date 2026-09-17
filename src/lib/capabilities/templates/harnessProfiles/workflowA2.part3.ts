import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { SLACK_THREAD_SUMMARY_PRESET } from "@/lib/capabilities/templates/harnessProfiles/workflowA2.slackThreadSummary";

export const WORKFLOW_A2_PART3: readonly PresetHarnessSeed[] = [
  SLACK_THREAD_SUMMARY_PRESET,
];
