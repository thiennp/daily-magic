import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { BUG_REPORT_WRITER_PRESET } from "@/lib/capabilities/templates/harnessProfiles/workflowB1.bugReportWriter";

export const WORKFLOW_B1_PART4: readonly PresetHarnessSeed[] = [
  BUG_REPORT_WRITER_PRESET,
];
