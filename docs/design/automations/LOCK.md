# AgentWitch Automations — Product LOCK (canonical)

Locked: 2026-10-06 via AW Lead (Thien) + Product EN. Claude chat `8f580ed5`; Desktop HTML ~22:49 CEST.
Marketplace + onboarding tip `328b7243` — land lock free on `feat/awc-automations-v1` from `origin/main`.
Locked rules win over HTML. Agent messages: plain English only.

## Locked rules

1. **Standalone Automations page** (`/automations`) stays live — never hide it to “finish” redesign.
2. **Webhook (HTTP POST)** trigger stays: after create show webhook secret (“copy now”) + webhook URL with copy controls.
3. **Timezone** on schedule create (Every hour / Every day / Weekdays; hour 0–23 when not hourly).
4. **Sync-to-local amber** after create/change when local sync fails — copy uses **this computer** and **AgentWitch** one word.
5. **Connect** stays reachable; **Download AgentWitch** stays visible when a computer is already connected.
6. **Project required** when the workflow needs one (project picker).
7. List cards: name, Enabled/Paused, schedule or “Webhook trigger”, next run when present, Run now / Pause|Resume / Delete / Reports when last run exists.
8. Empty, loading, load error + **Try again**; Back to library from create.
9. Marketplace computer picker (paired): **Which computer should run this?** / **This computer** / **Another computer**.
10. Prefer **assistant** in body copy; keep nav/screen label **My bots**; product name **AgentWitch** one word.
11. Never hide **Marketplace**, **Connect**, or **Automations**.

## Do not

- Drop webhook, timezone, sync amber, Connect, or Download to match Claude HTML omissions.
- Stack Pricing (`feat/awc-pricing-v1`) into this branch (Mac stacks).
- Redesign `/showcases/automate-for-yourself-or-your-team` unless a string conflicts with AgentWitch / computer / assistant rules.
- Touch backend/API/DB/MCP/security.

## Build branch

- Human UI: `feat/awc-automations-v1` from `origin/main` (`328b7243` or newer).
- Source HTML: Desktop `AgentWitch – Automations.html` (~22:49), repo `docs/design/automations/AgentWitch-Automations.html`.
