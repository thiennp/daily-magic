# Project sync module — design SPEC

**Product:** AgentWitch (one word)  
**Owner:** AgentWitch Product (design/spec only)  
**Ask:** Thien via NRG Lead + AW Lead · 2026-10-07 ~12:32–12:33 CEST · **HARD amend Neon no-bloat ~12:36**  
**Status:** SPEC only — **no app code, no branches, no pushes, no PRs, no build until light Arch SHIP** (AW Lead → Arch review 5).  
**Repo:** `thiennp/daily-magic`  
**Scout:** box `/workspace/daily-magic` · `origin/main` tip `59536574` (C1 on tip); Neon tip `579b18ff` on `fix/awc-history-neon-agent-runs-r1` (cited LIVE by Lead; not yet ancestor of this box’s `origin/main`).

**Reads (do not restate):** `project-tasks/CLAUDE-BRIEF.md` + `EN-PASS.md`; `chat-retention/` (DESIGN, NEON-PRUNE-AND-SYNC, indexeddb-scout, computer-sync-relay); `local-cli-project-agents/` cache-layer / history-chat-retention / COMBINED-DESIGN; `task-assignment-api/entry-points-and-unified-api-v1.md` (§3.7 FSA, proposed `project_tasks`); `pricing/COST-CONTROL-API.md` (History `owner_enable` **not** gated by `cloudMessageStorage`).

---

## HARD — Neon must NOT bloat (Thien 2026-10-07 ~12:36 CEST)

**LOCKED.** Any design or build that puts full task/history/body into Neon is out of scope and fails review.

| Neon MAY store                                                                                                                             | Neon MUST NOT store                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| Meta only: **id**, assistant/bot membership ref, **status**, **timestamps**, **version**, **branch/worktree refs** (names/ids for list UI) | Full task body, prompt, timeline events, history messages, report text, logs, attachments, skill payloads |
| **Package / plan counts** (capacity hints)                                                                                                 | Full session transcripts or AI-session blobs                                                              |

- **Full payloads** live on **AWL (project computer)** and may be **cached in AWC IndexedDB** for the signed-in browser. Never promote IDB/local bodies up to Neon.
- **Purge / TTL / caps** on Neon meta are required (align chat-retention newest-300 + computer-ack prune; Tasks meta gets its own row caps — see § rollout). Zero uncapped meta growth.
- **Load older prefers local:** page order stays **IDB → local AWL (if live) → Neon meta →** `project_computer_offline` / "Connection to the project computer was lost". Neon is the thin fallback, not the source of truth.

## 0. Summary

Extract the **live Messenger Load older pipeline** into one reusable sync module. Add only two thin new layers: **AWC IndexedDB cache** (genericize Soft tip IDB) and **versioned reconcile on local connect** (History). Do **not** invent a greenfield stack.

| Goal                                                                                            | Non-goal                                                     |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| One module + per-table adapters (Tasks first)                                                   | Rewrite local page reader / Neon pager / cursor              |
| Neon = **meta + package counts only**; local AWL + IDB = full payloads; local **authoritative** | Full task/history/body in Neon; uncapped Neon meta           |
| Shared paging: IDB → local (if live) → Neon meta → lost                                         | Hide live Marketplace / Connect / Automations / Download AWL |
| Exact offline EN (Dispatch constant)                                                            | Build / land before Arch SHIP                                |
| Reuse `entryKind: "message" \| "session"` cursor space                                          | New cursor schema in v1                                      |

Thien GO to build only after Arch SHIP.

---

## 1. Existing live pipeline (cite + map)

### 1.1 LIVE tips / commits

