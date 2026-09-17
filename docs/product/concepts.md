# Product concepts

Use this glossary to avoid overlapping names in UI and docs.

For **user-facing language, nav, and onboarding**, see [UX simplification](ux-simplification.md). This file stays the engineer-oriented glossary.

## Capability

A **published agent offering** your team can dispatch to—metadata, version, and policy live in the capabilities system. Think “what agent profile can run this task.”

## Workflow

A **capability shape** with dynamic task fields (forms). Workflows define how a capability collects input before dispatch.

## Harness

The **rules/skills/commands bundle** installed on a Mac under `~/.agent-witch/harness/`. The harness catalog lets you publish, share, and install consistent agent instructions—not the run itself.

## Library

**Saved playbooks** you can fork and run again. Library items reference capabilities/workflows you already use; they are not a separate execution engine.

## Marketplace

**Company-published harness/capability listings** others can browse and borrow. Marketplace sits on top of harness + capabilities; it is not a third runtime.

## Agent run

One **dispatched execution** (Mac via Agent Witch or Cursor Cloud), with status, events, and terminal output in Reports.

## Dispatch

**Who may run what for whom**—targets, approvals, queue, and policies. Mac dispatch uses paired devices; Cursor Cloud uses stored API keys and cloud executor id `__cursor_cloud__`.

## Deployables (AWC, AWL, AWB, AWI)

Four named apps in one repo. See [agent-witch-deployables.md](agent-witch-deployables.md).

| Abbr    | Meaning                                                                    |
| ------- | -------------------------------------------------------------------------- |
| **AWC** | **Console** — cloud control plane (`www.agentwitch.com`)                   |
| **AWL** | **Live** — Mac-local web app (`local.agentwitch.com:43347`)                |
| **AWB** | **Bridge** — Mac loopback HTTP for browser-on-same-Mac (`47892` / `47893`) |
| **AWI** | **Install** — Mac bundle, runtime, LaunchAgents                            |

## Agent Witch (colloquial)

Often means the **product** or the **Mac side** (AWI + AWL + AWB). Distinct from “an agent” (the AI task). Prefer **AWC** / **AWL** / **AWB** / **AWI** in engineering docs.
