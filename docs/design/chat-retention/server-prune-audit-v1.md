# Server prune: keep newest 300 per chat, ack before prune (v1, research only)

**Owner:** AW server/Neon. **Status:** research and design only. No code.
**Source:** `thiennp/daily-magic` `origin/main` @ `7c9dcc68` (fetched 2026-10-06 ~13:40 CEST), read with `git show` / `git grep`.
**Sequencing (Thien):** IndexedDB persistence (Human UI) ships first. **This prune ships only after IndexedDB is LIVE.**
**Scope (narrowed by AW Lead):** (1) keep-newest-300-per-chat prune replacing delete-on-ack/read, (2) ack before prune, (3) History-off 3-day TTL.
**Not repeated here:**
- Already audited by AW Mac: Clear-all wipes chats; there is no Neon keep-300; delete on ack/read; 3-day TTL.
- Covered by other docs: `docs/design/chat-retention/indexeddb-scout.md` (browser + constants table), `docs/project-message-caps-300.md` (caps, shipped as #243 `5a5d4901`), `docs/project-owner-clear-messages-ui-contract.md` (Clear all, shipped as #242 `4c0faa39`).
- Clear-all → archive belongs to Product + Human UI and is not designed here.

---

## 1. Today's delete paths that the 300-prune replaces (cite)

| Path | Rule today | File:line |
|---|---|---|
| Delete on ack | Addressed recipient acks → outcome row + hard `DELETE` (unless History gate holds it) | `src/lib/projects/acl/messaging/ackProjectMessage.ts:69-91` → `deleteProjectMessageWithOutcome.ts:58-62` |
| Delete on read (DOR) | Ticker every 60 s: up to 100 rows with `read_at IS NOT NULL`, deleted through lifecycle + gate | `deleteReadProjectMessages.ts:17-45`; callers `src/lib/cron/startProjectMessageSilenceTicker.ts:17`, `src/app/api/cron/project-message-silence/route.ts:26` |
| Held-ack finalize | computerAck lands → delete the held (already acked) row | `deleteHeldProjectMessageAfterComputerAck.ts:10-35` |
| History OFF release | Toggle off → delete every held acked row | `releaseProjectMessagesHeldForComputerAck.ts:10-32` (caller `toggleProjectComputerHistory.ts:21`) |
| History-off TTL | `created_at < NOW() - 3 days` AND project not History-ON → `DELETE` (throttled 1 h, opportunistic) | `purgeExpiredProjectMessages.ts:27-55`; `projectMessage.constants.ts:61,97` |
| Whole-project ack | Only this bot's delivery moves; the row stays | `ackProjectMessage.ts:48-62` |

Coupled reads that break once rows are kept:
- **Unread cap** = `COUNT(*)` of *all* project rows (`assertProjectMessageDispatchRateLimits.ts:94-104`, cap 300 at `projectMessage.constants.ts:78-86`). If 300 acked rows are retained, every send gets `unread_cap`. **This must change in the same slice.**
- **Messenger window** = newest 300 rows *per project* (`messenger/loadProjectMessengerRows.ts:27-29`, `PROJECT_MESSENGER_ROW_LIMIT = PROJECT_MESSAGE_UNREAD_CAP` at `messenger/projectMessenger.constant.ts:46`). It should become per chat.
- **Hourly cap** counts rows in the last hour (`assertProjectMessageDispatchRateLimits.ts:58-74`). This is unaffected (keeping rows only makes it more accurate).

## 2. What a "chat" is (needed for the key)

- Rows live in one table, `project_messages` (`db/migrations/045-project-bot-messages-webhooks.sql:21-35`). It has no stored chat or thread column.
- The messenger derives a thread at read time (`messenger/projectMessengerThreadKeyForRow.ts:11-45`): human↔one bot → that bot's membership id; human → whole / bot reply to whole → `'whole'`. **Bot↔bot, system notices and team-label sends get `null` (no thread).**
- Proposal: store a **`chat_key TEXT NOT NULL`**, computed once on insert by one pure function shared with the messenger:
  - `'whole'` for whole-project messages and replies to them.
  - `<botMembershipId>` for human↔bot.
  - `pair:<minId>:<maxId>` for bot↔bot (sorted membership ids).
  - `team:<label>` for team-label sends.
  - `system:<toMembershipId|toUserId>` for system notices.

  Backfill existing rows with the same function. Every row then belongs to exactly one chat, so "per chat" has a meaning for every row, not just messenger threads.

## 3. The prune (replaces delete-on-ack / delete-on-read)

**Rule:** a row is prunable iff **rank > 300 within (project_id, chat_key) by (created_at DESC, id DESC)** AND **ack-before-prune holds (§4)**. Nothing else deletes on age or on ack. Chats themselves (projects, memberships, thread keys, `project_messenger_thread_reads`) are never deleted by the prune.

**Behaviour changes:**
- `ack` stamps `acked_at` only. This is the existing "hold" path, `holdProjectMessageForComputerAck.ts:8-14` (`SET acked_at = COALESCE(acked_at, NOW())`), used for every project instead of only History-ON.
- DOR stamps `read_at` only. The ticker stops deleting.
- `deleteHeldProjectMessageAfterComputerAck` and `releaseProjectMessagesHeldForComputerAck` stop deleting. A late computerAck only makes rows prunable.
- **Unread cap** counts `acked_at IS NULL` (or open deliveries), not all rows.
- **Messenger** loads newest 300 *per chat_key*.

**Single shared helper** (same pattern as `src/lib/projects/acl/activity/trimProjectActivityEvents.ts:8-26`, which keeps newest 500 per project on write):

```sql
-- pruneProjectChatMessages(projectId, chatKey, keep = 300)
DELETE FROM project_messages m
USING (
  SELECT id FROM project_messages
  WHERE project_id = $1 AND chat_key = $2
  ORDER BY created_at DESC, id DESC
  OFFSET $3            -- keep newest 300
) old
WHERE m.id = old.id
  AND <ack-before-prune predicate, §4>
RETURNING m.id;
```

- Write a thin `project_message_outcomes` row per pruned id (`deleted_reason = 'prune_keep_300'`), as today's helper does (`deleteProjectMessageWithOutcome.ts:47-57`). Deliveries and wake attempts go by CASCADE (`045:45`, `053:6`).
- **Index:** `CREATE INDEX project_messages_chat_newest_idx ON project_messages (project_id, chat_key, created_at DESC, id DESC);`. The `OFFSET 300` scan then reads ≤ 300 + N index entries per call.
- **Where it runs:**
  1. **On insert.** Right after a successful insert in the dispatch path, prune that one chat. Hook it where the throttled purge is called today: `dispatchProjectMessage.ts:53`, `dispatchProjectMessageFromOwner.ts:39`, `messenger/orchestrateProjectMessengerSend.ts:47`. This is bounded to one chat and usually deletes 0–1 rows.
  2. **Scheduled sweep** in the existing 60 s ticker (`startProjectMessageSilenceTicker.ts:10-20`, replacing the DOR call). Pick chats with count > 300 that have newly prunable rows (acks arrive after the insert), with a LIMIT of chats per tick.
- **Rerun safety:**
  - The `DELETE` is idempotent: the same predicate on a rerun deletes nothing new.
  - Concurrent inserts can only push more rows past rank 300; nothing inside the newest 300 is ever deleted.
  - Two instances pruning the same chat both compute the same set. Postgres row locks make the second `DELETE` skip already-deleted rows.
  - The outcome insert is `ON CONFLICT (message_id) DO NOTHING` (unique at `056:26`).
  - No advisory lock is needed. An optional `pg_try_advisory_xact_lock(hashtext(project_id||chat_key))` avoids duplicate work only.

## 4. Ack before prune

**Goal:** a row past rank 300 is deleted only when **every enabled long-term store has saved it**. The long-term stores are the owner's AWL with History on, and each computer the owner enabled for sync (see `computer-sync-relay-research-v1.md`). Then nothing is lost before it reaches a computer.

**What exists:**
- `project_message_computer_acks(project_id, message_id, device_id NOT NULL, acked_at)`. Created in `056:33-39` with **`UNIQUE (project_id, message_id)`** (`056:38`); `device_id` added in `060:12-29`.
- Writer: `recordProjectMessageComputerAck.ts:20-25`, which does `ON CONFLICT (project_id, message_id) DO NOTHING`. Route: `src/app/api/agent-witch/projects/[projectId]/computer-history/acks/route.ts`.
- Reader: `hasProjectMessageComputerAck.ts:10-15` (any device). Gate: `gateProjectMessageDelete.ts:16-40`. It only consults acks when History state ∈ `on_configuring | on_ready | degraded` (`projectComputerHistoryStateMachine.ts:62-63`).

**Gap:** the unique key allows **one ack per message for the whole project**. The first computer to ack satisfies the gate for all, so a second enabled computer can miss rows.

**Minimal change:**
1. Replace the unique key with `UNIQUE (project_id, message_id, device_id)` and change the writer's `ON CONFLICT` to match. Keep `project_message_computer_acks_message_idx` (`060:34-35`).
2. Define the **required stores** for a project = the owner's History device(s) when History is ON ∪ devices with sync enabled (the new per-computer toggle; relay doc §3). The prune predicate is then:
   ```sql
   NOT EXISTS (
     SELECT 1 FROM <required_stores(project)> s
     WHERE NOT EXISTS (
       SELECT 1 FROM project_message_computer_acks a
       WHERE a.project_id = m.project_id AND a.message_id = m.id AND a.device_id = s.device_id))
   ```
3. **Empty required set:** no owner computer, History off, no sync. The browser IDB is then the long-term copy (Lead amendment 1, `indexeddb-scout.md` §6). The prune still keeps the newest 300 and deletes older rows. **Question Q1:** is that acceptable, or should Neon keep everything when no long-term store exists?
4. **A store that never acks** (offline computer) blocks the prune for its project. Today's answer for History is "flag + wake after 7 days, never age-delete" (`purgeExpiredProjectMessages.ts:20-26,56`; `PROJECT_COMPUTER_HISTORY_UNSAVED_FLAG_AFTER_DAYS = 7` at `projectComputerHistory.constants.ts:7`). Keep it: rows past 300 stay until acked. Add a hard safety ceiling per chat (e.g. 3,000 rows) that drops the blocking device from the required set with an Access-log line, so one dead computer can't grow Neon forever. **Question Q2:** the ceiling value, and whether dropping a store needs the owner's OK.
5. **Stale ack cleanup:** keep `purgeStaleProjectMessageComputerAcks.ts:8-17` (acks whose message is gone, older than 7 days).

## 5. History-off 3-day TTL

- Today the 3-day TTL deletes **unacked** rows in History-off projects (`purgeExpiredProjectMessages.ts:46-53`). That is age-based deletion of rows that may still be inside a chat's newest 300. It contradicts "Neon deletes only beyond the newest 300", and it can drop messages the browser never loaded (IDB only holds what it fetched).
- **Proposal:** remove the age purge entirely. History off then means "no AWL store is required". It no longer means "delete after 3 days". The count prune (§3) bounds Neon.
- Delivery-side expiry still matters for the protocol ("Unacked messages expire after 3 days" in bot copy, `src/lib/agentAccess/buildProjectAclAgentGuidelineSection.ts:29`). Model it as delivery state (deliveries → `skipped` / blocked after 3 days), not row deletion. **Question Q3:** keep a 3-day *delivery* expiry for bots, or drop it too?
- History **OFF → purge** (`releaseProjectMessagesHeldForComputerAck`) becomes "stop requiring the AWL store". It no longer deletes rows. The AWL side still runs its local purge (`apps/live/features/project-history/internal/core/purgeProjectHistoryOnOff.ts:26-30`).

## 6. Adjacent note (no design)

- Leave/revoke cleanup `src/lib/projects/acl/purgeProjectMembershipData.ts:20-28` hard-deletes every message to/from the leaving member. That deletes the bot's whole thread (a chat). Callers: `applyLeaveProjectMembershipSideEffects.ts:16`, `revokeProjectMembership.ts:47`. **Question Q4:** under the lock, keep those rows (thread stays, member shown as "left")?
- Owner Clear all (`clearAllProjectMessages.ts:41-56`) and project delete (`src/lib/projects/delete/runProjectDeleteTransaction.ts:15-20`, CASCADE) are user actions. Clear all → archive is Product/Human UI's item. **Question Q5:** does the lock forbid user-initiated deletes, or only automatic ones?
- `src/lib/projects/deleteUserProjectsWithoutMacLink.ts` deletes projects (with all their chats). It has **no callers** on main; remove it or guard it.
- `project_message_outcomes` and `agent_witch_dispatch_outbox` have no prune at all (outcomes grow by one row per pruned message).

## 7. Slices (all after IndexedDB is LIVE)

| # | Change | Owner |
|---|---|---|
| P1 | `chat_key` column + pure key function shared with messenger + backfill + index | server |
| P2 | Per-device acks: unique key → (project, message, device); required-stores resolver | server + AW History |
| P3 | Ack/DOR/held/release stop deleting; unread cap counts unacked; messenger per-chat 300 | server |
| P4 | `pruneProjectChatMessages` on insert + ticker sweep; outcome rows; remove the 3-day age purge | server |
| P5 | Safety ceiling + Access-log line when a store is dropped | server + Product (copy) |

## 8. Open questions

- Q1. No long-term store → prune past 300 anyway, or keep everything?
- Q2. Per-chat ceiling when a store never acks; owner OK to drop it?
- Q3. Keep a 3-day bot *delivery* expiry (state only)?
- Q4. Keep a left/revoked member's messages?
- Q5. Are user-initiated deletes (Clear all, project delete) inside or outside the lock?
- Q6. Is "300 per chat" counted including system/lifecycle notices, or only human/bot messages?
