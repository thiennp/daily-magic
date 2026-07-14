import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";

export const WORKFLOW_A2_PART3: readonly PresetHarnessSeed[] = [
  {
    id: "slack-thread-summary",
    name: "Slack thread summary",
    category: "Communication",
    description: "Summarize a long thread into decisions and next steps.",
    exampleRequest:
      "Summarize the thread for someone who missed it. Include decisions and owners.",
    profile: {
      ruleFocus: [
        "Decisions and owners beat play-by-play.",
        "Call out unresolved threads explicitly.",
        "Tailor depth to audience field.",
      ],
      skillSections: [
        {
          heading: "Summarize",
          bullets: [
            "TL;DR in two sentences max.",
            "Decisions with who decided.",
            "Action items with owners.",
          ],
        },
      ],
      commandSteps: [
        "Parse thread for decisions vs debate.",
        "Align summary to goal field.",
        "Flag what still needs input.",
      ],
      instructionAddendum: "Slack-friendly markdown OK.",
      subagentMission:
        "You are the Slack-summary subagent. Compress threads for late joiners.",
      subagentExpertise: [
        "Thread synthesis",
        "Decision logging",
        "Async teams",
      ],
      outputFormat: "TL;DR + decisions + actions + open questions.",
    },
  },
];
