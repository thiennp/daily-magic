# Neon prune-300 + computer↔computer sync relay (HARD after IDB)

**Status:** implementation design for HARD tips (after Soft#1 IndexedDB LIVE).
**Trigger:** Soft tip `76e1b8c9` (`feat/awc-chat-idb-persist`) is on `origin/main` (ancestor check OK). Soft land lock free; Soft LOCK stack for Soft tips is separate. This track is HARD only.
**Repo:** `thiennp/daily-magic`. Work under `/private/tmp` worktrees on Mac `6c109c4e-f1c5-44b5-bb27-dd76f5fec2ae`.
**Branches (stack on current `origin/main`):**
1. `feat/awc-neon-prune-300-r1` — Neon newest-300 prune per chat
2. `feat/awc-computer-sync-relay-r1` — may stack on prune — computer↔computer AW sync relay

**Do not mix:** Soft HOLD cost-control tip (owned elsewhere).
**Land rules:** Arch before land; no main push until Arch SHIP + suite; **no PRs**. Plain English. Never hide live Marketplace / Connect.

**Built on (not restated):**
- `DESIGN.md` (Product RT0–RT19, locked Q1–Q8 + ceiling)
- `server-prune-audit-v1.md` (P1–P5 / RT7, RT9, RT12)
- `computer-sync-relay-research-v1.md` (R1–R6 / RT14, RT17–RT19)
- `CLEAR-ALL-LOCK.md` (archive, not wipe)
- `indexeddb-scout.md` (browser; already LIVE)

---

## 0. What this HARD track ships

| Tip | Ships | Does not ship in r1 |
| --- | --- | --- |
| **neon-prune-300-r1** | `chat_key`; stamp-on-ack/read (no delete-on-ack/DOR); keep-newest-300 prune with ≥1 synced-computer ack; unread = unacked ∩ not-archived; drop 3-day **row** age purge; per-device computer acks | Clear-all UI (already archive on main via 098); revoke/leave never-delete (RT4) if still open; author-snapshot FK (RT5); “Load older” UI (RT8); owner unsynced banner UI copy wiring (RT13) |
| **computer-sync-relay-r1** | Neon sync tables; owner per-computer enable; folder ACL (`computer ∈ project` + `project_folder_refs`); offer/chunk/commit/pull/ack/purge **server** API; outbox `sync.available` / `sync.purge`; 1 MiB limit; secrets scrub reject; History-off = learning purge only | Full AWL sender/receiver FSMs (RT18 — AW Mac); Team › Computers UI chips (RT15 — Product/Human UI); store-root move to `.agentwitch/data/` (RT16 — AW Mac); every-kind fan-out beyond chat scaffolding (RT19) |

Older messages past Neon’s newest 300 stay on **computers / AWL / History / browser IDB**. Neon **never deletes chats outright** (no chat/thread wipe). Only rows past rank 300 in a chat, and only when the locked ack ceiling allows.

---

## 1. Neon newest-300 prune (tip 1)

### 1.1 Rule (LOCKED)

- Keep newest **300** messages per `(project_id, chat_key)` ordered by `(created_at DESC, id DESC)`.
- A row past rank 300 is prunable only if **≥ 1 synced computer** has acked it.
- **No computer / not yet synced:** project is **exempt** — keep everything.
- Stale computer (no ack for **30 days**, config): stops being the sole blocker only if **another** computer has acked.
- **Zero acks → zero prunes.**
- At **2000** unacked in one chat → owner banner (dismiss 7d; re-show at +500). **No hard-delete ceiling.**
- Chats themselves (projects, memberships, thread keys, thread reads) are never deleted by prune.

### 1.2 What “chat” means

`project_messages` has no thread column today. Add **`chat_key TEXT NOT NULL`** set on insert by one pure function (also usable for backfill):

| Case | `chat_key` |
| --- | --- |
| Whole project / reply to whole | `whole` |
| Human ↔ one bot | that bot’s membership id |
| Bot ↔ bot | `pair:<minMembershipId>:<maxMembershipId>` |
| Team-label send | `team:<label>` |
| System notice | `system:<toMembershipId\|toUserId\|none>` |

Index: `(project_id, chat_key, created_at DESC, id DESC)`.

Messenger load becomes newest 300 **per chat_key** (not project-wide). Same constant as keep-300.

### 1.3 Behaviour changes (replace delete-on-ack / DOR / age TTL)

| Today | After tip |
| --- | --- |
| Ack → hard DELETE (or hold then delete on computerAck) | Ack **stamps `acked_at` only** |
| DOR ticker deletes read rows | Stamp `read_at` only; ticker runs **prune sweep** |
| `deleteHeld…AfterComputerAck` deletes | No delete; computerAck may make rows prunable → prune that chat |
| History OFF `release…Held…` deletes | No Neon delete; learning purge is sync/History path only |
| 3-day age DELETE (History-off) | **Removed** for rows; keep unsaved-overdue **wake** + stale-ack cleanup |
| Unread cap = COUNT all non-archived rows | COUNT `acked_at IS NULL AND archived_at IS NULL` |
| computer_acks `UNIQUE (project_id, message_id)` | `UNIQUE (project_id, message_id, device_id)` |

Outcome reason for prune: `prune_keep_300` (extend `ProjectMessageDeletedReason`).

### 1.4 Where prune runs

1. **On insert** of a message into that `chat_key` (bounded, usually 0–1 deletes).
2. **Ticker / cron** (replace DOR call): sweep chats with count > 300 that now have prunable acks.

SQL shape (same idea as `trimProjectActivityEvents`): `DELETE … OFFSET 300` plus ack-before-prune predicate. Idempotent; `ON CONFLICT DO NOTHING` on outcomes.

### 1.5 Synced computers (for prune predicate)

A device counts toward “synced” when:
- it is an active computer seat on the project, and
- `project_sync_devices.enabled = true` (owner Team › Computers toggle), and
- it has completed at least one empty backlog / first successful sync cycle (DESIGN O11).

Until tip 2 lands tables, tip 1 may treat “any `project_message_computer_acks` row for an active computer seat” as the interim ack source, and treat “no computer seats” as exempt. Tip 2 wires `project_sync_devices.enabled` + “synced once” into the same helper.

### 1.6 Files (expected)

- `db/migrations/102-project-messages-chat-key-prune.sql` (number = next free after cost-control 101 on tip base (preemptive renumber))
- `src/lib/projects/acl/messaging/projectMessageChatKey.ts` (+ test)
- `src/lib/projects/acl/messaging/pruneProjectChatMessages.ts` (+ test)
- `src/lib/projects/acl/messaging/projectMessagePrune.constants.ts`
- `src/lib/projects/acl/messaging/isProjectMessagePrunableByComputerAck.ts`
- Edits: `insertProjectMessageWithDeliveries`, `ackProjectMessage`, `deleteHeld…`, `release…`, `purgeExpired…`, `deleteRead…` → sweep, `assertProjectMessageDispatchRateLimits`, `recordProjectMessageComputerAck`, `writeProjectMessageOutcome`, ticker/cron, messenger load, soft ensure schema

---

## 2. Computer↔computer sync relay (tip 2)

### 2.1 Required behaviour (Thien / AW Lead)

- Path: **computer → AW cloud → computer**, automatic.
- Sync **only** to owner-**enabled** computers (Team › Computers toggle).
- Destination = owner-picked **project folder** on that computer (`project_folder_refs`); server validates **computer ∈ project**. Default store root: **`<project folder>/.agentwitch/data/`** (one Part C store; not a separate `data/chat/` tree).
- Equal long-term stores on every enabled computer.
- **One file at a time**; **queue**; **checksums**; **resume**.
- Conflicts: **last-writer-wins** (server `seq`) + **keep losing copy** (`.conflict-<deviceShort>-<UTC>.<ext>`).
- Per-file size limit **1 MiB LOCKED**.
- **Never sync secrets** (scrub client + re-scan server; `residualSecret` / `secret_suspect` → reject).
- History OFF / purge: **learning only** (`skillgen/`, `skills/_drafts/`, `tasks/`, `outcomes/`). **Never** purge `history/` chats. Sync on/off is the **owner toggle**, not History.

### 2.2 Neon tables (r1)

| Table | Role |
| --- | --- |
| `project_sync_devices` | `(project_id, device_id)` unique; `enabled` default false; `folder_ref_id`; `last_pulled_seq`; `synced_once`; state |
| `project_sync_files` | head per `(project_id, path)` |
| `project_sync_versions` | ordered `seq` change log |
| `project_sync_blobs` | sha256 PK; BYTEA chunks; freed when **every target** acked (no TTL) |
| `project_sync_acks` | `(project_id, seq, device_id)` |

Allowlisted store-relative kinds: `chat` → `history/<messageId>.json`; `skill`; `safety_rule`; `knowledge`; `summary`/`tasks`. Nothing else.

### 2.3 API (device-auth, under `/api/agent-witch/projects/[projectId]/sync/*`)

Every call: active computer seat **and** `enabled` **and** folder ref **and** path under store (no `..`).

| Route | Purpose |
| --- | --- |
| `POST …/sync/offer` | `{path, base_seq, sha, size, kind}` |
| `PUT …/sync/chunks` | chunk upload / resume |
| `POST …/sync/commit` | assign seq; head or conflict_copy |
| `GET …/sync/changes?since=` | pull change log |
| `GET …/sync/blob/:sha` | chunk download |
| `POST …/sync/ack` | applied; chat acks also write `project_message_computer_acks` |
| `POST …/sync/purge` | learning paths only (History off fan-out) |
| Owner: enable/disable device | Access-log event |

Wake: outbox types `sync.available` / `sync.purge` (thin: projectId + seq). Presence: push if online, else pull on reconnect.

### 2.4 r1 implemented vs stubbed

| Piece | r1 |
| --- | --- |
| Migrations + constants + soft ensure | **Implement** |
| ACL + enable toggle + Access-log types | **Implement** |
| Offer / commit / changes / ack / blob chunk store | **Implement** (Neon BYTEA chunks) |
| Secret re-scan + 1 MiB reject | **Implement** |
| Outbox queueable types + enqueue helper | **Implement** |
| AWL FSMs, atomic local write, `.gitignore` line | **Stub / contract only** (RT18 Mac) |
| Team › Computers UI | **Stub / copy keys only** (RT15) |
| Full multi-kind fan-out beyond chat path | **Scaffold allowlist**; chat-first path wired |

---

## 3. Sequencing & land

```
origin/main (IDB already in)
    └─ feat/awc-neon-prune-300-r1
         └─ feat/awc-computer-sync-relay-r1   (preferred stack)
```

1. Design note (this file) on box + copy into tip worktree `docs/design/chat-retention/`.
2. Implement prune tip; `npm run cursor:architecture -- --base=origin/main`; targeted vitest.
3. Stack sync tip; same Arch + tests.
4. **Stop.** Arch SHIP + suite before any main push. No PRs from this track.

### 3.1 Explicit non-goals

- Soft LOCK stack / Soft tips.
- Soft HOLD cost-control.
- Hiding Marketplace or Connect.
- Deleting chats or History chat files on History OFF.
- Redis / S3 for blobs in v1 (Neon BYTEA only).

---

## 4. Acceptance (plain English)

**Prune:** A project with no synced computer keeps every Neon message. After a computer saves copies and acks, Neon may drop only messages older than the newest 300 in that chat. Ack and read never wipe a row by themselves. Unread cap only counts messages still waiting for an ack. Age alone never deletes chat rows.

**Sync:** Owner turns Sync on for a computer that belongs to the project and has a project folder. Files move one at a time through AgentWitch with checksums and resume. If two computers edit the same file, the later server commit wins and the other copy is kept beside it. Secrets and oversized files never sync. Turning History off clears learning data only; chats keep syncing when Sync is on.
