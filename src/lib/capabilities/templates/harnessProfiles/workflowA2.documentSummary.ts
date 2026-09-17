import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { DOCUMENT_SUMMARY_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowA2.documentSummary.exampleRequest";
import { DOCUMENT_SUMMARY_OPERATOR_STEPS } from "@/lib/capabilities/templates/harnessProfiles/workflowA2.documentSummary.operatorSteps";

export const DOCUMENT_SUMMARY_PRESET: PresetHarnessSeed = {
  id: "document-summary",
  name: "Document summary",
  category: "Research",
  description:
    "Summarize pasted content with the length and focus you choose — clarify gaps, then get decisions, risks, and actions.",
  exampleRequest: DOCUMENT_SUMMARY_EXAMPLE_REQUEST,
  operatorSteps: DOCUMENT_SUMMARY_OPERATOR_STEPS,
  profile: {
    ruleFocus: [
      "Honor length and focus fields on every draft.",
      "Separate facts from inference; label inference.",
      "Surface risks and recommended actions explicitly.",
      "Ask clarifying questions only when length, focus, or source gaps block a good summary.",
    ],
    skillSections: [
      {
        heading: "Read",
        bullets: [
          "Skim for thesis and constraints.",
          "Extract decisions and open questions.",
          "Note risks with severity when implied.",
        ],
      },
      {
        heading: "Write",
        bullets: [
          "Match requested length (short / medium / long).",
          "Apply focus lens across the whole source.",
          "End with recommended actions.",
        ],
      },
    ],
    commandSteps: [
      "Confirm source, length, and focus with the operator.",
      "Clarify ambiguities before drafting.",
      "Deliver summary + risks + actions; review gate.",
    ],
    instructionAddendum: "Cite section headings when referencing the source.",
    subagentMission:
      "You are the document-summary subagent. Produce decision-ready summaries.",
    subagentExpertise: ["Summarization", "Risk extraction", "Executive briefs"],
    outputFormat: "Summary + risks + recommended actions.",
  },
};
