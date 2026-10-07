# Project messenger API — step 2 (v1)

Activity chat for a project: owner and members talk to bots in one thread per
bot plus a pinned **Whole project** thread. v1 has **no person-to-person
threads**. UX source: `docs/design/project-messenger/spec.md` (design box).
Code: `src/lib/projects/acl/messaging/messenger/` (one function per step;
orchestrators are named `orchestrate*`, `list*`, `open*`, `mark*ForViewer`).

## Endpoints (session)

| Method + path                                                         | Who                                               | What                                                                                                                       |
| --------------------------------------------------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `GET /api/projects/:projectId/messenger/threads`                      | owner, member, viewer                             | `{ wholeProject, bots[], canSend }`                                                                                        |
| `GET /api/projects/:projectId/messenger/threads/:threadKey`           | owner, member, viewer                             | `{ threadKey, entries[] /* newest-first */, page, error?, canSend }`; query `before`/`limit`; **marks read** on first page |
| `POST /api/projects/:projectId/messenger/threads/:threadKey/messages` | owner, member (viewer **403** `viewer_read_only`) | body `{ text, needsReply? }`                                                                                               |
| `POST /api/projects/:projectId/messenger/threads/:threadKey/read`     | owner, member, viewer                             | unread → 0 (now)                                                                                                           |

`threadKey` = bot `membershipId` or `whole`. Unknown key → `404 thread_not_found`.
Send errors: `400` invalid/`summary_too_large`/`forbidden_content`, `403`
`forbidden`/`viewer_read_only`, `409` `naming_required`/`no_bots`, `429` `rate_limited`
(same caps + fields as `project_dispatch`).

Thread list shapes: `wholeProject { lastMessageAt, lastPreview, unreadCount }`,
`bots[] { membershipId, displayName, status, lastMessageAt, lastPreview, unreadCount }`
with `status` = `working | idle | silent`.

Timeline entry: `{ messageId, createdAt, author { kind owner|member|bot, membershipId, displayName }, kind, text, needsReply, inReplyTo, states[], entryKind?, session? }`;
`states[]` (owner/member messages only) = one chip per bot delivery
`{ membershipId, displayName, state, reason }`, `state` ∈
`received | got_it | working | done | blocked | waiting | no_answer`.

**`entryKind` (additive):** omit or `"message"` = chat row (today). `"session"` = AI
session from Neon `agent_runs` (Whole thread only). Do **not** overload `kind` —
message subtypes stay on `kind` (`chat.note`, `task.assign`, …); sessions use
`kind: "ai.session"`.

**`session` (when `entryKind === "session"`):** `{ status, writerAgent, agentRunId }`.
Neon rows always set `agentRunId` (= raw run id = `messageId`) so Human UI can
show Open report. Cursor `id` is the raw run UUID (same UUID space as
`project_messages.id`; no prefix). Cursor `t` = run `createdAt`.

### Thread open / load-older (Meta newest-first)

Query: `before` (opaque cursor) + `limit` (1–100, default 50). First page
(no `before`) is the newest page and marks the thread read up to its newest
visible message.

Response:

```json
{
  "threadKey": "whole",
  "entries": [/* TimelineEntry, newest-first */],
  "page": {
    "beforeCursor": "<opaque>|null",
    "hasMore": true,
    "source": "local|neon|mixed|exhausted",
    "localLive": false
  },
  "error": {
    "code": "project_computer_offline",
    "message": "Connection to the project computer was lost."
  },
  "canSend": true
}
```

Opaque cursor encodes `{ t: createdAt, id: messageId }` (stable; for sessions
`id` = raw `agent_runs.id`, `t` = run `createdAt`). Path: when `localLive` try
History local read (`loadProjectMessengerOlderFromLocal`); **always** also load
Neon. `resolveProjectMessengerLoadPage` merges local + Neon newest-first — so if
the in-process local slice is empty (e.g. hosted Railway disk has no AWL
`project-data`) Neon still fills the page (including sessions). Neon Whole
thread merges `project_messages` + `agent_runs WHERE project_id` (sessions
`entryKind: "session"`); bot threads stay messages-only. When load-older
(`before` set) finds nothing in Neon and the project computer is offline →
`error.code = project_computer_offline`. History owns the local reader
(`readProjectHistoryMessagesPage` / `loadOlderProjectHistoryMessages`); Dispatch
calls it via `loadProjectMessengerOlderFromLocal` when `localLive`.

## Bot tool (MCP)

