import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { INTERVIEW_DEBRIEF_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowB2.interviewDebrief.exampleRequest";
import { INTERVIEW_DEBRIEF_OPERATOR_STEPS } from "@/lib/capabilities/templates/harnessProfiles/workflowB2.interviewDebrief.operatorSteps";

export const INTERVIEW_DEBRIEF_PRESET: PresetHarnessSeed = {
  id: "interview-debrief",
  name: "Interview debrief",
  category: "HR",
  description:
    "Capture interview signal and a hire / no-hire / hold lean — clarify gaps, then a committee-ready debrief you approve before sharing.",
  exampleRequest: INTERVIEW_DEBRIEF_EXAMPLE_REQUEST,
  operatorSteps: INTERVIEW_DEBRIEF_OPERATOR_STEPS,
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
      "Confirm candidate and role with the operator.",
      "Clarify missing evidence; balance strengths vs concerns.",
      "Draft recommendation; review gate before committee share.",
    ],
    instructionAddendum: "Confidential hiring committee tone.",
    subagentMission:
      "You are the interview-debrief subagent. Write fair, evidence-based hiring debriefs.",
    subagentExpertise: ["Hiring", "Structured interviews"],
    outputFormat: "Strengths + concerns + recommendation.",
  },
};