| Piece                      | SHA        | Subject                                                                           | Role                                                                                                                                                         |
| -------------------------- | ---------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **History C1**             | `59536574` | `feat(awl): C1 History AI sessions store + timeline merge`                        | Local AI-session records under `tasks/<agentRunId>.json`; merge into local page (`entryKind: "session"`, `kind: "ai.session"`, cursor id = raw `agentRunId`) |
| History local page         | `7a6bc425` | `feat(awl): History local page for Messenger Load older`                          | `readProjectHistoryMessagesPage` / alias `loadOlderProjectHistoryMessages`                                                                                   |
| Dispatch Load older        | `3cee071b` | `feat(awc): messenger load-older — newest-first + Neon page + offline error`      | Neon keyset page + `resolveProjectMessengerLoadPage` + `project_computer_offline`                                                                            |
| Wire local                 | `83c52eb4` | `feat(awc): wire Load older local read to History public-api`                     | `loadProjectMessengerOlderFromLocal` → History public-api; shared cursor codec                                                                               |
| Human UI Load older        | `d06476dc` | `feat(awc): Messenger newest-first + Load older + lost-connection state`          | Timeline header + hook + parse offline                                                                                                                       |
| Soft IDB                   | `93d6a5eb` | `feat(awc): browser IndexedDB chat persistence for messenger`                     | `messengerChatStoreIdb` (`awc-chat` v1) — Soft tip `76e1b8c9` lineage said LIVE                                                                              |
| **Dispatch Neon sessions** | `579b18ff` | `feat(awc): History Load older — Neon agent_runs as session entries (whole-only)` | `loadProjectMessengerNeonAgentRunsPage` + `mergeProjectMessengerNeonTimelinePage`; whole thread only                                                         |

Locked chat-retention rules stay: Neon never deletes chats outright; prune only past newest-300 with ≥1 computer ack (`NEON-PRUNE-AND-SYNC.md`). History `owner_enable` stays independent of `cloudMessageStorage` (`COST-CONTROL-API.md`).

### 1.2 Existing → module API

| Live file:export                                                                                                                                            | Module responsibility                                                                | Keep / wrap                                                                                |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `apps/live/features/project-history/internal/core/readProjectHistoryMessagesPage.ts` → `readProjectHistoryMessagesPage` / `loadOlderProjectHistoryMessages` | **Local page reader** (AWL)                                                          | Keep; become History adapter’s `pageLocal`                                                 |
| `apps/live/features/project-history/internal/core/mapAiSessionRecordToTimelineEntry.ts` → `mapAiSessionRecordToTimelineEntry`, `aiSessionMatchesThreadKey`  | Local session → timeline row                                                         | Keep; Tasks adapter reuses for session rows                                                |
| `apps/live/features/project-history/internal/core/projectHistoryTimelineCursor.ts` → `encode*` / `decode*`                                                  | Opaque cursor `{ t, id }` base64url                                                  | **Keep as shared cursor**; module re-exports — no new schema                               |
| `src/lib/projects/acl/messaging/messenger/projectMessengerCursor.ts` → `encodeProjectMessengerCursor` / `decodeProjectMessengerCursor`                      | AWC re-export of History cursor                                                      | Keep thin re-export                                                                        |
| `src/lib/projects/acl/messaging/messenger/detectProjectMessengerLocalLive.ts` → `detectProjectMessengerLocalLive`                                           | Connection probe (hub + registry)                                                    | Keep; module **connection-state** input                                                    |
| `src/lib/projects/acl/messaging/messenger/loadProjectMessengerOlderFromLocal.ts` → `loadProjectMessengerOlderFromLocal`                                     | Dispatch→History boundary                                                            | Keep as Dispatch wrapper calling History `pageLocal`                                       |
| `src/lib/projects/acl/messaging/messenger/loadProjectMessengerNeonThreadPage.ts` → `loadProjectMessengerNeonThreadPage`                                     | Neon messages page                                                                   | Keep; messages adapter `pageNeon`                                                          |
| `…/loadProjectMessengerNeonAgentRunsPage.ts` (`579b18ff`) → `loadProjectMessengerNeonAgentRunsPage`                                                         | Neon agent_runs as sessions                                                          | Keep; sessions / Tasks meta page                                                           |
| `…/mergeProjectMessengerNeonTimelinePage.ts` (`579b18ff`) → `mergeProjectMessengerNeonTimelinePage`                                                         | Merge Neon message+session slices                                                    | Keep inside Neon adapter path                                                              |
| `…/mapAgentRunToMessengerTimelineEntry.ts` (`579b18ff`) → `mapAgentRunToMessengerTimelineEntry`                                                             | Neon run → timeline (scrubbed summary; never `result_output`)                        | Keep                                                                                       |
| `…/resolveProjectMessengerLoadPage.ts` → `resolveProjectMessengerLoadPage`, `PROJECT_MESSENGER_COMPUTER_OFFLINE_ERROR`                                      | **Pager core:** merge local+Neon, `page.source`, offline when exhausted + !localLive | **Extract / rename to generic pager**; Messenger becomes first caller                      |
| `…/openProjectMessengerThread.ts` → `openProjectMessengerThread`                                                                                            | Orchestrator: live → local+Neon → resolve                                            | Thin shell over module `loadPage`                                                          |
| `src/features/projects/messenger/utils/messengerChatStoreIdb.ts` → `messengerChatStoreIdb`                                                                  | IDB read/write chat                                                                  | **Generalize** into module IDB store; Messenger adapter keeps chat store names             |
| `…/fetchMessengerThreadPersisted.ts`                                                                                                                        | GET + IDB write-through                                                              | Pattern for IDB fill on every successful page                                              |
| `…/hooks/useAwcProjectMessengerThread.ts` → `loadOlder` + offline flag                                                                                      | UI FSM consumer                                                                      | Stay Human UI; call module pager                                                           |
| `…/AwcMessengerTimelineLoadHeader.tsx`                                                                                                                      | Load older / offline chrome                                                          | Reuse pattern for Tasks tab                                                                |
| `…/awcProjectMessengerCopy.constant.ts` → `loadOlder`, `projectComputerOffline`                                                                             | Copy                                                                                 | Tasks uses exact Dispatch offline string (§4); Soft align Messenger UI copy later (open Q) |

