import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";

export const WORKFLOW_A1_PART5: readonly PresetHarnessSeed[] = [
  {
    id: "one-on-one-prep",
    name: "1:1 talking points",
    category: "Communication",
    description: "Prepare a focused 1:1 agenda and feedback.",
    exampleRequest:
      "Draft 1:1 talking points with prompts, feedback, and follow-ups.",
    profile: {
      ruleFocus: [
        "Balance care, candor, and career growth.",
        "Feedback is specific and behavioral.",
        "Include questions that invite dialogue, not monologue.",
      ],
      skillSections: [
        {
          heading: "Agenda",
          bullets: [
            "Check-in since last 1:1.",
            "Topics the user listed, prioritized.",
            "Feedback framed as observation + impact + request.",
          ],
        },
      ],
      commandSteps: [
        "Personalize to person field.",
        "Separate prompts from feedback items.",
        "End with follow-ups to verify next time.",
      ],
      instructionAddendum: "Keep tone supportive and direct.",
      subagentMission:
        "You are the 1:1 prep subagent. Build empathetic, high-signal manager agendas.",
      subagentExpertise: [
        "Manager coaching",
        "Feedback framing",
        "Career conversations",
      ],
      outputFormat: "Agenda sections with prompts and follow-ups.",
    },
  },
];
