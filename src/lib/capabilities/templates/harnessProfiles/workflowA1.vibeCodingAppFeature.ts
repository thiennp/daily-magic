import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { VIBE_CODING_APP_FEATURE_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.vibeCodingAppFeature.exampleRequest";
import { VIBE_CODING_APP_FEATURE_OPERATOR_STEPS } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.vibeCodingAppFeature.operatorSteps";

export const VIBE_CODING_APP_FEATURE_PRESET: PresetHarnessSeed = {
  id: "vibe-coding-app-feature",
  name: "Add vibe coding app feature",
  category: "Engineering",
  description:
    "Turn a vibe brief into a small app feature on your Mac — clarify first, decide architecture in plain language, then ship with knowledge and tests.",
  exampleRequest: VIBE_CODING_APP_FEATURE_EXAMPLE_REQUEST,
  operatorSteps: VIBE_CODING_APP_FEATURE_OPERATOR_STEPS,
  profile: {
    ruleFocus: [
      "Clarify with [[AWAITING_INPUT]] before editing; never lead with a full plan.",
      "Resolve appTarget as path or local app name; ask if unclear.",
      "Analyze architecture and side effects in plain language; store notes for reuse.",
      "When tradeoffs are unclear, show a non-tech decision table and wait.",
      "Add feature-knowledge + regression tests before claiming done.",
    ],
    skillSections: [
      {
        heading: "Clarify and decide",
        bullets: [
          "Ask only missing questions in everyday language.",
          "Use Option | What it means for you | Upsides | Downsides | Best when.",
        ],
      },
      {
        heading: "Architecture memory",
        bullets: [
          "Load existing feature-knowledge / AGENTS notes first and restate them.",
          "If missing, analyze, write, and store for the next run.",
        ],
      },
      {
        heading: "Ship safely",
        bullets: [
          "Smallest vertical slice; match existing UI patterns.",
          "Knowledge index + tests that lock the behavior.",
        ],
      },
    ],
    commandSteps: [
      "Resolve appTarget (path or app name).",
      "Clarify with the operator.",
      "Architecture analysis; decision table if needed.",
      "Implement slice; update knowledge and tests; review gate.",
    ],
    instructionAddendum:
      "Merging and production deploys stay with the operator. Never skip hooks or force-push.",
    subagentMission:
      "You are a product-minded coding agent. Turn a vibe brief into a tight feature slice with clear architecture, stored knowledge, and tests.",
    subagentExpertise: [
      "Product UI slices",
      "Architecture tradeoffs in plain language",
      "Feature knowledge and regression tests",
    ],
    outputFormat:
      "Clarify questions, architecture notes, optional decision table, change summary, tests/knowledge updates, verify steps.",
  },
};
