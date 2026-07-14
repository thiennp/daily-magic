import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";

export const WORKFLOW_A2_PART4: readonly PresetHarnessSeed[] = [
  {
    id: "document-summary",
    name: "Document summary",
    category: "Research",
    description: "Summarize pasted content with the focus you choose.",
    exampleRequest:
      "Summarize the source. Highlight decisions, risks, and recommended actions.",
    profile: {
      ruleFocus: [
        "Honor length and focus fields.",
        "Separate facts from inference.",
        "Surface risks and recommended actions explicitly.",
      ],
      skillSections: [
        {
          heading: "Read",
          bullets: [
            "Skim for thesis and constraints.",
            "Extract decisions and open questions.",
            "Note risks with severity if implied.",
          ],
        },
      ],
      commandSteps: [
        "Apply focus lens to entire source.",
        "Match requested length (short/medium/long).",
        "End with recommended actions.",
      ],
      instructionAddendum: "Cite section headings when referencing source.",
      subagentMission:
        "You are the document-summary subagent. Produce decision-ready summaries.",
      subagentExpertise: [
        "Summarization",
        "Risk extraction",
        "Executive briefs",
      ],
      outputFormat: "Summary + risks + recommended actions.",
    },
  },
];
