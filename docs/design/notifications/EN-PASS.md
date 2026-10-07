# Product EN — AgentWitch Notifications (header-bell inbox)

- Source HTML: `/workspace/agentwitch/docs/design/notifications/AgentWitch-Notifications.html` (**208775** bytes; mtime **07:46 CEST** 2026-10-07)
- Title tag: **AgentWitch – Notifications**
- Brief: `CLAUDE-BRIEF.md` (canonical HARD)
- Reviewed: 2026-10-07 ~**07:48 CEST** (Europe/Berlin) — Product EN on latest Claude re-export (ignore prior ~389785 / 07:43 size note)
- This surface is the **header-bell inbox**, not Account → Notifications prefs

## Verdict: **EN PASS**

Hard shell and copy bar clear on this export. Soft needles remain; locked rules win over HTML where noted.

**Soft HOLD Soft-claim:** only after Soft LOCK delete/leave tip **`909446bf` RELEASE**; stacks with Account + laneCompare. **Do not Soft-claim** from this EN while that Soft LOCK tip remains held. Soft HOLD recommendation alone is not a Soft-claim.

---

## File identity

| Field | Value |
|-------|-------|
| Bytes | **208775** (complete `</html>`; not truncated vs brief page contents) |
| mtime | 2026-10-07 **07:46** CEST |
| `<title>` | AgentWitch – Notifications |
| vs NRG earlier size note | Prior ~389785 ignored per Lead; score this 07:46 overwrite only |

---

## HARD checklist (brief + Product rules)

| # | Rule | Result | Evidence |
|---|------|--------|----------|
| 1 | AgentWitch one word (never “Agent Witch”) | **PASS** (needle) | `<title>` + wordmark OK; CSS comment soft only |
| 2 | Prefer assistant over bot | **PASS** (needle) | Body/cards use **assistant**; nav **My bots** leftover OK |
| 3 | Prefer computer / This computer | **PASS** | `compName('here')` → This computer; no Mac/machine as generic UI nouns |
| 4 | Marketplace always visible in primary nav | **PASS** | Winning `NAVL` includes Marketplace |
| 5 | Connect always visible in primary nav | **PASS** | Winning `NAVL` includes Connect |
| 6 | Automations always visible in primary nav | **PASS** | Winning `NAVL` includes Automations after Connect |
| 7 | Download AgentWitch Local when computer Online/connected | **PASS** | Devices `#dl-local` always rendered; default `S.comp: 'online'` |
| 8 | Approval buttons Approve / Deny | **PASS** | `apButtons` → Approve / Deny (+ confirm Deny); no Reject/Decline as deny verbs |
| 9 | No jargon: API, MCP, OAuth, token, CLI, writer, agent run | **PASS** | MCP/OAuth/CLI/writer/agent run absent; “tokens” = CSS design tokens only; “declined” = payment card copy only |
| 10 | Filters All / Unread / Approvals | **PASS** | `FILTERS = [['all','All'],['unread','Unread'],['approvals','Approvals']]` |
| 11 | Title Notifications; Mark all read; empty/loading/error + Try again | **PASS** | `#page-h` + bell popover; Mark all read; EMPTY + skel + `errBox` / Try again |
| 12 | Notification settings → Account (prefs) | **PASS** | Links to `URLS.account` with sr “on your Account page”; tip only — no prefs UI invented here |
| 13 | Approval kinds: join/access + computer run; timed-out/waiting honest | **PASS** | join + run cards; Waiting for you / Timed out / Denied / Approved; timeout toast |
| 14 | Clear: header-bell inbox ≠ Account Notifications prefs | **PASS** | Inbox + crumb Inbox; settings tip points to Account |
| 15 | Never hide live Access pending (orientation only OK) | **PASS** | Tip: join requests also stay in project Access; approving either place same |
| 16 | Signed-out Sign in gate | **PASS** | Gate: Sign in to see your notifications + Sign in CTA |
| 17 | No Project Connections OAuth invented | **PASS** | No Slack/Linear/Gmail/GitHub Connections OAuth on this page |

---

## Shell checklist (must keep working)

| Item | In winning signed-in shell? |
|------|----------------------------|
| Marketplace | **Yes** (`NAVL`) |
| Connect | **Yes** (`NAVL`) |
| Automations | **Yes** (`NAVL`) |
| Download AgentWitch Local | **Yes** (Devices `#dl-local`; visible when Online) |
| My bots / New task / Home / Projects | **Yes** |

Winning list: Home → Projects → Marketplace → Connect → **Automations** → My bots → New task.

Early dead `const NAV` / first `renderSide()` omit Connect / Automations / Download — overridden by later `function renderSide()` + `NAVL` (same pattern as Account). Ship one shell list only (soft).

---

## Page contents scores (brief § Page contents)

| # | Section | Score | Notes |
|---|---------|------:|-------|
| 1 | Header bell → popover + full page | **10** | Bell + `#bell-pop` + expanded Notifications page |
| 2 | Title Notifications; filters All/Unread/Approvals | **10** | Both popover + page filter bars |
| 3 | List rows: unread/read, relative time, project | **10** | Rows + approval cards |
| 4 | Empty states per filter | **10** | All / Unread / Approvals copy |
| 5 | Approval cards Approve/Deny (+ Deny confirm) | **10** | Join + computer run; optional confirm |
| 6 | Mark read / Mark all read | **10** | Row + Mark all read (popover + page) |
| 7 | Notification settings → Account | **10** | Link + tip; not prefs redesign |
| 8 | Loading / error + Try again | **10** | skel, errBox, older-load retry |
| 9 | App shell Marketplace/Connect/Automations/Download Local | **10** | Winning `NAVL` + `#dl-local` |
| 10 | Responsive 1440 / 1100 / 768 / 390 | **9** | Breakpoints incl. 1100 / 900 / 760 / 700 / 560 / 520; no sideways-scroll invent |

**Must keep working shell:** **PASS**

---

## Soft needles (non-blocking)

1. CSS comment `Agent Witch design tokens` → `AgentWitch design tokens`
2. Nav label **My bots** → prefer Assistants when other shells already moved
3. Dead early `NAV` / first `renderSide()` (no Connect / Automations / Download) overridden by winning `NAVL` — ship one shell list only
4. Older shared-shell comment omits Connect / Automations — comment drift only
5. Cursor Cloud disconnect copy still says **Bots** — soft; prefer assistants
6. Payment note “card … was declined” is billing English, not approval Deny invent — OK
7. Signed-in Download is Devices-rail `#dl-local`; signed-out uses topbar Download — OK (and/or satisfied)

---

## Soft HOLD / Soft land

| Gate | Status |
|------|--------|
| EN PASS | **Yes** |
| Soft LOCK tip `909446bf` (delete/leave) | Soft-claim **only after RELEASE** |
| Soft HOLD Notifications now? | **Recommend yes after tip `909446bf` RELEASE** — then Soft HOLD / stack with Account + laneCompare |
| Soft-claim Notifications | **No** — not authorized this pass while Soft LOCK tip held |

---

## Human UI can Soft HOLD / build?

**EN PASS — Soft HOLD Soft-claim only after Soft LOCK tip `909446bf` RELEASE** (stacks with Account + laneCompare). Use brief + this EN. Never hide Marketplace, Connect, Automations, or Download AgentWitch Local. Do not Soft-claim while that tip remains held.
