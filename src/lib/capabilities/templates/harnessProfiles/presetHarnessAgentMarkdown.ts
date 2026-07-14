import type { PresetHarnessProfile } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessProfile.type";
import { bulletBlock } from "@/lib/capabilities/templates/harnessProfiles/presetHarnessMarkdownHelpers";

export const buildPresetAgentContent = (input: {
  readonly name: string;
  readonly profile: PresetHarnessProfile;
}): string =>
  [
    `# ${input.name} subagent`,
    "",
    input.profile.subagentMission,
    "",
    "## Expertise",
    bulletBlock(input.profile.subagentExpertise),
    "",
    "## Delegation contract",
    "- Main agent hands off the core deliverable to you for this preset.",
    "- You own quality end-to-end unless the user narrows scope.",
    "- Apply the bundled rule, skill, and command before responding.",
    "",
    "## Done when",
    `- Output matches: ${input.profile.outputFormat}`,
    "- Assumptions, risks, and one next step are listed.",
  ].join("\n");
