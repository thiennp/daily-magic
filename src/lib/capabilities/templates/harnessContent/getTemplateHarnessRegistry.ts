import type { CapabilityTemplateHarnessItem } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

import agentHarnessRegistry from "@/lib/capabilities/templates/harnessContent/agentHarnessRegistry";
import workflowHarnessRegistry from "@/lib/capabilities/templates/harnessContent/workflowHarnessRegistry";

const TEMPLATE_HARNESS_REGISTRY: Readonly<
  Record<string, readonly CapabilityTemplateHarnessItem[]>
> = {
  ...workflowHarnessRegistry,
  ...agentHarnessRegistry,
};

const getTemplateHarnessItems = (
  templateId: string,
): readonly CapabilityTemplateHarnessItem[] | undefined =>
  TEMPLATE_HARNESS_REGISTRY[templateId];

export default getTemplateHarnessItems;
