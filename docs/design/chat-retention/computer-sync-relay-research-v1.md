# Computer ↔ computer sync relay via AgentWitch cloud (v1, research only)

**Owner:** AW server (cloud relay/API). **Status:** research and design only. No code.
**Source:** `thiennp/daily-magic` `origin/main` @ `7c9dcc68` (fetched 2026-10-06 ~13:40 CEST).
**Sequencing (Thien):** IndexedDB persistence (Human UI) ships first. **The relay ships only after IndexedDB is LIVE**, alongside or after the Neon keep-300 prune (`server-prune-audit-v1.md`).
**Required behaviour (Thien via AW Lead):**
- Path: computer → AW cloud → computer, one file at a time, automatic.
- Transfer: a queue with checksums, resumable.
- Conflicts: last writer wins plus a kept copy of the loser.
- Limits and exclusions: a size limit; never sync secrets; respect History off and purge.
- Every project computer is an **equal long-term store** for chat history, Library/knowledge, local summaries, Safety rules and skills.

**Amendments:**
- Sync only to computers the owner **enabled** (Team › Computers toggle per computer).
- Destination = the owner-picked **project folder on that computer** (`project_folder_refs`). The server validates that the computer belongs to the project. Default subfolder is `data/`.

---

## 1. What exists to reuse (cite)

