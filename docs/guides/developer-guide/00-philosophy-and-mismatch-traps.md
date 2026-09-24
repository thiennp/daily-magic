# Chapter 0 — Philosophy and mismatch traps (developers & agents)

Same product contract as the [user guide ch.0](../user-guide/00-philosophy-and-vocabulary.md), plus **engineering boundaries** agents get wrong most often.

---

## Names that must not drift

| Name            | Meaning                                                                |
| --------------- | ---------------------------------------------------------------------- |
| **daily-magic** | Git repository folder and historical name                              |
| **Agent Witch** | Product brand; production origin **https://www.agentwitch.com**        |
| **AWC**         | Cloud console (this Next.js app + `server.ts`)                         |
| **AWL**         | Mac-local UI at `http://127.0.0.1:43347`                               |
| **AWB**         | Loopback bridge (`127.0.0.1:47892` / `47893`) — `/health`, `/identity` |
| **AWI**         | Mac install bundle, LaunchAgents, `~/.agent-witch`                     |

**Forbidden default:** pointing Mac `wsUrl` or “production” docs at CHECK24 `daily-magic.d.energie.check24.de` unless a human explicitly names that deployment. See [repo-name-and-hosting.md](../../product/repo-name-and-hosting.md).

---

## One runtime, many nouns

Capabilities, workflows, library, harness, marketplace, and dispatch share **one** execution pipeline. Documentation must not describe them as separate backends.

- **Dispatch** chooses target (paired Mac vs `__cursor_cloud__`).
- **Agent run** is one execution with events in Reports.
- **Harness** is files under `~/.agent-witch/harness/`—not the run itself.

Product **pillars** (authoring, learning, memory, team) stack on that loop — see [product-pillars.md](../../product/product-pillars.md).

---

## Pillar → module map (engineering)

Use this when routing doc updates or agent context; it is not a second runtime.

| Pillar                 | Primary modules / features                                                                 | Developer guide                                                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| **1 Easy authoring**   | `src/features/workflows/`, workflow orchestration lib, composer / capability forms         | [ch.6](06-workflows-orchestration.md)                                                                                                 |
| **2 Learn from usage** | `src/features/feedback/`, `src/features/improvements/`, run feedback APIs, Reports honesty | [ch.5](05-dispatch-presence-and-runs.md), [ch.9](09-known-issues-and-regressions.md), [ch.10](10-learning-memory-and-improvements.md) |
| **3 Efficient memory** | `apps/live/features/memory/`, RAG under project folder, playbooks/library scope            | [ch.10](10-learning-memory-and-improvements.md)                                                                                       |
| **4 Team learning**    | `library`, `marketplace`, `harness`, team Runs visibility                                  | [ch.7](07-capabilities-library-harness.md)                                                                                            |

Repo-only **feature-knowledge** (`.feature-knowledge/index.json`) supports pillar **3** for **coding agents in git**, not end-user run memory — see [ch.10](10-learning-memory-and-improvements.md).

---

## How coding agents should load context

Order (do not skip):

1. [AGENTS.md](../../../AGENTS.md) — harness + Cloud VM DB warning
2. [load-context.md](../../conventions/load-context.md) or one [domain](../../domains/README.md)
3. **This guide’s chapter** for the area you edit ([map](../guide-maintenance.map.json))
4. `npm run feature-knowledge:query -- "symptom" --feature=docs` then feature slug
5. ADRs when touching WS, dispatch, hosting ([catalog](../../adr/README.md))

**Do not** read all of `src/lib/agentWitch/` before querying RAG.

---

## Docs-first when behavior changes

| You change                | You update                                                                         |
| ------------------------- | ---------------------------------------------------------------------------------- |
| User-visible flow or copy | User guide chapter + maybe [ux-simplification](../../product/ux-simplification.md) |
| API, dispatch, Mac client | Developer guide ch.4–5 + feature `KNOWN_ISSUES.md` if risk remains                 |
| Repeat “how does X work?” | `docs/qa/<topic>.md` + index                                                       |
| Examples in guides        | **Same PR** — hooks flag stale guide when code moves without doc diff              |

Run `npm run feature-knowledge:index` and commit `.feature-knowledge/index.json`.

---

## Technical invariants (binding ADRs)

- Custom server **`tsx server.ts`** for `/api/agent-witch/ws` — not plain `next dev` for normal work (ADR 0002).
- Writer dispatch needs **live** hub WebSocket on the executing Node or **relay** (ADR 0005).
- Production hosting: Railway + Neon + `www.agentwitch.com` (ADR 0006).
- Feature code in `src/features/`; shared server in `src/lib/` during migration (ADR 0003).

---

## Query aliases

- developer philosophy Agent Witch, agent mismatch daily-magic
- AWC production URL, wsUrl hardcoded agentwitch.com
- docs-first user guide developer guide maintenance
