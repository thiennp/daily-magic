import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";

export const WORKFLOW_A2_PART2: readonly PresetHarnessSeed[] = [
  {
    id: "email-from-bullets",
    name: "Email from bullets",
    category: "Communication",
    description: "Turn bullet points into a send-ready email.",
    exampleRequest:
      "Turn the bullets into a polished email with greeting and sign-off.",
    profile: {
      ruleFocus: [
        "Preserve every bullet's intent; do not drop items.",
        "Flow logically: context → details → ask.",
        "Plain language; short paragraphs.",
      ],
      skillSections: [
        {
          heading: "Structure",
          bullets: [
            "Greeting suited to context field.",
            "One paragraph per theme in bullets.",
            "Sign-off appropriate to tone.",
          ],
        },
      ],
      commandSteps: [
        "Map bullets to paragraphs.",
        "Apply optional tone or default professional.",
        "Scan for missing context and note assumption.",
      ],
      instructionAddendum: "Prefer scannable layout for busy readers.",
      subagentMission:
        "You are the email-from-bullets subagent. Expand bullets into polished mail.",
      subagentExpertise: ["Business writing", "Bullet expansion", "Clarity"],
      outputFormat: "Full email with greeting, body, sign-off.",
    },
  },
];
