# Human UI build prep — Account + laneCompare (stacked)

**Docs only.** No code / Soft claim / Soft HOLD until Soft land tip `4fe6e5b2` RELEASE.  
**EN PASS:** Account CORRECT v2 (07:12 CEST 2026-10-07). laneCompare LOCK ready (Thien HARD ~06:37).  
**Sources of truth:** `LOCK.md` + `EN-PASS.md` + `COPY.md` beat HTML where they conflict. laneCompare: `../local-cli-project-agents/COPY-S0-A-B-C.md` §2a + `DESKTOP-APP-CONNECT-EN.md` + `COMBINED-DESIGN.md` Part A.

---

## (a) Account page — sections + EN copy

Global user Account (avatar menu), **not** a project tab. Tabs from `COPY.md` / HTML `TABS`.

### Chrome
| Surface | EN | Source |
|---------|----|--------|
| Breadcrumb | Account › {tab} | COPY Account chrome |
| h1 | Account | COPY / LOCK |
| Tip | Your name, how you sign in, what we email you, and your data. Plans and billing live on the Pricing page. | COPY |

### Tab: Profile (`profile`)
| Key / surface | EN | Source |
|---------------|----|--------|
| h2 | Profile | COPY |
| Fields | Display name · Email (Verified) · Time zone (24-hour, like 14:30) | COPY |
| Tip display name | Shown to people in your projects and companies. | COPY |
| Actions | **Save name** · Cancel · **Change email** · Avatar color radios | COPY |
| Plan h2 + chip | Your plan · Pro / Team / Free trial / Free / No plan yet | COPY |
| Plan CTA | **Start your free month** (no plan) · **Manage plan and billing** (paid/trial) | COPY |
| Plan help | Plans, seats, invoices and cancelling are on the Pricing page. **Cancel anytime.** Prices in **USD**. | COPY / LOCK Pricing |

### Tab: Sign-in and security (`security`)
| Surface | EN | Source |
|---------|----|--------|
| h2 | How you sign in | COPY |
| Tip | You can use an email code or Google. There is no password to remember or leak. | COPY |
| Email code | We send a 6-digit code to {email} each time you sign in. · Always available | COPY |
| Google | Linked: {email} / Not linked. Sign in with one tap. · **Link Google** / **Unlink** | COPY |
| h2 sessions | Where you are signed in | COPY |
| Tip sessions | Browsers and AgentWitch apps that can use your account. Signing out an app on a computer pauses its assistants until you sign in again. | COPY |
| Actions | **Sign out everywhere else** · per-row **Sign out** · chip **This browser** | COPY |
| Empty | No other sessions — You are signed in only on this browser. | COPY |

### Tab: Notifications (`notify`)
| Surface | EN | Source |
|---------|----|--------|
| h2 | What we tell you | COPY |
| Tip | Choose email and in-app notes for each event. Changes save as you go. | COPY |
| Columns | Event · Email · In app | COPY |
| CTA | **Send a test email** / Test email sent | COPY |
| Row task | A task finishes — A short note when an assistant finishes a task. | COPY |
| Row approval | An assistant needs your approval — When a rule or automation says to ask first. | COPY |
| Row digest | Weekly digest — Mondays at 09:00. What your assistants did last week. | COPY |
| Row invites | Invites and access requests — When someone invites you or asks to join your project. | COPY |
| Row billing | Billing and trial reminders — Receipts, failed payments and when your trial ends. · lock: Billing emails cannot be turned off. | COPY |
| Quiet hours h2/tip | Quiet hours · No emails or in-app notes during these hours. Approvals wait until quiet hours end. | COPY |
| Quiet fields | From · To · Quiet from {from} to {to} ({tz}). / Quiet hours are off. | COPY |

### Tab: Privacy and data (`privacy`)
| Surface | EN | Source |
|---------|----|--------|
| h2 history | Your history stays on your computers | COPY |
| Tip + body | Tasks, replies and files are stored on the computer where an assistant ran them. The website only shows a notice. · AgentWitch does not keep your task history on its servers. Open AgentWitch on this computer to read it. Deleting your account does not touch files on your computers. | COPY |
| Export h2/body | Export your account data · We email a download link to {email} within 24 hours. It includes your profile, billing records, and your projects and companies. It does not include history, which stays on your computers. | COPY |
| Export CTA | **Request export** / Export requested | COPY |
| Delete h2/tip | Delete your account · Your account is removed after 7 days. You can cancel during that time. This cannot be undone afterwards. | COPY |
| Blockers | Cancel paid plan on Pricing first · sole owner of shared projects · managed-by-company | COPY / LOCK |
| Delete CTA | **Delete my account** · **Cancel deletion** · Keep my account / Delete my account | COPY |

