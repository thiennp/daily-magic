# Project messenger API — step 2 (v1)

Activity chat for a project: owner and members talk to bots in one thread per
bot plus a pinned **Whole project** thread. v1 has **no person-to-person
threads**. UX source: `docs/design/project-messenger/spec.md` (design box).
Code: `src/lib/projects/acl/messaging/messenger/` (one function per step;
orchestrators are named `orchestrate*`, `list*`, `open*`, `mark*ForViewer`).

## Endpoints (session)

| Method + path                                                         | Who                                               | What                                                           |
| --------------------------------------------------------------------- | ------------------------------------------------- | -------------------------------------------------------------- |
| `GET /api/projects/:projectId/messenger/threads`                      | owner, member, viewer                             | `{ wholeProject, bots[], canSend }`                            |
| `GET /api/projects/:projectId/messenger/threads/:threadKey`           | owner, member, viewer                             | `{ threadKey, entries[] /* newest-first */, page, error?, canSend }`; query `before`/`limit`; **marks read** on first page |
| `POST /api/projects/:projectId/messenger/threads/:threadKey/messages` | owner, member (viewer **403** `viewer_read_only`) | body `{ text, needsReply? }`                                   |
| `POST /api/projects/:projectId/messenger/threads/:threadKey/read`     | owner, member, viewer                             | unread → 0 (now)                                               |

`threadKey` = bot `membershipId` or `whole`. Unknown key → `404 thread_not_found`.
Send errors: `400` invalid/`summary_too_large`/`forbidden_content`, `403`
`forbidden`/`viewer_read_only`, `409` `naming_required`/`no_bots`, `429` `rate_limited`
(same caps + fields as `project_dispatch`).

Thread list shapes: `wholeProject { lastMessageAt, lastPreview, unreadCount }`,
`bots[] { membershipId, displayName, status, lastMessageAt, lastPreview, unreadCount }`
with `status` = `working | idle | silent`.

Timeline entry: `{ messageId, createdAt, author { kind owner|member|bot, membershipId, displayName }, kind, text, needsReply, inReplyTo, states[] }`;
`states[]` (owner/member messages only) = one chip per bot delivery
`{ membershipId, displayName, state, reason }`, `state` ∈
`received | got_it | working | done | blocked | waiting | no_answer`.

### Thread open / load-older (Meta newest-first)

Query: `before` (opaque cursor) + `limit` (1–100, default 50). First page
(no `before`) is the newest page and marks the thread read up to its newest
visible message.

Response:

```json
{
  "threadKey": "whole",
  "entries": [ /* TimelineEntry, newest-first */ ],
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

Opaque cursor encodes `{ t: createdAt, id: messageId }` (stable). Path: when
`localLive` try History local read (`loadProjectMessengerOlderFromLocal`);
else Neon rows with `created_at` older than the cursor. When load-older
(`before` set) finds nothing in Neon and the project computer is offline →
`error.code = project_computer_offline`. History owns the local reader;
Dispatch ships a stub that returns empty until that tip lands.


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
8. `task.received` / `task.processing` bot rows are state-only (no bubble);
   `peer.*` notices and bot↔bot traffic stay out of the messenger.

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
