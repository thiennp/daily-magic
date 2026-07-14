import buildGroupHarness from "@/lib/capabilities/templates/harnessProfiles/buildGroupHarness";
import { WORKFLOW_B1_PART1 } from "@/lib/capabilities/templates/harnessProfiles/workflowB1.part1";
import { WORKFLOW_B1_PART2 } from "@/lib/capabilities/templates/harnessProfiles/workflowB1.part2";
import { WORKFLOW_B1_PART3 } from "@/lib/capabilities/templates/harnessProfiles/workflowB1.part3";
import { WORKFLOW_B1_PART4 } from "@/lib/capabilities/templates/harnessProfiles/workflowB1.part4";
import { WORKFLOW_B1_PART5 } from "@/lib/capabilities/templates/harnessProfiles/workflowB1.part5";

export default buildGroupHarness([
  ...WORKFLOW_B1_PART1,
  ...WORKFLOW_B1_PART2,
  ...WORKFLOW_B1_PART3,
  ...WORKFLOW_B1_PART4,
  ...WORKFLOW_B1_PART5,
]);