`project_messenger_reply { projectId, summary, kind?, inReplyTo? }` — active
**bot** seats only (humans → `forbidden`). Goes through `project_dispatch`
(same nickname/scope/caps). Address: the human member who sent `inReplyTo`,
else `Owner`. The parent id is put in the summary (`<id>: …`), the existing
reply convention, because refs cannot carry it. Plain `project_dispatch`
replies to Owner with the id in the summary link the same way. Allowed on
`awc_proj_` keys. No idempotency key (same as `project_dispatch`).

## Decisions (evidence: current code)

1. **Whole project = ONE `project_messages` row** with no single address
   (`to_membership_id`, `to_user_id`, `to_team_label` all NULL) and one
   `project_message_deliveries` row per active bot (`member_kind = 'bot'`).
   No other writer stores all-NULL addressing. Bots see it in
   `list_project_inbox` via their delivery row (one `OR EXISTS` in the inbox
   query). `ack_project_message` on it moves only that bot's delivery to
   `acked`; the row stays for the other bots' chips.
2. **Same send path for owner and member**: `insertProjectMessageWithDeliveries`
   (store + webhook + Grok wake) after the shared post gate
   `decideProjectMessagePostAccess` and `assertProjectMessageDispatchRateLimits`.
3. **Needs a reply** = kind `task.assign` + the existing silence watch
   (`startProjectMessageSilenceWatch`, accepted wakes only). Off = kind
   `chat.note`, no watch. Owner sends now get the watch too; the existing
   `checkProjectMessageSilence` ticker applies the 5/10 min edges to them
   (no inbox notice for the owner — the chip shows it). **No second timer.**
4. **Bot replies move state** through the existing machine. Owner has no
   membership, so `recordProjectOwnerThreadActivity` is the owner twin of
   `recordProjectPeerActivity`, called from `orchestrateProjectBotToBotMessage`
   when a bot dispatches to `Owner`.
5. **State mapping** (`mapProjectMessengerDeliveryState`): `dispatched`→received,
   `awaiting_first_activity`/`silent_5m_notified`→waiting,
   `processing`/`status_reporting`→working (→ got_it when the bot's latest
   linked reply is `task.received`), `done`, `blocked` (+ reason = linked
   `task.blocked` text), `blocked_silent_10m`→no_answer (**final**; a late
   reply is a new bubble), `acked`→got_it. Unwatched: follow the linked reply,
   else waiting (Needs a reply) / received.
6. **Status**: working if any live delivery to the bot is `processing` /
   `status_reporting`; silent if its newest watched delivery is
   `blocked_silent_10m` or its latest Grok wake result is not `http_2xx`;
   else idle.
7. **Unread** per (user, project, threadKey) in `project_messenger_thread_reads`
   (migration **065**; 064 is the email-lock branch, 059–061 History).
   Opening a thread marks read up to its newest visible message. Own messages
   never count. Marking read never stamps `project_messages.read_at` and
   never acks: actionable rows still need the bot's ack (DOR rules unchanged).
8. `task.received` / `task.processing` bot rows are state-only (no bubble).
   `peer.*` / lifecycle notices stay out of the thread list / snapshot; the
   thread GET returns them as notice rows (item 10).
9. **Bot↔bot rows (DF-023, owner only)**: when the viewer is the project
   owner, every bot→bot (or bot→team label) `project_dispatch` row joins the
   Whole project timeline with an additive `peer: { toMembershipId,
toDisplayName, toTeamLabel }` field (state-only kinds included). UI renders
   a compact line "Kai → AW Lead · Status update · summary" with a
   "Between assistants" show/hide chip (default shown). These rows never move
   state chips and never count toward preview / unread. Members and viewers
   get exactly what they got before (no bot↔bot rows). Read gate:
   `resolveProjectMessengerViewer().isOwner` → `includeBotToBot` on the Neon
   page. Live updates ride the same thread poll. Local History (AWL) indexes
   bot↔bot records under the recipient bot's thread (heuristic) — not merged
   into Whole yet (see DF-023 report).

