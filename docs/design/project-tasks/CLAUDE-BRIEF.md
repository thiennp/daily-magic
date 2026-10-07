# CLAUDE-BRIEF — Project details → Tasks tab

**Product:** AgentWitch (one word)  
**Audience:** Mac Claude on L92 — inject this whole brief + `PALETTE-LOCK.md`  
**Owner:** AgentWitch Product · Soft GO Thien via AW Lead (~11:57 CEST) · paste via NRG Lead  
**Date:** 2026-10-07 ~12:00 CEST  
**Scope:** Project details page — **new tab Tasks** (Claude UI design only). **Do not implement** app/API code. Soft HOLD Soft-claim after AI-sessions stack when capacity is tight (builders — not Claude).

---

## Why (Thien)

When a task is assigned to an assistant, track it as **its own session**. The project needs a **Tasks** tab that lists every task assigned in this project (with status). Click a task → **detail / session view** (task info + status timeline + link to history/report).

New tasks still start from **project chat** (no standalone New task page). Tasks tab is the durable list and session UI so chat stays clean.

## HARD — data approach (design must reflect)

1. **Each bot-assigned task = its own session** (one task ↔ one session in the UI).
2. **Neon (cloud):** task **meta only** — id, assistant, title, status, timestamps — plus **counts by package/plan**. Soft capacity hint OK if quiet; do not invent billing/Pricing UI.
3. **Project computer (local / AWL):** stores **task info + full history**. Web shows meta + recent; **Load older** / full history from local when the computer is live. If local offline and Neon meta exhausted: **"Connection to the project computer was lost"** (same Messenger rule — short EN).
4. Prefer **assistant** over bot in visible labels; product name **AgentWitch** one word. Plain English.
5. Never hide Marketplace / Connect / Automations / Download AgentWitch Local if you show full page chrome. Preferred: project shell with **Tasks** selected; stub other tabs.

## HARD — palette + copy

- **Palette LOCK:** exact approved Claude project-page sand palette — `PALETTE-LOCK.md` in this folder (and `docs/design/PALETTE-LOCK.md`). Tokens: `--bg #e8e6e1`, warm surfaces, borders `#ddd9d2` / `#c9c4bb`, fg `#101828` / muted `#4b5567`. Brand blue / status = approved effective hex only. **No per-page custom colors. No Claude default purple/indigo.** Wrong colors = **EN FAIL**.
- **Tone:** AgentWitch sand (cat) — warm, calm.
- **Cut text HARD:** titles ≤ ~3 words; helpers ≤ one short line or omit; no walls of prose.

## Screens (one standalone HTML)

**File name:** `AgentWitch – Project Tasks tab.html`

### A) Tasks list (tab selected)

- Project details chrome with tabs including **Tasks** (stub Overview / Members / Connections / etc.).
- Filter row: assistant select + status chips (`queued` / `running` / `done` / `failed` / `cancelled`).
- List rows: title, assistant name, status chip, relative time; optional group by assistant.
- Empty: **No tasks yet**.
- Optional quiet capacity hint (plan counts from Neon meta).
- Offline banner demo toggle OK.

### B) Task detail / session

- Header: title + status + assistant.
- Task info (Neon meta + recent snippet).
- **Status timeline** (queued → running → done / failed / cancelled).
- Links: **Open history** / **Load older** (local), **Open report** when done.
- Offline: same computer-lost line when history unavailable.

### C) Chat → Open task (small inset)

- One chat AI-session row with **Open task** / **Open in Tasks** → navigates to (B). Keep chat compact by default.

### D) Git branch + worktree (when project has git) — Soft ADD (~11:58)

When **assigning** a task to an assistant:

- Picker for **Branch** + **Worktree**.
- Optional **Create worktree**.
- Show chosen branch/worktree on the **task row** and **detail**.
- If project has **no git**: **hide** these controls entirely (no empty placeholders).

### E) Chat stays clean — Settings / Tasks prefs — Soft ADD (~11:58)

Messenger must not feel crowded:

- In **project / chat Settings** (or Tasks prefs): toggles so AI-session / task chips in Messenger can be shown in chat **or** **Tasks tab only** (default lean toward Tasks tab / compact).
- **Compact mode** for any chips that remain in chat.
- Prefer **Open in Tasks** over long in-chat rows.
- **Keep chat clean by default**; Tasks tab is the full list.

Show a small Settings inset in the HTML (toggles + one compact chat chip vs full Tasks list).

## Suggested EN (short — Claude may tighten)

| UI | Copy |
| --- | --- |
| Tab | **Tasks** |
| Empty | **No tasks yet** |
| Filters | All assistants · All status · Queued · Running · Done · Failed · Cancelled |
| Offline | **Connection to the project computer was lost** |
| Load older | **Load older** |
| Open history | **Open history** |
| Open report | **Open report** |
| Chat link | **Open task** / **Open in Tasks** |
| Timeline | Queued · Running · Done · Failed · Cancelled |
| Git | Branch · Worktree · Create worktree |
| Prefs | Tasks tab only · Show in chat · Compact |

## Do not

- Implement app or API code.
- Invent Discord / Jira / Marketplace redesign.
- Redesign whole project nav beyond stubbing Tasks selected.
- Put full task bodies or history in Neon fiction — meta + counts only in cloud; detail/history local.
- Use Claude purple or invent a new palette.
- Ship a standalone New task page (tasks start from project chat).

## Export

Export → **HTML / Standalone web page** (not Share chrome / iframe). Save to Desktop as **`AgentWitch – Project Tasks tab.html`**. NRG Lead tips Product for EN.

## Paste order for Claude

1. This brief  
2. `PALETTE-LOCK.md`  
3. Produce the HTML artifact; export standalone to Desktop with the exact filename above.

---

## Soft HOLD note (builders — not Claude)

Soft HOLD Soft-claim **after AI-sessions stack** if capacity is tight. UI-only Soft HOLD Soft Soft when EN PASS; skip Arch unless structure changes. Never hide live.
