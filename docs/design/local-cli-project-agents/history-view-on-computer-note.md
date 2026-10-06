# History is viewed on the computer (AWL), not on AWC: design note

Status: DESIGN ONLY (docs). No product code, no tests. Lock owner: Thien / AW Lead, 2026-10-06.
Base: origin/main `56bba3e9` (fetched 2026-10-06 ~18:26 Europe/Berlin from `/workspace/daily-magic-a11y`).
Do not touch the B0 worktree `/workspace/daily-magic-history-offpurge`.

Aligns with: `COMBINED-DESIGN.md` § "Chat retention + sync" (locked decisions + merged slices S0–S13)
and `history-chat-retention-note.md`. Those already say:

- Project history / chat archive lives on computers (AWL local store; S5).
- AWC holds no History **archive** content view.
- **S13** = AWL local read API (`/api/local/projects/:id/chats…`) + Messenger "Load older" via the bridge.
- **S8** = IndexedDB (browser short-term cache for live Messenger; **not** the History content view).

## 1. Locked rule

1. Project history lives on the computer(s) in the AWL local store.
2. AWC web (www.agentwitch.com) does **not** render history content. It shows only a History link/tab.
3. History is viewed only in AWL (the local app).
4. Mobile keeps the History tab. Tapping it shows a notice that history is stored on the computer and must be opened there.
5. Soft items defer. B0 continues on its own track (untouched).

## 2. Inventory on origin/main (`56bba3e9`)

Scoped reads only (`git show` / `git grep` on named paths under `src/features/projects/`, `src/app/api/projects/`, `apps/live/`, `apps/mac/`).

### AWC — preference / opt-in (no message bodies)

| Surface | Path | What it does | Matches the lock? |
|---|---|---|---|
| Project detail History section | `src/features/projects/computerHistory/AwcProjectComputerHistorySection.tsx` (+ `awcProjectComputerHistoryCopy.constant.ts`, `hooks/useAwcProjectComputerHistory.ts`) | Owner opt-in **toggle** ("Keep project message history on my Mac"). Note: setup lives in AWL. No list of messages. | Yes for content (preference only). Not the History **tab**. |
| Settings History row | `src/features/projects/settings/AwcProjectSettingsHistoryRow.tsx` (+ `projectPageSettingsCopy.constant.ts`) | Read-only switch display of Local preference; click → toast "Toggle this in AgentWitch Local…". No content. | Yes for content. |
| Computer-history API | `src/app/api/projects/[projectId]/computer-history/route.ts` (+ `requestProjectComputerHistory.ts`, `orchestrateProjectComputerHistory`, `toProjectComputerHistoryResponse`) | GET/PATCH opt-in **state** only (`state` ≠ `"off"` → enabled). No message/skill bodies. | Yes (metadata/preference). |
| Computer-history acks (AWL→cloud) | used from AWL `postProjectMessageComputerAck.ts` → `/api/agent-witch/projects/…/computer-history/acks` | Sync ack path for computers, not a browser History view. | Out of History-view scope. |

### AWC — live Messenger / Activity (short-term chat, not the History archive view)

| Surface | Path | What it does | Matches the lock? |
|---|---|---|---|
| Activity tab | `projectPageTabs.constant.ts` / `projectPageV5Tabs.constant.ts` → tab `"activity"` ("Every conversation, newest first.") | Centre tab; mounts Messenger. **No `"history"` tab id exists today.** | Lock wants a History **tab/link** (S14). Activity stays live Messenger. |
| Messenger UI | `src/features/projects/messenger/AwcProjectMessengerSection.tsx` (+ ThreadList, Timeline, hooks, `fetchMessengerThread(s).ts`) | Renders live conversation timelines from cloud. | Live chat, not History archive. Retention: Neon ≤300 (S6) + future IDB (S8) + Load older via S13. |
| Messenger thread GET | `src/app/api/projects/[projectId]/messenger/threads/[threadKey]/route.ts` → `openProjectMessengerThread` → `loadProjectMessengerRows` (`PROJECT_MESSENGER_ROW_LIMIT`, today 300 **per project**) | Returns **message bodies** to the browser for live Activity. | Allowed for the short-term window. Must **not** grow into a full-archive History API (S16). Load-older past Neon moves to S13. |
| Messenger send POST | `…/threads/[threadKey]/messages/route.ts` | Send only. | N/A. |

### AWC — no dedicated History content view found

- No `ProjectPageTabId` / V5 tab named `history`.
- No AWC page/component that lists archived chats, pages older-than-Neon messages as a History browser, or skillgen drafts-under-review as a History panel.
- Library skill draft fields (`AwcProjectLibrarySkillFields.tsx`) are Library compose, not History archive.

### AWL — local History UI today

