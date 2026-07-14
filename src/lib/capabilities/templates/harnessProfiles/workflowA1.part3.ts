import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";

export const WORKFLOW_A1_PART3: readonly PresetHarnessSeed[] = [
  {
    id: "sprint-recap",
    name: "Sprint recap",
    category: "Reporting",
    description: "Summarize what shipped, what slipped, and what is next.",
    exampleRequest:
      "Write a sprint recap for stakeholders. Keep it factual and action-oriented.",
    profile: {
      ruleFocus: [
        "Distinguish shipped vs deferred with reasons, not excuses.",
        "Stakeholder-safe tone; no blame.",
        "Next focus must be actionable for the coming sprint.",
      ],
      skillSections: [
        {
          heading: "Narrative",
          bullets: [
            "Open with sprint goal alignment (inferred if not stated).",
            "Shipped: user-visible outcomes first.",
            "Missed: scope, risk, or dependency — one line each.",
          ],
        },
      ],
      commandSteps: [
        "Align shipped list to sprint name.",
        "Document deferrals with cause category.",
        "Close with 3 next-sprint priorities max.",
      ],
      instructionAddendum: "Suitable for email or Confluence.",
      subagentMission:
        "You are the sprint recap subagent. Turn sprint notes into stakeholder-ready recaps.",
      subagentExpertise: ["Agile reporting", "Scope narrative", "Risk framing"],
      outputFormat: "Sections: Shipped / Deferred / Next focus.",
    },
  },
];
