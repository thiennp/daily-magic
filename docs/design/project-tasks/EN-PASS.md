# EN PASS — Project Tasks tab

**Verdict:** **EN PASS**  
**Checked:** 2026-10-07 ~12:14 CEST · AgentWitch Product (EN)  
**HTML:** `docs/design/project-tasks-tab/AgentWitch – Project Tasks tab.html`  
**Size:** 42307 bytes · **mtime:** 2026-10-07 12:08:58 CEST  
**SoT pack:** identical copy already at `docs/design/project-tasks/AgentWitch – Project Tasks tab.html` (NRG Lead path + pack both present; no re-copy needed).

Brief SoT: `project-tasks/CLAUDE-BRIEF.md` · Palette: `PALETTE-LOCK.md`.

---

## HARD criteria

| # | Check | Result |
| --- | --- | --- |
| 1 | Palette sand tokens; no purple/indigo | **PASS** |
| 2 | Product name AgentWitch (one word) | **PASS** |
| 3 | Prefer assistant over bot in visible labels | **PASS** |
| 4 | Screens A–E | **PASS** (all Y) |
| 5 | HARD data reflection | **PASS** |
| 6 | Suggested copy (or tight equivalent) | **PASS** |
| 7 | No New task page / no purple / no Discord·Jira·Marketplace invent | **PASS** |
| 8 | Chrome keeps Marketplace / Connect / Automations / Download AgentWitch Local; Tasks selected | **PASS** |

### Palette detail
`:root` uses exact LOCK tokens: `--bg #e8e6e1`, surfaces/tiles/fill, `--accent-soft`/`-2`, borders `#ddd9d2`/`#c9c4bb`, `--control-border #8a8478`, `--fg #101828`, muted `#4b5567`, subtle `#566073`.

All hexes found in file (unique): `#101828 #4b5567 #566073 #8a8478 #c9c4bb #d6e2ff #ddd9d2 #e4ecff #e8e6e1 #e9e7e2 #ebe9e4 #f4f3f0 #f7f6f4 #ffffff` — **all on-lock**. Shadows are `rgba(16,24,40,…)` (fg-derived). **No** `#7c3aed` / `#6366f1` / `#4f46e5` or other purple/indigo. Status chips use locked tokens only (shape/icon for meaning).

### Screens A–E
| Screen | Present | Notes |
| --- | --- | --- |
| A Tasks list | **Y** | Tab Tasks selected; assistant filter + status chips; rows; empty **No tasks yet**; plan counts; offline banner |
| B Task detail/session | **Y** | Title + status + assistant; Task info (Neon meta tip); Status timeline; Open history / Load older / Open report |
| C Chat Open task inset | **Y** | Session row **Open task**; compact **Open in Tasks** |
| D Git Branch/Worktree/Create worktree | **Y** | Assign dialog; hide via demo “Project has git”; tags on row + detail |
| E Chat Settings | **Y** | **Show in chat** / **Tasks tab only** / **Compact chips**; preview Compact vs Full |

Demo jump buttons A–E present (not product chrome).

### HARD data
- One task ↔ session: chat “Task session” + detail as session view.
- Neon meta + counts: tip “Cloud keeps title, status and times only”; capacity `N of M tasks this plan`.
- Local history: Recent + **Load older** / **Open history** (“From this computer”).
- Offline exact: **Connection to the project computer was lost** (list banner + detail when offline).

### Copy
Present: Tasks · No tasks yet · Queued/Running/Done/Failed/Cancelled · Open history · Load older · Open report · Open task / Open in Tasks · Branch · Worktree · Create worktree · Tasks tab only · Show in chat · Compact (as **Compact chips** — tight equivalent).

### Do-not
- No standalone New task page (Assign task dialog from list/chat path only).
- No Discord/Jira/Marketplace redesign (Marketplace is chrome link only).
- No purple palette invent.

---

## Soft needles (non-blocking)
1. JS uses internal key `bot` / `BOTS` / ids `fBot` `aBot` `dBot` — **visible** labels say Assistant / All assistants. Prefer renaming keys later; not EN FAIL.
2. Settings label **Compact chips** (brief suggested **Compact**) — fine.
3. Demo bar + jump labels are EN-check aids, not product UI (aria labels them as demo).
4. No “Agent Witch” two-word product name; no dead NAV purple comments.

---

## Paths
- EN report: `docs/design/project-tasks/EN-PASS.md` (this file)
- HTML (NRG): `docs/design/project-tasks-tab/AgentWitch – Project Tasks tab.html`
- HTML (SoT pack): `docs/design/project-tasks/AgentWitch – Project Tasks tab.html` (identical)

## Tip text (for NRG Lead + AW Lead — do not send from Product)
EN PASS on Project Tasks tab HTML (42307 B). Sand palette locked, screens A–E present, AgentWitch one word, chrome intact. Soft only: internal JS still names fields `bot` while UI says assistant — optional tidy, not a rework. Safe to Soft Soft / Soft Soft Soft when capacity allows.