**Cursor (LOCKED v1):** opaque `base64url(JSON({ t: createdAtISO, id }))`. Timeline discriminator stays `entryKind?: "message" | "session"` (omit = message). Do not invent a third kind or a new cursor envelope for v1.

**Offline (LOCKED):** code `project_computer_offline`; message from Dispatch:

> Connection to the project computer was lost.

(`PROJECT_MESSENGER_COMPUTER_OFFLINE_ERROR` — period on the wire is OK; Tasks EN PASS / brief needle is the same sentence.)

**`page.source`:** `"local" | "neon" | "mixed" | "exhausted"` — keep.

---

## 2. Target module API (extract, don’t rewrite)

Proposed home (AWC):

```
src/features/projects/sync/
  projectSync.types.ts          # cursor, page meta, offline error, connection state
  projectSyncPager.ts           # genericize resolveProjectMessengerLoadPage
  projectSyncConnection.ts      # FSM over detectProjectMessengerLocalLive (+ reconcile flag)
  projectSyncIdb.ts             # one IDB DB per signed-in user; object stores per tableId
  projectSyncReconcile.ts       # thin client hook that calls History reconcile when local_live
  adapters/
    messengerTimelineAdapter.ts # wrap live messenger fns (messages + sessions)
    projectTasksAdapter.ts      # Adapter #1
```

AWL / History:

```
apps/live/features/project-history/internal/core/
  readProjectHistoryMessagesPage.ts   # unchanged contract
  reconcileProjectSyncOnConnect.ts    # NEW — versioned reconcile (History owns)
apps/live/features/project-history/public-api/
  infrastructure.ts                   # export reconcile + existing loadOlder*
```

### 2.1 Generic loadPage (maps from live resolve)

```ts
// TypeScript-ish — pure where possible
type SyncCursor = { t: string; id: string }; // same as ProjectHistoryTimelineCursor
type PageSource = "local" | "neon" | "mixed" | "exhausted" | "idb";

type SyncPageMeta = {
  beforeCursor: string | null;
  hasMore: boolean;
  source: PageSource;
  localLive: boolean;
};

type SyncOfflineError = {
  code: "project_computer_offline";
  message: "Connection to the project computer was lost.";
};

/** Extract of resolveProjectMessengerLoadPage — add optional idbEntries prepend. */
loadPage(input: {
  idbEntries: readonly Entry[];
  localEntries: readonly Entry[];
  localHasMore: boolean;
  neonEntries: readonly Entry[];
  neonHasMore: boolean;
  localLive: boolean;
  beforeRequested: boolean;
  limit: number;
}): { entries; page: SyncPageMeta; error?: SyncOfflineError };
```