### States
| State | EN | Source |
|-------|----|--------|
| Signed out | Sign in to see your account — Your profile, sign-in methods and notifications belong to your account. · **Sign in** | COPY |
| Load fail | Could not load your account | COPY |
| Offline | No internet. You can read everything. Changes wait for the connection. | COPY |

### Shell (must stay while on Account)
Winning `NAVL`: Home · Projects · Marketplace · Connect · Automations · My bots · New task. Devices: Connect this/another computer + **Download AgentWitch Local** always (incl. Online). Source: COPY + EN-PASS + LOCK.

---

## (b) laneCompare — (i) popover / help panel

**Keep both paths.** Visible UI must never say Lane A/B, API, MCP, OAuth, token, CLI, or "bot" — say **assistant**. No Lane C. Not Project Connections. Global Connect stays pair-this-computer.

### Keys → where
| Key | EN | Mount |
|-----|----|-------|
| `laneCompare.title` | Two ways to use local AI tools | Popover/panel heading |
| `laneCompare.codingTools.label` | Coding tools on this computer | Path A label |
| `laneCompare.codingTools.when` | AgentWitch Local starts the tool for a task on this computer. You may need to approve the run. | When-to-use |
| `laneCompare.codingTools.where` | Team → Computers → Add to project | Path hint |
| `laneCompare.assistant.label` | Connect as an assistant | Path B label |
| `laneCompare.assistant.when` | Cursor Desktop or Claude Desktop joins the project like other assistants. You Approve the join; they check on demand. | When-to-use |
| `laneCompare.assistant.where` | Invite / Connect assistant | Path hint |
| `laneCompare.diff.results` | Tasks on a coding tool run on this computer with computer limits. An assistant works in its own seat and checks when you ask. | Diff block |
| `laneCompare.diff.approvals` | Computer runs follow Allow runs without approval or approval cards. An assistant join needs owner Approve first. | Diff block |
| `laneCompare.help.computers` | Prefer coding tools when AgentWitch Local should run the task on this computer. Prefer Connect as an assistant when a Desktop app should join like other assistants. | **(i) on Team → Computers → Add to project** |
| `laneCompare.help.invite` | Cursor Desktop and Claude Desktop join as assistants here — not as coding tools on a computer. | **(i) or hint on Invite / Connect assistant** |

### Component plan (UI-only)
1. Shared presentational panel e.g. `LaneCompareHelpPanel` (name guess) — title + two path cards (label/when/where) + diff.results + diff.approvals.
2. Mount A: (i) next to Coding tools / Add to project on Team → Computers → opens panel; short trigger copy = `laneCompare.help.computers` (or aria + panel body).
3. Mount B: (i) or inline hint on Invite / Connect assistant → `laneCompare.help.invite`; same panel or slim variant.
4. Copy constant e.g. `laneCompareCopy.constant.ts` with exact keys above; vitest asserts strings + forbidden jargon absent.
5. Stack with Account Soft HOLD after Soft land RELEASE (BUILD-NOTES).

---

## (c) Likely AWC files / routes (best guess)

