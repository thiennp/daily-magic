# Run UX honesty — locked AC + microcopy (Pimi)

**Status:** Magi GO — authoritative product strings (wins over Desi on meaning)  
**Surfaces:** Marketplace→Mac Run / live progress only

## Acceptance

1. Never **Finished** / **Success** while **Connecting**, **In progress**, or Working log empty / not attached.
2. One primary log/progress surface for the run.
3. Fallback / degraded ≠ success chrome.
4. Terminal chips only after real end: **Success** | **Completed with fallback** | **Failed** | **Stopped** | **Timed out**.
5. WORKING_ESTIMATE = soft; SESSION LIMIT = hard stop + reason; pre-warn before hard stop.
6. Library / Job history / Reports terminal label matches live outcome chip.

## Outcome chips (locked — use exactly)

| Chip label              | Chrome    |
| ----------------------- | --------- |
| Connecting              | progress  |
| In progress             | progress  |
| Waiting on you          | attention |
| Success                 | success   |
| Completed with fallback | warning   |
| Failed                  | error     |
| Stopped                 | stop      |
| Timed out               | stop      |

Code labels: `src/lib/dispatch/agentRunHonestyCopy.constant.ts`  
Chrome roles: `src/lib/dispatch/agentRunHonestyChipChrome.constant.ts`

### Connecting vs In progress (locked)

| Phase                      | Chip           | Chrome    |
| -------------------------- | -------------- | --------- |
| Log not attached yet       | Connecting     | progress  |
| Active work (log attached) | In progress    | progress  |
| Human gate                 | Waiting on you | attention |

Wire: live terminal `starting` → Connecting; `streaming` → In progress.

## Step suffixes (locked)

- `Skipped — {reason}`
- `Used fallback`
- `Waiting for output…`

## Fallback (locked)

`MISSING_ANTHROPIC_WRITER_API_KEY` / cli-fallback →  
**Writer API key missing — ran via CLI fallback.**

## Query aliases

- Pimi run UX honesty strings
- Connecting chip Agent Witch run progress
- Completed with fallback chip label
- Run outcome chip chrome progress attention stop

## Related

Desi chrome plan: `ux-review/DESI-run-ux-honesty-redesign.md` — if conflict, **this file wins** for product meaning.

**Last reviewed:** 2026-09-22
