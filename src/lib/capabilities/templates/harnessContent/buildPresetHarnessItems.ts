import resolveHarnessItemPath from "@/lib/agentWitch/harness/resolveHarnessItemPath";
import type { CapabilityTemplateHarnessItem } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export interface PresetHarnessItemContent {
  readonly title: string;
  readonly content: string;
}

export interface PresetHarnessContent {
  readonly rule: PresetHarnessItemContent;
  readonly skill: PresetHarnessItemContent;
  readonly command: PresetHarnessItemContent;
  readonly instruction: PresetHarnessItemContent;
  readonly agent: PresetHarnessItemContent;
}

const buildPresetHarnessItems = (
  templateId: string,
  content: PresetHarnessContent,
): readonly CapabilityTemplateHarnessItem[] => {
  const kinds = ["rule", "skill", "command", "instruction", "agent"] as const;

  return kinds.map((kind) => ({
    id: `${templateId}-${kind}`,
    kind,
    title: content[kind].title,
    path: resolveHarnessItemPath(kind, content[kind].title),
    content: content[kind].content,
  }));
};

export default buildPresetHarnessItems;