**Order (newest-first):** merge IDB + local + Neon by `(createdAt DESC, id DESC)`; prefer **local over Neon over IDB** on same key; slice to `limit`; offline error only when `beforeRequested && !localLive && merged empty` (same as today).

**Page size:** reuse `PROJECT_MESSENGER_PAGE_DEFAULT_LIMIT` (50) / max 100 for Messenger; Tasks list may use the same constants until a Tasks-specific constant is justified (KISS).

### 2.2 How live orchestrator maps

`openProjectMessengerThread` stays:

1. `detectProjectMessengerLocalLive` → `localLive`
2. if live → `loadProjectMessengerOlderFromLocal` (= History `readProjectHistoryMessagesPage`)
3. always → `loadProjectMessengerNeonThreadPage` (+ `579b18ff` session merge on `whole`)
4. `resolveProjectMessengerLoadPage` → module `loadPage` (Messenger may pass `idbEntries: []` until Human wires IDB into the server path; browser already hydrates via `fetchMessengerThreadPersisted`)

Browser path today: IDB is **client-side** write-through after GET — keep that; module IDB store is the shared client cache Tasks will also use.

---

## 3. New layers only

### 3.1 AWC IndexedDB cache (Human UI)

- **One DB per signed-in user** (name e.g. `awc-project-sync:<userId>`; bump version for migrations — never drop stores quietly).
- Object store per `tableId` (e.g. `messengerChats` stays for chat; `projectTasks` for Tasks).
- Fields cached = adapter `idbFields` (meta + recent snippets; **no secrets**).
- Fill: on every successful `loadPage` / open, write-through (same pattern as `fetchMessengerThreadPersisted`).
- Trim: reuse chat-retention Q2 — drop only when older than 1 week **and** outside newest 1000 **and** confirmed on a computer; **no-computer projects never trim** + keep (i) hint.
- Clear: on sign-out and on leave-project (new explicit clear path — chat Soft tip today has no delete; Tasks + module **must** clear on leave / sign-out for privacy).
- Does **not** replace Neon or AWL; never pretends to be authoritative.

### 3.2 Versioned reconcile on local connect (History owns)

When connection FSM enters `local_live` from offline / unknown / neon_only:

1. History runs `reconcileProjectSyncOnConnect({ projectId, tableId, … })` (batch).
2. Diff by adapter **key + version** (monotonic `version` int; tie-break `updatedAt` then key).
3. **Local wins** on conflict; push **meta only** to Neon via Dispatch allowlisted updater; rewrite IDB from reconciled snapshot.
4. Deletes: local tombstone → Neon meta status / tombstone row (never wipe chat threads — RT1); Tasks may mark `cancelled` or tombstone meta.
5. Idempotent; batch size e.g. 50 keys/request; safe to re-run.
6. **Web-created while computer offline:** Neon holds pending meta row (`version` set, `localClaimedAt` null). On connect, local claims (writes full record, bumps version); reconciler updates Neon meta from local. Until claim, Tasks list shows Neon meta; Open history / Load older past meta → offline line if local still down.

Neon never receives full prompt/body/history/logs.

---

## 4. Adapter contract

