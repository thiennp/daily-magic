# History → skill Pitfalls + cross-bot flags (design for approval)

**Audience:** AW Lead, Arch  
**Status:** LOCKED v1 (Thien / AW Lead / NRG Lead approved). Implement local-only slice.  
**Scope:** History / skillgen only. Reuse the existing Project Pitfalls registry; do not invent a second registry.  
**Base tip:** `feat/awc-project-history-skillgen-land` @ `676faca9`  
**Artifact:** `/workspace/agentwitch/docs/history-pitfalls-design.md` (box-only)

---

## 0. What already exists (investigation)

| Concept | Where | Notes |
| --- | --- | --- |
| **Pitfall registry** | `src/features/project-pitfalls` + `@agent-witch/shared/pitfalls` | AWC is SoT: seed + project rows, hits, cap 64 active, bot lines `id\|avoidance` via `format=bot`. Feature flag `pitfalls` (default ON). |
| **Preflight bridge** | `resolvePreflightChecks` | Active `severity: "block"` pitfalls become `pit.*` checks. |
| **SKILL.md Pitfalls** | Design rev 2 + skillgen validate fixtures | Body section name only today; validate does **not** require a Pitfalls section. Design says failed episodes may feed that section when tied to a success. |
| **Cross-bot visibility today** | Pitfalls list API (`format=bot`) + preflight | Not a History “unsaved overdue”-style flag. Project feature flags are ON/OFF knobs, not warning banners. |
| **History → pitfalls auto-write** | Token-saver note 01 | Explicitly **out of scope** there. **No locked History design** for feeding the registry or drafting Pitfalls from failures. |

**Conclusion:** A registry exists. A History→Pitfalls / cross-bot-flag pipeline does **not**. This doc proposes the minimal History slice; implement only after GO.

---

## 1. Goal (one sentence)

When skillgen mines a **successful** episode, attach short, scrubbed lessons from **related local failures** into the draft’s `## Pitfalls` section, and raise a **local cross-bot flag** so other project bots can see “this project has recent history-learned pitfalls” without inventing a cloud content bus.

---

## 2. Data source (what counts as a failure)

**In scope (local, History ON, same project):**

| Source | When | What we take |
| --- | --- | --- |
| Skillgen terminal episodes | State in `FAILED_EXTRACT`, `FAILED_VALIDATE`, `QUARANTINED`, or `SKIPPED_FILTER` with a stored `reason` | `episodeId`, `state`, `reason`, scrubbed one-line lesson candidate (from reason + optional short scrubbed transcript snippet) |
| Sibling history messages in the same cursor window as a successful episode | Message text matches failure phrases (rules-only: `failed`, `error`, `abort`, `blocked`, `tests red`, …) **and** is not the success-marked stretch | Scrubbed one-line symptom |

**Out of scope for v1:**

- Cloud `project_pitfall_hits` as a write target from AWL (AWC remains SoT for registry upserts; History does not POST pitfalls in v1).  
- Tool/run stderr from non-history surfaces.  
- Ollama / embeddings / semantic “same task” clustering (optional later; same as skillgen rules-only default).  
- Auto-publishing skills or auto-upserting into AWC pitfalls.

---

## 3. Pure mapping → Pitfall entries

One pure function (proposed name): `mapHistoryFailuresToSkillPitfalls`.

**Input (scrubbed only):** failure candidates `{ id, kind, symptomRaw, causeRaw? }` + optional existing draft Pitfalls lines.  
**Output:** `{ skillPitfallLines: string[]; localEntries: HistoryLearnedPitfall[]; skipped: reason[] }`.

Rules (KISS):

1. Run every string through existing `scrubProjectHistorySkillgenSecrets`. Residual secret → drop candidate (never quarantine the whole successful episode for this side path).  
2. Collapse whitespace; cap symptom ≤ 120 chars, avoidance ≤ 280 (align with `PROJECT_PITFALL_LIMITS`).  
3. Shape for SKILL.md: `- **<symptom>:** <avoidance>` (3–8 lines max per draft).  
4. Shape for local store: `{ id: kebab slug, symptom, cause, avoidance, sourceEpisodeIds, contentHash, createdAt }` — **no message bodies**.  
5. Dedup by exact `contentHash` of `symptom|avoidance`; near-dup by normalized symptom equality.  
6. Do **not** invent `check.command` for AWC upsert in v1 (no fake preflight blocks from History).

Owner-LLM path (optional later soft): pass `skillPitfallLines` as hint into `OwnerLlmDraftWriter` so EXTRACT can merge them; v1 may **append** lines after validate if the draft’s Pitfalls section is missing/empty (pure merge helper).

---

## 4. On-disk layout (under `project-data/<projectId>/`)

Dirs **0700**, files **0600**, `atomicWriteFile0600`.

```text
skillgen/
  episodes.json          # existing
  budget.json            # existing
  metrics.jsonl          # existing
  learned-pitfalls.json  # NEW: array of HistoryLearnedPitfall (capped)
  flags.json             # NEW: local cross-bot flags (see §5)
```

No new top-level folder. No sqlite. Reuse skillgen scrub; never store unscrubbed transcript in these files.

