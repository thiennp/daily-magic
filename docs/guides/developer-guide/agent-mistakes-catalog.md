# Agent mistakes catalog

Living list of **repeat failures** by coding agents (and fast human edits). When you fix one in code, add a regression test and a row here—or in the feature `KNOWN_ISSUES.md` if it is an open product risk.

---

## Product & hosting

| Mistake                                                  | Why it hurts                           | Do instead                                                                                              |
| -------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Treat CHECK24 `daily-magic.*` as Agent Witch production  | Wrong `wsUrl`, wrong deploy recovery   | Default **www.agentwitch.com**; read [repo-name-and-hosting.md](../../product/repo-name-and-hosting.md) |
| Conflate repo name “daily-magic” with a separate product | Wrong docs and env assumptions         | Same codebase; brand is Agent Witch                                                                     |
| Use plain `next dev` for WS bridge work                  | Mac client cannot connect in local dev | `npm run dev` (`tsx server.ts`)                                                                         |

---

## Cursor Cloud VM only

| Mistake                                           | Why it hurts                                               | Do instead                                                                 |
| ------------------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------- |
| Trust injected `DATABASE_URL`                     | Points at unrelated Neon schema (`users` id type mismatch) | `set -a; . ./.env.local; set +a` before dev/psql                           |
| Assume `.env.local` overrides injected env        | Next.js will not overwrite existing `process.env`          | Export `.env.local` into shell first (see [AGENTS.md](../../../AGENTS.md)) |
| Run `npm run typecheck` on clean VM without build | Missing `next-env.d.ts` / SVG modules                      | `npm run build` or start dev once                                          |

---

## Mac bridge & deployables

| Mistake                                            | Why it hurts                                        | Do instead                                                                        |
| -------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------- |
| Assume **AWL** serves `/identity` for AWC          | Browser pairing calls **AWB** wake server           | [awb-localhost-identity-and-cors.md](../../qa/awb-localhost-identity-and-cors.md) |
| Edit install script plist heredoc carelessly       | Broken LaunchAgent → Mac “reconnecting” (AGENT-067) | Close XML heredoc before bash; run plist tests                                    |
| Bump install scripts without bundle version        | Cloud shows update but semantics drift              | Bump `AGENT_WITCH_INSTALL_BUNDLE_VERSION`                                         |
| Confuse `~/.agent-witch` vs `~/.local-agent-witch` | Wrong client for localhost vs production pairing    | Query feature-knowledge before client changes                                     |

---

## Dispatch & presence

| Mistake                                            | Why it hurts                                                              | Do instead                                                                                |
| -------------------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Ignore `live_other_instance` / multi-replica       | Writer **New task** fails intermittently                                  | ADR 0005 relay + sticky `aw_hub_instance`; read OPEN-002 in agent-witch `KNOWN_ISSUES.md` |
| Create runs before hub client resolves             | Ghost runs, bad UX                                                        | Fail closed with `mac_reconnecting` / structured errors                                   |
| Skip device list as source of truth                | UI shows wrong “Mac connected”                                            | `pairedDevicesApi` + presence tiers                                                       |
| Stamp `last_seen_at` when issuing an install token | Repeated **Connect this computer** clicks clone “seen recently” computers | `recordLastSeen: false`; revoke unlabeled placeholders (HOME-059)                         |
| Revoke a deleted Mac and keep the row              | The computer stays linked locally because the token is still known        | Delete the row; wipe locally only on `unknown_identity` (HOME-060)                        |

---

## Documentation & RAG

| Mistake                                   | Why it hurts                      | Do instead                                                            |
| ----------------------------------------- | --------------------------------- | --------------------------------------------------------------------- |
| Answer “how it works” from code grep only | Stale or wrong architecture story | `docs/qa/` + user/dev guide chapter                                   |
| Edit `docs/` without reindexing           | Agents miss updates               | `npm run feature-knowledge:index` + commit index                      |
| Change behavior without guide chapter     | Users and agents diverge          | [guide-maintenance.map.json](../guide-maintenance.map.json) + same PR |
| Duplicate long ADR text in chat           | Token waste                       | Link ADR; query RAG                                                   |

---

## Memory, improvements & episode notes