**Verified on `main` (read-only API):**
- No `src/app/(app)/account` yet (404) — greenfield Account page.
- `src/components/header/UserDropdownMenu.tsx` — Billing and plans, admin links, Sign out; **no Account entry** (EN soft needle #6).
- `src/features/shell/appNav.constant.ts` — Home, Projects, Prompt optimizer, Marketplace, Automations, Companies & rules (live; design NAVL differs — see conflicts).
- Shell Devices: `AppShellDevicesPanel.tsx`, `v5/appShellComputersCopy.constant.ts`, `v5/AppShellDevicesSurface.tsx`.
- Team / access: `src/features/projects/access/AwcProjectAccessComputerMembersSection.tsx`, `AwcProjectAccessInvitesSection.tsx`, `awcProjectAccessCopy.constant.ts`, `awcProjectComputerMemberCopy.constant.ts`, invites under `access/invites/`.

**Guess (not fully verified):**
| Area | Paths |
|------|--------|
| Account route | `src/app/(app)/account/page.tsx` (+ tab query or nested routes) |
| Account feature | `src/features/account/*` — page shell, Profile / Security / Notify / Privacy panels, `accountCopy.constant.ts`, vitest |
| Entry | `UserDropdown.tsx` / `UserDropdownMenu.tsx` — add **Account** → `/account`; keep Sign out + admin |
| Shell keep | Do not strip Marketplace / Automations from `appNav`; Devices Download via existing ComputersDownloadLink / devices copy; Connect nav if separate from PRIMARY_NAV |
| laneCompare | New constant + panel under `src/features/projects/access/` (or `team/`); wire into computer members / coding-tools row + invites section |
| Auth (read only) | `src/lib/auth/auth.ts` — Google + email code already; UI wires only |
| Distinct | `/privacy` marketing page stays; Account Privacy and data is in-app prefs |

UI-only stacked change: no backend/API/DB for this prep scope (prefs/export/delete may need later API — flag as open).

---

## (d) Must-keeps checklist

- [ ] Never hide **Marketplace**, **Connect** (computer), **Automations** in primary nav / shell (incl. on Account).
- [ ] **Download AgentWitch Local** stays visible when computer is Online / connected (Devices and/or topbar).
- [ ] Bright vibrant / light-mode v5 tokens (match Home / Marketplace).
- [ ] UI-only for this stack (no backend/API/DB in the Soft claim).
- [ ] Keep files small (methods ≤100 lines).
- [ ] Vitest for new components (Account panels + laneCompare panel/copy).
- [ ] Product name **AgentWitch** (one word); prefer **assistant**; **computer** / **This computer**.
- [ ] Account = global user surface; no Project Connections (Slack/Linear/Gmail/GitHub) on Account.
- [ ] laneCompare: both paths; no Lane C; visible strings jargon-free; mounts (i) Computers Add to project + Invite/Connect assistant.
- [ ] Pricing CTA: Cancel anytime · USD · trial → Pro/Team; do not reinvent Pricing.
- [ ] Soft HOLD only after Soft land `4fe6e5b2` RELEASE; do not Soft-claim while held.

---

## (e) Open questions / HTML vs LOCK·EN conflicts

1. **Soft land gate** — Soft HOLD recommended but Soft land tip `4fe6e5b2` still HELD; no Soft-claim yet (EN-PASS / BUILD-NOTES).
2. **Nav shape** — Design winning `NAVL` includes Connect + My bots + New task; live `PRIMARY_NAV` has Prompt optimizer + Companies & rules and no Connect/My bots. Build: keep live must-haves (Marketplace, Automations, Download, Connect reachability); do not blindly replace live nav with HTML list. LOCK: never hide live items.
3. **Tab wording** — HTML/COPY "Sign-in and security" / "Privacy and data" vs LOCK "Sign-in & security" / "Privacy & data" — either OK (EN soft needle #3).
4. **Download placement** — Signed-in Download is Devices-rail only in HTML; signed-out topbar. Optional signed-in topbar parity (soft #5).
5. **My bots** — Prefer Assistants later; Pricing keep-as-is OK (soft #2). Body copy uses assistant.
6. **User menu** — Add Account; keep Sign out + admin; live also has "Billing and plans" → `/pricing` (align with Profile plan CTA; don't drop without Lead GO).
7. **Greenfield prefs** — Notification prefs, quiet hours, export, delete grace are design-OK but do not claim they already ship (soft #8). If UI-only Soft claim cannot persist prefs, confirm Lead: mock UI vs wait for API.
8. **CSS comment** — HTML `Agent Witch design tokens` soft only; ship AgentWitch (soft #1).
9. **Dead HTML NAV** — Early `const NAV` without Connect/Automations/Download overridden by winning `NAVL` — ship one shell list only (soft #4).
10. **laneCompare vs Part A coding-tools UI** — Coding tools list may land in same Soft stack or later Part A slice; compare help can ship as copy+(i) even before full Add-to-project switches if mounts exist — confirm with Lead.
11. **Do not mix** Companies & rules / Project Connections / Pricing packs into this build.

---

*Prepared 2026-10-07 ~07:15 CEST — Human UI prep only.*
