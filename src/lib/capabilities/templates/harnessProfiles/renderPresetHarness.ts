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

interface RenderPresetHarnessInput {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly description: string;
  readonly exampleRequest: string;
  readonly profile: PresetHarnessProfile;
}

const renderPresetHarnessItems = (
  input: RenderPresetHarnessInput,
): readonly CapabilityTemplateHarnessItem[] => {
  const { id, name, category, description, exampleRequest, profile } = input;
  const shared = { name, description, exampleRequest, profile };

  return buildPresetHarnessItems(id, {
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
};

export default renderPresetHarnessItems;
