import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { COMPETITOR_SNAPSHOT_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowB1.competitorSnapshot.exampleRequest";
import { COMPETITOR_SNAPSHOT_OPERATOR_STEPS } from "@/lib/capabilities/templates/harnessProfiles/workflowB1.competitorSnapshot.operatorSteps";

export const COMPETITOR_SNAPSHOT_PRESET: PresetHarnessSeed = {
  id: "competitor-snapshot",
  name: "Competitor snapshot",
  category: "Research",
  description:
    "Capture how a competitor compares on what matters to you — clarify evidence gaps, then positioning, strengths/weaknesses vs your lens, and strategy implications you approve before sharing.",
  exampleRequest: COMPETITOR_SNAPSHOT_EXAMPLE_REQUEST,
  operatorSteps: COMPETITOR_SNAPSHOT_OPERATOR_STEPS,
  profile: {
    ruleFocus: [
      "Anchor on the focus field, not generic SWOT.",
      "Distinguish verified facts from market rumor.",
      "Implications for our strategy, not theirs.",
      "Note evidence gaps explicitly; sharing stays with the operator.",
    ],
    skillSections: [
      {
        heading: "Scope and evidence",
        bullets: [
          "Name the competitor clearly and apply the focus lens throughout.",
          "Separate verified facts from inference; flag gaps for the operator.",
          "Ask only missing scope or evidence questions in [[PROGRESS]].",
        ],
      },
      {
        heading: "Strategy-ready snapshot",
        bullets: [
          "Positioning in one paragraph.",
          "Strengths/weaknesses vs our focus.",
          "So-what implications and watch items.",
        ],
      },
    ],
    commandSteps: [
      "Confirm competitor, focus, and format with the operator.",
      "Scope and evidence pass; list clarifications in [[PROGRESS]].",
      "Draft snapshot; respect optional format field.",
      "Review gate before the operator shares.",
    ],
    instructionAddendum:
      "Note evidence gaps explicitly; sharing stays with the operator.",
    subagentMission:
      "You are the competitor-snapshot subagent. Deliver strategy-ready competitive intel anchored on the operator’s focus.",
    subagentExpertise: [
      "Competitive analysis",
      "Positioning",
      "Strategy implications",
    ],
    outputFormat:
      "Clarifying questions, then positioning + strengths/weaknesses vs focus + implications + watch items for operator review.",
  },
};
