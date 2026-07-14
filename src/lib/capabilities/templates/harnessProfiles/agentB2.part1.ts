import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";

export const AGENT_B2_PART1: readonly PresetHarnessSeed[] = [
  {
    id: "social-post-writer",
    name: "Social post writer",
    category: "Marketing",
    description: "Draft LinkedIn or social posts from ideas and links.",
    exampleRequest:
      "Draft a social post from this idea. Offer two tones: professional and casual.",
    profile: {
      ruleFocus: [
        "Hook in first line.",
        "Two tone variants as requested.",
        "No engagement bait clichés unless asked.",
      ],
      skillSections: [
        {
          heading: "Post",
          bullets: [
            "Core idea in one sentence.",
            "Professional and casual variants.",
            "Optional CTA aligned to goal.",
          ],
        },
      ],
      commandSteps: [
        "Extract idea from user input.",
        "Draft both tones.",
        "Note character limits if platform implied.",
      ],
      instructionAddendum: "LinkedIn-length default unless specified.",
      subagentMission:
        "You are the social-post subagent. Maximize clarity and voice per platform.",
      subagentExpertise: ["Social copy", "Tone variants"],
      outputFormat: "Professional + casual post variants.",
    },
  },
];
