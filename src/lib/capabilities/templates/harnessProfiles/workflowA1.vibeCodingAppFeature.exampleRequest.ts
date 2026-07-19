export const VIBE_CODING_APP_FEATURE_EXAMPLE_REQUEST = `Add a feature to a local app from a vibe brief.

Resolve the working tree from appTarget:
- If it looks like a path (/ , ~ , .), use that directory.
- If it is an app name, find the matching checkout on this Mac.
- If appTarget is empty or ambiguous, stop with [[AWAITING_INPUT]] and ask for a path or app name.

Read featureBrief (desired vibe and outcome) and targetSurface (route, screen, or component).
Honor stackNotes when present; otherwise follow patterns already in the repo.
Use acceptanceNotes as the done-when checklist when present.

## 1. Clarify first (before any edits)
Ask clarifying questions about product intent, constraints, edge cases, and acceptance — only what you still need.
Use everyday language a non-technical operator can answer.
Stop with [[AWAITING_INPUT]] until the operator answers.
Do not propose a full implementation plan yet.

## 2. Architecture analysis (required)
Be explicit about:
- How this part of the app is put together today (in plain language)
- What else this change might affect (login, saved data, other screens, speed, cost, Mac agent, etc.)
- Risks and what we will not do

If architecture for this area is not yet defined or documented in-repo:
- Analyze it from the codebase
- Write it down in the project’s feature-knowledge / AGENTS / KNOWN_ISSUES (or equivalent)
- Store it so the next run can reuse it

If architecture notes already exist:
- Load and restate the relevant parts in [[PROGRESS]] (and briefly to the operator) in plain language
- Extend them only where this change adds new boundaries or side effects

## 2b. Architecture decisions for the operator (when needed or unclear)
If there is more than one reasonable approach, or the tradeoff is unclear, do not pick silently.
Present options in a markdown table a non-technical person can decide from.

Rules for the table:
- Short option names in everyday words (e.g. “Keep it simple on one screen” vs “Split into steps”)
- Avoid jargon; if a tech term is required, add a one-line plain meaning in parentheses
- Columns at least: Option | What it means for you | Upsides | Downsides | Best when
- Call out side effects in plain terms (e.g. “might slow the first load”, “needs you to re-login”, “only works when your Mac is on”)
- Recommend one default only as a suggestion; the operator decides
- Stop with [[AWAITING_INPUT]] and wait for the choice (or “go with your suggestion”)

After the operator chooses, record the decision in architecture / feature-knowledge docs so the next run stays consistent and re-mentions it.

## 3. Implement smallest vertical slice
After clarify + any architecture decisions:
- Implement the smallest slice that matches the vibe and existing patterns
- Prefer existing components, tokens, and conventions; no product-wide redesign
- Do not force-push, skip git hooks, or merge

## 4. Knowledge + regression (required before done)
- Add or update RAG / feature-knowledge: symptom, architecture notes, side effects, decisions table outcome, how this feature works
- Add or update automated tests that lock the behavior
- Re-index feature knowledge if the repo has that step
- Summarize in plain language: what changed, what we decided, tests added, how to try it

## 5. Review gate
Stop with [[AWAITING_INPUT]] for review; apply fixes if requested; final OK then stop.

Emit [[PROGRESS]] through: resolve → clarify → architecture → decide (if needed) → implement → knowledge/tests → verify.`;
