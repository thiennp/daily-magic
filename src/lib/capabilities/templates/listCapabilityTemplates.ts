import { AGENT_CAPABILITY_TEMPLATES_A } from "@/lib/capabilities/templates/agentCapabilityTemplatesA.constant";
import { AGENT_CAPABILITY_TEMPLATES_B } from "@/lib/capabilities/templates/agentCapabilityTemplatesB.constant";
import type {
  CapabilityTemplate,
  CapabilityTemplateDetail,
  CapabilityTemplateSummary,
} from "@/lib/capabilities/templates/types/CapabilityTemplate.type";
import { WORKFLOW_CAPABILITY_TEMPLATES_A1 } from "@/lib/capabilities/templates/workflowCapabilityTemplatesA1.constant";
import { WORKFLOW_CAPABILITY_TEMPLATES_A2 } from "@/lib/capabilities/templates/workflowCapabilityTemplatesA2.constant";
import { WORKFLOW_CAPABILITY_TEMPLATES_B1 } from "@/lib/capabilities/templates/workflowCapabilityTemplatesB1.constant";
import { WORKFLOW_CAPABILITY_TEMPLATES_B2 } from "@/lib/capabilities/templates/workflowCapabilityTemplatesB2.constant";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";

const CAPABILITY_TEMPLATES: readonly CapabilityTemplate[] = [
  ...WORKFLOW_CAPABILITY_TEMPLATES_A1,
  ...WORKFLOW_CAPABILITY_TEMPLATES_A2,
  ...WORKFLOW_CAPABILITY_TEMPLATES_B1,
  ...WORKFLOW_CAPABILITY_TEMPLATES_B2,
  ...AGENT_CAPABILITY_TEMPLATES_A,
  ...AGENT_CAPABILITY_TEMPLATES_B,
];

const toCapabilityTemplateSummary = (
  template: CapabilityTemplate,
): CapabilityTemplateSummary => ({
  id: template.id,
  type: template.type,
  category: template.category,
  name: template.name,
  description: template.description,
  detail: template.detail,
  fieldCount:
    template.type === CapabilityType.WORKFLOW
      ? template.workflowFields.length
      : 0,
  harnessName: template.harness.name,
  harnessItemCount: template.harness.items.length,
  harnessItems: template.harness.items.map((item) => ({
    id: item.id,
    kind: item.kind,
    title: item.title,
  })),
  outcomes: template.outcomes,
});

export const toCapabilityTemplateDetail = (
  template: CapabilityTemplate,
): CapabilityTemplateDetail => ({
  ...toCapabilityTemplateSummary(template),
  exampleRequest: template.exampleRequest,
  workflowFields:
    template.type === CapabilityType.WORKFLOW ? template.workflowFields : [],
  harness: template.harness,
});

export const listCapabilityTemplateSummaries =
  (): readonly CapabilityTemplateSummary[] =>
    CAPABILITY_TEMPLATES.map(toCapabilityTemplateSummary);

export default CAPABILITY_TEMPLATES;
