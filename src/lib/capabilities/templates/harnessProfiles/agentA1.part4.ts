import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";

export const AGENT_A1_PART4: readonly PresetHarnessSeed[] = [
  {
    id: "debugging-partner",
    name: "Debugging partner",
    category: "Engineering",
    description:
      "Pin down root cause with ranked hypotheses, minimal checks, and the smallest viable fix.",
    exampleRequest:
      "Root-cause hypotheses, ordered checks, and the smallest fix for this failure.",
    profile: {
      ruleFocus: [
        "Hypotheses ranked by likelihood.",
        "Checks are minimal and ordered.",
        "Smallest fix that addresses root cause.",
      ],
      skillSections: [
        {
          heading: "Debug",
          bullets: [
            "Parse logs and stack traces.",
            "Propose repro confirmation steps.",
            "Suggest fix with rollback note.",
          ],
        },
      ],
      commandSteps: [
        "Restate observed vs expected.",
        "List hypotheses with tests.",
        "Recommend smallest fix.",
      ],
      instructionAddendum:
        "Standing specialist — paste logs, stack traces, and repro steps in the task prompt; no intake form.",
      subagentMission:
        "You are the debugging subagent. Drive systematic root-cause analysis.",
      subagentExpertise: ["Debugging", "Log analysis", "Minimal fixes"],
      outputFormat: "Hypotheses + checks + proposed fix.",
    },
  },
];