| Surface | Path | What it does | Gap |
|---|---|---|---|
| Nav "History" → `/history` | `apps/live/features/shell/…/buildAgentWitchLocalAppShell.ts` (`href: "/history", label: "History"`); route in `startAgentWitchLocalApp.ts` | Serves **estimate / run-time history** via `buildAgentWitchLocalEstimateHistoryPageBody` (`apps/live/features/tasks/…`). **Not** the project chat archive viewer. | S15 needs a real chat/skill-draft History viewer (new or replace/extend this nav target carefully so estimate history is not lost). |
| Durable store (no UI) | `apps/live/features/project-history/` (`writeProjectHistoryMessage`, `readProjectHistoryMessage`, `handleProjectMessageHistoryDispatch`, tick) | Writes/reads `history/<messageId>.json`; skillgen; Share pull. No list/page UI for humans. | S15 + S13 read API. |
| Deep-link scheme | `apps/mac/…/MacAppConstants.swift`: `bootstrapURLScheme = "agentwitch-local"`; callback host `install` only | Handles `agentwitch-local://install…`. Unsupported paths show `unsupportedConnectDeepLinkReason`. | **No History deep-link path on main → TBD for AW Mac** (extend `agentwitch-local://…` or open `http://127.0.0.1:43347/…`). |

## 3. Gap vs the lock

| Lock item | Today (`56bba3e9`) | Gap |
|---|---|---|
| AWC History tab/link, no content | **No History tab.** Preference toggle + Settings row only. | **S14**: add History tab/link that does not fetch/render archive content; desktop deep-link/instruction; mobile notice. |
| AWC must not render History archive content | **Does not.** No archive list/UI. | Closed for archive. Keep it that way. |
| Live Messenger may show recent Neon (+ later IDB) | **Yes** (Activity). | Keep; "Load older" → S13 (already planned). Do not call this the History view. |
| Viewing archive requires AWL | Store exists; **no chat History viewer** (AWL `/history` = estimates). | **S15**. |
| No history bodies to browser beyond short-term | Messenger GET returns live bodies (≤ limit). No archive API to browser. | **S16**: keep archive off the web; do not add History-content cloud endpoints for AWC; after S6, Load-older must not pull pruned archive from Neon. |

**Answer: does AWC currently render History content?**  
**No** (no History archive content view). Paths that touch "history" are opt-in/preference only (`AwcProjectComputerHistorySection`, `AwcProjectSettingsHistoryRow`, `/api/projects/…/computer-history`). Live **Activity/Messenger** renders short-term message bodies (not the History archive).

## 4. Slices (continue Mac numbering after S13)

| Slice | What | Owner | Deps |
|---|---|---|---|
| **S14** AWC History tab = link only | Add History tab/link that fetches and renders **no** archive content. Desktop: deep-link into AWL (**scheme path TBD Mac**) or "Open in AgentWitch on your computer"; fallback download if AWL missing. Mobile: tap → notice sheet (no content navigation). Does not remove Activity/Messenger. | AW Human UI | S0 strings (Product); S15 for deep-link target (instruction-only desktop OK earlier) |
| **S15** AWL History viewer | In AWL: list project chats; page older messages via **S13** local read API; show skill drafts under review (Part B draft lifecycle) when present. Read-only. Uses local store (S5), not cloud. Distinct from today's estimate `/history` page (keep or relocate estimates). | AW Mac | S13, S5 |
| **S16** No history bodies to the browser | Audit: Messenger/Neon stay short-term only. No cloud endpoint serves the full chat/skill archive to AWC. Web never calls archive APIs. After S6 prune, older-than-window content is AWL-only (S13). Preference APIs (`computer-history` state) remain. | AW History (contract) + API owner (NRG AgentWitch / Dispatch for messenger routes) | S14 (no web History callers); S5; S6/S13 |
| **S5** (existing, extended) | Local record/index also covers S15 needs: chat list, cursor paging, draft status. | AW History | — |
| **S0** (existing, extended) | Copy: History tab label, mobile notice, desktop open/not-installed strings. | Product | — |
| **S8 / S13** (unchanged roles) | S8 = IDB short-term cache, not History view. S13 = local read + Messenger Load older. | as today | as today |

Order: S0 copy + S5 contract → S13 → S15 → S14 (link can ship earlier instruction-only) → S16 after web has no History content callers.

## 5. Deep-link (TBD Mac)

On main, registered scheme is **`agentwitch-local`** (bootstrap `…://install` only). No History path.

Candidates for Mac to pick in S15:

- `agentwitch-local://history?project=<id>` (extend the existing scheme), or
- open the local app HTTP UI `http://127.0.0.1:43347/…` once S15 has a route.

Until Mac locks one, S14 desktop uses instruction + download CTA only.

## 6. Draft strings (Product owns; finalize in S0)

- Tab: "History"
- Mobile notice title: "History is on your computer"
- Mobile notice body: "Project history is stored on your computer. Open AgentWitch on that computer to view it."
- Desktop: "Open History in AgentWitch"
- Not installed: "History is stored in the AgentWitch app on your computer. Download the app to view it."

## 7. Out of scope

- Product code / tests (docs only).
- B0 worktree (`/workspace/daily-magic-history-offpurge`).
- Soft items (deferred).
- Cross-computer merge (retention design).
- Replacing live Activity/Messenger with the History tab.
