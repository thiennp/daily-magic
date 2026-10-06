# History contracts for S2 / S4 / S7 (Mac implements)

AW History · 2026-10-06 · docs-only. Softs defer. No History code in this note.

Sources: `COMBINED-DESIGN.md` Chat retention (S2/S4/S7, Q1/Q4/Q6); `history-chat-retention-note.md` C3–C6; tip `7340b434` on `/workspace/daily-magic-history-s5` (`history/`, `history/acks/`).

---

## S2 — resolver contract

### Today (tip `7340b434`)

| Export | Signature / return | Pure? | Notes |
|---|---|---|---|
| `resolveProjectDataDir` | `(projectId: string) => string` | pure path join | Throws `"invalid_project_id"` if `!isValidProjectComputerHistoryProjectId`. Returns `path.join(layout.projectDataDir, projectId)` → `<profileDir>/project-data/<projectId>/`. **Does not** read project folder or sync folder ref. |
| `ensureProjectDataTree` | `(projectId: string) => string` | FS | Calls `resolveProjectDataDir`, then `ensureDir0700` on: root, `history/`, `skills/`, `skills/_drafts/`, `skills/_tombstones/`, `skillgen/`. Returns root. |
| `isValidProjectComputerHistoryProjectId` | `(projectId: string) => boolean` | pure | Rejects non-string, empty/trim-mismatch, leading `.`, `/`, `\`, `..`. |
| `ensureDir0700` | `(dirPath: string) => void` | FS | `mkdirSync` recursive + `chmod` `PROJECT_HISTORY_DIR_MODE` (`0o700`). |
| `atomicWriteFile0600` | `(filePath, contents) => void` | FS | Temp+rename; `PROJECT_HISTORY_FILE_MODE` (`0o600`). |

Public-api: `resolveProjectDataDir`, `ensureProjectDataTree`, `isValidProjectComputerHistoryProjectId` already re-exported from `project-history/public-api/infrastructure.ts`. Path constants: `projectHistoryPaths.constant.ts` (`PROJECT_HISTORY_DIR_NAME = "history"`, `PROJECT_HISTORY_ACKS_DIR_NAME = "acks"`, `PROJECT_HISTORY_STATE_FILE_NAME = "state.json"`, modes 0700/0600).

### Required sync-root behavior (Q6 + S2 row)

| Rule | Contract |
|---|---|
| Root | Sync folder for this device if set; else `<profileDir>/project-data/<projectId>/`. |
| Default sync folder | `<projectFolder>/data/` (that device's project folder binding). |
| `.gitignore` | On create of the data root: write `.gitignore` with body `*`. Data root is never committed (Q6). |
| Modes | Dirs `0700`, files `0600` (`atomicWriteFile0600` / `ensureDir0700`). |
| Move | copy tree → per-file sha256 verify → switch resolver root → leave old tree renamed `.moved-<ts>` (no delete). |

### What Mac calls / what History exports

| Party | Obligation |
|---|---|
| **Mac** | Call **only** `resolveProjectDataDir` / `ensureProjectDataTree` as the project data root (one tree, no parallel roots). Orchestrate move (copy→verify→switch→`.moved-<ts>`). Write auto `.gitignore` when creating a sync root (or call a History helper once History adds it). |
| **History** | Keep those two names as the stable contract. Extend `resolveProjectDataDir` (or a thin wrapper with the same return type) so the root becomes sync-folder-or-fallback; extend `ensureProjectDataTree` so it still creates the same subtree under whatever root resolves. Pure path resolve stays free of picker/UI. |

### Out of scope for History

Picker UI, `/projects/select-folder?purpose=sync`, Windows/Linux pickers, writing `project_folder_refs kind='sync'`, Team > Computers toggle — Mac / AgentWitch (S1/S2).

---

## S4 — scrub + deny-list contract

### Scrub (S0-8 overlap) — already shipped

```ts
// scrubProjectHistorySkillgenSecrets.ts — public-api/infrastructure + types
scrubProjectHistorySkillgenSecrets(text: string): ScrubProjectHistorySkillgenSecretsResult

