import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { BUG_REPORT_WRITER_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowB1.bugReportWriter.exampleRequest";
import { BUG_REPORT_WRITER_OPERATOR_STEPS } from "@/lib/capabilities/templates/harnessProfiles/workflowB1.bugReportWriter.operatorSteps";

export const BUG_REPORT_WRITER_PRESET: PresetHarnessSeed = {
  id: "bug-report-writer",
  name: "Bug report writer",
  category: "Engineering",
  description:
    "Turn a rough repro into a clear bug ticket — minimize steps, clarify environment gaps, then draft markdown you approve before filing.",
  exampleRequest: BUG_REPORT_WRITER_EXAMPLE_REQUEST,
  operatorSteps: BUG_REPORT_WRITER_OPERATOR_STEPS,
  profile: {
    ruleFocus: [
      "Repro steps are numbered and minimal.",
      "Expected vs actual is unambiguous.",
      "Severity aligned to user impact.",
      "Do not invent environment data; ask at checkpoints.",
    ],
    skillSections: [
      {
        heading: "Ticket",
        bullets: [
          "Title from summary, scannable.",
          "Environment hints when known; mark unknown otherwise.",
          "Attachments/logs called out only when mentioned.",
        ],
      },
    ],
    commandSteps: [
      "Confirm form inputs with the operator.",
      "Minimize repro; list clarifications in [[PROGRESS]].",
      "Draft ticket markdown; justify severity in one line.",
      "Review gate before the operator files.",
    ],
    instructionAddendum: "Jira/GitHub issue markdown OK.",
    subagentMission:
      "You are the bug-report subagent. Produce triage-ready bug tickets.",
    subagentExpertise: ["QA writing", "Repro minimization"],
    outputFormat:
      "Clarifying questions, then title + repro + expected/actual + severity for operator review.",
  },
};