```ts
type ProjectSyncAdapter<TLocal, TNeonMeta, TIdb> = {
  readonly tableId: string;           // e.g. "project_tasks" | "messenger_timeline"
  readonly schemaVersion: number;     // IDB migration bump

  keyOf(record: TLocal | TNeonMeta): string;
  versionOf(record: TLocal | TNeonMeta): { version: number; updatedAt: string };
  /** Local wins if version >, else if == then updatedAt >, else key string >. */
  compareVersion(a, b): number;

  readonly sortKey: (row) => { t: string; id: string }; // cursor components

  readonly neonFields: readonly (keyof TNeonMeta)[];     // allowlist
  readonly localOnlyFields: readonly (keyof TLocal)[];
  readonly idbFields: readonly (keyof TIdb)[];

  toNeonMeta(local: TLocal): TNeonMeta;                  // pure
  mergeLocal(prev: TLocal | null, incoming: TLocal): TLocal; // pure; local authoritative ops
  toIdb(record: TLocal | TNeonMeta): TIdb;               // pure

  pageLocal?(…): Promise<{ entries; hasMore }>;          // History
  pageNeon?(…): Promise<{ entries; hasMore }>;           // Dispatch
};
```

Arch FP: `toNeonMeta` / `mergeLocal` / `toIdb` / `compareVersion` are pure. I/O stays in page* / reconcile ports.

---

## 5. Connection-state FSM (Arch FSA)

```
unknown ──probe──► local_live
                 └► local_offline ──► neon_only (Neon still answers)
local_offline / neon_only ──local back──► reconciling ──done──► local_live
any + Load older exhausted + !localLive ──► lost
lost ──Retry / local back──► reconciling | neon_only | local_live
```

| State           | UI                                                                                  |
| --------------- | ----------------------------------------------------------------------------------- |
| `unknown`       | Quiet / skeleton (no false empty)                                                   |
| `local_live`    | Normal; Load older may hit local                                                    |
| `local_offline` | Neon meta OK; history beyond Neon may fail later                                    |
| `neon_only`     | Same as offline for paging; banner optional                                         |
| `reconciling`   | Quiet progress; do not clear list                                                   |
| `lost`          | **Connection to the project computer was lost** (+ Retry, same as Messenger header) |

Probe = existing `detectProjectMessengerLocalLive` (project `device_id` in hub or fresh registry).

---

## 6. Adapter #1 — Tasks

Maps to Tasks tab EN PASS (`docs/design/project-tasks/` screens A/B): list + detail/session; **Load older** / **Open history** / offline banner.

Statuses (UI chips): `queued` / `running` / `done` / `failed` / `cancelled` (brief). Align writeback with task-assignment §3.7 FSA when `project_tasks` lands (map `working`→`running`, `assigned`/`pending_approval`→`queued` as needed — open Q).

### 6.1 Field split

| Field                                               | Neon (meta) | Local-only | IDB                     | Notes                                                                                                     |
| --------------------------------------------------- | ----------- | ---------- | ----------------------- | --------------------------------------------------------------------------------------------------------- |
| `id`                                                | ✓           | ✓          | ✓                       | Stable task id                                                                                            |
| `projectId`                                         | ✓           | ✓          | ✓                       |                                                                                                           |
| `assistantMembershipId`                             | ✓           | ✓          | ✓                       | Prefer “assistant” in UI                                                                                  |
| `title` / thin summary                              | ✓           | ✓          | ✓                       | ≤ ~200 like PM summary                                                                                    |
| `status`                                            | ✓           | ✓          | ✓                       | Chip source                                                                                               |
| `createdAt` / `updatedAt` / `startedAt` / `endedAt` | ✓           | ✓          | ✓                       |                                                                                                           |
| `version`                                           | ✓           | ✓          | ✓                       | Monotonic; reconcile                                                                                      |
| `sessionId` / `agentRunId`                          | ✓           | ✓          | ✓                       | Links C1 session / timeline                                                                               |
| **`branch` / `worktree` names**                     | ✓           | ✓          | ✓                       | **Meta** — shown on list/detail without computer (EN PASS D). Justify: names are labels, not repo content |
| Git paths / worktree FS ops                         | —           | ✓          | —                       | Local-only                                                                                                |
| Prompt / full body                                  | —           | ✓          | snippet only (optional) | Neon never full body                                                                                      |
| Status timeline events                              | —           | ✓          | recent N                | Full history local                                                                                        |
| Report / logs                                       | —           | ✓          | —                       | Open report from local when live                                                                          |
| Plan counts                                         | ✓ aggregate | —          | cached                  | Neon meta counts by plan                                                                                  |

### 6.2 Screens

