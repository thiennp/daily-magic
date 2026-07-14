import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import enrichCapabilityTemplate from "@/lib/capabilities/templates/enrichCapabilityTemplate";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";
import { WorkflowFieldInputType } from "@/lib/workflows/types/WorkflowFieldDefinition.type";

type WorkflowFieldSpec = readonly [
  string,
  string,
  "text" | "textarea",
  boolean?,
];

const buildWorkflowTemplate = (
  id: string,
  category: string,
  name: string,
  description: string,
  exampleRequest: string,
  fieldSpecs: readonly WorkflowFieldSpec[],
): WorkflowCapabilityTemplate =>
  enrichCapabilityTemplate({
    id,
    category,
    name,
    description,
    exampleRequest,
    type: CapabilityType.WORKFLOW,
    workflowFields: fieldSpecs.map(([key, label, type, required = true]) => ({
      key,
      label,
      type:
        type === "textarea"
          ? WorkflowFieldInputType.TEXTAREA
          : WorkflowFieldInputType.TEXT,
      required: required !== false,
    })),
  }) as WorkflowCapabilityTemplate;

export default buildWorkflowTemplate;