| Piece | What it is | Reuse? |
|---|---|---|
| `agent_witch_dispatch_outbox` (`db/migrations/025-agent-witch-dispatch-outbox.sql:1-16`; ensure in `src/lib/agentWitch/ensureAgentWitchPresenceSchema.ts:45-60`) | Per-device queue of JSON messages: `idempotency_key UNIQUE`, status `queued/delivered/expired/cancelled`, 24 h TTL (`enqueueAgentWitchDispatchOutbox.ts:6,23-47`), drained 20 at a time on connect (`drainAgentWitchDispatchOutboxForAgentClient.ts:20-31`) | **Yes, for the wake only.** New queueable type `sync.available` (thin: projectId + seq). No blob payloads. The outbox is never pruned today, so add a prune. |
| `agent_witch_hub_dispatch_relay` (`027-agent-witch-hub-dispatch-relay.sql:1-20`) | Instance↔instance RPC: request lands on the instance that owns the device socket; `pending→processing→completed/failed/expired`, 30 s TTL (`enqueueAgentWitchHubDispatchRelay.ts:7`), claim `FOR UPDATE SKIP LOCKED LIMIT 5` (`claimPendingHubDispatchRelaysForLocalInstance.ts:14-36`) | **Pattern only** (SKIP LOCKED claim, status enum). Not the table: it's 30 s socket RPC, not storage. |
| Presence registry `agent_witch_connections` (`ensureAgentWitchPresenceSchema.ts:23-41`; `agentWitchConnectionRegistry.ts`) | Which instance holds which device socket; `last_ack_at` | **Yes.** Decide "online → push wake now" vs "offline → pull on reconnect". |
| Skill bodies `project_skill_versions.body TEXT` (`058-project-skill-share.sql:29-34`), ≤ 64 KB, 20 versions (`src/features/project-skill-share/internal/core/projectSkillShare.constant.ts:2-3`), `content_hash = 'sha256:'+hex` (`058:7`) | Neon already stores small text blobs with sha256 | **Precedent** for Neon-held content + hash format. |
| Blob/object storage | None on main: no `@vercel/blob`, S3, R2 deps (`git grep` + `package.json`). `deps.tar.gz` is a static file in `public/install/agent-witch/app/` (not an upload path). | Nothing to reuse. See §3 decision. |
| `project_folder_refs` (`041-project-acl-membership.sql:59-72`: `project_id, machine_or_device_ref, folder_path`, unique on all three) + write guard `src/lib/projects/acl/checkFolderRefDeviceAcl.ts:14-40` (device must be an active computer member or the project's own live device) | Per-computer project folder | **Yes:** destination + ACL. |
| Computer seats (`068-project-membership-computer.sql`: `member_kind='computer'`, `device_id`, unique active per (project, device) at :60) ; `src/lib/projects/acl/upsertProjectComputerMembership.ts:13-21` (owner's device only) | "Computer belongs to project" | **Yes:** the sync ACL subject. Note: v1 seats are owner devices only. |
| Per-device computer acks `project_message_computer_acks` (`056:33-39`, `device_id` in `060`) + route `src/app/api/agent-witch/projects/[projectId]/computer-history/acks/route.ts` | "This computer saved message X" | **Yes:** extend to per-device unique key (prune doc §4) and reuse as the chat-history ack. |
| AWL local stores | `<profileDir>/project-data/<projectId>/` (`apps/live/features/project-history/internal/core/resolveProjectDataDir.ts:19-29`): `history/<messageId>.json` (one file per message, `writeProjectHistoryMessage.ts`), `skills/<id>/` mirror + `_drafts`, `_tombstones`, `skillgen/` (incl. `learned-pitfalls.json`) (`projectHistoryPaths.constant.ts:1-18`); dirs 0700 / files 0600; token-saver DB + seeds (`apps/live/features/token-saver/internal/core/pitfallSeedRows.ts`); RAG/knowledge NDJSON (`apps/live/features/knowledge/internal/core/agentWitchLocalRag.ts`); writer transcripts (`apps/live/features/memory/internal/core/writerSessionTranscriptStore.ts`) | **Sources.** One file per message already fits "one file at a time". |
| History off purge `purgeProjectHistoryOnOff.ts:26-30` (removes `history/`, `skills/_drafts/`, `skillgen/`; keeps mirror + tombstones) | Local purge | **Yes:** the relay triggers it on every enabled computer. |
| Scrubbers `scrubProjectHistorySkillgenSecrets.ts:15-63` (private keys, `sk-`, GitHub, Slack, AKIA, Bearer, key=value, emails; `residualSecret` → quarantine) and `apps/live/features/projects/internal/core/knowledge/redactTextForProjectKnowledge.ts` | Secret removal | **Yes:** run before hashing; `residualSecret` → never upload. |

## 2. Manifest / file model

Sync unit = **one file** under a project's sync root. Sync kinds and source paths (allowlist, nothing else ever syncs):

| Kind | Source (AWL) | Destination under `<project folder>/data/` |
|---|---|---|
| `chat` | `project-data/<p>/history/<messageId>.json` | `chat/<chatKey>/<messageId>.json` |
| `skill` | published skill mirror | `skills/<skillId>/SKILL.md` (+ `meta.json`) |
| `safety_rule` | project rules (not seeds; seeds ship with AWL) | `safety-rules/<ruleId>.json` |
| `knowledge` | promoted lessons / learned knowledge | `knowledge/<itemId>.md` |
| `summary` | local doc/task summaries (Part C) | `summaries/<key>.md` |

Neon tables (proposal):
- **`project_sync_files`**: `project_id, path (normalized, relative, no '..'), kind, head_seq BIGINT, content_sha256, size_bytes, origin_device_id, updated_at, deleted BOOLEAN (tombstone)`. Unique `(project_id, path)`.
- **`project_sync_versions`**: `project_id, seq BIGSERIAL, path, base_seq (writer's view), content_sha256, size_bytes, origin_device_id, outcome ('head'|'conflict_copy'), created_at`. This is the ordered change log a device pulls from.
- **`project_sync_blobs`**: `content_sha256 PK, project_id, size_bytes, chunk_count, bytes BYTEA (or chunk rows), created_at, expires_at`. Transient: deleted once every enabled device acked that version, or at TTL (7 days, aligned with the unsaved flag).
- **`project_sync_devices`**: `project_id, device_id, membership_id (computer seat), folder_ref_id, enabled BOOLEAN DEFAULT FALSE (owner toggle), last_pulled_seq, state, updated_at`. Unique `(project_id, device_id)`.
- **`project_sync_acks`**: `(project_id, seq, device_id)` = "applied on that computer". For `chat` it also writes `project_message_computer_acks`, which is what makes the row prunable in Neon.

## 3. Where transient blobs live

- **Neon BYTEA, chunked (256 KiB chunks), v1.** It matches the existing Neon-only state model (outbox, presence, relay, skills are all Neon), needs no new dependency or env, and gets one purge and backup story. **No Redis** (none on main; Thien: no Redis).
- Bounded by the per-file limit (§6) and the blob TTL. Object storage (S3/R2/Vercel Blob) is a later swap behind a `BlobStore` port if volume needs it; nothing on main to reuse today.

## 4. Relay protocol (explicit FSM)

**Sender side, per local file change (AWL):**
```
DIRTY ─scrub─► SCRUBBED ─residualSecret─► QUARANTINED (never uploads; local log only)
SCRUBBED ─excluded (History off / not allowlisted / too large)─► SKIPPED(reason)
SCRUBBED ─sha256─► HASHED ─server has sha (dedupe)─► COMMIT
HASHED ─POST offer {path, base_seq, sha, size}─► OFFERED
OFFERED ─accepted─► UPLOADING(chunk i/n) ─all chunks + sha verified─► COMMIT
UPLOADING ─network drop─► UPLOADING(resume from server's received chunk count)
COMMIT ─server assigns seq─► COMMITTED (head or conflict_copy)
any ─rejected (acl | too_large | secret_suspect | history_off | not_enabled)─► REJECTED(reason)
any ─5xx/timeout─► RETRY(backoff, max N) ─► OFFERED
```
**Receiver side, per (seq, device):**
```
PENDING ─wake (outbox sync.available) or reconnect pull─► FETCHING(chunk i/n)
FETCHING ─drop─► FETCHING(resume by chunk)
FETCHING ─done─► VERIFYING ─sha mismatch─► FETCHING (re-download, max N) ─► FAILED
VERIFYING ─ok─► APPLYING (atomic write 0600 into <folder>/data/…; never outside it)
APPLYING ─local file changed since base─► CONFLICT_KEPT (write loser copy) ─► ACKED
APPLYING ─ok─► ACKED ─POST ack─► (server) blob freed when all enabled devices ACKED
```
- **One file at a time:** each device has at most one in-flight upload and one in-flight download. The server claims work with `FOR UPDATE SKIP LOCKED LIMIT 1` per device (027 pattern) and a lease timeout so a crashed client releases its lease.
- **Idempotent:** an offer is keyed by `(project, path, sha)`; a repeat offer of the same sha is a no-op commit. Acks are upserts.

## 5. Conflict policy

- **Last writer wins by server commit order (seq)**. Not client clocks.
- If an upload's `base_seq` ≠ current `head_seq` and the sha differs, the new upload becomes head. The previous head is kept as a sibling file `<name>.conflict-<deviceShort>-<UTC yyyymmddThhmmss>.<ext>` (`outcome='conflict_copy'`), synced to all computers like any file. A receiver whose local file changed since its base does the same locally before overwriting.
- **Chat files never conflict in practice:** one immutable file per messageId, so the same id + same sha is a no-op. A different sha for the same id is a bug, so keep both and flag it.
- **Deletes are tombstones** (`deleted=true`). Delete vs edit → edit wins; the tombstone is dropped and the copy kept.

## 6. Limits

- **Per file: 1 MiB** (proposal). That is 16× the skill-body limit (64 KB) and far above chat JSON (summary ≤ 200 chars, refs ≤ 768 B). Larger files → `REJECTED(too_large)` with a visible reason.
- Per project in-flight blob quota (e.g. 50 MiB) and per device rate limit (reuse the 300/h style).
- Exact values are team defaults, owner-adjustable (same LOCK style as Part C).

## 7. Exclusions

- **Secrets:** scrub first; `residualSecret` → QUARANTINED, never uploaded (`scrubProjectHistorySkillgenSecrets.ts`). The server re-scans (same patterns) and rejects `secret_suspect`.
- Never sync: the token-saver DB, credentials, `.env`, keys, AWL profile files, writer transcripts, raw prompts. **Allowlist** of kinds and paths only (§2).
- **History off:**
  - No `chat` files are offered or applied.
  - On turn-off, the server deletes that project's chat versions/blobs and enqueues `sync.purge {kind: chat}` to every enabled computer.
  - Each computer runs `purgeProjectHistoryOnOff` and deletes `<folder>/data/chat/`.
  - Purge is idempotent and retried on reconnect.
- **Not enabled / removed seat / leave / revoke:** stop all transfers; the device's pending work is cancelled (like `cancelQueuedAgentWitchDispatchOutboxForDevice.ts`). **Q:** also purge `data/` on that computer?

## 8. Auth / ACL

- Device-authenticated AWL routes under `/api/agent-witch/projects/[projectId]/sync/*`, same auth as the existing computer-history ack route.
- Every call checks:
  1. The device is an **active computer seat** in the project (068; `isActiveProjectComputerMemberDevice` via `checkFolderRefDeviceAcl.ts`).
  2. `project_sync_devices.enabled = true` (owner toggle).
  3. A `project_folder_refs` row exists for that device and project.
  4. The path stays under `data/`.
- Only the **owner** flips the per-computer toggle; each flip writes an Access-log row (`project_activity_events`, new types).
- v1 seats are owner devices only (`upsertProjectComputerMembership.ts`), so "every computer is equal" is limited to the owner's computers in v1. **Q:** members' computers later?

## 9. Slices and owners (all after IndexedDB is LIVE)

| # | Slice | Owner |
|---|---|---|
| R1 | Neon tables (§2), per-device toggle + Access-log types, ACL guard, blob store (Neon BYTEA chunks) + TTL prune, outbox prune | **me (cloud relay/API)** |
| R2 | Sync API: offer / chunk upload / commit / changes since seq / chunk download / ack / purge; outbox `sync.available` + `sync.purge` types; presence-based wake | **me** |
| R3 | AWL sync client: sender + receiver FSMs, one-at-a-time worker, resume, sha verify, atomic writes under `<folder>/data/`, conflict copies, `.git/info/exclude` entry for `data/` | **AW Mac** |
| R4 | Chat history as the first kind: `history/` → `chat/`; per-device computer acks feed the Neon prune; History-off purge fan-out | **AW History** (+ me for the ack contract) |
| R5 | Other kinds: skills, Safety rules, knowledge, summaries | AW History + AW Mac |
| R6 | Team › Computers "Sync this computer" toggle, status chips (Syncing · Up to date · Paused · Too large · Blocked: secret), conflict-copy note | **Product** (copy) + Human UI |

## 10. Open questions

1. **Folder vs profile dir.** AWL keeps History in `<profileDir>/project-data/<p>/` (0700) today. Syncing into `<project folder>/data/` puts chat history inside the user's repo. Should it be git-excluded (as token-saver does via `apps/live/features/token-saver/internal/core/writeGitInfoExclude.ts`)? Or should the destination stay in the profile dir, with `data/` as the visible copy only?
2. **Per-file limit:** 1 MiB OK? Per-project quota?
3. **Blob TTL** when a computer stays offline (7 days, then re-request from another computer?).
4. **On disable or leave:** purge `data/` on that computer, or keep it?
5. **Members' computers** as equal stores in a later version?
6. **Safety-rule seeds:** never sync (they ship with AWL), only project rules?
7. **Conflict copies:** is keeping them forever OK, or should they be pruned after N days?
8. **Initial backfill** for a newly enabled computer: full copy from the change log, or from the newest N per kind (chat: last 300 per chat + the rest from another computer)?
