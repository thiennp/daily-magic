# AgentWitch Account — user-facing copy extract

Source: `/workspace/agentwitch/docs/design/account/AgentWitch-Account.html`  
Claude artifact: **AgentWitch – Account** (chat `66e405e0…` artifact v2)  
CORRECT export: mtime ~**07:09 CEST** 2026-10-07 (~190734 bytes)  
Extracted / refreshed: 2026-10-07 ~07:12 CEST (Europe/Berlin) — after EN PASS  
Method: static chrome + JS string/template extract (UI is JS-rendered).  
Dev corner (“Not part of the product”) is **not** shipping copy.

**Locked rules win over HTML.** Hard blockers cleared in CORRECT v2 (**EN PASS**). Soft HOLD after Soft land RELEASE only.

---

## Nav / shell (winning signed-in `NAVL`)

| Label | Note |
|-------|------|
| Home | keep |
| Projects | keep |
| Marketplace | **never hide** — present |
| Connect | **never hide** — present |
| Automations | **never hide** — present (CORRECT v2) |
| My bots | soft — prefer Assistants later; Pricing keep-as-is OK |
| New task | keep |
| Companies & rules | not in this shell list (OK if gated elsewhere; do not drop Automations to slim) |

### Devices rail
- Bundle chip
- Device rows + **This computer** session naming (`AgentWitch on This computer`)
- **Connect this computer** (when unlinked)
- **Connect another computer**
- **Download AgentWitch Local** — present always (visible while Online / connected)

### Signed-out topbar
- **Download** (+ sr AgentWitch Local)
- **Sign in**

---

## Account chrome

1. Breadcrumb — **Account** › {tab}
2. h1 — **Account**
3. Tip (About your account) — Your name, how you sign in, what we email you, and your data. Plans and billing live on the Pricing page.

### Tabs (`TABS`)
| id | Label |
|----|-------|
| profile | Profile |
| security | Sign-in and security |
| notify | Notifications |
| privacy | Privacy and data |

---

## Profile

| Surface | Copy |
|---------|------|
| h2 | Profile |
| Fields | Display name · Email (Verified) · Time zone (24-hour, like 14:30) |
| Tip display name | Shown to people in your projects and companies. |
| Actions | **Save name** · Cancel · **Change email** · Avatar color radios |
| Plan h2 | Your plan + chip (Pro / Team / Free trial / Free / No plan yet) |
| Plan CTA | **Start your free month** (no plan) · **Manage plan and billing** (paid/trial) |
| Plan help | Plans, seats, invoices and cancelling are on the Pricing page. **Cancel anytime.** Prices in **USD**. |
| planInfo samples | Pro/Team seats × $29/$49; Free trial — All Pro features… Cancel anytime; Free — Set by your admin. It is not self-serve; No plan — Your first month is free… |

---

## Sign-in and security

| Surface | Copy |
|---------|------|
| h2 | How you sign in |
| Tip | You can use an email code or Google. There is no password to remember or leak. |
| Email code | We send a 6-digit code to {email} each time you sign in. · Always available |
| Google | Linked: {email} / Not linked. Sign in with one tap. · **Link Google** / **Unlink** |
| h2 | Where you are signed in |
| Tip | Browsers and AgentWitch apps that can use your account. Signing out an app on a computer pauses its assistants until you sign in again. |
| Actions | **Sign out everywhere else** · per-row **Sign out** · chip **This browser** |
| Empty | No other sessions — You are signed in only on this browser. |
| Session sample names | Chrome · Firefox · AgentWitch on This computer · AgentWitch on Another computer |

---

## Notifications

| Surface | Copy |
|---------|------|
| h2 | What we tell you |
| Tip | Choose email and in-app notes for each event. Changes save as you go. |
| Columns | Event · Email · In app |
| CTA | **Send a test email** / Test email sent |
| Row: A task finishes | A short note when an assistant finishes a task. |
| Row: An assistant needs your approval | When a rule or automation says to ask first. |
| Row: Weekly digest | Mondays at 09:00. What your assistants did last week. |
| Row: Invites and access requests | When someone invites you or asks to join your project. |
| Row: Billing and trial reminders | Receipts, failed payments and when your trial ends. · lock: Billing emails cannot be turned off. |
| h2 | Quiet hours |
| Tip | No emails or in-app notes during these hours. Approvals wait until quiet hours end. |
| Fields | From · To · help Quiet from {from} to {to} ({tz}). / Quiet hours are off. |

---

## Privacy and data

| Surface | Copy |
|---------|------|
| h2 | Your history stays on your computers |
| Tip | Tasks, replies and files are stored on the computer where an assistant ran them. The website only shows a notice. |
| Body | AgentWitch does not keep your task history on its servers. Open AgentWitch on this computer to read it. Deleting your account does not touch files on your computers. |
| h2 | Export your account data |
| Body | We email a download link to {email} within 24 hours. It includes your profile, billing records, and your projects and companies. It does not include history, which stays on your computers. |
| CTA | **Request export** / Export requested |
| h2 | Delete your account |
| Tip | Your account is removed after 7 days. You can cancel during that time. This cannot be undone afterwards. |
| Blockers | Cancel paid plan on Pricing first · sole owner of shared projects · managed-by-company |
| CTA | **Delete my account** · banner **Cancel deletion** · confirm Keep my account / Delete my account |

---

## Empty / error / banners

| State | Copy |
|-------|------|
| Signed out | Sign in to see your account — Your profile, sign-in methods and notifications belong to your account. · **Sign in** |
| Load fail | Could not load your account |
| Offline | No internet. You can read everything. Changes wait for the connection. |

---

## Do not ship from this pack

- Project Connections (Slack etc.) — separate pack
- Soft shorthand
- Two-word **Agent Witch** in visible UI
- Shell without Automations or Download (CORRECT v2 keeps both)
