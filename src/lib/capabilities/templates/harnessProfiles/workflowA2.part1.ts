import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";

export const WORKFLOW_A2_PART1: readonly PresetHarnessSeed[] = [
  {
    id: "email-reply-draft",
    name: "Email reply draft",
    category: "Communication",
    description: "Draft a reply that matches the thread and your intent.",
    exampleRequest:
      "Draft a professional email reply. Keep it concise and clear.",
    profile: {
      ruleFocus: [
        "Match thread context and requested tone.",
        "Answer every explicit question in the original.",
        "No passive aggression; clear next step when needed.",
      ],
      skillSections: [
        {
          heading: "Reply craft",
          bullets: [
            "Mirror subject intent in opening line.",
            "Embed keyPoints without bloating.",
            "Close with one call to action if appropriate.",
          ],
        },
      ],
      commandSteps: [
        "Read originalEmail fully.",
        "Apply tone field literally.",
        "Produce send-ready body with greeting and sign-off.",
      ],
      instructionAddendum: "Leave placeholders only for unknown names.",
      subagentMission:
        "You are the email-reply subagent. Draft thread-faithful professional replies.",
      subagentExpertise: ["Business email", "Tone control", "Thread synthesis"],
      outputFormat: "Email body ready to send; subject only if needed.",
    },
  },
];
