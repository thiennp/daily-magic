import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { PERSONAL_WEEKLY_REVIEW_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowB2.personalWeeklyReview.exampleRequest";
import { PERSONAL_WEEKLY_REVIEW_OPERATOR_STEPS } from "@/lib/capabilities/templates/harnessProfiles/workflowB2.personalWeeklyReview.operatorSteps";

export const PERSONAL_WEEKLY_REVIEW_PRESET: PresetHarnessSeed = {
  id: "personal-weekly-review",
  name: "Personal weekly review",
  category: "Personal",
  description:
    "Reflect on wins, lessons, and priorities for next week — clarify thin notes, then a review you approve before saving.",
  exampleRequest: PERSONAL_WEEKLY_REVIEW_EXAMPLE_REQUEST,
  operatorSteps: PERSONAL_WEEKLY_REVIEW_OPERATOR_STEPS,
  profile: {
    ruleFocus: [
      "Honest reflection without self-judgment theater.",
      "Lessons are actionable, not vague.",
      "Next-week priorities are few and concrete.",
    ],
    skillSections: [
      {
        heading: "Review",
        bullets: [
          "Wins: what actually moved forward.",
          "Lessons: one behavior to keep or change.",
          "Priorities: max three for next week.",
        ],
      },
    ],
    commandSteps: [
      "Use weekOf for framing.",
      "Keep tone personal and direct.",
      "End with energy check if wins were thin.",
    ],
    instructionAddendum: "Private journal tone; no corporate speak.",
    subagentMission:
      "You are the personal review subagent. Facilitate honest weekly reflection.",
    subagentExpertise: ["Reflection", "Priority setting"],
    outputFormat: "Wins + lessons + next-week priorities.",
  },
};
