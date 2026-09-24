# UX simplification — personas, language, and onboarding

Product and UX direction for Daily Magic. **Audience:** PM, design, and engineering when changing nav, copy, or onboarding. Technical storage (harness paths, RAG files) stays in [Agent Witch local layout](../../src/features/agent-witch/LOCAL_INSTALL_LAYOUT.md) and [product concepts](concepts.md).

**Status:** In progress (2026). Nav labels, onboarding, Home Mac status + Mac settings link, solo team-nav gating shipped; Playbooks merge UI and composer progressive disclosure still open.

---

## Problem

The product delivers a simple job (same wording as [product pillars](product-pillars.md)):

> Run a trusted agent on a Mac you control (or a teammate’s), see what happened in the browser, and reuse what worked.

That loop is expressed in four user-facing terms: **Mac** · **Task** · **Run** · **Playbook** (see [User-facing mental model](#user-facing-mental-model-four-ideas)). UX work should keep those four words primary while the product grows along **four pillars**—each pillar stacks on the core loop without replacing it:

| Pillar                 | UX pressure                                                                                                                      |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **1 Easy authoring**   | Start with a plain Task; defer workflow graphs, marketplace depth, and harness jargon until the user asks for structure.         |
| **2 Learn from usage** | Runs should invite feedback and “save what worked”; never imply success when a run failed or degraded.                           |
| **3 Efficient memory** | Prefer “memory from past runs” over internal names (RAG, chunks); optional search under Runs, not a top-level **Knowledge** nav. |
| **4 Team learning**    | Company mode adds shared Playbooks and team Runs visibility—not a second product vocabulary.                                     |

Shipped vs aspirational behavior per pillar: [product-pillars.md § North star vs today](product-pillars.md#north-star-vs-today).

Implementation still introduces many nouns (Agent Witch, harness, knowledge, projects, registry, marketplace, library, capabilities, dispatch, wake, local app on another host). Power users need depth; most users need **one browser story** with advanced setup deferred.

---

## Two modes (not two products)

|                       | **Solo maker**                              | **Company user**                                  |
| --------------------- | ------------------------------------------- | ------------------------------------------------- |
| **Job**               | Connect Mac → send task → watch output      | Same + who ran what, shared playbooks, guardrails |
| **Fear**              | Break machine / leak code                   | Compliance, approval, reuse                       |
| **10-minute success** | One completed run with live terminal        | One run on a Mac + visible in team history        |
| **Defer by default**  | Marketplace, harness authoring, automations | Admin policy screens                              |

Same core loop; company adds **visibility, templates, and policy**.

---

## User-facing mental model (four ideas)

| User term    | Meaning                                           | Hide internal names                          |
| ------------ | ------------------------------------------------- | -------------------------------------------- |
| **Mac**      | Machine that runs agents (mine or teammate’s)     | Agent Witch, wake, heartbeat, presence tiers |
| **Task**     | What to do (composer / home)                      | Dispatch payload details                     |
| **Run**      | What happened (history + live output)             | agent_run id, SSE vs WS                      |
| **Playbook** | How agents should work (rules, skills, templates) | harness, capability (in UI), library item    |

**Deferred or secondary language**

| Internal            | User-facing                                                           |
| ------------------- | --------------------------------------------------------------------- |
| Knowledge / RAG     | **Memory from past runs** (automatic); optional **Search past runs**  |
| Harness             | **Playbook** or **Team standards**                                    |
| Projects / registry | **Repository** or **Code folder** (task attribute + settings)         |
| **AWL** (`:43347`)  | **Agent Witch on this Mac** (or “Mac app”) — link from Home / account |

See [concepts.md](concepts.md) for engineer glossary; UI should prefer the table above.

---

## Core journeys

### Solo — three surfaces

1. **Home** — Mac status + primary CTA **New task**
2. **Task** — Mac (default mine), optional folder, prompt, send
3. **Runs** — List, live view, **Run again** / **Save as playbook**

### Company — add two surfaces

4. **Playbooks** — Company templates + my saved (merge marketplace + library in UI)
5. **Runs** (filtered) — Who, which Mac, which playbook; export for audit

**Admins** (later): sharing visibility, device policy — not on every user’s Home.

---

## Proposed primary navigation (signed-in)

**Everyone**

- Home
- Runs
- New task (prominent action; may be button rather than nav item)

**When org / team features enabled**

- Playbooks

**Account menu**

- Mac & devices
- Settings

**Not primary nav**

- Knowledge → Runs (“Search past runs”) or Mac settings
- Traffic / errors → Mac settings → Developer

**AWL** (`http://127.0.0.1:43347`): full Mac app (tasks, projects, playbooks, memory, health). Not duplicated in AWC primary nav; AWC links here when the user works on this Mac.

---

## UX principles

1. **Progressive disclosure** — Default: Mac + prompt. “More options”: folder, playbook, writer.
2. **One Playbooks area** — “Team standards” vs “My saved tasks” (tabs), not Harness + Library + Marketplace.
3. **Repository is a task attribute** — Link playbooks to a repo on task advanced panel or repo settings, not a top-level peer of Home.
4. **Two-app feeling** — Browser = daily work; Mac helper = setup and troubleshooting.
5. **Plain status** — Online / Sleeping (we can wake) / Offline (install or fix).
6. **Context-aware chrome** — Solo: keep **Marketplace** in primary nav for official harness install (SHELL-003); show “Invite teammates” as growth, not dead nav.

---

## Mapping (keep backend; change surface)

| Today (implementation)                    | Target UX                                     |
| ----------------------------------------- | --------------------------------------------- |
| Cloud harness catalog + Mac `harness/`    | Playbooks: install, link to repo              |
| `projects-registry.json` + project detail | Repositories in Mac settings or task defaults |
| RAG `chunks.ndjson`                       | Automatic; search under Runs or Mac settings  |
| Reports                                   | **Runs** (rename in UI when ready)            |
| Capabilities / workflows                  | Behind Playbooks and task templates           |

---

## Success metrics

| Metric                                                     | Notes             |
| ---------------------------------------------------------- | ----------------- |
| Time to first successful run                               | Solo onboarding   |
| % completing connect + first task without opening local UI | Simplicity signal |
| Support themes: harness / Agent Witch / local app          | Should decrease   |
| % tasks using a named playbook                             | Company adoption  |

---

## Onboarding wireframe checklist

Use for Home / first-run design reviews. **Default path = solo.** “Team” variant adds one step at the end.

### Copy (one sentence per step)

| Step           | User sees                                                        | Done when                                           |
| -------------- | ---------------------------------------------------------------- | --------------------------------------------------- |
| 1              | **Connect your Mac** — Install the helper and pair this browser. | Device paired (DB-backed; see home onboarding APIs) |
| 2              | **Send your first task** — Describe work; watch the terminal.    | First run acknowledged / in Runs                    |
| 3 _(optional)_ | **Save a playbook** — Reuse how you work.                        | User saves from a run or skips                      |

**Do not show by default on step 1–2:** create workflow, automation, marketplace browse, harness import, projects registry.

### Home (wireframe)

- [x] Hero: Mac status banner (Online / Sleeping / Offline / none) + primary **New task**
- [ ] Secondary: **Runs** (last run snippet) — panel exists via `HomeRunningJobsPanel`; tighten copy later
- [x] Tertiary link: **Mac settings** (local helper or `#your-setup`), **Having trouble?** hint
- [ ] Onboarding checklist: max 3 steps; collapsible after complete
- [ ] No parallel checklist items for workflow/marketplace unless user expands **Advanced**

### Task composer (wireframe)

- [ ] Above fold: Mac selector, prompt, **Send**
- [ ] Collapsed **More options**: repository folder, playbook, writer
- [ ] Empty state: “Connect a Mac to send tasks” with install CTA
- [ ] Company: optional “Run on behalf of” / policy hint only when org rules exist

### Runs (wireframe)

- [ ] List + live panel; **Run again**, **Save as playbook**
- [ ] Optional **Search past runs** (RAG) — not named “Knowledge”
- [ ] Company: filters (person, Mac, playbook, date)

### Playbooks (wireframe, team mode)

- [ ] Tab **Team** / **Mine**
- [ ] Install → applies to Mac; **Link to repository** on repo settings or from install success
- [ ] No separate “Marketplace” nav label

### Mac settings (local helper, wireframe)

- [ ] Connection, update, wake/restart
- [ ] **Repositories** (add folder, link playbooks)
- [ ] **Installed playbooks** (read-only list + reinstall)
- [ ] Developer: traffic, errors, raw logs

### Persona gates (engineering)

- [x] `teamNavEnabled` from `GET /api/me/shell-context` (group membership): hide **Automations** in nav (Marketplace stays for solo harness browse/install)
- [x] `showAdminNav` when privileged global role or team membership
- [x] Solo primary nav keeps **Marketplace** and **Playbooks** (`/library`); only **Automations** and admin are gated (`filterAppNavForShellContext`; see [SHELL-003](../../src/features/shell/KNOWN_ISSUES.md)) — not hidden for solo users
- [x] Onboarding API steps mapped to UI steps 1–2 only in default checklist

---

## Related docs

- [Product pillars](product-pillars.md)
- [Product concepts (glossary)](concepts.md)
- [Root README — routes](../../README.md)
- [Agent Witch bridge](../../src/features/agent-witch/README.md)
- [Home known issues](../../src/features/home/KNOWN_ISSUES.md) — onboarding persistence

---

## Changelog

| Date       | Change                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------- |
| 2026-09-15 | Initial draft from UX/PM simplification discussion                                                            |
| 2026-09-16 | BUG-004: document shipped solo Marketplace nav (SHELL-003); drop stale “hide marketplace when solo” checklist |
