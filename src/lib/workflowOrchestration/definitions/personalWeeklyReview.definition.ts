import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const PROBE_WINS_AND_PRIORITIES = `Read weekOf, wins, lessons, and priorities from the workflow form.

## Clarify before drafting (this step only)
Check whether wins are thin, lessons are vague, or priorities exceed three concrete items.
Ask focused questions in everyday language — no corporate coaching tone.
If wins were thin, note what drained or lifted the week; confirm in [[PROGRESS]] before drafting an energy check.

List only the clarifications you still need in [[PROGRESS]] — the operator answers at the next human checkpoint.
Do not write the full weekly review in this step.`;

const DRAFT_WEEKLY_REVIEW = `Continue from prior operator answers (see checkpoint responses above).

## Draft the weekly review (this step only)
Use weekOf to frame the period in one line.

Include:
- Wins: what actually moved forward (honest, not performative)
- Lessons: one behavior to keep or change — actionable, not vague
- Priorities: at most three concrete commitments for next week

Keep a private journal tone; no corporate speak.
If wins were thin, end with a short energy check (what to protect or change next week).

Stop before final operator review — they approve before saving or sharing.`;

export const OFFICIAL_WORKFLOW_DEFINITION: OfficialWorkflowDefinition = {
  templateId: "personal-weekly-review",
  version: 2,
  capabilityName: "Personal weekly review",
  nodes: [
    buildOfficialWorkflowHumanNode(
      0,
      "Confirm the week and your notes",
      [
        "1. Check weekOf matches the week you are reviewing.",
        "2. Skim wins, lessons, and priorities — add anything missing in plain language.",
        "3. Reply ready when the inputs feel honest enough to continue.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      0,
      "Probe wins, lessons, and priority gaps",
      PROBE_WINS_AND_PRIORITIES,
    ),
    buildOfficialWorkflowHumanNode(
      1,
      "Answer reflection prompts",
      [
        "1. Answer the agent’s questions without polishing for an audience.",
        "2. Say if a priority should drop or if a win was smaller than it sounds.",
        "3. Reply when you are done answering.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      1,
      "Draft wins, lessons, and next-week priorities",
      DRAFT_WEEKLY_REVIEW,
    ),
    buildOfficialWorkflowHumanNode(
      2,
      "Review your weekly review before saving",
      [
        "1. Read wins, lessons, priorities, and any energy check.",
        "2. Ask for edits if tone feels performative or priorities are too many.",
        "3. Reply approve when you are ready to save or share it yourself.",
      ].join("\n"),
    ),
  ],
};

export default OFFICIAL_WORKFLOW_DEFINITION;