| Screen           | Data                                                                                                                                          |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| A List           | Neon/IDB meta + filters; capacity counts from Neon; offline banner → lost line                                                                |
| B Detail         | Meta + recent snippet from IDB/Neon; timeline/history via local page; Load older / Open history → module pager; lost when exhausted + offline |
| C Chat Open task | Existing `entryKind: "session"` row → Tasks detail (no new cursor)                                                                            |

### 6.3 Proposed paths

- AWC: `src/features/projects/tasks/` UI (Human) + `src/features/projects/sync/adapters/projectTasksAdapter.ts`
- AWL: extend C1 `tasks/` store + History reconcile; reuse `mapAiSessionRecordToTimelineEntry` where session == task session
- Neon: thin `project_tasks` (task-assignment mig when free) **or** interim meta from `agent_runs` via `579b18ff` until mig lands (open Q)

---

## 7. Ownership

| Owner           | Owns                                                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **AW History**  | Local page reader (live); **reconcile on local connect** (versioning; local authoritative); AWL `tasks/` / history stores |
| **AW Dispatch** | Neon meta paging (`3cee071b` / `579b18ff` path); `project_computer_offline`; allowlisted Neon meta upsert from reconcile  |
| **Human UI**    | AWC IndexedDB client (generalize Soft IDB); Tasks tab UI (Claude HTML EN PASS); Load older chrome reuse                   |
| **Product**     | This SPEC only                                                                                                            |

API/build wait for light Arch SHIP → AW Lead routes **Arch review 5**.

---

## 8. Next adapters (sketch)

| Adapter      | Note                                                                                     |
| ------------ | ---------------------------------------------------------------------------------------- |
| **Messages** | Migrate Messenger onto module; align Neon newest-300 + IDB 1w/1000; keep prune/ack locks |
| **Sessions** | Already `entryKind: "session"` via C1 + `579b18ff`; thin adapter over same pager         |
| **Skills**   | Meta in Neon publish tables; full drafts/mirrors local; sync-relay allowlist later       |

---

## 9. Rollout

| Slice  | Ships                                                                                                       | Stays live                                                 |
| ------ | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| **S1** | Extract pager + connection FSM behind flag; **Tasks adapter** + IDB store for tasks; reconcile stub→History | Messenger Load older path unchanged (call extracted pager) |
| **S2** | Messages adapter: Messenger uses module IDB + pager explicitly                                              | Soft IDB behavior preserved                                |
| **S3** | Sessions/skills adapters as needed                                                                          | Never hide live chrome                                     |

Flag suggestion: `AWC_PROJECT_SYNC_MODULE` (Tasks tab + extract). Off = today’s Messenger-only wiring.

---

## 10. Security / privacy

- Neon: meta allowlist only — no full bodies, history, logs, reports, secrets.
- IDB: per signed-in user; clear on sign-out / leave project; no tokens / keys / raw env.
- Reconcile / sync: scrub secrets (same deny as computer-sync-relay).
- Cost-control: History paths stay when `cloudMessageStorage` is false.

---

## 11. Test matrix (HARD before build) — Thien 2026-10-07 ~12:41 · AMEND ~12:44 CEST

**LOCKED.** No Soft build / Soft HOLD Soft-claim Soft build of the sync module until this matrix has owners and failing-first stubs planned. Coverage must include **(1) happy paths**, **(2) conflict / reconciliation**, and **(3) IndexedDB failure modes** — not smoke-only.

**Owner:** **AW History** owns **unit + integration** tests for **reconcile + pager** (local page + version compare + offline→reconnect). Dispatch owns Neon adapter unit tests (meta allowlist, caps). Human UI owns IDB client unit tests (incl. Soft degrade when IDB broken) + Tasks tab wiring Soft tests. Product owns this matrix only.

**IDB Soft degrade (HARD):** when IndexedDB is broken or unavailable, list / page from **Neon meta** and/or **local** (if live). **Never** corrupt Neon; **never** block Load older because IDB failed. Log/metric only; treat IDB as optional cache.

### 11.1 Happy paths (must cover)

