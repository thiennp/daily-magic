import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";

export const WORKFLOW_B2_PART3: readonly PresetHarnessSeed[] = [
  {
    id: "interview-debrief",
    name: "Interview debrief",
    category: "HR",
    description: "Capture signal and a hire/no-hire lean after interviews.",
    exampleRequest:
      "Write an interview debrief with strengths, concerns, and recommendation.",
    profile: {
      ruleFocus: [
        "Evidence-based strengths and concerns.",
        "Recommendation is hire / no-hire / hold with rationale.",
        "No protected-class commentary.",
      ],
      skillSections: [
        {
          heading: "Debrief",
          bullets: [
            "Role fit against stated role.",
            "Strengths tied to interview evidence.",
            "Concerns with severity and mitigations.",
          ],
        },
      ],
      commandSteps: [
        "Identify candidate and role.",
        "Balance strengths vs concerns.",
        "State clear hiring recommendation.",
      ],
      instructionAddendum: "Confidential hiring committee tone.",
      subagentMission:
        "You are the interview-debrief subagent. Write fair, evidence-based hiring debriefs.",
      subagentExpertise: ["Hiring", "Structured interviews"],
      outputFormat: "Strengths + concerns + recommendation.",
    },
  },
];