---

## 5. Cross-bot flags (local, minimal)

**Not** a new AWC feature flag key. Mirror the spirit of the History unsaved overdue **local** signal:

`skillgen/flags.json`:

```json
{
  "historyLearnedPitfalls": {
    "active": true,
    "count": 3,
    "updatedAt": "ISO-8601",
    "summary": "3 recent pitfalls from project history (local)"
  }
}
```

- Written when `learned-pitfalls.json` gains entries; cleared when count is 0 after prune/OFF.  
- **Surface v1:** readable by AWL / future bot context helpers on the project machine (same pattern as reading local History state). No new wake storm.  
- **Non-goal v1:** cloud push of this flag; bots on other machines only see AWC pitfall registry if/when a later approved upsert lands.

If Lead prefers “cross-bot” = AWC pitfall registry visibility instead, that is Decision A below (v1 stays local-only until then).

---

## 6. Privacy

| Rule | Detail |
| --- | --- |
| Scrub first | Same regex scrub as skillgen step 5; drop residual-secret candidates |
| Metrics | Counts/ids/reasons only — never bodies (existing step 16) |
| Local files | Scrubbed fields only; 0600 |
| Cloud | No auto upsert to AWC pitfalls in v1; nothing auto-publishes skills |
| History OFF | Existing purge already deletes all of `skillgen/` (covers new files) |

---

## 7. History OFF

No change needed for Pitfalls: `purgeProjectHistoryOnOff` deletes `skillgen/`, which removes `learned-pitfalls.json` and `flags.json`. Mirror + tombstones unchanged.

Chat-retention rule (AW Lead, 2026-10-06): the OFF purge removes history-**derived** data only (`skills/_drafts/`, `skillgen/`). The local message archive `history/` (message records + `state.json`) is never deleted. AWL runs the purge from the History tick on a confirmed cloud `off` only (`reconcileProjectHistoryOffPurge`).

---

## 8. Named constants (proposed)

| Constant | Proposed value | Role |
| --- | --- | --- |
| `PROJECT_HISTORY_PITFALL_MAX_PER_DRAFT` | 8 | Max bullets appended to SKILL.md Pitfalls |
| `PROJECT_HISTORY_PITFALL_MAX_STORED` | 64 | Cap `learned-pitfalls.json` (align registry active cap) |
| `PROJECT_HISTORY_PITFALL_SNIPPET_CHARS` | 240 | Max scrubbed snippet before collapse |
| `PROJECT_HISTORY_PITFALL_FAILURE_STATES` | `FAILED_EXTRACT`, `FAILED_VALIDATE`, `QUARANTINED`, `SKIPPED_FILTER` | Episode states mined for lessons |
| `PROJECT_HISTORY_PITFALL_FLAG_KEY` | `historyLearnedPitfalls` | Key inside `flags.json` |

Reuse existing scrub + `PROJECT_PITFALL_LIMITS` for length caps where applicable.

---

## 9. FSM impact

**No new episode states.** Side path after a successful advance that reaches `AWAITING_REVIEW` (or when writing/updating a draft):

1. Collect failure candidates (pure).  
2. Map → pitfall lines / local entries (pure).  
3. IO: merge into draft Pitfalls if empty/short; upsert local `learned-pitfalls.json`; refresh `flags.json`.  
4. Metric: `pitfalls_attached` count only.

Does not block computerAck, EXTRACT budget (uses no owner tokens unless Lead later enables LLM merge), or publish.

---

## 10. Minimal implementation slice (after GO)

One function per file, DI into default skillgen runner (not a new tick):

| Function | Pure/IO |
| --- | --- |
| `collectProjectHistorySkillgenFailureCandidates` | IO read episodes/messages → candidates |
| `mapHistoryFailuresToSkillPitfalls` | pure |
| `mergeSkillPitfallsIntoDraftMarkdown` | pure |
| `read/writeProjectHistoryLearnedPitfalls` | IO |
| `read/writeProjectHistorySkillgenFlags` | IO |
| `attachProjectHistoryPitfallsAfterDraft` | IO orchestrator called from runner after draft write |

Tests: pure mapper + scrub drop; IO round-trip; OFF purge still removes files; runner DI with fake failures.

---

## 11. Locked decisions (v1)

1. **Cross-bot surface:** local `skillgen/flags.json` only. No AWC project-pitfalls upsert and no cloud calls.  
   - TODO (later, owner-approved): optional AWC proposal to upsert learned pitfalls into the project-pitfalls registry.  
2. **Draft merge:** append-merge into `## Pitfalls`, deduped by normalized text (trim, lowercase, collapse whitespace, strip trailing punctuation). Existing bullets keep order; new ones append. No LLM rewrite.  
3. **Failure sources:** skillgen terminal failure episodes only (`FAILED_EXTRACT`, `FAILED_VALIDATE`, `QUARANTINED`, `SKIPPED_FILTER`). No failure-phrase mining from success windows.

---

*Investigation verified against land tip `676faca9`, `history-skill-design.md` rev 2, `history-skill-pipeline.md`, and `design/token-saver-queue/01-pitfall-registry.md`.*
