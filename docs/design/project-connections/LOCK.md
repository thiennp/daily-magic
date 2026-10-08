# AgentWitch Project Connections — Product LOCK (canonical)

Locked: 2026-10-07 ~06:35 CEST by AgentWitch Product (Thien ask via NRG Lead ~06:29 CEST).  
Soft land lock free; Soft-claim waits until Mac Soft land **cost-control + Companies** RELEASES — design now OK; do **not** Soft HOLD yet. Tip Lead for owner confirm + Soft HOLD only after this pack is READY.  
Design-only now — Claude/HTML optional later; Human UI waits Lead GO after API brief.  
Never hide live Marketplace, Connect (computer), Automations, or Download AgentWitch Local.  
Agent messages: plain English only (no Soft shorthand).

## Interim owners

| Surface                             | Owner              |
| ----------------------------------- | ------------------ |
| **API / data model / OAuth server** | **NRG AgentWitch** |
| **UI (project Connections chrome)** | **AW Human UI**    |

Product owns EN + this LOCK / DESIGN / COPY. See [DESIGN.md](./DESIGN.md) and [API-BRIEF.md](./API-BRIEF.md).

## Scope

1. **Project-scoped service binds** — for each AgentWitch project, users connect **Slack, Linear, Gmail, GitHub** (and similar later) as **real OAuth / connector binds**, not paste-only links. Assistants **in that project** may use those services via tools.
2. **In-project surface** — **Connections** under the project (recommended home: **Settings → Connections**; see Placement). List rows with Connect / Connected / Reconnect / Disconnect.
3. **Reuse existing patterns** — OAuth consent chrome, approve/confirm dialogs, and Activity / access-log lines from **Connect (computer)** and **Invite** — do **not** invent a parallel auth UX.

Prefer a dedicated Claude artifact name later: **AgentWitch – Project Connections** (only after Lead GO). Do **not** reuse Pricing, Automations, Prompt optimizer, or Companies & rules chats.

## NOT this (HARD — do not conflate)

| Surface                                             | What it is                                                                                                                           | Stay                                                                                                                |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| **Connect** (global)                                | Pair **this computer** / AgentWitch Local                                                                                            | **Stay global** (MAP.md). Do **not** rename or absorb into project Connections.                                     |
| **Invite / bot-connect-matrix / MCP OAuth**         | Assistant joins the project                                                                                                          | Out of scope. Do **not** build assistant join flows here.                                                           |
| **Resources → Git remotes / Folders**               | Paste URLs + folder paths (no login secrets)                                                                                         | Stay bookmarks / refs. Connections = live auth.                                                                     |
| Wake / Slack-bot-as-assistant inbound               | Assistant wakes via Slack bot                                                                                                        | **Out of v1.** v1 = **outbound tools** only (assistants call Slack/Linear/Gmail/GitHub APIs with the project bind). |
| **Cursor Desktop / Claude Desktop / local AI apps** | Lane B MCP / Non-Grok assistant connect (or Lane A CLI spawn) — see `docs/design/local-cli-project-agents/DESKTOP-APP-CONNECT-EN.md` | **Out of Project Connections.** Do not add AI app rows here.                                                        |

## Visible product rules (HARD)

- Product name: **AgentWitch** (one word). Never “Agent Witch”.
- Prefer **assistant** over **bot** in UI copy.
- Prefer **computer** / **This computer** over machine / Mac as generic nouns.
- Download AgentWitch Local stays visible when a computer is already connected.
- Never hide **Marketplace**, **Connect** (computer), **Automations**, or **Download**.
- Labels: **Connect** = pair this computer (global). **Connections** = project service binds. Do **not** rename computer Connect.
- Brighter / vibrant colors OK (logo-aligned); **light mode** for design pass.
- Match Home / Marketplace / project V5 visual tokens when UI is designed.
- Pricing LOCK “own AI accounts” stays separate — AI accounts ≠ project Connections (Slack/Linear/Gmail/GitHub).

## Placement (Lead-locked)

**Locked: project Settings → Connections** as the one clear home for v1.

| Why                     | Argument                                                                                                                                                                    |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Not global **Connect**  | Global Connect pairs **this computer**. Project Connections bind services for assistants **in one project**. MAP keeps Admin / Download / Connect global.                   |
| Not **Team**            | Team = people, assistants, computers, invites. Service OAuth is config, not membership.                                                                                     |
| Not **Resources**       | Resources already has **Folders** + **Git remotes** (paste URLs, no credentials). Mixing live OAuth with paste links confuses users.                                        |
| Why Settings subsection | Centre tabs already grow (Automations, Prompt optimizer, History per MAP). Connections is config-frequency; Settings → Connections keeps one home without a 9th centre tab. |

**Q1 locked:** Settings → Connections for v1; promote to a centre tab later only if usage is high.

## v1 services (locked)

| Service               | v1                    | Row actions                                  |
| --------------------- | --------------------- | -------------------------------------------- |
| **Slack**             | Yes                   | Connect / Connected / Reconnect / Disconnect |
| **Linear**            | Yes                   | same                                         |
| **Gmail**             | Yes                   | same                                         |
| **GitHub**            | Yes                   | same                                         |
| Notion, Discord, etc. | Later (“and similar”) | Same row pattern when added                  |

Each connected card shows: service name, account / workspace label, Connected date, Disconnect (confirm). Failed / expired → **Reconnect**.

## Scope of the bind (Lead-locked)

