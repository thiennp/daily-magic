# AgentWitch Companies & rules — Product LOCK (canonical)

Locked: 2026-10-06 ~23:41 CEST by AgentWitch Product (AW Lead overnight order: Pricing → Automations+picker → Prompt optimizer → **Companies & rules**).  
NRG Lead already started Claude on Companies & rules — publish this pack for inject / correct.  
Base tip (main, Pricing + Automations live): **`9e0fb4f3`**.  
Claude design first, then Human UI build. Never hide live Marketplace, Connect, or Automations.  
Agent messages: plain English only (no Soft shorthand).

## Scope

1. **Signed-in global hub** reached from primary nav **Companies & rules** → live route **`/admin/groups`** (and related admin chrome under `/admin/*`).
2. **Company (workspace / org) settings** — create / select company, members, invites, roles, company settings (dispatch policy + danger-zone delete), recent company activity.
3. **How “rules” relate on this hub** — company **dispatch / approval policy** (who can send tasks to **this computer**), plus clear orientation that **project Safety rules** live on each **project** page (tab **Safety rules** / pitfalls). Do **not** invent a new global Safety rules page.
4. **Users** — stays a separate global admin leave-behind. **Companies-only** this Claude pass (no `/admin/users` frames). Link continuity optional; no Users redesign.

Prefer a **dedicated** Claude artifact name: **AgentWitch – Companies & rules**.  
Do **not** reuse Pricing, Automations, or Prompt optimizer chats / artifacts.  
Do **not** overwrite the separate **AgentWitch – Admin** HTML leave-behind unless NRG Lead explicitly continues that chat — still prefer the dedicated Companies & rules artifact name.

## Visible product rules (HARD)

- Product name: **AgentWitch** (one word). Never “Agent Witch”.
- Prefer **assistant** over **bot** in UI copy (My bots as a nav label is OK if it still appears elsewhere).
- Prefer **computer** / **This computer** over machine / Mac as generic nouns (kill “this Mac”, “Mac app”, “Mac owner” as the generic noun — say computer owner / this computer).
- Download AgentWitch Local stays visible when a computer is already connected.
- Never hide **Marketplace**, **Connect**, or **Automations** in nav or product shells — including while the user is on Companies & rules. Live `AdminShell` today turns primary nav off; the redesign must **keep** Marketplace / Connect / Automations reachable (do not hide live features to “fix” admin chrome).
- **Companies & rules** stays a **global** admin / org surface (MAP.md). **Safety rules** stay **in-project** — never move pitfalls off the project page into a new global Safety rules nav item.
- In product language a **company** is the top-level workspace / org (code may still say `group`). Not a department or sub-team.
- Brighter / vibrant colors OK (logo-aligned); **light mode** for this design pass.
- Match Home / Marketplace visual tokens.

## Must keep working (live behavior)

Reference live surfaces on main **`9e0fb4f3`** / checkout under `src/features/admin/`, `src/lib/admin/companyGroupCopy.constant.ts`, `src/features/shell/appNav.constant.ts` (e.g. `awc-download-always-visible`):

### Primary nav

| Surface | Keep |
| --- | --- |
| Label | **Companies & rules** (`COMPANY_RULES_NAV_LABEL`) |
| Href | `/admin/groups` (active when pathname starts with `/admin`) |
| Gate | Admin link filtered by shell nav context (manageable company / admin); do not orphan the route |

### Companies hub `/admin/groups`

| Surface | Keep |
| --- | --- |
| Title / entity | **Companies** / **Company** (never call a company a “group” in user-facing copy) |
| Empty | Create your company to invite teammates; you cannot self-join an existing company — ask an admin to add you |
| Create | Name field + **Create company** |
| Select | When more than one company: “Managing company” picker; single company shows name |
| Settings gear | Opens **Company settings** when the actor can configure dispatch policy and/or delete |
| Company settings | **Company dispatch policy** — Approval required vs Open dispatch; save; Danger zone delete (cannot be undone) with optional delete-members control |
| Dispatch copy intent | Default for members: open runs immediately; approval needs confirmation on browser and **this computer** |
| Members | **Company members** — invite by email + role; table to change role / remove (confirm destructive) |
| Activity | **Recent company agent runs** — latest dispatches for company members; empty / loading states |
| Management aside | Links: **Companies**, **Users**, Styleguide (Users = staff / global admin; Styleguide staff-only chrome OK to de-emphasize in consumer-facing frames) |

### Users `/admin/users` (out of frames this pass)

| Surface | Keep |
| --- | --- |
| Role | Global admin user directory — stays global (MAP.md) |
| Scope this pass | **No Users frames** in the Companies & rules artifact (Lead 23:42). Optional Management link only; full Users redesign out of scope |

### Rules orientation (do not relocate Safety rules)