10. **Thread rows: notices, grouping, archive meta** (thread GET only;
    additive, worked out at read time, no migration, no bodies to Neon).
    Every entry of `GET …/messenger/threads/:threadKey` now carries:

    | field             | type                                                        | meaning                                                                                                                                                 |
    | ----------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `author.kind`     | `"owner" \| "member" \| "bot" \| "system"`                  | `"system"` only on server notices (no sender seat)                                                                                                      |
    | `windowKind`      | OW9 enum                                                    | now also `"notice"` and `"bot_to_bot"` rows                                                                                                             |
    | `subjectState`    | OW9 object \| null                                          | null on notice / bot_to_bot rows                                                                                                                        |
    | `peer`            | `{ toMembershipId, toDisplayName, toTeamLabel }` (optional) | DF-023 bot↔bot rows (owner only)                                                                                                                        |
    | `parentMessageId` | `string \| null`                                            | parent row id (DESIGN `parent_message_id`), read from the reply convention (= `inReplyTo`). May point at an older page or a removed row                 |
    | `replyIds`        | `string[]`                                                  | ids of this row's direct replies **in this response**, oldest first                                                                                     |
    | `archived`        | `{ at, byUserId, byDisplayName } \| null`                   | Clear all meta (`archived_at` / `archived_by`, seat name; `"Owner"` for the owner). null when not archived, and always on local (AWL) / AI-session rows |

    Order stays newest first and nothing else changes, so the flat list UI
    renders as before; a grouped UI nests rows by `parentMessageId` across the
    pages it has loaded (`replyIds` is a per-page hint).
    Notice rows (`windowKind: "notice"`): server notices (`peer.silent`,
    `peer.silent_blocked`, `composer.recipient_sticky_cleared`, any row with no
    sender seat) and lifecycle `peer.joined` / `peer.left` / `peer.renamed`.
    Visibility: lifecycle → the owner's copy only (one row per event, every
    viewer); silence notices → owner only (whoever was told); other server
    notices → owner only, owner-addressed. A notice that names a message id
    sits in that message's thread, else Whole project. Notices never move
    delivery chips and never count toward preview / unread (the thread list
    does not load them). Bot↔bot rows stay owner only (item 9) and now
    classify as `windowKind: "bot_to_bot"`.

11. **Feed copies of direct sends, task-update states, approval ids** (thread
    GET only; additive, read time, no migration, no bodies to Neon).

    | field                         | type                                      | meaning                                                                                                                                                                                                                                                                                                                                       |
    | ----------------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `toMembershipIds`, `toLabels` | `string[]` (optional, same order)         | Whole project only: a human message sent to specific assistant(s) (kept recipient, POST to that assistant's thread). It stays in the assistant thread and also shows in Whole project with these set; labels are seat names (fallback `"Assistant"`). Absent = sent to everyone. Same `messageId` and state chips as the assistant-thread row |
    | `subjectState` (task_update)  | `source: "reply_kind"`                    | `task.received` → `status: "queued"`, `task.processing` → `"running"`, `task.status` → `"running"` (+ `done`/`of` when its summary states progress: `"3/5"` → 3/5, `"40%"` → 40/100), `task.done` → `"done"`, `task.blocked` → `"blocked"` (needsYou)                                                                                         |
    | `windowKind` approval         | `"approval_request" \| "approval_result"` | AI session row whose run is `pending_approval` → request; `denied` / `expired` → result (an approved run is a plain `task` again). Reserved message kinds `approval.request` / `approval.result` (no writer yet) classify the same way                                                                                                        |
    | `approvalId`                  | `string` (approval rows only)             | `agent_runs.id`: `POST /api/projects/:projectId/access/run-approvals/:approvalId/approve` \| `…/decline` (project owner = executor). For reserved `approval.*` message rows it is the first id in the summary (`"approval <runId>"`)                                                                                                          |

    Bot replies to a direct send stay in the assistant's thread. Thread list,
    unread counts and previews do not count the Whole project copies.

## Known limits (v1)

- **Thin retention**: the timeline shows live rows only. Ack, delete-on-read
  and the 3-day TTL remove message text (outcome rows keep no summary). Until
  the DOR ack-required tip lands, a read unwatched message can be deleted on
  the next tick. Durable chat history needs a product call (see tip report).
- **Browser copy (IndexedDB `awc-chat`)**: Human UI writes every opened
  thread through to IndexedDB (store `messengerChats`, key
  `projectId:threadKey`, `projectId` index) and paints it first on open, so
  rows the server already removed stay visible in that browser. A message
  leaves the browser only when it is BOTH older than 1 week AND outside the
  newest 1000 for that chat AND confirmed stored on a computer (no such
  per-message signal on the wire yet, so nothing trims today). Projects with
  no owner computer (`deviceId` null) never trim and show an (i) hint that
  adding a computer is safer. There is no delete / clear path: chats are
  never wiped. Store `keptRecipients` (per project chat per member) caches
  the composer kept recipient; server value wins once Dispatch persists it.
- Live updates: poll the thread list / open thread (same as the Inbox); no
  websocket.
