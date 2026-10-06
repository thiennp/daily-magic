# Chapter 3 — Home and navigation

Once you are signed in, Agent Witch orients you around **Home**, **Projects**, and **Runs**. You give work with **New task** inside a project. This chapter explains what each area does, how computer status on Home should be read honestly, and what stays out of primary navigation on purpose.

Vocabulary: [Chapter 0](00-philosophy-and-vocabulary.md) · Nav direction: [UX simplification](../../product/ux-simplification.md).

Home is the hub for your computers and recent projects. **Easy authoring** starts when you open a project and choose **New task**. **Team learning** shows up when **Runs** and **Playbooks** appear in nav—same shell, different org chrome ([four pillars](00-philosophy-and-vocabulary.md#four-pillars)).

---

## Primary navigation (signed-in)

On desktop, primary nav links sit in the sticky **left sidebar**; **Your Devices** is pinned at the bottom of that same column on every signed-in App Shell page (not in the main content area). On smaller screens, **Your Devices** appears above page content and primary nav uses the bottom bar. Home’s extra left column holds onboarding hints only, and that column is omitted once those hints are hidden so the welcome and projects panels use the full content width.

### Everyone

| Nav / action | User job                                                        |
| ------------ | --------------------------------------------------------------- |
| **Home**     | See computer status, onboarding checklist, and recent projects. |
| **Runs**     | History, live output, **Run again**, optional search past runs. |
| **Projects** | Open a project, then use **New task** or **Team** there.        |

### Often visible (solo and team variants)

| Nav                            | User job                                                                                             |
| ------------------------------ | ---------------------------------------------------------------------------------------------------- |
| **Projects** → **Library** tab | Saved playbooks, workflows, and skills live inside each project. Old `/library` links open Projects. |
| **Marketplace**                | Install official **Playbooks** to your **Mac** (solo nav keeps this for harness install).            |

### When team features are enabled

| Nav             | User job                                           |
| --------------- | -------------------------------------------------- |
| **Automations** | Org workflows (gated—hidden for many solo shells). |
| Admin routes    | User/policy management—not on every Home.          |

**Not primary nav (by design):**

- Deep **Knowledge / RAG** on the **Mac** → **Agent Witch on this computer** → **Knowledge** ([Chapter 4](04-mac-connect-and-bridge.md#local-knowledge-mac-app--efficient-memory)). In the Console, **Search past runs** under **Runs** reuses context without the “Knowledge” label.
- Raw traffic / developer logs → **Mac settings → Developer**.

---

## Home — what you should see

Home is the **orientation screen**, not a second product.

### Mac status banner (hero)

Plain status language ([UX principles](../../product/ux-simplification.md)):

| Status                               | What it means for you                                                                                                                              |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Online**                           | Cloud has a **live** dispatch path to this computer on the current server (you can send writer tasks when the composer agrees).                    |
| **Reconnecting** / **Seen recently** | Helper may be running, but the Console is waiting for a **live WebSocket** on the hub handling your request—common for a few seconds after deploy. |
| **This computer is not linked**      | Other computers may already be listed, but none is **this Mac**. Use **Connect this computer** in the hero.                                        |
| **Offline**                          | A linked computer has no recent live socket—start the helper, or fix LaunchAgent/update issues.                                                    |
| **None / not connected**             | No paired computer yet—follow **Connect your computer**.                                                                                           |

**Honest UX:** Home **reconnecting** is **not** the same as “Safari can reach google.com.” It reflects **dispatch readiness**, not just local bridge health. Read both Home and the composer banner before reinstalling ([Q&A: reconnecting vs local live](../../qa/awc-mac-reconnecting-vs-local-live.md)).

Picker labels on **New task** use related wording: **Online**, **Reconnecting (another server)**, **Seen recently**, **Offline**—they describe presence, not a guarantee that **Send** is enabled ([send readiness](../../agent-witch/send-readiness-reason-codes.md)).

### Primary call to action

**Open a project → New task** — default path for solo makers ([onboarding step 2](../../product/ux-simplification.md)).

### Secondary panels

- **Runs** snippet / running jobs panel — jump back into active work.
- **Mac settings** — update, wake, repositories on the computer.
- **Having trouble?** — hints toward install and bridge docs.

### Onboarding checklist (max ~3 steps)

Typical default path:

1. **Connect your computer** — install + pair.
2. **Send your first task** — first **Run** acknowledged.
3. _(Optional)_ **Save a playbook** — reuse; skippable.

Advanced items (workflow authoring, deep marketplace browse) stay collapsed under **More options** / **Advanced**—not parallel checklist noise.

---

## New task (inside a project)

Open a project, then choose **New task**. That opens Activity in task mode so you can assign the work. Above the fold on the project ([wireframe intent](../../product/ux-simplification.md)):

| Control              | Purpose                                                      |
| -------------------- | ------------------------------------------------------------ |
| **Assign to**        | Who should do it (bots on this project).                     |
| **What needs doing** | The **Task** (short summary).                                |
| **Send task**        | Sends the task (blocked with a clear reason when not ready). |

Collapsed **More options**:

- **Repository / code folder** (typed or defaults—not a browser folder picker).
- **Playbook** template.
- **Writer** agent choice.

If no bot can take work yet, invite a bot on **Team**. Connect your computer from Home when you need this computer online for other project actions.

Full composer behavior: [Chapter 5](05-tasks-dispatch-and-runs.md).

---

## Runs

**Runs** is the system of record for **what happened**:

| Action               | When to use                                                                                  |
| -------------------- | -------------------------------------------------------------------------------------------- |
| Open a run           | Read live or historical terminal output.                                                     |
| **Run again**        | Repeat with same or edited prompt.                                                           |
| **Save as playbook** | Capture how you worked (Chapter 7 in the guide series).                                      |
| **Search past runs** | Reuse context from prior **Runs** (**efficient memory**)—not labeled “Knowledge” in UI copy. |

Company users may filter by person, Mac, playbook, or date when those filters ship—that supports **team learning** and audit without a separate product area.

Outcome chips in Runs match live progress honesty—never **Success** while still **Connecting** ([run UX honesty](../../qa/run-ux-honesty-strings.md)).

---

## Account menu and Mac settings

From the profile menu:

- **Mac & devices** — rename, see presence tier hints, bundle version behind cloud.
- **Settings** — profile and product settings.

**Agent Witch on this computer** (Mac app at `http://127.0.0.1:43347`) is linked when you work on the same machine—full local UI for projects, playbooks, memory, health. The Console does **not** duplicate that UI in primary nav; it **links** there ([deployables — two entry points](../../product/agent-witch-deployables.md)).

---

## Two-app feeling (browser vs Mac)

| You use                    | For                                                                 |
| -------------------------- | ------------------------------------------------------------------- |
| **Browser (Console)**      | Team dispatch, history, org playbooks, watching output.             |
| **Mac app / Mac settings** | Folder picking, installed playbooks, updates, wake, developer logs. |

That split is intentional—progressive disclosure—not a missing feature in the browser ([folder picker Q&A](../../qa/awc-project-folder-path-picker.md)).

---

## Context-aware nav (solo vs team)

Shell context from the API may hide **Automations** or show admin entries. Solo users still often see **Marketplace** and **Playbooks** for official installs ([UX simplification — persona gates](../../product/ux-simplification.md)).

If you expected a nav item your teammate has, ask whether your account is in the same team/group—nav is not identical for every signed-in user.

---

## Quick map: URL habits

Production hosts paths under `www.agentwitch.com`. Common routes:

| Path                     | Chapter focus                               |
| ------------------------ | ------------------------------------------- |
| `/`                      | Home — Mac status                           |
| `/login`                 | Sign-in                                     |
| New task entry           | Inside each **project**                     |
| `/projects/<id>#reports` | **Reports** (old `/reports` links redirect) |
| `/projects/<id>#library` | **Library** (old `/library` links redirect) |
| Marketplace routes       | Install official playbooks                  |

Exact paths may shift; trust nav labels over memorizing URLs.

---

## Related docs

- [Chapter 1 — Getting started](01-getting-started.md)
- [Chapter 4 — Mac connect and bridge](04-mac-connect-and-bridge.md)
- [Chapter 5 — Tasks, dispatch, and runs](05-tasks-dispatch-and-runs.md)
- [Home known issues (engineers)](../../../src/features/home/KNOWN_ISSUES.md)
- [System Q&A](../../qa/README.md)

---

## Query aliases

- Agent Witch Home, navigation, Mac status Online Offline Reconnecting
- Runs New task Playbooks nav, solo vs team shell
- trang chu Agent Witch, dieu huong, trang thai Mac
- where is New task, Mac status banner meaning
- Agent Witch Cloud primary navigation marketplace library
- team learning Runs library nav, tiet kiem ngữ cảnh tim run cu
