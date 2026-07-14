import buildGroupHarness from "@/lib/capabilities/templates/harnessProfiles/buildGroupHarness";
import { AGENT_B1_PART1 } from "@/lib/capabilities/templates/harnessProfiles/agentB1.part1";
import { AGENT_B1_PART2 } from "@/lib/capabilities/templates/harnessProfiles/agentB1.part2";
import { AGENT_B1_PART3 } from "@/lib/capabilities/templates/harnessProfiles/agentB1.part3";
import { AGENT_B1_PART4 } from "@/lib/capabilities/templates/harnessProfiles/agentB1.part4";
import { AGENT_B1_PART5 } from "@/lib/capabilities/templates/harnessProfiles/agentB1.part5";

export default buildGroupHarness([
  ...AGENT_B1_PART1,
  ...AGENT_B1_PART2,
  ...AGENT_B1_PART3,
  ...AGENT_B1_PART4,
  ...AGENT_B1_PART5,
]);
