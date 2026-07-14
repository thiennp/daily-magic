import type { PresetHarnessProfile } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessProfile.type";

const bulletBlock = (items: readonly string[]): string =>
  items.map((item) => `- ${item}`).join("\n");

export const sectionBlock = (
  sections: PresetHarnessProfile["skillSections"],
): string =>
  sections
    .map((section) => `## ${section.heading}\n${bulletBlock(section.bullets)}`)
    .join("\n\n");

export { bulletBlock };
