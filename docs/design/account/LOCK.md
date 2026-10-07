# AgentWitch Account — Product LOCK (canonical)

Locked: 2026-10-07 ~06:40 CEST by AgentWitch Product; re-affirmed **EN PASS** 2026-10-07 ~07:12 CEST (CORRECT artifact v2).  
Companies & rules CORRECT already **EN PASS** — do not mix packs. Soft land still **HELD** tip `4fe6e5b2` (AW Mac Soft LOCK). Soft HOLD for Account **recommended after Soft land RELEASE** (EN is green; do not Soft-claim while Soft land held).  
Claude design first, then Human UI build. Never hide live Marketplace, Connect (computer), Automations, or Download AgentWitch Local.  
Agent messages: plain English only (no Soft shorthand).

## Scope

1. **Signed-in global user Account** — profile, sign-in & security, notification prefs, privacy & data. Reached from the **user / account menu** (avatar dropdown), **not** a project tab.
2. **Plans / billing CTA** may deep-link to **Pricing** (separate pack). Account must not reinvent Pricing cards; keep **Cancel anytime** + **USD** + trial → Pro/Team aligned with Pricing LOCK.
3. **Out of scope this pack:** Project **Connections** (Slack / Linear / Gmail / GitHub — separate pack), **Companies & rules** hub, computer **Connect** install flows (keep reachable in shell), Automations product page redesign.

Prefer dedicated Claude artifact: **AgentWitch – Account**. Do not reuse Pricing, Automations, Prompt optimizer, Companies & rules, or Project Connections chats.

## Visible product rules (HARD)

- Product name: **AgentWitch** (one word). Never “Agent Witch”.
- Prefer **assistant** over **bot** in UI copy (nav label **My bots** OK if still live elsewhere).
- Prefer **computer** / **This computer** over machine / Mac as generic nouns.
- Never hide **Marketplace**, **Connect** (computer), **Automations**, or **Download AgentWitch Local** in the app shell — including while the user is on Account. Connect may live as a primary-nav item and/or Devices-rail CTAs (**Connect this computer** / **Connect another computer**); Download stays visible when a computer is already connected.
- **Account stays global** (user account) — not a project tab. Do **not** invent project Connections here.
- Distinguish surfaces:

| Surface | What it is | Stay |
| --- | --- | --- |
| **Account** | User profile, sign-in, notifications, privacy/data, plan CTA | **Global** (this pack) |
| **Companies & rules** | Org / company members + dispatch policy | **Global** admin hub (separate pack) |
| **Project Connections** | In-project Slack/Linear/Gmail/GitHub binds | **In-project** (separate pack) |
| **Connect** | Pair **this computer** / AgentWitch Local | **Global** shell / Devices |

- Privacy / notifications / sign-in copy must **not** claim features that hide live nav.
- Light mode; plain English; match Home / Marketplace tokens.

## Must keep reachable (live shell)

Reference live checkout (e.g. `awc-download-always-visible`): `src/features/shell/appNav.constant.ts`, Devices rail / `APP_SHELL_COMPUTERS_COPY`, header `UserDropdown*`, `/download`, `/connect`, `/automations`, `/marketplace`.

| Surface | Keep |
| --- | --- |
| Marketplace | Primary nav — always |
| Automations | Primary nav — always |
| Connect (computer) | Primary nav and/or Devices: **Connect this computer** / **Connect another computer** |
| Download AgentWitch Local | Visible when a computer is connected (topbar and/or Devices rail) — live label may be **Download AgentWitch** / **Download AgentWitch Local**; keep intent |
| User menu | Live today: display name/email, Companies management, User management, Styleguide (staff), **Sign out**. Account redesign adds **Account** entry — do not drop Sign out or admin links without Lead GO |

### Live today (no dedicated Account settings page yet)

| Live | Note for design |
| --- | --- |
| User dropdown | Admin links + Sign out — **no** Profile / notifications prefs page yet |
| `/privacy` | Marketing Privacy Policy (legal), not in-app prefs |
| Header notification bell | Inbox UI — not full email/in-app prefs |
| Auth | Google + email (Resend) — no password |
| Computers / Download | Devices rail + `/download` |

## Page contents to design

1. **Account hub** — h1 **Account**; sections via tabs/nav: **Profile**, **Sign-in & security** (or Sign-in and security), **Notifications**, **Privacy & data** (or Privacy and data).
2. **Profile** — display name, email (verified / change), avatar color, time zone; **Your plan** summary + CTA to Pricing / billing (trial → Pro/Team, Cancel anytime, USD). Admin-Free only as edge note.
3. **Sign-in & security** — email code + Google link/unlink; sessions list; sign out one / everywhere else; honesty that signing out a local app pauses assistants on that computer.
4. **Notifications** — per-event email + in-app toggles; billing emails may be locked on; optional quiet hours; test email OK.
5. **Privacy & data** — local-first history honesty (history on computers); export account data; delete account with blockers (cancel paid plan first; sole-owner projects) + cancel-during-grace.
6. **App shell** — Marketplace, Connect, Automations, Download AgentWitch Local stay visible; Account is active chrome for this page (breadcrumb / title), not a project tab.
7. **States** — signed out → Sign in; loading; offline read-only; save success/fail; deletion scheduled + Cancel deletion; managed-by-company cannot self-delete.

## Pricing alignment (if mentioned)

Match Pricing LOCK: 1-month free trial → **Pro** or **Team**; **USD**; **Cancel anytime**; no self-serve permanent Free (admin flag only); no AI credits inside packages; Max 2 computers / assistant connect limits live on Pricing, not re-litigated here.

## Do not

- Hide Marketplace, Connect, Automations, or Download AgentWitch Local.
- Put project **Connections** (Slack etc.) on Account.
- Turn Account into a project tab or absorb Companies & rules.
- Claim privacy/notifications features that remove live nav.
- Overwrite Pricing / Automations / Companies / Project Connections / Home artifacts.
- Use Soft shorthand in Product briefs or agent reports.
- Soft-claim Account while Soft land tip `4fe6e5b2` is still held. Soft HOLD only after EN PASS + Soft land RELEASE.

## Claude chat

- Artifact / chat name: **AgentWitch – Account** (dedicated).
- NRG Lead drives Mac Chrome Claude send; Product does **not** drive Chrome.
- Product EN-checks Desktop HTML when exported, then pings AW Lead so Human UI can build after EN PASS.

## Research refs (box)

- Nav: `src/features/shell/appNav.constant.ts` — Marketplace, Automations, Companies & rules
- Devices / Download: `src/features/shell/v5/appShellComputersCopy.constant.ts`, `ComputersDownloadLink`, `/download`
- User menu: `src/components/header/UserDropdown.tsx`, `UserDropdownMenu.tsx`
- Auth: `src/lib/auth/auth.ts` (Google + Resend email)
- Legal privacy: `src/app/(app)/privacy/page.tsx` (marketing — distinct from Account Privacy & data)
- MAP: `docs/design/global-to-project/MAP.md` — admin / auth stay global
- Distinguish: `docs/design/project-connections/LOCK.md`, `docs/design/companies-rules/LOCK.md`, `docs/design/pricing/LOCK.md`

EN PASS cleared 2026-10-07 ~07:12 CEST. Soft HOLD free for Human UI **after Soft land RELEASE** on tip `4fe6e5b2` — then Soft HOLD / stack with lane-diff. Do not Soft-claim while Soft land held.