type ScrubProjectHistorySkillgenSecretsResult = {
  readonly scrubbed: string;
  readonly residualSecret: boolean;   // high-confidence secret remains after replace
  readonly replacementCount: number;
};
```

Shared S0-8 set via `scrubOutboundSecrets` / `hasResidualOutboundSecret` (`@agent-witch/shared/dispatch`); skillgen also strips emails → `[redacted-email]`. Companion: `projectHistorySkillgenTextHasResidualSecret(text)`.

**Mac:** run scrub on file **content** before enqueue and on apply. Reuse this function (or the S0-8 result it wraps) — do not invent a third regex set.

### Deny-list (path) — Mac enforces before enqueue + on apply

| Deny | Why | Cite |
|---|---|---|
| Secrets files (e.g. writer-api-secrets / keypair / pairing tokens) | never leave the box | Mac audit §9; S4 |
| `sync/` | local queue/manifest/settings | C5, S4 |
| `index/` | derived `index/store.db`, rebuildable | C3, S4 |
| `skillgen/` | per-machine budgets/metrics | C3, S4 |
| `*.db` | derived / shared SQLite | S4 |
| `.env*` | secrets | S4 |
| `*.pem` | keys | S4 |
| **`history/acks/`** | per-device local ack (`history/acks/<messageId>.json`); local-only | S5 tip `writeLocalChatAckRecord` ("Local-only (not synced)"); C3 |
| **`history/state.json`** | local History state machine mirror | C3 ("local, NOT synced"); `localProjectHistoryState.ts` |

Also do not sync chat message bodies that fail scrub (below). Files > `SYNC_MAX_FILE_BYTES` → skip + flag (S3; Mac).

### Residual secret → outcome shape

Scrub already returns `residualSecret`. Sync outcome (minimal; Mac may wrap):

| Field | Type | Meaning |
|---|---|---|
| `path` | string | relative path under data root |
| `action` | `"skip"` | not enqueued / not applied |
| `reason` | `"residual_secret"` \| `"deny_list"` \| `"too_large"` | |
| `residualSecret` | boolean | echo scrub result when reason is residual |
| `flagged` | true | always when skipped for secret/deny |

No sync of that path; flag for owner/status (S4: "residual secret → not synced, flagged").

---

## S7 — History summaries slice of sync

### Reservation (Q4; supersedes Part C `tasks/` sibling)

| Item | Contract |
|---|---|
| Path (reserved) | `history/summaries/<taskId>.json` under the S2 data root |
| Index kind | `summary` (same derived `index/store.db` as `message`; Mac builds index) |
| Writer | History, when B1/C1 land — scrubbed fields only; History confirmed ON |
| Sync | Yes, while History confirmed ON; B0 purge target (derived); stop on OFF (S9) |
| Until B1/C1 | **Stub only.** Mac must **not** invent a parallel `tasks/` tree or sync path. Do not enqueue under `tasks/`. |

S5 local store units already at tip (for context; message sync is S3/S5, not this stub):

| Path | Synced? | Writer |
|---|---|---|
| `history/<messageId>.json` (record v2: `version`, `threadKey`, `createdAt`, `senderLabel`, …) | yes (chat archive; Q1) | `writeProjectHistoryMessage` |
| `history/acks/<messageId>.json` (`deviceId`, `messageId`, `ackedAt`, `lastSeenAt`) | **no** (S4 deny) | `writeLocalChatAckRecord` |
| `history/state.json` | **no** (S4 deny) | `localProjectHistoryState` |

### Not History's sync write

| Slice | Owner | Note |
|---|---|---|
| Skills mirror `skills/<id>/` + `_tombstones/` | AWC pull per computer | **Not** this sync. `_drafts/` may sync (S7/S9). |
| Safety rules export `safety-rules/rules.json` | **Mac** | Export of `token-saver.db` pitfalls cache; History notes only. |
| Library/knowledge bodies `library/` | Mac + NRG | S7; outside History summaries stub. |

---

## Open questions

1. **Sync-folder injection into `resolveProjectDataDir`:** today the function takes only `projectId`. Exact Mac→History handoff (extra arg vs layout/settings read inside resolver) is not locked in code — History will add the hook; Mac should not fork a second root API meanwhile.
2. **Summary record fields:** path/kind reserved above; concrete JSON fields land with B1/C1 (scrubbed summary, outcome, timestamps, task id — Part C / old tasks note). No inventing fields in the sync engine before then.
3. **C5 vs S4 deny breadth:** C5 also lists `*key*` / `*token*` path globs; the S4 slice row lists the explicit set above (+ acks/state). Prefer the S4 row + acks/state as the Mac must-enforce minimum; confirm with Lead if C5 globs are also required at enqueue.
