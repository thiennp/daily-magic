import buildGroupHarness from "@/lib/capabilities/templates/harnessProfiles/buildGroupHarness";
import { AGENT_A2_PART1 } from "@/lib/capabilities/templates/harnessProfiles/agentA2.part1";
import { AGENT_A2_PART2 } from "@/lib/capabilities/templates/harnessProfiles/agentA2.part2";
import { AGENT_A2_PART3 } from "@/lib/capabilities/templates/harnessProfiles/agentA2.part3";
import { AGENT_A2_PART4 } from "@/lib/capabilities/templates/harnessProfiles/agentA2.part4";
import { AGENT_A2_PART5 } from "@/lib/capabilities/templates/harnessProfiles/agentA2.part5";

export default buildGroupHarness([
  ...AGENT_A2_PART1,
  ...AGENT_A2_PART2,
  ...AGENT_A2_PART3,
  ...AGENT_A2_PART4,
  ...AGENT_A2_PART5,
]);