**Locked: bind is per-project.** Assistants in project A cannot use project B’s Slack (or other) token.

- Account-level OAuth grant reuse with **Use for this project** is **deferred** (Q2).
- Secrets / tokens never sync across computers (retention / local-first rules). Cloud may hold the project bind for tool use; device pairing stays separate.

## Permissions (Lead-locked)

| Actor              | Connect / Disconnect / Reconnect | See status             | Use tokens in tools                    |
| ------------------ | -------------------------------- | ---------------------- | -------------------------------------- |
| **Project owner**  | Yes                              | Yes                    | Via assistants in project (tools)      |
| **Company admin**  | No in v1 (later)                 | Yes if project member  | No direct                              |
| **Member (human)** | No                               | Yes (status only)      | No; assistants use project binds       |
| **Viewer**         | No                               | Yes (read-only status) | No                                     |
| **Assistant**      | Never (no silent auto-approve)   | n/a                    | Yes — tools only, that project’s binds |

- Access-log / Activity lines for connect, disconnect, reconnect (reuse Invite / access-log pattern). **Never silent auto-approve.**
- Matches Resources / Git remotes: **owner-only mutate**; members and viewers see status only.

## UI contents (must)

1. Connections list on the project under **Settings → Connections**.
2. Empty: **Connect a service so assistants in this project can use it.**
3. Connect flow: OAuth popup / redirect → success / fail (reuse Connect / Invite consent chrome).
4. Connected card: service, account/workspace label, Connected date, Disconnect confirm.
5. Failed / expired: **Reconnect**.
6. Distinction from Resources links: links stay bookmarks; Connections are live auth.

Full strings: [COPY.md](./COPY.md). Shape: [DESIGN.md](./DESIGN.md).

## Do not

- Replace or rename global computer **Connect**.
- Build assistant join / Invite / MCP OAuth / bot-connect-matrix flows here.
- Hide live Marketplace, Connect, Automations, or Download.
- Soft HOLD or Soft-claim before cost-control + Companies RELEASES (design pack only now).
- Block or redesign Companies Soft HOLD or cost-control Soft tip.
- Claim wake / Slack-bot-as-assistant inbound is in v1 (outbound tools only).
- Put **Cursor Desktop / Claude Desktop / local AI apps** in Project Connections (use Lane B / Lane A — see DESKTOP-APP-CONNECT-EN.md).
- Put Connections under Resources as “another link row”.
- Invent a parallel auth UX — reuse Connect + Invite patterns.
- Use Soft shorthand in Product briefs or agent reports.

## Lead locks (2026-10-07 ~06:35 CEST) — confirmed

AW Lead confirmed owners and closed Q1–Q7. Fold into API + UI:

| #          | Locked                                                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Owners** | API / OAuth / data model = **NRG AgentWitch**. UI = **AW Human UI**. Product = EN + LOCK/DESIGN/COPY.                          |
| **Q1**     | **Settings → Connections** for v1 (not a centre tab yet; promote later if usage high).                                         |
| **Q2**     | Defer account-level OAuth reuse; v1 = **per-project bind only**.                                                               |
| **Q3**     | **Project owner only** for connect / disconnect / reconnect; company admin later.                                              |
| **Q4**     | **Owner-only mutate**; members and viewers see status only (match Resources / Git remotes).                                    |
| **Q5**     | Prefer **org + repo picker** when cheap; if heavy, org/user bind at connect and repo in tool args — **NRG cuts at implement**. |
| **Q6**     | **Personal and Workspace** if same OAuth app; Workspace admin consent may be later.                                            |
| **Q7**     | Keep **all four** services in product lock; NRG may stage API ship waves behind **one UI list**.                               |

Soft HOLD still waits until Mac Soft land **cost-control + Companies** RELEASES — do **not** Soft HOLD yet. After RELEASE: Soft HOLD Human UI (after NRG AgentWitch API brief ACK). Never hide Marketplace / Connect / Automations / Download.

## Research refs (box)

- MAP: `docs/design/global-to-project/MAP.md` — Connect stays global; project tabs; never hide live.
- L3 / V5: `docs/design/l3-v5/PLAN.md`, `docs/design/project-layout-v5/UI-SLICE-PLAN.md` — Team / Settings / Resources; 8-tab track.
- Live tabs: `projectPageTabs.constant.ts` (worktrees) — overview, activity, reports, team, library, pitfalls, resources, settings.
- Resources: `projectPageResourcesCopy.constant.ts`, `awcProjectRepoUrlsCopy.constant.ts` — Folders + Git remotes (paste, no credentials).
- Roles: `docs/design/human-member-invites/spec.md` — owner / member / viewer.
- Pricing: `docs/design/pricing/LOCK.md` — own AI accounts (separate from project Connections).
- Access log: `docs/design/activity-restore/DESIGN.md` — reuse audit line pattern for connect/disconnect.
- NOT: `docs/design/bot-connect-matrix.md` — assistant connect.

## Soft / land

- Soft land lock **free** for design.
- Soft-claim **after** Mac Soft land **cost-control + Companies** RELEASES.
- Tip Lead for owner confirm + Soft HOLD only when this pack is READY (DESIGN + LOCK + API-BRIEF + COPY).
- Human UI waits Lead GO after NRG AgentWitch API brief ACK.

## Claude chat (later)

- Artifact / chat name: **AgentWitch – Project Connections** (dedicated) — only after Lead GO.
- NRG Lead drives Mac Chrome Claude send when queued; Product does **not** drive Chrome.
