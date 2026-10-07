# Product EN — AgentWitch Companies & rules (re-EN after CORRECT)

- Source HTML: `/workspace/agentwitch/docs/design/companies-rules/AgentWitch-Companies-rules.html`
- Claude chat: `https://claude.ai/chat/40470b31` (**AgentWitch – Companies & rules**; chat id `40470b31` only)
- Desktop export: `/Users/thien.nguyen/Desktop/AgentWitch – Companies & rules.html` (Desktop mtime **06:17:28 CEST**; box copy ~191770 bytes, mtime ~06:18:09 CEST 2026-10-07)
- Reviewed: 2026-10-07 ~06:20 CEST (Europe/Berlin) — **re-EN after CORRECT** (prior verdict FIX-NEEDED ~00:20 CEST)
- LOCK: `LOCK.md` + `CLAUDE-BRIEF.md` + Lead answers 2026-10-06 ~23:42 CEST

## Verdict: **EN PASS**

Human UI can start build now. Prior FIX-NEEDED hard blockers are cleared in this CORRECT export. Soft needles remain; locked rules win over HTML where noted. Soft land lock free; prefer stacking up to three related tips onto the current tip if possible.

### Prior hard blockers (must re-score)

| # | Prior blocker | Cleared? | Evidence |
|---|---------------|----------|----------|
| 1 | Global Safety rules / pitfalls CRUD on this hub | **Yes** | No Built-in safety / Add a rule / Edit / Override. Hub shows orientation: **Set per project** + project picker + **Open Safety rules** deep link. Tip: edit on the project page. |
| 2 | Missing Company dispatch / settings / Danger zone / members / Recent runs | **Yes** | **Company dispatch policy** (Approval required / Open dispatch); gear → **Company settings**; **Danger zone** Delete company (cannot be undone); **Company members** invite-by-email + role; **Recent company agent runs** with empty / loading / error + **Try again**. |
| 3 | Empty “Join with a code” / self-join | **Yes** | Empty: create company + **You can't join a company yourself. Ask a company admin to add you…** No invite-code / Join-with-a-code CTA. |
| 4 | Automations missing from primary nav | **Yes** | Signed-in `NAV`: Home, Projects, **Marketplace**, Assistants, New task, **Automations**, **Connect**, Companies & rules (active). |

### Soft needles (non-blocking; LOCK overrides OK)

- CSS comment `Agent Witch design tokens` → prefer AgentWitch.
- Empty h2 **Create a company** vs CTA / LOCK **Create company** (button already **Create company**).
- Company picker label **Company** (not LOCK “Managing company”) — selection works via `#co-pick`.
- Safety CTA **Open Safety rules** (not exact “Open Safety rules in a project”) — orientation intent clear.
- Optional Danger-zone delete-members control absent (LOCK says optional).
- CSS `--bot-*` / `.t-bot` tokens (not shipping UI labels). Nav uses **Assistants** (better than My bots).

---

## Rule checklist (LOCK visible HARD + Lead + must-keep + page contents)

