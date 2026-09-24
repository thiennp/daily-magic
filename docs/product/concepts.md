# Product concepts

Use this glossary to avoid overlapping names in UI and docs.

For **user-facing language, nav, and onboarding**, see [UX simplification](ux-simplification.md). For the four **product pillars** (authoring, learning, memory, team), see [product-pillars.md](product-pillars.md). This file stays the engineer-oriented glossary.

## Run memory

**Pillar 3 — efficient memory.** Context from prior **Runs** (prompt/output pairs, playbook scope, harness feature-knowledge) injected into new **Tasks** so users do not repeat setup. User copy says **memory from past runs**, not tokens or RAG. Mac-side storage and cloud `capability_improvements` are related but not identical; see [product-pillars.md](product-pillars.md) and architecture memory notes in [project-composition.md](../architecture/project-composition.md).

## Improvements loop

**Pillar 2 — learn from usage.** Feedback on a **Run** feeds **improvements** (suggestions to update playbooks, workflows, or capability metadata). Changes are **human-in-the-loop**: the product surfaces proposals; the user accepts before publish. Features: `feedback`, `improvements`, run history, save-as-playbook. Not every Mac ↔ cloud path is fully wired—see feature `KNOWN_ISSUES.md`.

## Team learning

**Pillar 4 — team learning.** Org-visible **Runs**, shared **Playbooks**, library/marketplace templates, and harness publish/install so teams reuse what worked together. Distinct from solo run memory: policy, visibility, and catalog domains ([catalog-and-sharing](../domains/catalog-and-sharing.md)). Dispatch still enforces who may run what.

## Capability

A **published agent offering** your team can dispatch to—metadata, version, and policy live in the capabilities system. Think “what agent profile can run this task.”

## Workflow

A **capability shape** with dynamic task fields (forms). Workflows define how a capability collects input before dispatch.

**Official marketplace presets** also use **server-orchestrated workflow runs**: a persisted step graph alternates **operator checkpoints** (human) and **bounded agent dispatches** (Mac/cloud sub-runs), instead of one monolithic prompt. Definitions are generated from each preset’s operator steps and instruction sections.

Create-workflow field types and a proposed step/graph builder: [workflow-builder-form-and-graph.md](workflow-builder-form-and-graph.md). Current builder types: [docs/qa/workflow-builder-field-types.md](../qa/workflow-builder-field-types.md).

## Harness

The **rules/skills/commands bundle** for how agents behave. For marketplace workflows/agents, playbook files **materialize inside a project repo** (`.cursor/`, `project.json`) after Mac pull—not as a separate marketplace install surface. Global `~/.agent-witch/harness/` remains for legacy/catalog paths.

## Library

**Saved playbooks** you can fork and run again. Library items reference capabilities/workflows you already use; they are not a separate execution engine.

## Marketplace

**Company-published workflow and agent listings** with per-listing **usage guides**. Install requires a **project** + Mac; cloud binds `project_components`. Marketplace is not a third runtime.

## Agent run

One **dispatched execution** (Mac via Agent Witch or Cursor Cloud), with status, events, and terminal output in Reports.

## Dispatch

**Who may run what for whom**—targets, approvals, queue, and policies. Mac dispatch uses paired devices; Cursor Cloud uses stored API keys and cloud executor id `__cursor_cloud__`.

## Deployables (AWC, AWL, AWB, AWI)

Four named apps in one repo. See [agent-witch-deployables.md](agent-witch-deployables.md).

| Abbr    | Meaning                                                                    |
| ------- | -------------------------------------------------------------------------- |
| **AWC** | **Console** — cloud control plane (`www.agentwitch.com`)                   |
| **AWL** | **Live** — Mac-local web app (`http://127.0.0.1:43347`)                    |
| **AWB** | **Bridge** — Mac loopback HTTP for browser-on-same-Mac (`47892` / `47893`) |
| **AWI** | **Install** — Mac bundle, runtime, LaunchAgents                            |

## Agent Witch (colloquial)

Often means the **product** or the **Mac side** (AWI + AWL + AWB). Distinct from “an agent” (the AI task). Prefer **AWC** / **AWL** / **AWB** / **AWI** in engineering docs.
