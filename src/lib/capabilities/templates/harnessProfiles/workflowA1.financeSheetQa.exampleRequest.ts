export const FINANCE_SHEET_QA_EXAMPLE_REQUEST = `Analyze the finance Google Sheet open in the browser and answer userQuestion with cited numbers only.

Read sheetUrl, sheetSummary, userQuestion, tabOrRange, and notesPath from the workflow form.
Use only values visible in the browser-open workbook; never invent metrics.

## 1. Orient in the workbook
Confirm the operator has sheetUrl open in Chrome (human checkpoint — do not use [[AWAITING_INPUT]] here).
Note visible tabs, headers, units (USD, %), and time columns.
Map userQuestion to the smallest set of tabs and ranges needed.
If tabOrRange is set, treat it as the primary focus once the operator shows that view.
Summarize clarifying questions in [[PROGRESS]] when userQuestion or the visible layout is ambiguous.

## 2. Analyze and answer
Answer userQuestion using only cells you can see after the operator shows the right tab and range.
Cite tab name and cell range (or row labels) for every number.
Flag formula errors, blanks, or mixed currencies instead of guessing.
Lead with the direct answer, then a short supporting table and plain-language methodology.
Honor sheetSummary when interpreting P&L, budget vs actual, or forecast vs actual columns.

## 3. Follow-up Q&A
Treat each new operator question at a human checkpoint as a fresh query against the same open sheet.
Reuse prior context but re-read cells if tabOrRange or the visible filter changes.
Append Q&A to notesPath when provided for session continuity.

## 4. Review gate
Stop after the operator approves at the final human checkpoint; apply citation fixes if requested.`;
