import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";

export const WORKFLOW_B1_PART4: readonly PresetHarnessSeed[] = [
  {
    id: "bug-report-writer",
    name: "Bug report writer",
    category: "Engineering",
    description: "Turn a rough repro into a clear bug ticket.",
    exampleRequest:
      "Write a bug report with repro steps, expected vs actual, and severity.",
    profile: {
      ruleFocus: [
        "Repro steps are numbered and minimal.",
        "Expected vs actual is unambiguous.",
        "Severity aligned to user impact.",
      ],
      skillSections: [
        {
          heading: "Ticket",
          bullets: [
            "Title from summary, scannable.",
            "Environment hints if present in steps.",
            "Attachments/logs called out if mentioned.",
          ],
        },
      ],
      commandSteps: [
        "Structure steps to reproduce.",
        "Separate expected vs actual clearly.",
        "Justify severity in one line.",
      ],
      instructionAddendum: "Jira/GitHub issue markdown OK.",
      subagentMission:
        "You are the bug-report subagent. Produce triage-ready bug tickets.",
      subagentExpertise: ["QA writing", "Repro minimization"],
      outputFormat: "Title + repro + expected/actual + severity.",
    },
  },
];
