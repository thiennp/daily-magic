import AGENT_A1_HARNESS from "@/lib/capabilities/templates/harnessProfiles/agentA1.harnessProfiles";
import AGENT_A2_HARNESS from "@/lib/capabilities/templates/harnessProfiles/agentA2.harnessProfiles";
import AGENT_B1_HARNESS from "@/lib/capabilities/templates/harnessProfiles/agentB1.harnessProfiles";
import AGENT_B2_HARNESS from "@/lib/capabilities/templates/harnessProfiles/agentB2.harnessProfiles";
import type { CapabilityTemplateHarnessItem } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

const agentHarnessRegistry: Record<
  string,
  readonly CapabilityTemplateHarnessItem[]
> = {
  ...AGENT_A1_HARNESS,
  ...AGENT_A2_HARNESS,
  ...AGENT_B1_HARNESS,
  ...AGENT_B2_HARNESS,
};

export default agentHarnessRegistry;