| #   | Case                                    | Expect                                                                     |
| --- | --------------------------------------- | -------------------------------------------------------------------------- |
| H1  | Fresh Tasks list, local live, IDB empty | Page from local; IDB fills; Neon meta upsert allowlist only                |
| H2  | Repeat Load older with warm IDB         | Serves from IDB then local; no duplicate rows; cursor advances             |
| H3  | Local live, Neon meta present           | Prefer local over Neon; list matches local authoritative                   |
| H4  | Reconcile on connect, no conflicts      | Neon meta + IDB rewritten to match local; FSM `reconciling` → `local_live` |
| H5  | Tasks detail Open history / Load older  | Same pager; offline line only when Neon exhausted + local offline          |
| H6  | Sign-out / leave project                | IDB cleared for that user/project; Neon untouched                          |

### 11.2 Conflict / reconcile cases (must cover)

| #   | Case                                                   | Expect                                                                                                                                                                                                      |
| --- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T1  | IDB newer than Neon meta, local offline                | Pager serves IDB; no Neon overwrite of IDB bodies                                                                                                                                                           |
| T2  | Neon meta newer than IDB, local offline                | Merge meta into IDB allowlist fields only; bodies unchanged                                                                                                                                                 |
| T3  | Local version > Neon and IDB                           | On connect, local wins; Neon meta + IDB rewritten from local                                                                                                                                                |
| T4  | Neon version > local (should be rare)                  | Still **local authoritative** on conflict; log/metric; do not clobber local body                                                                                                                            |
| T5  | Same key, equal version, divergent meta                | Deterministic tie-break (e.g. higher `updatedAt`, then id); document in adapter                                                                                                                             |
| T6  | Duplicate keys (double-create / idempotency race)      | Single surviving record; Neon upsert idempotent; IDB put idempotent                                                                                                                                         |
| T7  | Dual-write: chat assign while local live               | One task/session; pager shows one row; no double Load older entries                                                                                                                                         |
| T8  | Dual-write: web create while local offline → reconnect | Neon pending meta claimed by local; version bump; IDB filled from local                                                                                                                                     |
| T9  | Offline → reconnect mid-page                           | Connection FSM `lost`/`neon_only` → `reconciling` → `local_live`; no duplicate cursor pages                                                                                                                 |
| T10 | Load older: local live prefers local over Neon         | Page source = local when live even if Neon has meta                                                                                                                                                         |
| T11 | Load older: Neon exhausted + local offline             | `project_computer_offline` + exact EN line                                                                                                                                                                  |
| T12 | History OFF purge cascade                              | Learning paths purged (`skillgen/`, drafts, task outcomes per LOCKED Q1); **chats/`history/` never deleted**; Neon meta caps still apply; IDB learning caches cleared, chat/task bodies per retention rules |
| T13 | Package-cap Neon meta                                  | Cap / TTL / prune on Tasks meta + plan counts; inserting past cap prunes oldest allowlisted meta only — **never** writes bodies to Neon                                                                     |
| T14 | Branch/worktree refs                                   | Meta names/ids sync; full worktree paths / files stay local-only                                                                                                                                            |
| T15 | Tombstone / cancelled                                  | Deleted or cancelled task: Neon status + tombstone policy; local + IDB reconcile without resurrecting body                                                                                                  |

### 11.3 IndexedDB failure modes (must cover) — Soft degrade

| #   | Case                                           | Expect                                                                                                                           |
| --- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| I1  | **Quota exceeded** on put/fill                 | Catch; Soft degrade — continue from local (if live) else Neon meta; no throw to UI; Neon unchanged                               |
| I2  | **Open blocked** (another tab / versionchange) | Retry once with backoff or Soft degrade without IDB; Load older still works                                                      |
| I3  | **Corrupted store** / unexpected schema        | Detect; delete/recreate store or Soft skip IDB; never wipe Neon; never wipe local AWL                                            |
| I4  | **Private mode / IDB unavailable**             | Soft degrade immediately; list/page Neon meta + local; no hard fail of Tasks/Messenger                                           |
| I5  | **Write fail mid-reconcile**                   | Abort IDB write batch; leave Neon/local consistent; next reconcile retries; **never** partial-corrupt Neon meta from IDB failure |
| I6  | IDB read fail during Load older                | Skip IDB layer; fall through local → Neon → lost; exact offline line only when truly lost                                        |

