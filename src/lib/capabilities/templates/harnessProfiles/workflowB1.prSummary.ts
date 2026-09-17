import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { PR_SUMMARY_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowB1.prSummary.exampleRequest";
import { PR_SUMMARY_OPERATOR_STEPS } from "@/lib/capabilities/templates/harnessProfiles/workflowB1.prSummary.operatorSteps";

export const PR_SUMMARY_PRESET: PresetHarnessSeed = {
  id: "pr-summary",
  name: "PR / code change summary",
  category: "Engineering",
  description:
    "Turn a branch or diff into a reviewer-ready summary — risks, mitigations, and verification notes tuned to your audience.",
  exampleRequest: PR_SUMMARY_EXAMPLE_REQUEST,
  operatorSteps: PR_SUMMARY_OPERATOR_STEPS,
  profile: {
    ruleFocus: [
      "Audience field controls depth and jargon.",
      "Risks include rollback and blast radius.",
      "Test notes must be actionable for reviewers.",
      "Never invent coverage; say what is unknown.",
    ],
    skillSections: [
      {
        heading: "Review pack",
        bullets: [
          "What changed and why.",
          "Risk areas and mitigations.",
          "How it was tested / what to verify.",
        ],
      },
    ],
    commandSteps: [
      "Map context to PR title or branch.",
      "Tailor language to audience.",
      "List verification steps for reviewers.",
    ],
    instructionAddendum:
      "Link files or modules when mentioned in change text. Prefer markdown for PR bodies.",
    subagentMission:
      "You are the PR-summary subagent. Write reviewer-ready change summaries with honest risk and test notes.",
    subagentExpertise: ["Code review", "Risk communication"],
    outputFormat:
      "Summary + risks + test/verification notes (+ optional PR markdown).",
  },
};
