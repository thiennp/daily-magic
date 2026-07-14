import CAPABILITY_TEMPLATES from "@/lib/capabilities/templates/listCapabilityTemplates";
import type { CapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

const findCapabilityTemplateById = (
  templateId: string,
): CapabilityTemplate | undefined =>
  CAPABILITY_TEMPLATES.find((template) => template.id === templateId);

export default findCapabilityTemplateById;
