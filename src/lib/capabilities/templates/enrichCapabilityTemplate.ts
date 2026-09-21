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
      "Entry-point form fields when someone starts the run",
      "Linear human and specialist steps with review checkpoints",
      "Official orchestration graph on marketplace presets",
      "Rules bundle installs to your Mac for consistent runs",
    ];
  }

  return [
    "Standing specialist — bring context in the task prompt",
    "Rules bundle: rule, skill, shortcut, instruction, and specialist",
    "Best for open-ended Mac work without a fixed intake form",
    "Run from Agent on your Mac when connected",
  ];
};

const defaultDetail = (seed: CapabilityTemplateSeedInput): string =>
  [
    seed.description,
    "",
    `This preset includes a full rules bundle (${seed.category}): behavior rules, a domain skill, a run shortcut, default instructions, and a specialist assistant.`,
    seed.type === CapabilityType.WORKFLOW
      ? "Workflows collect answers at the entry point, then run human checkpoints and Mac steps in order."
      : "Agents are reusable specialists — save to Library and install the bundle to your Mac.",
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
