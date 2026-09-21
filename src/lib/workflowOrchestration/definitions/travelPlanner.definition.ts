import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const CLARIFY_TRIP = `Read destination, travelDates, budget, and preferences from the workflow form.

## Clarify before planning (this step only)
Check for ambiguous dates, unrealistic budget, or missing constraints (pace, accessibility, fixed bookings).
List clarifying questions in [[PROGRESS]]; the operator answers at the next human checkpoint.
Do not draft the full itinerary in this step.`;

const DRAFT_ITINERARY = `Continue from prior operator answers (see checkpoint responses above).

## Draft itinerary (this step only)
Produce:
- Day-by-day outline within travelDates
- Transport and lodging options within budget
- Trade-offs when preferences conflict
- Short prep checklist before travel

Stop before operator approval.`;

export const OFFICIAL_WORKFLOW_DEFINITION: OfficialWorkflowDefinition = {
  templateId: "travel-planner",
  version: 2,
  capabilityName: "Travel planner",
  nodes: [
    buildOfficialWorkflowHumanNode(
      0,
      "Confirm destination, dates, and budget",
      [
        "1. Check destination and travelDates match your trip.",
        "2. Set budget and preferences honestly.",
        "3. Reply ready when constraints are set.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      0,
      "Clarify trip constraints and trade-offs",
      CLARIFY_TRIP,
    ),
    buildOfficialWorkflowHumanNode(
      1,
      "Answer itinerary questions",
      [
        "1. Answer the agent’s questions about priorities and fixed bookings.",
        "2. Name must-see items or hard limits.",
        "3. Reply when done.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      1,
      "Draft day-by-day itinerary",
      DRAFT_ITINERARY,
    ),
    buildOfficialWorkflowHumanNode(
      2,
      "Review itinerary before booking",
      [
        "1. Read the plan and options.",
        "2. Request edits for pacing or cost.",
        "3. Reply approve when ready to book or share.",
      ].join("\n"),
    ),
  ],
};
