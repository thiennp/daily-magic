import CAPABILITY_TEMPLATES from "@/lib/capabilities/templates/listCapabilityTemplates";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";

export interface AgentAccessWorkflowTemplateSummary {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly harnessName: string;
  readonly harnessSlug: string;
  readonly fields: readonly {
    readonly key: string;
    readonly label: string;
    readonly required: boolean;
  }[];
}

export const listAgentAccessWorkflowTemplates =
  (): readonly AgentAccessWorkflowTemplateSummary[] =>
    CAPABILITY_TEMPLATES.filter(
      (template) => template.type === CapabilityType.WORKFLOW,
    ).map((template) => ({
      id: template.id,
      name: template.name,
      description: template.description,
      harnessName: template.harness.name,
      harnessSlug: template.harness.slug,
      fields:
        template.type === CapabilityType.WORKFLOW
          ? template.workflowFields.map((field) => ({
              key: field.key,
              label: field.label,
              required: field.required,
            }))
          : [],
    }));
