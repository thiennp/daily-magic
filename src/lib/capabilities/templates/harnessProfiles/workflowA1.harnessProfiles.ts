import buildGroupHarness from "@/lib/capabilities/templates/harnessProfiles/buildGroupHarness";
import { WORKFLOW_A1_PART1 } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.part1";
import { WORKFLOW_A1_PART2 } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.part2";
import { WORKFLOW_A1_PART3 } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.part3";
import { WORKFLOW_A1_PART4 } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.part4";
import { WORKFLOW_A1_PART5 } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.part5";

export default buildGroupHarness([
  ...WORKFLOW_A1_PART1,
  ...WORKFLOW_A1_PART2,
  ...WORKFLOW_A1_PART3,
  ...WORKFLOW_A1_PART4,
  ...WORKFLOW_A1_PART5,
]);