### 11.4 Layers under test

| Layer                                               | Test type                  | Owner                                                   |
| --------------------------------------------------- | -------------------------- | ------------------------------------------------------- |
| Pure `compareVersion` / `toNeonMeta` / `mergeLocal` | Unit                       | History (+ shared pure in AWC if co-owned)              |
| Pager `loadPage` (IDB → local → Neon → lost)        | Unit + integration         | **History**                                             |
| Reconcile on local connect                          | Unit + integration         | **History**                                             |
| Neon meta allowlist + package-cap prune             | Unit                       | Dispatch                                                |
| IDB open/put/clear + Soft degrade (I1–I6)           | Unit                       | **Human UI** (History co-owns pager Soft degrade paths) |
| Tasks adapter field split                           | Unit                       | History + Human UI                                      |
| Connection FSM transitions                          | Unit                       | History (or shared)                                     |
| Soft end-to-end Tasks Load older                    | Soft integration (flag on) | Human UI + History after Arch SHIP                      |

### 11.5 Gate

Arch SHIP reviews structure **and** that this matrix is in SPEC (happy + conflict + IDB failure). Soft build Soft GO only after SHIP; Soft land requires green suite covering **H1–H6, T1–T15, I1–I6** (or tracked Soft defer with Lead ACK for any Soft slice). Never hide live.

## 12. Open questions (Arch / NRG Lead)

1. Ship Tasks Neon meta on interim `agent_runs` (`579b18ff`) until `project_tasks` mig, or block Tasks adapter on mig?
2. Map UI statuses ↔ §3.7 (`working`→`running`, etc.) — exact table?
3. Align Messenger UI copy (`Lost connection…`) with Dispatch exact string in same Soft tip?
4. IDB DB naming: one DB `awc-project-sync:<userId>` vs keep `awc-chat` and add sibling DB for tasks?
5. Reconcile transport: new Dispatch route vs reuse computer-sync-relay offer/ack for task meta only?
6. Branch/worktree: confirm meta (this SPEC) vs local-only if Product wants names hidden when computer offline.
7. Tombstones for deleted tasks: Neon status `cancelled` vs separate tombstone table?
8. Multi-computer: first reconcile = linked `user_projects.device_id` only, or every sync-enabled device (relay tip)?
9. Soft DROP thin MAP S5 History notice tab after Tasks Soft HOLD LIVE + Settings CTA — confirm with Lead (Product EN: MERGE/DROP content surface; see `HISTORY-UI-EN.md`).

---

## 13. Arch review checklist (structure)

| Lens     | Expectation                                                                                     |
| -------- | ----------------------------------------------------------------------------------------------- |
| **SRP**  | Pager / IDB / Neon client / local client / reconciler / connection FSM / adapter — one job each |
| **DRY**  | One module replaces per-table ad hoc sync; Messenger + Tasks share pager + cursor               |
| **KISS** | Extract live fns; no new cursor; no greenfield stack                                            |
| **FSA**  | Connection states §5; task status writeback stays §3.7                                          |
| **FP**   | Pure `toNeonMeta` / `mergeLocal` / `compareVersion`; I/O at edges                               |

**Also review:** §11 test matrix is present and ownership clear (History = reconcile+pager tests).

**Out of scope for Arch 5:** palette, Tasks HTML (already EN PASS), billing UI, full sync-relay FSM land.

---

## References (code)

Scout checkout `/workspace/daily-magic` (read-only). Key paths above; SHAs §1.1. Soft IDB live files: `src/features/projects/messenger/utils/messengerChatStoreIdb.ts`, `messengerChatStore.constant.ts` (`awc-chat` v1). Offline constant: `resolveProjectMessengerLoadPage.ts` `PROJECT_MESSENGER_COMPUTER_OFFLINE_ERROR`.
