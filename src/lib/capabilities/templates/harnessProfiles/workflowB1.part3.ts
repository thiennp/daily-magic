import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";

export const WORKFLOW_B1_PART3: readonly PresetHarnessSeed[] = [
  {
    id: "pr-summary",
    name: "PR / code change summary",
    category: "Engineering",
    description: "Explain a change for reviewers or non-engineers.",
    exampleRequest:
      "Summarize the change, risk areas, and test notes for reviewers.",
    profile: {
      ruleFocus: [
        "Audience field controls depth and jargon.",
        "Risks include rollback and blast radius.",
        "Test notes must be actionable for reviewers.",
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
        "Link files or modules when mentioned in change text.",
      subagentMission:
        "You are the PR-summary subagent. Write reviewer-ready change summaries.",
      subagentExpertise: ["Code review", "Risk communication"],
      outputFormat: "Summary + risks + test/verification notes.",
    },
  },
];
