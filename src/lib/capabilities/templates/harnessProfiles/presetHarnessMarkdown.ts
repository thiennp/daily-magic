import type { PresetHarnessProfile } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessProfile.type";
import {
  bulletBlock,
  sectionBlock,
} from "@/lib/capabilities/templates/harnessProfiles/presetHarnessMarkdownHelpers";

export const buildPresetRuleContent = (input: {
  readonly name: string;
  readonly category: string;
  readonly description: string;
  readonly profile: PresetHarnessProfile;
}): string =>
  [
    `# ${input.name}`,
    "",
    `Category: ${input.category}`,
    "",
    input.description,
    "",
    "## Must do",
    bulletBlock(input.profile.ruleFocus),
    "",
    "## Output format",
    input.profile.outputFormat,
    "",
    "## Safety",
    "- Never invent facts, metrics, or quotes not in user inputs.",
    "- Do not expose secrets, tokens, or private credentials.",
    "- Ask one focused question if a required input is missing.",
  ].join("\n");

export const buildPresetSkillContent = (input: {
  readonly name: string;
  readonly description: string;
  readonly exampleRequest: string;
  readonly profile: PresetHarnessProfile;
}): string =>
  [
    `# ${input.name} skill`,
    "",
    input.description,
    "",
    sectionBlock(input.profile.skillSections),
    "",
    "## Default intent",
    input.exampleRequest,
  ].join("\n");

export const buildPresetCommandContent = (input: {
  readonly name: string;
  readonly exampleRequest: string;
  readonly profile: PresetHarnessProfile;
}): string =>
  [
    `# Run ${input.name}`,
    "",
    "Use when this preset is selected from Library or Agent on a paired Mac.",
    "",
    "## Checklist",
    bulletBlock(input.profile.commandSteps),
    "",
    "## Prompt seed",
    "```text",
    input.exampleRequest,
    "```",
  ].join("\n");

export const buildPresetInstructionContent = (input: {
  readonly name: string;
  readonly id: string;
  readonly exampleRequest: string;
  readonly profile: PresetHarnessProfile;
}): string =>
  [
    `# ${input.name} default instruction`,
    "",
    input.exampleRequest,
    "",
    input.profile.instructionAddendum,
    "",
    `Harness set: template-${input.id}`,
  ].join("\n");
