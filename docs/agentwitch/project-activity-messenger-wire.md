# Activity tab ↔ Messenger API wire (Dispatch)

Contract for Human UI layout S3 Activity. **Do not redesign page chrome here** —
reuse `src/features/projects/messenger/*` and drop into the layout shell.

Base: main tip that includes Messenger API `3af3cdb2` + UI `f5db55b1` (and later).
Lifecycle FSA (`feat/awc-message-lifecycle-fsa`) stays untouched.

## UX modes (artifact Activity)

| Mode | UI | API |
| --- | --- | --- |
| **Message** (`Nhắn tin`) | textarea + “Needs a reply” | `POST /api/projects/:id/messenger/threads/:threadKey/messages` body `{ text, needsReply? }` |
| **Assign task** (`Giao việc`) | assignee, optional kind, summary ≤200, refs | `POST /api/projects/:id/inbox/dispatch` body `{ toMembershipId, summary, kind?, refs? }` |

`threadKey` = bot `membershipId` or `whole`. Task assignee prefills from the open bot thread; whole-project requires an explicit assignee.

## Unread badge + “ack on open”

| Concern | Real behaviour |
| --- | --- |
| Tab badge | `sumMessengerUnreadCount(threads)` = `wholeProject.unreadCount + Σ bots.unreadCount` |
| Open thread | `GET .../messenger/threads/:threadKey` **marks the thread read** (unread → 0) |
| Explicit mark | `POST .../messenger/threads/:threadKey/read` via `markMessengerThreadRead` (Human shell / Overview deep-link without loading messages) |
| Not bot ack | Mark-read **never** acks deliveries / DOR / History — lifecycle FSA owns that |

## Caps / refs (same as `project_dispatch`)

- summary max **200** chars
- refs max **768** bytes JSON; keys only `prUrl` \| `commitSha` \| `localPath` \| `allowClaimId` (value ≤256)
- default caps 300/hour rolling + 300 unread
- empty task kind → server default `task.assign`
- Owner addressed as display name `"Owner"` on the wire; humans pick bots by `toMembershipId`

Client gate: `validateMessengerTaskDraft` + `sendMessengerTask`.

## Drop-in for Human shell

| Export | Use |
| --- | --- |
| `AwcProjectMessengerSection` | Full Activity panel (threads + timeline + dual composer). Prop `initialThreadKey` for Overview attention → Activity |
| `sumMessengerUnreadCount` | Activity tab alert badge |
| `markMessengerThreadRead` | Deep-link mark-read without mounting the timeline |
| `messengerBotAssigneeOptions` | Assignee select from thread-list bots |
| `defaultMessengerTaskAssignee` | Prefill when `threadKey !== "whole"` |
| `AwcMessengerComposer` | Message \| Assign task host (if shell owns chrome) |

Overview “recent activity” / “open conversation” should call `showTab('activity')` + pass `initialThreadKey=<membershipId>`.

## Out of scope / park for Human

- Project page tab bar / sidebar / Overview chrome redesign
- Vietnamese mock strings (shipped messenger copy stays English; Human may localize)
- Lifecycle / History / delete-on-ack FSA
