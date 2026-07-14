import buildGroupHarness from "@/lib/capabilities/templates/harnessProfiles/buildGroupHarness";
import { AGENT_B2_PART1 } from "@/lib/capabilities/templates/harnessProfiles/agentB2.part1";
import { AGENT_B2_PART2 } from "@/lib/capabilities/templates/harnessProfiles/agentB2.part2";
import { AGENT_B2_PART3 } from "@/lib/capabilities/templates/harnessProfiles/agentB2.part3";
import { AGENT_B2_PART4 } from "@/lib/capabilities/templates/harnessProfiles/agentB2.part4";
import { AGENT_B2_PART5 } from "@/lib/capabilities/templates/harnessProfiles/agentB2.part5";

export default buildGroupHarness([
  ...AGENT_B2_PART1,
  ...AGENT_B2_PART2,
  ...AGENT_B2_PART3,
  ...AGENT_B2_PART4,
  ...AGENT_B2_PART5,
]);
