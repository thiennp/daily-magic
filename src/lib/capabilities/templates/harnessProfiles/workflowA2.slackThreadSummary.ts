import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { SLACK_THREAD_SUMMARY_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowA2.slackThreadSummary.exampleRequest";
import { SLACK_THREAD_SUMMARY_OPERATOR_STEPS } from "@/lib/capabilities/templates/harnessProfiles/workflowA2.slackThreadSummary.operatorSteps";

export const SLACK_THREAD_SUMMARY_PRESET: PresetHarnessSeed = {
  id: "slack-thread-summary",
  name: "Slack thread summary",
  category: "Communication",
  description:
    "Turn a long Slack thread into a late-joiner summary — clarify ambiguities, then TL;DR, decisions, owners, and open questions you approve before posting.",
  exampleRequest: SLACK_THREAD_SUMMARY_EXAMPLE_REQUEST,
  operatorSteps: SLACK_THREAD_SUMMARY_OPERATOR_STEPS,
  profile: {
    ruleFocus: [
      "Decisions and owners beat play-by-play.",
      "Call out unresolved threads explicitly.",
      "Tailor depth to audience; default to busy teammate when audience is empty.",
      "Do not post to Slack — the operator copies after review.",
    ],
    skillSections: [
      {
        heading: "Parse the thread",
        bullets: [
          "Separate decisions from debate and side threads.",
          "Extract action items with owners when handles or names appear.",
          "Flag missing owners or ambiguous pronouns for the operator.",
        ],
      },
      {
        heading: "Summarize for Slack",
        bullets: [
          "TL;DR in two sentences max.",
          "Decisions with who decided when known.",
          "Action items with owners; open questions last.",
        ],
      },
    ],
    commandSteps: [
      "Confirm thread, audience, and goal with the operator.",
      "Parse thread; list clarifications in [[PROGRESS]].",
      "Draft Slack markdown aligned to goal and audience.",
      "Review gate before the operator posts.",
    ],
    instructionAddendum:
      "Slack-friendly markdown OK; posting stays with the operator.",
    subagentMission:
      "You are the Slack-summary subagent. Compress threads for late joiners with clear decisions, owners, and open loops.",
    subagentExpertise: [
      "Thread synthesis",
      "Decision logging",
      "Async team communication",
    ],
    outputFormat:
      "Clarifying questions, then TL;DR + decisions + actions + open questions for operator review.",
  },
};