| # | Rule | Result | Evidence |
|---|------|--------|----------|
| 1 | Product name **AgentWitch** one word | **PASS** (needle) | `<title>AgentWitch – Companies & rules</title>`; body AgentWitch. CSS comment `Agent Witch design tokens` only. |
| 2 | Prefer **assistant** over **bot** | **PASS** | Body / tips use assistant / Assistants. Nav label **Assistants** (was My bots). `--bot-*` CSS tokens only. |
| 3 | Prefer **computer** / **This computer** | **PASS** | This computer / this computer throughout dispatch + Devices. `Mac` only in `BlinkMacSystemFont`. No machine noun. |
| 4 | Never hide **Marketplace**, **Connect**, **Automations** — full primary nav (Lead #1) | **PASS** | `NAV` includes Marketplace, Automations, Connect, Companies & rules. |
| 5 | Download AgentWitch Local stays visible when connected | **PASS** | **Download AgentWitch Local** in topbar (signed-in + signed-out) and Devices side. |
| 6 | Hub label **Companies & rules**; entity **Companies** / **Company** | **PASS** | h1 / crumb / nav **Companies & rules**; entity Company / Companies. No “group” as entity label (route comment `/admin/groups` only). |
| 7 | Empty: create company + no-self-join honesty | **PASS** | Create form + join honesty section (cannot self-join; ask admin). |
| 8 | Create: name + **Create company** | **PASS** (needle) | Field Company name; submit **Create company**. Empty h2 still **Create a company**. |
| 9 | Company select / settings gear → Company settings | **PASS** (needle) | `#co-pick` Company select + **New company**; gear → **Company settings**. Label not “Managing company”. |
| 10 | Company dispatch policy: Approval required vs Open dispatch; this computer / browser | **PASS** | POL: Approval required (browser + this computer); Open dispatch (start right away). Settings fieldset + Save / Saving… / Policy saved / fail + Try again. |
| 11 | Danger zone delete (cannot be undone) | **PASS** | Danger zone Delete {company}; confirm type-name; cannot be undone. |
| 12 | Company members: invite email + role; change role; remove confirm | **PASS** | Invite Email + Role (Member/Admin); table Person / Role / Last active; Remove confirm; Cancel invite confirm. |
| 13 | Recent company agent runs: list / empty / loading; error + Try again | **PASS** | Section title; list statuses; empty “No runs yet”; loading skeleton; error + **Try again**. |
| 14 | Rules orientation: dispatch = primary; Safety = orientation + project link — NOT global CRUD | **PASS** | Rules strip: Company dispatch policy + Change/View policy; Safety rules **Set per project** + Open Safety rules. Zero Add/Edit/Override/Built-in CRUD. |
| 15 | **No** policy-layer preview (Lead #2) | **PASS** | No device/user/company/product policy-layer frames. |
| 16 | **Companies-only** — no `/admin/users` frames (Lead #3) | **PASS** | No Users screens. Management link Users locked for non-staff (optional continuity). |
| 17 | Light mode; Home/Marketplace-ish tokens | **PASS** (visual note) | v10 bright light tokens; shared shell. |
| 18 | States: signed-out login; no company; loading; policy save; delete confirm | **PASS** | Sign in gate; empty create; loading; policy save ok/fail; company delete confirm; remove-member confirm. |

### Visible product rules (HARD) — quick scan

| Check | Result |
|-------|--------|
| AgentWitch one word | **PASS** (CSS comment needle) |
| assistant over bot | **PASS** |
| computer / This computer | **PASS** |
| Marketplace not hidden | **PASS** |
| Connect not hidden | **PASS** |
| Automations not hidden | **PASS** |
| Safety rules not moved to global CRUD | **PASS** |
| Companies not called “group” as entity | **PASS** |
| No /admin/users frames | **PASS** |
| No policy-layer preview | **PASS** |

---

## Flag scan (NRG / LOCK)

| Flag | Finding |
|------|---------|
| Agent Witch two-word | CSS comment only. Visible title OK. |
| bot vs assistant | Body + nav prefer assistant / Assistants. CSS `--bot-*` only. |
| Mac / machine | Mac = BlinkMacSystemFont only. machine absent. |
| Hide Marketplace / Connect / Automations | All three in primary `NAV`. |
| group as UI label | Entity stays Company/Companies. Route `/admin/groups` comment only. |
| Global Safety rules CRUD | **Absent** — orientation only. |
| Company dispatch / Approval / Open dispatch | **Present**. |
| Company members invite / activity / Danger zone | **Present**. |
| Join with a code | **Absent** — cannot-self-join honesty present. |
| /admin/users | Absent — good. |
| Policy-layer preview | Absent — good. |
| Download when connected | **Download AgentWitch Local** present. |

---

## Copy fixes (needles → replacements)

Non-blocking. Prefer applying in build; LOCK overrides HTML where noted.

| Exact string (or locus) | Replacement / action |
|-------------------------|----------------------|
| CSS comment `Agent Witch design tokens` | `AgentWitch design tokens` |
| Empty h2 **Create a company** | Prefer **Create company** to match CTA / live constant (optional) |
| Picker label **Company** | Optional: **Managing company** when more than one company (LOCK wording) |
| Safety CTA **Open Safety rules** | Optional: **Open Safety rules in a project** (LOCK exact); keep project picker |
| Optional Danger-zone delete-members control | Keep live if present; HTML omits (LOCK optional) |

No Soft shorthand in shipping files.

---

## Human UI can build now?

**Yes.** Verdict **EN PASS**. Use LOCK + this EN pack + `COPY.md` + `BUILD-NOTES.md`. Soft land lock free; stack onto current tip; prefer stacking up to three related tips if possible. Never hide Marketplace, Connect, Automations, or Download AgentWitch Local.
