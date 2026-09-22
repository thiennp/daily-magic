# Desi — Run UX honesty (Marketplace/Mac workflow)

**GO:** Magi · **Strings:** Pimi lock 2026-09-22 · **Wire:** Devi · **Existing surface only**

Authoritative product strings: `docs/qa/run-ux-honesty-strings.md` (Pimi wins on meaning).

## Pimi outcome chips (locked)

| State                   | Chip label              | Chrome                                      |
| ----------------------- | ----------------------- | ------------------------------------------- |
| Connecting              | Connecting              | progress (log not attached yet)             |
| Success                 | Success                 | success                                     |
| Completed with fallback | Completed with fallback | **warning** (not success)                   |
| Failed                  | Failed                  | error                                       |
| Waiting on you          | Waiting on you          | neutral/attention                           |
| In progress             | In progress             | progress (**never Finished**)               |
| Stopped                 | Stopped                 | error/neutral-stop (SESSION LIMIT / cancel) |
| Timed out               | Timed out               | error/neutral-stop                          |

Never Success or Finished while Connecting / In progress / empty Working.

## Pimi step suffixes (locked)

- `Skipped — {reason}`
- `Used fallback`
- `Waiting for output…`

## Pimi fallback reason (locked)

`Writer API key missing — ran via CLI fallback.`

## Desi chrome (matches Pimi)

### Step states → UI

| Step state | Icon          | Body                                           |
| ---------- | ------------- | ---------------------------------------------- |
| pending    | hollow        | muted step name                                |
| active     | spinner       | step name + `Waiting for output…` if no tokens |
| done       | green check   | step name + optional 1-line result             |
| skipped    | dashed + chip | step name + `Skipped — {reason}`               |
| failed     | red X         | step name + reason                             |
| fallback   | amber         | step name + `Used fallback`                    |

**Rules:** Never green-check + empty. Finished/Success only on true PASS. Working skipped/failed → not Success. One log under Expand; card/summary = chip + 1–2 human lines.

### Connecting vs In progress (Pimi locked 2026-09-22)

| Phase                | Chip               | Chrome                            |
| -------------------- | ------------------ | --------------------------------- |
| Log not attached yet | **Connecting**     | progress (never Finished/Success) |
| Work running         | **In progress**    | progress                          |
| Human gate           | **Waiting on you** | attention                         |

**Full chip set (locked):** Connecting | In progress | Waiting on you | Success | Completed with fallback (warning) | Failed | Stopped | Timed out.

Wire: live terminal `starting` → Connecting; `streaming` (active work) → In progress (`resolveAgentRunHonestyOutcome`).

### WORKING_ESTIMATE vs SESSION LIMIT (prior P0 lock, still apply)

- Soft past estimate: `Past working estimate` / can keep going until session limit
- Pre-warn: `Approaching session limit` / hard stop coming
- Hard stop: `Session limit reached` → outcome chip **Stopped** (not Failed unless eng distinguishes cancel vs limit)

### cli-fallback example

1. Preparing — done
2. Working — `Used fallback` + reason line above
3. Outcome chip — **Completed with fallback** (warning), never Success
4. Log once under Expand

## Acceptance (Pimi)

- Chip matches lifecycle; no Success while Connecting / In progress / empty Working
- Completed with fallback = warning + locked reason (or step Used fallback)
- One primary log; suffixes on steps only
- Fallback never Success chrome
- Reports terminal label matches chip
