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
      "Rules bundle: rule, skill, shortcut, instruction, and specialist assistant",
      "Specialist owns the deliverable when the main agent delegates this preset",
      "Run from Agent on your Mac when connected",
    ];
  }

  return [
    "Agent saved to Library with a tuned default prompt",
    "Rules bundle: rule, skill, shortcut, instruction, and specialist assistant",
    "Specialist maximizes depth for this agent's domain on your Mac",
    "Run from Agent on your Mac when connected",
  ];
};

const defaultDetail = (seed: CapabilityTemplateSeedInput): string =>
  [
    seed.description,
    "",
    `This preset includes a full rules bundle (${seed.category}): behavior rules, a domain skill, a run shortcut, default instructions, and a specialist assistant that owns the core work when delegated.`,
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
