# Activity tab ↔ Messenger API wire (Dispatch)

Contract for Human UI layout S3 Activity. **Do not redesign page chrome here** —
reuse `src/features/projects/messenger/*` and drop into the layout shell.

Base: Human UI S2 shell `feat/awc-project-page-layout-s2` @ `41ce167c`
(Overview + S1 tab scaffold; stacks Messenger API/UI + Connect). Lifecycle
landed separately — untouched here.

Activity tab mounts `AwcProjectMessengerSection`. Tab bar badge uses Overview
`sumMessengerUnread` (+ section `onUnreadMaybeChanged` refresh). Overview
attention/recent call `onGotoActivity(threadKey)` → Activity with
`initialThreadKey`.

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

## Owner-computer / This Mac task routing (Dispatch)

**Status (main `423864f9` / S2 stack):** **GAP — Mac membership not in main yet.**

| Piece | Today |
| --- | --- |
| `ProjectMemberKind` | `human` \| `bot` only |
| Messenger assign targets | `loadProjectMessengerBots` (`member_kind = 'bot'`) |
| Inbox peers | Access members with `isAgent` + nickname |
| `POST .../inbox/dispatch` `toMembershipId` | Any **active** membership whose `user_id ≠ actor` (no kind filter) |
| This Mac / Connect | Device identity + `project_device_bindings`; **not** a project_memberships agent seat |

**Needed from Mac/Connect before assignee select can list This Mac:**
1. A project membership for the owner-computer agent (synthetic agent `user_id`, **not** the owner human id — self-dispatch is rejected).
2. Nickname / `project_display_name` (e.g. "This Mac").
3. Prefer `member_kind = 'bot'` (works with existing loaders) **or** a new kind + loader fill of `loadProjectMessengerComputerSeats` (currently returns `[]`).

UI: `messengerTaskAssigneeOptions({ bots, computers })` already accepts computer seats; Human can label `kind: "computer"`.


## Softs deferred (S3-r2 stack)

- **This Mac / owner-computer assignee:** Mac membership not in main yet — see table above.
  UI `messengerTaskAssigneeOptions({ bots, computers })` ready; `loadProjectMessengerComputerSeats` returns `[]` until Mac lands.
- **Deep-link `#activity?mode=task`:** open Activity already in Task composer mode (and optional thread). Shell hash today only selects the tab id — deferred.
- **Overview attention → specific thread:** wire already passes `initialThreadKey` / `onGotoActivity`; Overview still primarily `onGotoTab("activity")` until Product deep-link lands.
- Inbox / Folders / Skills ride-along stay deferred.
