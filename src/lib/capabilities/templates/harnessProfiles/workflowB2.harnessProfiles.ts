import buildGroupHarness from "@/lib/capabilities/templates/harnessProfiles/buildGroupHarness";
import { WORKFLOW_B2_PART1 } from "@/lib/capabilities/templates/harnessProfiles/workflowB2.part1";
import { WORKFLOW_B2_PART2 } from "@/lib/capabilities/templates/harnessProfiles/workflowB2.part2";
import { WORKFLOW_B2_PART3 } from "@/lib/capabilities/templates/harnessProfiles/workflowB2.part3";
import { WORKFLOW_B2_PART4 } from "@/lib/capabilities/templates/harnessProfiles/workflowB2.part4";
import { WORKFLOW_B2_PART5 } from "@/lib/capabilities/templates/harnessProfiles/workflowB2.part5";

export default buildGroupHarness([
  ...WORKFLOW_B2_PART1,
  ...WORKFLOW_B2_PART2,
  ...WORKFLOW_B2_PART3,
  ...WORKFLOW_B2_PART4,
  ...WORKFLOW_B2_PART5,
]);
