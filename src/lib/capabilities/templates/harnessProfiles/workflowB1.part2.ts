import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { COMPETITOR_SNAPSHOT_PRESET } from "@/lib/capabilities/templates/harnessProfiles/workflowB1.competitorSnapshot";

export const WORKFLOW_B1_PART2: readonly PresetHarnessSeed[] = [
  COMPETITOR_SNAPSHOT_PRESET,
];
