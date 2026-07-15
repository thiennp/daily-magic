import resolveHarnessItemPath from "@/lib/agentWitch/harness/resolveHarnessItemPath";
import buildPresetHarnessItems from "@/lib/capabilities/templates/harnessContent/buildPresetHarnessItems";
import type { PresetHarnessProfile } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessProfile.type";
import {
  buildPresetCommandContent,
  buildPresetInstructionContent,
  buildPresetRuleContent,
  buildPresetSkillContent,
} from "@/lib/capabilities/templates/harnessProfiles/presetHarnessMarkdown";
import { buildPresetAgentContent } from "@/lib/capabilities/templates/harnessProfiles/presetHarnessAgentMarkdown";
import type { CapabilityTemplateHarnessItem } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";
import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

interface RenderPresetHarnessInput {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly description: string;
  readonly exampleRequest: string;
  readonly profile: PresetHarnessProfile;
  readonly operatorSteps?: readonly OperatorStepDefinition[];
}

const renderPresetHarnessItems = (
  input: RenderPresetHarnessInput,
): readonly CapabilityTemplateHarnessItem[] => {
  const {
    id,
    name,
    category,
    description,
    exampleRequest,
    profile,
    operatorSteps = [],
  } = input;
  const shared = { name, description, exampleRequest, profile };
  const agentHarnessItems = buildPresetHarnessItems(id, {
    rule: {
      title: `${name} behavior`,
      content: buildPresetRuleContent({ ...shared, category }),
    },
    skill: {
      title: `${name} playbook`,
      content: buildPresetSkillContent(shared),
    },
    command: {
      title: `Run ${name}`,
      content: buildPresetCommandContent(shared),
    },
    instruction: {
      title: `${name} defaults`,
      content: buildPresetInstructionContent({ ...shared, id }),
    },
    agent: {
      title: `${name} specialist subagent`,
      content: buildPresetAgentContent(shared),
    },
  });
  const operatorHarnessItems = operatorSteps.map((step) => ({
    id: step.id,
    kind: "operator" as const,
    title: step.title,
    path: resolveHarnessItemPath("operator", step.title),
    content: step.content,
  }));

  return [...agentHarnessItems, ...operatorHarnessItems];
};

export default renderPresetHarnessItems;
