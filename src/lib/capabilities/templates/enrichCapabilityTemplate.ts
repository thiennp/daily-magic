import buildCapabilityTemplateHarness from "@/lib/capabilities/templates/buildCapabilityTemplateHarness";
import type {
  AgentCapabilityTemplate,
  CapabilityTemplate,
  WorkflowCapabilityTemplate,
} from "@/lib/capabilities/templates/types/CapabilityTemplate.type";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";

interface WorkflowTemplateSeed {
  readonly id: string;
  readonly category: string;
  readonly name: string;
  readonly description: string;
  readonly exampleRequest: string;
  readonly type: typeof CapabilityType.WORKFLOW;
  readonly workflowFields: WorkflowCapabilityTemplate["workflowFields"];
}

interface AgentTemplateSeed {
  readonly id: string;
  readonly category: string;
  readonly name: string;
  readonly description: string;
  readonly exampleRequest: string;
  readonly type: typeof CapabilityType.AGENT;
}

type CapabilityTemplateSeedInput = WorkflowTemplateSeed | AgentTemplateSeed;

const defaultOutcomes = (
  seed: CapabilityTemplateSeedInput,
): readonly string[] => {
  if (seed.type === CapabilityType.WORKFLOW) {
    return [
      "Workflow saved to Library with guided form fields",
      "Harness bundle: rule, skill, command, and default instruction",
      "Run from Agent on your Mac when paired",
    ];
  }

  return [
    "Agent saved to Library with a tuned default prompt",
    "Harness bundle: behavior rule, domain skill, and run command",
    "Run from Agent on your Mac when paired",
  ];
};

const defaultDetail = (seed: CapabilityTemplateSeedInput): string =>
  [
    seed.description,
    "",
    `This preset includes a full Agent Witch harness (${seed.category}): behavior rules, a reusable skill, a run command, and default instructions linked to the capability.`,
    "Save it to your Library, then install the bundle to your Mac so tasks follow the same standards every time.",
  ].join(" ");

const enrichCapabilityTemplate = (
  seed: CapabilityTemplateSeedInput,
): CapabilityTemplate => {
  const harness = buildCapabilityTemplateHarness(seed);
  const shared = {
    id: seed.id,
    category: seed.category,
    name: seed.name,
    description: seed.description,
    detail: defaultDetail(seed),
    exampleRequest: seed.exampleRequest,
    outcomes: defaultOutcomes(seed),
    harness,
  };

  if (seed.type === CapabilityType.WORKFLOW) {
    return {
      ...shared,
      type: CapabilityType.WORKFLOW,
      workflowFields: seed.workflowFields,
    } satisfies WorkflowCapabilityTemplate;
  }

  return {
    ...shared,
    type: CapabilityType.AGENT,
  } satisfies AgentCapabilityTemplate;
};

export default enrichCapabilityTemplate;
