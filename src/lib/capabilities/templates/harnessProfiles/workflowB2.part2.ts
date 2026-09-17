import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { INCIDENT_POSTMORTEM_PRESET } from "@/lib/capabilities/templates/harnessProfiles/workflowB2.incidentPostmortem";

export const WORKFLOW_B2_PART2: readonly PresetHarnessSeed[] = [
  INCIDENT_POSTMORTEM_PRESET,
];
