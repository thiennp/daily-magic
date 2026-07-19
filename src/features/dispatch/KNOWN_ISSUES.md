# Dispatch — known issues

## DISPATCH-001 — Localhost dev dashboard cannot exercise team delegation

**Symptom:** `AGENT_WITCH_DEV_DASHBOARD=1` supports self-dispatch and writer sessions, but not cross-user team dispatch or approval.

**Root cause:** Team dispatch requires authenticated sessions, Neon rows for `groups` / `group_memberships`, and published capabilities via `/api/dispatch/targets`. Dev mode uses a single synthetic dashboard user and in-memory agent runs.

**Fix:** Use two signed-in users in a shared company group for team-delegation QA. See `/showcases/agent-delegates-inside-your-company` and `public/dev-team-dispatch-demo.html` for mock UI screenshots.

**Regression test:** `teamDispatchShowcaseScreens.test.ts` (article + screen paths).

## DISPATCH-002 — Checkpoint modal showed raw `[[PROGRESS]]` partial output

**Symptom:** When the Mac agent paused for operator input, the modal rendered `partialOutput` in a `<pre>` with literal `[[PROGRESS]]` markers instead of readable progress title/detail.

**Fix:** Parse progress blocks with `formatAgentRunPartialOutputForDisplay` and render structured preview in `AgentRunPartialOutputPreview`.

**Regression test:** `formatAgentRunPartialOutputForDisplay.test.ts` (DISPATCH-002).

## DISPATCH-003 — Checkpoint modal was decision-hostile (wall of text, one textarea)

**Symptom:** Approval/git-strategy checkpoints showed markdown tables and branch status as raw text; compound questions used a single freeform field with no quick replies; “Later” was ambiguous.

**Fix:** Split compound questions, render tables/callouts/collapsible context, add quick-reply chips (pull-first / commit-as-is / request changes), and rename Later to “Remind me later” with helper copy.

**Regression tests:** `parseAgentRunPartialOutputSections.test.ts`, `resolveAgentRunInputQuickReplies.test.ts`, `splitAgentRunInputQuestion.test.ts` (DISPATCH-003).
