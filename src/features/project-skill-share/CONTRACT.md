# Share → Mac pull mirror contract v1

**One-liner:** On each AWL History tick, Share `pullPublishedProjectSkillsToMirror(projectId)` calls **listPublished first**; on list fail/throw/non-ok → **early return with zero History disk helper calls**. On success it decides `skip` | `fetch_write` | `remove`, fetches missing/changed bodies, writes `<profileDir>/project-data/<projectId>/skills/<skillId>/vNNNN.md` + `meta.json` **only via History helpers** and **only when** `sha256:`+hex equals AWC `contentHash`, and for locals **absent from the successfully fetched published set** calls History `tombstoneProjectSkill` (with `lastContentHash` from local meta when known). A list hit always proceeds to normal skip/fetch_write even if a tombstone exists (History write clears tombstone). Failures log and retry next tick — never block ack/delete.

## Ownership

| Owner         | Owns                                                                                                                                                           |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AWC**       | Store of record: published body ≤ 64KB + meta + contentHash                                                                                                    |
| **Share**     | `pullPublishedProjectSkillsToMirror`, AWC published source port, list/get ACL (owner / member / viewer for published); decide + call History tombstone for orphans |
| **History**   | AWL tick that calls pull; real `resolveProjectDataDir` / `writeProjectSkillVersion` / `readProjectSkillVersion` / `tombstoneProjectSkill` / `readProjectSkillTombstone` / `listProjectSkillIds` (dirs 0700 / files 0600); atomic mirror writes + tombstones |
| **Mac / AWL** | Profile dir layout; inject History port + AWC HTTP source when not in-process                                                                                  |

## Layout

```
<profileDir>/project-data/<projectId>/skills/<skillId>/vNNNN.md
<profileDir>/project-data/<projectId>/skills/<skillId>/meta.json
  { skillId, version, contentHash, updatedAt }
```

Hash: `sha256:` + lowercase hex of exact UTF-8 body bytes (no trim).

## Decide outcomes

| Outcome       | When                                                                 |
| ------------- | -------------------------------------------------------------------- |
| `skip`        | Local meta `contentHash` already equals AWC published hash           |
| `fetch_write` | On published set but local missing or hash differs (even if tombstone exists) |
| `remove`      | Local skill id present on disk but **absent** from a **successfully fetched** AWC published set |

`remove` → History `tombstoneProjectSkill({ projectId, skillId, lastContentHash, revokedAt? })`. Share never `unlink`s. Typed input that failed fetch cannot produce `remove`.

## Ports (Share-side until History SHIPs)

- `ProjectSkillHistoryPort` — stub reports History OFF (`PROJECT_SKILL_HISTORY_STUB_PORT`); stub `tombstoneProjectSkill` → `{ removed: false }`, `readProjectSkillTombstone` → `null`, `listProjectSkillIds` → `[]`.
- `ProjectSkillAwcPublishedSource` — `listPublished` / `getPublishedBody`; default `createDbProjectSkillAwcPublishedSource()` for in-process Neon; AWL injects HTTP.
- **No `removeProjectSkillVersion`** — orphans use tombstone only.

### `tombstoneProjectSkill({ projectId, skillId, lastContentHash, revokedAt? }) → { removed: boolean }`

- Idempotent (`removed: false` if already gone / nothing to clear).
- `lastContentHash` from local `meta.json` when known (via `listProjectSkillIds` refs).
- History clears skill mirror files and records the tombstone; a later `writeProjectSkillVersion` clears the tombstone.
- Rejects `_`-prefixed skillIds.

### `readProjectSkillTombstone({ projectId, skillId }) → { skillId, revokedAt, lastContentHash } | null`

- Share does **not** skip `fetch_write` based on tombstone presence when the skill is on a successful list.

## Pull safety

1. `listPublished` runs before any History disk helper used for mutation (`write` / `tombstone` / `read` on the mutation path / `listProjectSkillIds`).
2. List fail / throw / non-ok → `{ ok: false, skipped: false, skills: [] }` and **zero** disk helper calls.
3. `remove` only after a successful list, for local ids absent from that set.

## ACL (list / get published)

- **owner | member | viewer** — see published skills.
- Drafts / revoke / publish — owner or publisher (member); **viewer** never publishes or revokes.
- AWC membership rows today resolve to `member` (DB has no `viewer` yet); `viewer` is accepted by list/get predicates for future ACL / injected roles.

## Non-goals (v1)

- No tick implementation in Share (History owns tick).
- No direct filesystem writes **or deletes** from Share (History helpers only).
- No coupling to History cloud schema migrations (059–061 computer history) for skills pull.
- No `removeProjectSkillVersion` on the Share History port.
