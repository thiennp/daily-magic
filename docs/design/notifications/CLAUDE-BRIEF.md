# Claude brief — AgentWitch – Notifications (canonical HARD)

Paste as **one message** in a **new** Claude chat (or dedicated artifact).  
**Artifact title:** **AgentWitch – Notifications**  
Do **not** overwrite Account, Pricing, Automations, Companies & rules, Prompt optimizer, Home, Projects, Invite, Onboarding, or AWL.

NRG Lead sends this via Mac Chrome. Product owns the brief; do not drive Chrome from Product.

---

HARD — design the **global Notifications inbox** opened from the **header bell** (in-app notes + pending approvals). This is **not** Account → Notifications (prefs / email toggles / quiet hours). Account already covers prefs; this artifact is the **inbox UI**.

## Goal

Polished **light-mode** Notifications experience matching Home / Marketplace tokens (brighter / vibrant OK). Cover:

1. Signed-in **Notifications** surface from the header bell (list + detail / cards).
2. **Filters:** All / Unread / Approvals.
3. **Approval cards** for pending join / access and pending computer runs — **Approve** and **Deny** (reuse live verbs).
4. Mark read / **Mark all read**; empty, loading, error + **Try again**.
5. Clear separation from Account prefs and from project Access panels (those stay live until one-window lands — do not hide them).

Ship finished design — never hide live Marketplace, Connect, Automations, or Download AgentWitch Local.

## Visible copy rules (HARD)

- Product name **AgentWitch** one word (never “Agent Witch”).
- Prefer **assistant** over **bot** (My bots as leftover nav label OK).
- Prefer **computer** / **This computer** over Mac / machine as generic nouns.
- Download AgentWitch Local stays visible when a computer is already connected.
- Never hide Marketplace, Connect, or Automations.
- Approval buttons: **Approve** / **Deny** (live `AWC_PENDING_APPROVAL_CARD_COPY`).
- No jargon in UI: no API, MCP, OAuth, token, CLI, writer, agent run.

## Scope split (do not mix)

| Surface | This artifact? |
| --- | --- |
| Header bell → inbox list / unread / approvals | **Yes — primary** |
| Account → Notifications prefs (email + in-app toggles, quiet hours) | **No** — already on Account; link “Manage notification settings” → Account if useful |
| Project Access pending list (members column) | **Orientation only** — stays live; inbox can show the same pending join approvals without removing Access UI |
| Project Connections (Slack / Linear / Gmail / GitHub) | **No** |
| Pricing / billing emails locked-on | Mention only if a billing note appears in inbox — do not redesign Pricing |

## Approval kinds to show (cards)

1. **Join / access request** — someone or an assistant wants into a project. Owner **Approve** / **Deny**. Optional delivery hint (Checks on demand vs wake) if meta exists — plain English only.
2. **Computer run waiting for approval** — a task on **this computer** (or named computer) needs owner **Approve** / **Deny**. Show waiting / timed-out states honestly.
3. Other in-app notes (automation finished, plan limit warning, invite accepted, etc.) — read-only rows with mark-read; deep links into live pages (Automations, Pricing, project) without inventing new routes.

Do **not** invent a second Approve API or a parallel “window-only” approval store in the design fiction — cards are views of live pending items.

## Must keep working (shell)

- Full primary signed-in nav includes **Marketplace**, **Connect**, **Automations** (plus Home, Projects, My bots / Assistants, New task as on other packs).
- **Download AgentWitch Local** visible while This computer is Online / connected.
- Signed-out → Sign in gate for inbox.

## Page contents to include in the artifact

1. Header with bell open → Notifications panel or full page (pick one primary pattern; show both collapsed bell popover + expanded page if useful).
2. Title **Notifications**; filters **All** / **Unread** / **Approvals**.
3. List rows: unread vs read; relative time; project name when relevant.
4. Empty states per filter (plain English).
5. Approval card(s): title, who/what, project, computer if relevant, **Approve** / **Deny**, optional Deny confirm.
6. Mark read on row; **Mark all read**.
7. Link or tip: **Notification settings** → Account (prefs) — one line, not the prefs UI itself.
8. Loading / error + **Try again**.
9. App shell with Marketplace, Connect, Automations, Download Local while connected.
10. Responsive 1440 / 1100 / 768 / 390 — no sideways scroll.

## Visual / a11y

- Same visual system as Home (signed in) / Marketplace; light mode; brighter vibrant OK.
- Keyboard and screen-reader friendly; focus rings; meaningful button names.
- Helpers in accessible (i) tooltips where useful.

## Do not

- Hide Marketplace, Connect, Automations, or Download AgentWitch Local.
- Redesign Account → Notifications prefs here.
- Invent project Connections OAuth on this page.
- Pull down or blank live Access pending UI to “move” approvals (never hide live).
- Soft-claim or Soft HOLD from Claude.
- Overwrite other design packs.

When rebuilt, list each required section done or missing, then say clearly the artifact is ready to export as **AgentWitch – Notifications**.
