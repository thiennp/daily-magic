import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const ALIGN_AND_DRAFT = `Read subject, gradeLevel, topicStandard, classDuration, and materialsPath from the workflow form.

## Align objectives and pacing (this step only)
Confirm objectives match topicStandard at a readable level for gradeLevel.
Respect classDuration including transitions; note prerequisites students may need.
If materialsPath is set, skim that folder on this Mac for rubrics or prior units; otherwise prefer low-prep activities.
Summarize assumptions and any open questions in [[PROGRESS]] for the operator — do not use [[AWAITING_INPUT]]; the workflow pauses at human checkpoints.

## Draft timed agenda (this step only)
Write 2–3 measurable objectives, a minute-by-minute flow (hook, instruction, practice, exit ticket) inside classDuration, a materials list, differentiation, a formative check, and optional homework or extension.
Present the full draft in [[PROGRESS]] for approval at the next checkpoint.`;

const FINALIZE_AND_REFLECT = `Continue from the operator’s approval checkpoint responses (including any revision requests).

## Finalize the teach-ready plan (this step only)
Apply requested edits to objectives, timing, activities, and assessment.
Output a clean plan: objectives, timed agenda, materials, differentiation, exit ticket.

## Reflection prompts (this step only)
Add brief post-lesson reflection prompts the teacher can use after they deliver the class.
Do not access LMS or gradebook — classroom delivery stays with the teacher.
Stop before the deliver checkpoint; summarize what to print or project in [[PROGRESS]].`;

export const OFFICIAL_WORKFLOW_DEFINITION: OfficialWorkflowDefinition = {
  templateId: "teacher-lesson-plan",
  version: 2,
  capabilityName: "Teacher lesson plan",
  nodes: [
    buildOfficialWorkflowHumanNode(
      0,
      "Confirm standards and class constraints",
      [
        "1. Verify subject, gradeLevel, and topicStandard against your syllabus.",
        "2. Open materialsPath on your Mac if you have prior units or rubrics.",
        "3. Reply ready when classDuration and classroom constraints are final.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      0,
      "Align standards and draft the lesson plan",
      ALIGN_AND_DRAFT,
    ),
    buildOfficialWorkflowHumanNode(
      1,
      "Approve the lesson plan",
      [
        "1. Review objectives, activities, timing, and assessment for your class.",
        "2. Reject activities that need unavailable materials or unsafe setups.",
        "3. Reply approve when you will teach from this plan.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      1,
      "Finalize plan and add reflection prompts",
      FINALIZE_AND_REFLECT,
    ),
    buildOfficialWorkflowHumanNode(
      2,
      "Deliver the lesson on your side",
      [
        "1. Print, project, or share materials with students as you normally do.",
        "2. The agent does not access your LMS or gradebook.",
        "3. Ask the agent to save a short reflection prompt for after class.",
      ].join("\n"),
    ),
  ],
};

export default OFFICIAL_WORKFLOW_DEFINITION;
