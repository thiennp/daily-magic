# Dispatch — known issues

## DISPATCH-001 — Localhost dev dashboard cannot exercise team delegation

**Symptom:** `AGENT_WITCH_DEV_DASHBOARD=1` supports self-dispatch and writer sessions, but not cross-user team dispatch or approval.

**Root cause:** Team dispatch requires authenticated sessions, Neon rows for `groups` / `group_memberships`, and published capabilities via `/api/dispatch/targets`. Dev mode uses a single synthetic dashboard user and in-memory agent runs.

**Fix:** Use two signed-in users in a shared company group for team-delegation QA. See `/showcases/agent-delegates-inside-your-company` and `public/dev-team-dispatch-demo.html` for mock UI screenshots.

**Regression test:** `teamDispatchShowcaseScreens.test.ts` (article + screen paths).

## DISPATCH-002 — Checkpoint modal showed raw `[[PROGRESS]]` partial output

**Symptom:** When the computer agent paused for operator input, the modal rendered `partialOutput` in a `<pre>` with literal `[[PROGRESS]]` markers instead of readable progress title/detail.

**Fix:** Parse progress blocks with `formatAgentRunPartialOutputForDisplay` and render structured preview in `AgentRunPartialOutputPreview`.

**Regression test:** `formatAgentRunPartialOutputForDisplay.test.ts` (DISPATCH-002).

## DISPATCH-003 — Checkpoint modal was decision-hostile (wall of text, one textarea)

**Symptom:** Approval/git-strategy checkpoints showed markdown tables and branch status as raw text; compound questions used a single freeform field with no quick replies; “Later” was ambiguous.

**Fix:** Split compound questions, render tables/callouts/collapsible context, add quick-reply chips (pull-first / commit-as-is / request changes), and rename Later to “Remind me later” with helper copy.

**Regression tests:** `parseAgentRunPartialOutputSections.test.ts`, `resolveAgentRunInputQuickReplies.test.ts`, `splitAgentRunInputQuestion.test.ts` (DISPATCH-003).

## DISPATCH-004 — Checkpoint timeline missing steps after cross-node API

**Symptom:** Workflow checkpoint modal showed an incomplete step checklist (often a single step) while the run had more steps in Postgres.

**Root cause:** `listWorkflowStepRunsForWorkflowRunId` returned in-memory session rows whenever any existed, skipping Neon. A load-balanced instance that had loaded only one step (for example via `getWorkflowStepRunById`) never listed earlier steps.

**Fix:** Always load ordered rows from Neon and overlay same-index session records so fresh in-process updates win without hiding DB steps.

**Regression test:** `listWorkflowStepRunsForWorkflowRunId.test.ts` (DISPATCH-004).

## DISPATCH-005 — Input answer nobody remembered typing (8181f143)

**Symptom:** A paused run got an `input_respond` with a canned text ("Do not commit or push…") that nobody remembered sending.

**Root cause:** No app code makes or auto-sends that text; it came through `POST /api/agent-witch/dashboard/messages` from a signed-in browser. The modal is shown in every open tab, and it kept a typed answer when a new question replaced the old one.

**Fix:** Only an explicit Send with typed or picked text sends; Esc and backdrop only close. The modal is keyed by run, so a new question starts empty. The server logs each answer's run, length and browser (never the text).

**Regression test:** `AgentRunInputModal.explicitSend.test.ts` (DISPATCH-005).

## DISPATCH-006 — Esc closed underlying task dialogs; dismissed input modals could not be reopened

**Symptom:** Pressing Escape to close the "Agent needs your input" modal also closed the underlying New Task dialog. In addition, dismissing the modal left the user with no way to reopen it to provide the answer, permanently pausing the run.
**Fix:** Introduced a module-level stack for open modals so Esc only closes the top-most modal. Added a client store for pending input requests, allowing the run floater and the Home row to display an "Open question" button to reopen the modal via a custom DOM event. afae8216.

### 3945994e — Ask modal Context so far shows prompt rules / ANSI / markers

**Symptom:** "Context so far" showed harness lines (`Never use [[AWAITING_INPUT]]…`), mid-sentence fragments, and ANSI chrome (`[36muser [0m`).
**Fix:** `cleanAgentOutputForUser` (was `stripAgentRunCliNoise`) strips ANSI, drops harness instruction lines and truncated fragments, and ignores a lone echoed `user` line; section text also drops leftover `[[MARKER]]` tokens. Same path feeds collapsed and "Show full context".

### aedfe094 — one cleaner for every agent-output surface

**Fix:** `cleanAgentOutputForUser` is the single cleaner (ANSI, CLI chrome, harness rule lines + cut fragments, `[[MARKER]]` tokens). Ask card, progress feed (`stripAgentLiveProgressCliChrome`, progress-update parsing), terminal mirror (keeps markers + CLI preamble for its own mapper) and reports all call it. `cleanAgentOutputForUser.surfaces.test.ts` uses the screenshot strings.
