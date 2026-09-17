import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";
import { parseExampleRequestSections } from "@/lib/workflowOrchestration/parseExampleRequestSections";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";
import type {
  OfficialWorkflowAgentNode,
  OfficialWorkflowHumanNode,
  OfficialWorkflowNode,
} from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const DEFAULT_REVIEW_INSTRUCTIONS = [
  "1. Read what the agent produced in the live terminal and summary.",
  "2. Request fixes if something is wrong or incomplete.",
  "3. Reply approve when you are satisfied with the result.",
].join("\n");

const buildHumanNode = (
  index: number,
  title: string,
  instructions: string,
): OfficialWorkflowHumanNode => ({
  id: `human_${index}`,
  kind: "human",
  title,
  instructions,
});

const buildAgentNode = (
  index: number,
  title: string,
  promptSection: string,
): OfficialWorkflowAgentNode => ({
  id: `agent_${index}`,
  kind: "agent",
  title,
  promptSection,
});

export const buildOfficialWorkflowDefinitionFromTemplate = (
  template: WorkflowCapabilityTemplate,
): OfficialWorkflowDefinition => {
  const operatorSteps = mapHarnessItemsToOperatorSteps(template.harness.items);
  const sections = parseExampleRequestSections(template.exampleRequest);
  const nodes: OfficialWorkflowNode[] = [];

  if (operatorSteps.length === 0) {
    nodes.push(
      buildHumanNode(
        0,
        "Confirm workflow inputs",
        [
          "1. Verify required workflow fields are complete.",
          "2. Reply ready when inputs look correct.",
        ].join("\n"),
      ),
      buildAgentNode(0, `Run ${template.name}`, template.exampleRequest),
      buildHumanNode(1, "Review and approve", DEFAULT_REVIEW_INSTRUCTIONS),
    );
  } else if (operatorSteps.length === 1) {
    nodes.push(
      buildHumanNode(0, operatorSteps[0].title, operatorSteps[0].content),
      buildAgentNode(0, `Execute ${template.name}`, template.exampleRequest),
      buildHumanNode(1, "Review and approve", DEFAULT_REVIEW_INSTRUCTIONS),
    );
  } else {
    operatorSteps.forEach((step, index) => {
      nodes.push(buildHumanNode(index, step.title, step.content));
      if (index < operatorSteps.length - 1) {
        const section =
          sections[index] ??
          sections[sections.length - 1] ??
          template.exampleRequest;
        nodes.push(
          buildAgentNode(index, `Agent work after: ${step.title}`, section),
        );
      }
    });
  }

  return {
    templateId: template.id,
    version: 1,
    capabilityName: template.name,
    nodes,
  };
};

export const findOfficialWorkflowDefinitionByTemplateId = (
  templateId: string,
): OfficialWorkflowDefinition | null => {
  const template = findCapabilityTemplateById(templateId);
  if (template === undefined || template.type !== CapabilityType.WORKFLOW) {
    return null;
  }

  return buildOfficialWorkflowDefinitionFromTemplate(template);
};

export default buildOfficialWorkflowDefinitionFromTemplate;
