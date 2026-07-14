import buildGroupHarness from "@/lib/capabilities/templates/harnessProfiles/buildGroupHarness";
import { AGENT_A1_PART1 } from "@/lib/capabilities/templates/harnessProfiles/agentA1.part1";
import { AGENT_A1_PART2 } from "@/lib/capabilities/templates/harnessProfiles/agentA1.part2";
import { AGENT_A1_PART3 } from "@/lib/capabilities/templates/harnessProfiles/agentA1.part3";
import { AGENT_A1_PART4 } from "@/lib/capabilities/templates/harnessProfiles/agentA1.part4";
import { AGENT_A1_PART5 } from "@/lib/capabilities/templates/harnessProfiles/agentA1.part5";

export default buildGroupHarness([
  ...AGENT_A1_PART1,
  ...AGENT_A1_PART2,
  ...AGENT_A1_PART3,
  ...AGENT_A1_PART4,
  ...AGENT_A1_PART5,
]);
