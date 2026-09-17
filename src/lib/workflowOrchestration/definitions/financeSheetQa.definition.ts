import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const ORIENT_IN_WORKBOOK = `Read sheetUrl, sheetSummary, userQuestion, tabOrRange, and notesPath from the workflow form.

## Orient (this step only)
The operator opens sheetUrl in Chrome at the prior human checkpoint — verify the workbook is visible in the browser.
Note tabs, headers, units (USD, %), and time columns from what you can see.
Map userQuestion to the smallest set of tabs and ranges needed; honor tabOrRange when the operator will show that view next.
Use only visible cells — never invent metrics.
Summarize clarifying questions in [[PROGRESS]] when userQuestion or the layout is ambiguous.
Do not answer the main finance question yet in this step.`;

const ANALYZE_AND_ANSWER = `Continue from prior operator answers (see checkpoint responses above).

## Analyze and answer (this step only)
Focus on the tab and range the operator showed on screen.
Answer userQuestion using only cells visible in the browser-open Google Sheet.
Cite tab name and cell range (or row labels) for every number in the answer.
Flag formula errors, blanks, or mixed currencies instead of guessing.
Honor sheetSummary when interpreting P&L, budget vs actual, or forecast columns.
Lead with the direct answer, then a short supporting table and plain-language methodology (sum, delta, % change).
Stop before follow-up Q&A — the workflow will pause for the operator’s next questions.`;

const FOLLOW_UP_QA = `Continue from follow-up questions the operator asked at the last human checkpoint.

## Follow-up Q&A (this step only)
Keep using the same open sheet; re-read cells if tabOrRange or filters changed.
Answer each new question with the same citation rules as the main answer.
Append Q&A to notesPath when provided for session continuity.
Summarize what you answered in plain language for the operator’s final review checkpoint.
Do not close the browser tab — the operator owns navigation and Google login.`;

export const OFFICIAL_WORKFLOW_DEFINITION: OfficialWorkflowDefinition = {
  templateId: "finance-sheet-qa",
  version: 2,
  capabilityName: "Finance sheet Q&A",
  nodes: [
    buildOfficialWorkflowHumanNode(
      0,
      "Open the Google Sheet in Chrome",
      [
        "1. In Chrome, sign in to the Google account that can view the finance workbook.",
        "2. Open the sheetUrl from the workflow in a browser tab.",
        "3. Reply ready in the live terminal when the spreadsheet is fully loaded.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      0,
      "Orient in the workbook and clarify scope",
      ORIENT_IN_WORKBOOK,
    ),
    buildOfficialWorkflowHumanNode(
      1,
      "Show the right tab and range",
      [
        "1. Navigate to the tab or range in tabOrRange if one was specified.",
        "2. Scroll so the relevant tables and headers are visible on screen.",
        "3. Tell the agent if filters, hidden rows, or protected ranges block the view.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      1,
      "Analyze visible cells and answer userQuestion",
      ANALYZE_AND_ANSWER,
    ),
    buildOfficialWorkflowHumanNode(
      2,
      "Answer follow-up questions in the live terminal",
      [
        "1. Ask additional finance questions in the task composer or live terminal.",
        "2. Keep the same Google Sheet tab open while the agent analyzes.",
        "3. Reply when you are done asking follow-ups for this session.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      2,
      "Answer follow-up questions with citations",
      FOLLOW_UP_QA,
    ),
    buildOfficialWorkflowHumanNode(
      3,
      "Review cited answers before you close the sheet",
      [
        "1. Read the agent’s answer table and tab/range citations.",
        "2. Ask for corrections if a number or range looks wrong.",
        "3. Reply approve when you are satisfied and ready to close the sheet.",
      ].join("\n"),
    ),
  ],
};

export default OFFICIAL_WORKFLOW_DEFINITION;
