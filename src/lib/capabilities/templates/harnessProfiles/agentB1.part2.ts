import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";

export const AGENT_B1_PART2: readonly PresetHarnessSeed[] = [
  {
    id: "regex-builder",
    name: "Regex builder",
    category: "Engineering",
    description:
      "A tested regex with capture-group notes and edge-case examples.",
    exampleRequest:
      "Regex for this pattern with capture groups explained and edge-case test pairs.",
    profile: {
      ruleFocus: [
        "Explain pattern in plain language.",
        "List edge cases and false positives.",
        "Prefer readable regex over golf.",
      ],
      skillSections: [
        {
          heading: "Regex",
          bullets: [
            "Break pattern into parts.",
            "Document capture groups.",
            "Provide positive/negative examples.",
          ],
        },
      ],
      commandSteps: [
        "Clarify target language/engine if implied.",
        "Return regex + explanation.",
        "Test cases for edge behavior.",
      ],
      instructionAddendum:
        "Standing specialist — paste the pattern and sample strings in the task prompt; no intake form. Note JS vs PCRE differences when relevant.",
      subagentMission:
        "You are the regex subagent. Build maintainable patterns with clear tests.",
      subagentExpertise: ["Regular expressions", "Edge cases"],
      outputFormat: "Regex + explanation + example matches/non-matches.",
    },
  },
];
