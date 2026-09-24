# Chapter 3 — Home and navigation

Once you are signed in, Agent Witch orients you around **three daily surfaces**: **Home**, **New task**, and **Runs**. This chapter explains what each area does, how **Mac status** on Home should be read honestly, and what stays out of primary navigation on purpose.

Vocabulary: [Chapter 0](00-philosophy-and-vocabulary.md) · Nav direction: [UX simplification](../../product/ux-simplification.md).

---

## Primary navigation (signed-in)

### Everyone

| Nav / action | User job                                                            |
| ------------ | ------------------------------------------------------------------- |
| **Home**     | See **Mac status**, onboarding checklist, shortcut to **New task**. |
| **Runs**     | History, live output, **Run again**, optional search past runs.     |
| **New task** | Prominent action (button or route)—opens the **Task** composer.     |

### Often visible (solo and team variants)

| Nav                        | User job                                                                                  |
| -------------------------- | ----------------------------------------------------------------------------------------- |
| **Playbooks** (`/library`) | Saved templates and team standards—user word for harness/library merge.                   |
| **Marketplace**            | Install official **Playbooks** to your **Mac** (solo nav keeps this for harness install). |

### When team features are enabled

| Nav             | User job                                           |
| --------------- | -------------------------------------------------- |
| **Automations** | Org workflows (gated—hidden for many solo shells). |
| Admin routes    | User/policy management—not on every Home.          |

**Not primary nav (by design):**

- Deep **Knowledge / RAG** admin → use **Search past runs** under Runs or Mac settings.
- Raw traffic / developer logs → **Mac settings → Developer**.

---

## Home — what you should see

Home is the **orientation screen**, not a second product.

### Mac status banner (hero)

Plain status language ([UX principles](../../product/ux-simplification.md)):

| Status                               | What it means for you                                                                                                                              |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Online**                           | Cloud has a **live** dispatch path to this Mac on the current server (you can send writer tasks when the composer agrees).                         |
| **Reconnecting** / **Seen recently** | Helper may be running, but the Console is waiting for a **live WebSocket** on the hub handling your request—common for a few seconds after deploy. |
| **Offline**                          | No recent live socket—install, start helper, or fix LaunchAgent/update issues.                                                                     |
| **None / not connected**             | No paired Mac yet—follow **Connect your Mac**.                                                                                                     |

**Honest UX:** Home **reconnecting** is **not** the same as “Safari can reach google.com.” It reflects **dispatch readiness**, not just local bridge health. Read both Home and the composer banner before reinstalling ([Q&A: reconnecting vs local live](../../qa/awc-mac-reconnecting-vs-local-live.md)).

Picker labels on **New task** use related wording: **Online**, **Reconnecting (another server)**, **Seen recently**, **Offline**—they describe presence, not a guarantee that **Send** is enabled ([send readiness](../../agent-witch/send-readiness-reason-codes.md)).

### Primary call to action

**New task** — default path for solo makers ([onboarding step 2](../../product/ux-simplification.md)).

### Secondary panels

- **Runs** snippet / running jobs panel — jump back into active work.
- **Mac settings** — update, wake, repositories on the Mac.
- **Having trouble?** — hints toward install and bridge docs.

### Onboarding checklist (max ~3 steps)

Typical default path:

1. **Connect your Mac** — install + pair.
2. **Send your first task** — first **Run** acknowledged.
3. _(Optional)_ **Save a playbook** — reuse; skippable.

Advanced items (workflow authoring, deep marketplace browse) stay collapsed under **More options** / **Advanced**—not parallel checklist noise.

---

## New task (composer entry)

You can open the composer from Home or nav. Above the fold ([wireframe intent](../../product/ux-simplification.md)):

| Control          | Purpose                                                  |
| ---------------- | -------------------------------------------------------- |
| **Mac** selector | Target machine (default: yours when paired).             |
| **Prompt**       | What you want done—the **Task**.                         |
| **Send**         | Dispatch (disabled with explicit banner when not ready). |

Collapsed **More options**:

- **Repository / code folder** (typed or defaults—not a browser folder picker).
- **Playbook** template.
- **Writer** agent choice.

Empty state when no Mac is dispatch-ready: **Connect a Mac to send tasks** with install CTA.

Full composer behavior: [Chapter 5](05-tasks-dispatch-and-runs.md).

---

## Runs

**Runs** is the system of record for **what happened**:

| Action               | When to use                                                      |
| -------------------- | ---------------------------------------------------------------- |
| Open a run           | Read live or historical terminal output.                         |
| **Run again**        | Repeat with same or edited prompt.                               |
| **Save as playbook** | Capture how you worked (Chapter 7 in the guide series).          |
| **Search past runs** | Memory from prior work (RAG)—not labeled “Knowledge” in UI copy. |

Company users may filter by person, Mac, playbook, or date when those filters ship.

Outcome chips in Runs match live progress honesty—never **Success** while still **Connecting** ([run UX honesty](../../qa/run-ux-honesty-strings.md)).

---

## Account menu and Mac settings

From the profile menu:

- **Mac & devices** — rename, see presence tier hints, bundle version behind cloud.
- **Settings** — profile and product settings.

**Agent Witch on this Mac** (Mac app at `http://127.0.0.1:43347`) is linked when you work on the same machine—full local UI for projects, playbooks, memory, health. The Console does **not** duplicate that UI in primary nav; it **links** there ([deployables — two entry points](../../product/agent-witch-deployables.md)).

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

| Path                   | Chapter focus              |
| ---------------------- | -------------------------- |
| `/`                    | Home — Mac status          |
| `/login`               | Sign-in                    |
| Task composer route(s) | **New task**               |
| Reports / runs UI      | **Runs**                   |
| `/library`             | **Playbooks**              |
| Marketplace routes     | Install official playbooks |

Exact paths may shift; trust nav labels over memorizing URLs.

---

## Related docs

- [Chapter 1 — Getting started](01-getting-started.md)
- [Chapter 4 — Mac connect and bridge](04-mac-connect-and-bridge.md)
- [Chapter 5 — Tasks, dispatch, and runs](05-tasks-dispatch-and-runs.md)
- [Home known issues (engineers)](../../src/features/home/KNOWN_ISSUES.md)
- [System Q&A](../../qa/README.md)

---

## Query aliases

- Agent Witch Home, navigation, Mac status Online Offline Reconnecting
- Runs New task Playbooks nav, solo vs team shell
- trang chu Agent Witch, dieu huong, trang thai Mac
- where is New task, Mac status banner meaning
- Agent Witch Console primary navigation marketplace library
