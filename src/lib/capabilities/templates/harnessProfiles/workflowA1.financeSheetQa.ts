import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { FINANCE_SHEET_QA_OPERATOR_STEPS } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.financeSheetQa.operatorSteps";

export const FINANCE_SHEET_QA_PRESET: PresetHarnessSeed = {
  id: "finance-sheet-qa",
  name: "Finance sheet Q&A",
  category: "Finance",
  description:
    "Analyze a finance Google Sheet open in your browser and answer questions with numbers cited from the visible workbook.",
  exampleRequest:
    "Read the Google Sheet open in the browser. Answer userQuestion using only figures you can see in the sheet. Cite tab names and cell ranges. Ask one clarifying question if the data is missing or ambiguous.",
  operatorSteps: FINANCE_SHEET_QA_OPERATOR_STEPS,
  profile: {
    ruleFocus: [
      "Use only values visible in the browser-open Google Sheet; never invent metrics.",
      "Cite tab name and cell range (or row labels) for every number in the answer.",
      "Honor sheetSummary and tabOrRange when interpreting the workbook.",
      "Flag formula errors, blanks, or mixed currencies instead of guessing.",
      "Use [[AWAITING_INPUT]] when the sheet is not open or the question needs a narrower range.",
    ],
    skillSections: [
      {
        heading: "Orient in the workbook",
        bullets: [
          "Confirm sheetUrl is open and note workbook tabs from the browser view.",
          "Read headers, units (USD, %), and time columns before calculating.",
          "Map userQuestion to the smallest set of tabs and ranges needed.",
        ],
      },
      {
        heading: "Analyze finance data",
        bullets: [
          "Compute totals, variances, growth, and run-rate only from visible cells.",
          "Compare periods side by side when the sheet layout supports it.",
          "Call out assumptions when the sheet mixes forecast and actuals.",
        ],
      },
      {
        heading: "Answer clearly",
        bullets: [
          "Lead with the direct answer, then show the supporting figures in a short table.",
          "Explain methodology in plain language (sum, average, delta, % change).",
          "Offer one optional follow-up chart or pivot suggestion when helpful.",
        ],
      },
      {
        heading: "Follow-up questions",
        bullets: [
          "Treat each new user question as a fresh query against the same open sheet.",
          "Reuse prior context but re-read cells if the user changes tabOrRange.",
          "Append Q&A to notesPath when provided for session continuity.",
        ],
      },
    ],
    commandSteps: [
      "Verify the finance Google Sheet is open in the browser.",
      "Locate tabs and ranges relevant to userQuestion.",
      "Extract numbers and labels needed for the analysis.",
      "Compute results with cited sources for every figure.",
      "Present the answer and invite the next finance question.",
    ],
    instructionAddendum:
      "The spreadsheet must stay open in the browser; the operator owns Google login and navigation.",
    subagentMission:
      "You are the finance sheet Q&A subagent. Analyze the visible Google Sheet and answer user questions with cited numbers.",
    subagentExpertise: [
      "Spreadsheet literacy",
      "P&L and budget variance reads",
      "Cited numeric answers",
    ],
    outputFormat:
      "Answer paragraph, supporting table with tab/range citations, assumptions, and optional follow-up question.",
  },
};
