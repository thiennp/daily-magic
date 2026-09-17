import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const FINANCE_SHEET_QA_OPERATOR_STEPS: readonly OperatorStepDefinition[] =
  [
    {
      id: "finance-sheet-qa-operator-open-sheet",
      title: "Open the Google Sheet in Chrome",
      content: [
        "1. In Chrome, sign in to the Google account that can view the finance workbook.",
        "2. Open the sheetUrl from the workflow in a browser tab.",
        "3. Reply ready in the live terminal when the spreadsheet is fully loaded.",
      ].join("\n"),
    },
    {
      id: "finance-sheet-qa-operator-focus-range",
      title: "Show the right tab and range",
      content: [
        "1. Navigate to the tab or range in tabOrRange if one was specified.",
        "2. Scroll so the relevant tables and headers are visible on screen.",
        "3. Tell the agent if filters, hidden rows, or protected ranges block the view.",
      ].join("\n"),
    },
    {
      id: "finance-sheet-qa-operator-clarify",
      title: "Answer follow-up questions in the live terminal",
      content: [
        "1. Ask additional finance questions in the task composer or live terminal.",
        "2. Keep the same Google Sheet tab open while the agent analyzes.",
        "3. Reply when you are done asking follow-ups for this session.",
      ].join("\n"),
    },
    {
      id: "finance-sheet-qa-operator-review",
      title: "Review cited answers before you close the sheet",
      content: [
        "1. Read the agent’s answer table and tab/range citations.",
        "2. Ask for corrections if a number or range looks wrong.",
        "3. Reply approve when you are satisfied and ready to close the sheet.",
      ].join("\n"),
    },
  ];
