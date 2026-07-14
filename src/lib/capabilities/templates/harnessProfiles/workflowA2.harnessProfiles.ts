import buildGroupHarness from "@/lib/capabilities/templates/harnessProfiles/buildGroupHarness";
import { WORKFLOW_A2_PART1 } from "@/lib/capabilities/templates/harnessProfiles/workflowA2.part1";
import { WORKFLOW_A2_PART2 } from "@/lib/capabilities/templates/harnessProfiles/workflowA2.part2";
import { WORKFLOW_A2_PART3 } from "@/lib/capabilities/templates/harnessProfiles/workflowA2.part3";
import { WORKFLOW_A2_PART4 } from "@/lib/capabilities/templates/harnessProfiles/workflowA2.part4";
import { WORKFLOW_A2_PART5 } from "@/lib/capabilities/templates/harnessProfiles/workflowA2.part5";

export default buildGroupHarness([
  ...WORKFLOW_A2_PART1,
  ...WORKFLOW_A2_PART2,
  ...WORKFLOW_A2_PART3,
  ...WORKFLOW_A2_PART4,
  ...WORKFLOW_A2_PART5,
]);
