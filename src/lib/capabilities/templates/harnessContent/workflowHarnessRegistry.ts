import WORKFLOW_A1_HARNESS from "@/lib/capabilities/templates/harnessProfiles/workflowA1.harnessProfiles";
import WORKFLOW_A2_HARNESS from "@/lib/capabilities/templates/harnessProfiles/workflowA2.harnessProfiles";
import WORKFLOW_B1_HARNESS from "@/lib/capabilities/templates/harnessProfiles/workflowB1.harnessProfiles";
import WORKFLOW_B2_HARNESS from "@/lib/capabilities/templates/harnessProfiles/workflowB2.harnessProfiles";
import type { CapabilityTemplateHarnessItem } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

const workflowHarnessRegistry: Record<
  string,
  readonly CapabilityTemplateHarnessItem[]
> = {
  ...WORKFLOW_A1_HARNESS,
  ...WORKFLOW_A2_HARNESS,
  ...WORKFLOW_B1_HARNESS,
  ...WORKFLOW_B2_HARNESS,
};

export default workflowHarnessRegistry;