| Mistake                                                                              | Why it hurts                                                                                                               | Do instead                                                                                                                                                      |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Treat `npm run feature-knowledge:query` as **user run memory**                       | Wrong product story; confuses git docs with Mac Tasks                                                                      | User memory: Mac episode notes (`knowledge.db`) + [ch.10](10-learning-memory-and-improvements.md); repo agents: feature-knowledge only                          |
| Assume prompt memory replays raw run output, or that a failed run is injected whole  | Notes are one-line `mistake` / `fix` takeaways under a token budget; raw output is never injected                          | See pillar 3 in [ch.10](10-learning-memory-and-improvements.md) and [product-pillars.md](../../product/product-pillars.md)                                      |
| Conflate **episode notes** with **capability_improvements**                          | Notes are retrieval at dispatch on the Mac; improvements are cloud proposals                                               | Notes: `apps/live/features/knowledge/internal/core/episode/`; loop: `src/lib/improvements/` + feedback APIs                                                     |
| Cite or revive `runs.ndjson`, `queryAgentWitchRag`, RAG chunks or `usage-stats.json` | Removed in install bundle 281 (commit `6ca713c2`); older docs still call them “today”                                      | Episode notes ([ch.10](10-learning-memory-and-improvements.md)); treat [project-composition.md](../../architecture/project-composition.md) §1.9–1.10 as history |
| Expect accepting an improvement to auto-update Mac harness                           | Accept publishes capability version; harness is separate install path                                                      | [Chapter 7](07-capabilities-library-harness.md), `acceptCapabilityImprovement`                                                                                  |
| Describe memory as “fully learned” or “team-shared by default”                       | Overpromises pillar 3/4; privacy and wiring gaps                                                                           | Use **Today vs north star** table in [ch.10](10-learning-memory-and-improvements.md)                                                                            |
| Tell users AWC primary nav has “Knowledge”                                           | Knowledge admin is **AWL** `/knowledge`; Console uses **Search past runs**                                                 | [user ch.3](../user-guide/03-home-and-navigation.md), [ch.4](../user-guide/04-mac-connect-and-bridge.md)                                                        |
| Treat knowledge candidates or shared episode notes as published Playbooks            | A candidate needs owner promotion; shared notes are a read-only owner view; `capability_improvements` needs Console accept | [learning-memory-terminology-and-flows.md](../../qa/learning-memory-terminology-and-flows.md), [ch.10](10-learning-memory-and-improvements.md)                  |
| Change episode retrieval without scoping it to the project key                       | Notes from another project would be injected into the prompt                                                               | Keys are the `projectId` or `path:<folder>` (`resolveKnowledgeProjectKey`); `listEpisodesWithVectors` filters on it                                             |

---

## Codebase layout

| Mistake                                             | Why it hurts                | Do instead                       |
| --------------------------------------------------- | --------------------------- | -------------------------------- |
| Import another feature’s `internal/`                | FSA violation               | `public-api/*` or hub (ADR 0007) |
| Put `route.ts` under `src/features/`                | Next.js constraint break    | Thin routes in `src/app/api/`    |
| `'use client'` imports infrastructure               | Leaks server code to client | presentation + types only        |
| EnergyCenter patterns (RR loaders, SCSS, Bitbucket) | Wrong stack                 | Next App Router + Tailwind 4     |

---

## Recurring product bugs (pointers)

| Topic                          | Where detail lives                                                                                 |
| ------------------------------ | -------------------------------------------------------------------------------------------------- |
| DNS ENOTFOUND on computer      | agent-witch `KNOWN_ISSUES` OPEN-001                                                                |
| Multi-instance dispatch        | OPEN-002, [writer-dispatch-cascade-routing.md](../../qa/writer-dispatch-cascade-routing.md)        |
| Stale install bundle           | OPEN-003, send-readiness `update_needed`                                                           |
| Broken LaunchAgent plist       | AGENT-067, [awi-update-local-launchagent-plist.md](../../qa/awi-update-local-launchagent-plist.md) |
| AWC “this computer” badge      | [awc-how-browser-knows-this-computer.md](../../qa/awc-how-browser-knows-this-computer.md)          |
| Mac reconnecting vs local live | [awc-mac-reconnecting-vs-local-live.md](../../qa/awc-mac-reconnecting-vs-local-live.md)            |

When you close an issue, remove it from `KNOWN_ISSUES.md` but **keep** the regression test and add a one-line pointer here if agents still ask.

---

## Query aliases

- agent mistakes Agent Witch, common bugs coding agent
- loi agent hay mac phai dispatch Neon WebSocket
- Cursor cloud DATABASE_URL daily-magic
