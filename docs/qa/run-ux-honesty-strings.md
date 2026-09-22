# Run UX honesty — locked AC + microcopy (Pimi)

**Status:** Magi GO — current lock before Linux M1  
**Surfaces:** existing Marketplace→Mac Run/live only  
**Owners:** Desi (chrome) · Devi (wire) · Testi (Magi scorecard)

## Acceptance

1. Never show Success / Finished while In progress or Working log empty / not attached.
2. One primary log/progress surface for the run.
3. Fallback / degraded ≠ success chrome.
4. Terminal chips only after real end: Success | Completed with fallback | Failed | Stopped | Timed out.
5. WORKING_ESTIMATE = soft; SESSION LIMIT = hard stop + stopped reason; pre-warn before hard stop.
6. Library / Job history / Reports terminal label matches outcome chip.

## Outcome chips (locked)

| State                            | Chip label              | Chrome                          |
| -------------------------------- | ----------------------- | ------------------------------- |
| Success                          | Success                 | success                         |
| Completed with fallback          | Completed with fallback | **warning** (not success)       |
| Failed                           | Failed                  | error                           |
| Waiting on you                   | Waiting on you          | neutral/attention               |
| In progress                      | In progress             | progress                        |
| Connecting                       | Connecting              | progress (log not attached yet) |
| Stopped (SESSION LIMIT / cancel) | Stopped                 | error/neutral-stop              |
| Timed out                        | Timed out               | error                           |

## Step suffixes (locked)

- `Skipped — {reason}`
- `Used fallback`
- `Waiting for output…`

## Fallback reason (locked)

`MISSING_ANTHROPIC_WRITER_API_KEY` / cli-fallback →  
**`Writer API key missing — ran via CLI fallback.`**

## Query aliases

- Pimi run UX honesty strings
- Connecting chip Agent Witch run progress
- Completed with fallback chip label

## Align with Desi

Chrome plan: `ux-review/DESI-run-ux-honesty-redesign.md` — must not contradict this string lock. If conflict, this file wins for product meaning.
