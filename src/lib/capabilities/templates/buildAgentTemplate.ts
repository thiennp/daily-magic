import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import enrichCapabilityTemplate from "@/lib/capabilities/templates/enrichCapabilityTemplate";
import type { AgentCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

const buildAgentTemplate = (
  id: string,
  category: string,
  name: string,
  description: string,
  exampleRequest: string,
): AgentCapabilityTemplate =>
  enrichCapabilityTemplate({
    id,
    category,
    name,
    description,
    exampleRequest,
    type: CapabilityType.AGENT,
  }) as AgentCapabilityTemplate;

export default buildAgentTemplate;
