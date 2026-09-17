import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const FRAME_SCOPE_AND_CLARIFY = `Read topic, audience, questions, and sources (optional) from the workflow form.

## Frame scope and clarify (this step only)
Restate topic and audience in one plain-language paragraph.
List which questions are clear vs still ambiguous.
If sources is empty or thin, say what would raise confidence (web, docs, local files).
Ask only missing clarifying questions in everyday language.
Summarize questions in [[PROGRESS]]; the operator answers at the next human checkpoint.
Do not write the full brief yet.`;

const SYNTHESIZE_BRIEF = `Continue from prior operator answers (see checkpoint responses above).

Use provided sources when present; label confidence when evidence is thin.
Map findings to each question in questions.
Keep hypotheses separate from verified findings.

Deliver:
- Executive summary (3–5 bullets for audience)
- Findings per question with confidence labels
- Open questions and gaps
- Suggested next research steps

Stop before final operator review — the workflow will pause for approval.`;

export const OFFICIAL_WORKFLOW_DEFINITION: OfficialWorkflowDefinition = {
  templateId: "research-brief",
  version: 2,
  capabilityName: "Research brief",
  nodes: [
    buildOfficialWorkflowHumanNode(
      0,
      "Confirm topic, audience, and questions",
      [
        "1. Check topic, audience, and questions match what you need answered.",
        "2. Paste sources now if you already have them (optional).",
        "3. Reply ready when the brief goal is clear enough to continue.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      0,
      "Frame scope and gather clarifying questions",
      FRAME_SCOPE_AND_CLARIFY,
    ),
    buildOfficialWorkflowHumanNode(
      1,
      "Answer clarifying questions and add sources",
      [
        "1. Answer the agent’s questions in plain language.",
        "2. Add or refine sources if the agent asked for them.",
        "3. Reply when you are done answering.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      1,
      "Synthesize findings into the research brief",
      SYNTHESIZE_BRIEF,
    ),
    buildOfficialWorkflowHumanNode(
      2,
      "Review the research brief before you share it",
      [
        "1. Read the summary, findings, gaps, and next steps.",
        "2. Ask for fixes if something feels wrong or overconfident.",
        "3. Reply approve when the brief is ready to use.",
      ].join("\n"),
    ),
  ],
};

export default OFFICIAL_WORKFLOW_DEFINITION;