| Kind | Where it lives | What Claude should show |
| --- | --- | --- |
| **Company rules** (dispatch / approval policy) | This hub — Company settings / policy control | Primary “rules” meaning of **Companies & rules** |
| **Project Safety rules** (pitfalls assistants must avoid) | Project tab **Safety rules** (`pitfalls`) | Short orientation / deep link into a project’s Safety rules — **not** a new global Safety rules page |
| Harness rule-compare | AgentWitch Local playbooks / harness (separate design) | Out of scope this pass; do not pull compare UI onto Companies & rules |

Instructions already teach: companies group people, dispatch rules, and shared playbooks. **This Claude pass:** live create / members / policy / activity only. **Policy-layer preview** (device / user / company / product) is a later pass — omit from this artifact.

## Page contents to design

1. **Companies & rules hub** — hero / header titled **Companies & rules** (or Companies with subtitle that names rules); short plain-English lede: companies are workspaces/orgs; rules here = who can send tasks to **this computer**; Safety rules stay on each project.
2. **Company create / empty** — create company CTA + no-self-join honesty.
3. **Company selected** — picker / name, settings gear → Company settings (dispatch policy + danger zone).
4. **Company members** — invite, roles, remove confirm.
5. **Recent company activity** — runs list / empty / loading / error + **Try again** if load fails.
6. **Rules orientation strip** — company dispatch policy summary + link “Open Safety rules in a project” (project picker or last project — no global pitfalls CRUD).
7. **App shell** — Marketplace, Connect, Automations stay visible; Download AgentWitch Local stays visible when a computer is connected; **Companies & rules** active in nav.
8. **States** — signed out → login with callback `/admin/groups`; no manageable company; loading; save success / failure on policy; delete confirm; permission-denied for Users if not global admin.

## Visual

- Same visual system as signed-in Home / Marketplace: tokens, logo SVG, brighter vibrant OK.
- Light mode only for this pass.
- Responsive 1440 / 1100 / 768 / 390; keyboard + screen-reader friendly.
- Minimal text; helpers in accessible (i) tooltips where useful.

## Do not

- Hide Marketplace, Connect, or Automations (including inside admin / Companies & rules chrome).
- Move project **Safety rules** / pitfalls to a new global page, or rename this hub into “Safety rules”.
- Redesign Prompt optimizer, Pricing, or Automations in this pass.
- Overwrite Pricing / Automations / Prompt optimizer / Home / Projects / Invite / Onboarding / AWL / Marketplace full redesign artifacts.
- Start this work inside Pricing, Automations, or Prompt optimizer Claude chats — use dedicated artifact **AgentWitch – Companies & rules**.
- Use Soft shorthand in Product briefs or agent reports.
- Claim the cloud Companies & rules page runs harness rule-compare or the Prompt optimizer.
- Hide Download AgentWitch Local when a computer is already connected.
- Call companies “groups” in visible UI copy (code/API `group` is fine behind the scenes).

## Claude chat

- Artifact / chat name: **AgentWitch – Companies & rules** (dedicated).
- NRG Lead drives Mac Chrome Claude send; Product does **not** drive Chrome.
- Product EN-checks Desktop HTML when exported, then pings AW Lead so Human UI can build.

## Research refs (box)

- Nav: `docs/design/nav-consolidation/spec.md` — PRIMARY_NAV includes Companies & rules
- MAP: `docs/design/global-to-project/MAP.md` — Safety rules stay in-project; Companies / Users admin stay global
- Copy: `src/lib/admin/companyGroupCopy.constant.ts` (`COMPANY_RULES_NAV_LABEL`, Company / Companies / Company members)
- Live UI: `src/features/admin/*`, `src/app/(app)/admin/groups`, `src/app/(app)/admin/users`, `src/features/shell/AdminSidebar.tsx`, `AdminShell.tsx`
- Project Safety rules: `src/features/projects/pitfalls/awcProjectPitfallsCopy.constant.ts`, project tab `pitfalls` → **Safety rules**
- Instructions: `src/lib/agentWitch/instructions/agentWitchInstructionCompaniesSection.ts`
- Harness rule-compare (out of scope): `docs/design/harness-rule-compare/ui-placement.md`

## Lead answers (2026-10-06 ~23:42 CEST) — locked

AW Lead closed Product open Qs. Fold into Claude + Human UI:

1. **Shell:** Always keep Marketplace, Connect, and Automations reachable — never hide them. Prefer **restoring full primary nav inside admin chrome** (not a slim Management aside that drops those three).
2. **Scope depth this pass:** Ship **live create / members / policy / activity** first. **Policy-layer preview** (device / user / company / product) is a **later** pass — do not design it in this Claude artifact.
3. **Artifact frames:** **Companies-only** — no `/admin/users` frames this pass. Scope stays `/admin/groups` hub + company dispatch/approval + Safety-rules orientation.

Soft LOCK free for Human UI after EN PASS.
