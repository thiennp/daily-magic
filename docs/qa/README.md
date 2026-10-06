# System Q&A (Agent Witch)

Canonical answers to **how the product works** questions — architecture, identity, dispatch, hosting — written for humans and agents. Indexed into `.feature-knowledge/index.json` with the rest of `docs/**/*.md` (query slug: `docs`).

## When to use this folder

| Use **docs/qa/**                                | Use elsewhere                                         |
| ----------------------------------------------- | ----------------------------------------------------- |
| “How does X work?” with a stable product answer | Bug symptoms → feature `KNOWN_ISSUES.md`              |
| Onboarding / explain without reading `src/`     | Lasting design choice → `docs/adr/`                   |
| Repeat questions from chat or support           | Feature API details → `src/features/<slug>/README.md` |

## File format (one topic per file)

Each `docs/qa/<topic-slug>.md` should include:

1. **Title** — one clear question as H1.
2. **Query aliases** — H2 with bullet phrases (English and other languages agents see in chat).
3. **Short answer** — 2–4 sentences for chat replies.
4. **Details** — tables, flows, deployable names (AWC / AWL / AWB / AWI).
5. **Related** — links to ADRs, domains, code paths (for doc maintenance only; agents answer from this file first).
6. **Last reviewed** — ISO date when behavior last matched production.

Do not duplicate full ADR text; link instead.

## Query before code

```bash
npm run feature-knowledge:query -- "this computer token hash" --feature=docs
npm run feature-knowledge:query -- "AWC browser local identity" --feature=docs
```

Open the top `sourcePath` under `docs/qa/` when present.

## Catalog

| File                                                                                       | Topic                                                                                                     |
| ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| [awl-agent-witch-local-naming.md](awl-agent-witch-local-naming.md)                         | AWL = Agent Witch Local (not “Live”; `apps/live/` is legacy slug)                                         |
| [awc-agent-witch-cloud-naming.md](awc-agent-witch-cloud-naming.md)                         | AWC = Agent Witch Cloud (not “Console”; `apps/console/` is legacy slug)                                   |
| [awc-how-browser-knows-this-computer.md](awc-how-browser-knows-this-computer.md)           | AWC “This computer” / “This computer” vs cloud device list                                                |
| [awb-localhost-identity-and-cors.md](awb-localhost-identity-and-cors.md)                   | AWB `/identity`, CORS, AWI config vs AWL                                                                  |
| [delegate-local-cli-conversation-context.md](delegate-local-cli-conversation-context.md)   | Local CLI (Cursor, etc.) follow-up context / `--continue`                                                 |
| [antigravity-cli-shipped-path.md](antigravity-cli-shipped-path.md)                         | agy argv order, OAuth token path, honesty chips (no Writer API fallback stamp)                            |
| [writer-dispatch-cascade-routing.md](writer-dispatch-cascade-routing.md)                   | Mac dispatch route: continuation vs memory/RAG budget                                                     |
| [awc-project-folder-path-picker.md](awc-project-folder-path-picker.md)                     | AWC cannot pick Mac folders; use AWL / AWB `select-folder`                                                |
| [awc-awl-projects-source-of-truth.md](awc-awl-projects-source-of-truth.md)                 | AWC DB owns project metadata; AWL loads cloud; `.agent-witch/` is repo-local                              |
| [awi-update-local-launchagent-plist.md](awi-update-local-launchagent-plist.md)             | Update local invalid LaunchAgent plist / Mac reconnecting (AGENT-067)                                     |
| [awc-mac-reconnecting-vs-local-live.md](awc-mac-reconnecting-vs-local-live.md)             | AWC “reconnecting / checks in” vs local AWI/AWB being up                                                  |
| [awc-offline-while-awl-connected.md](awc-offline-while-awl-connected.md)                   | AWC “Mac offline” while AWL says Connected and the WebSocket handshake succeeded                          |
| [awc-offline-devices-hide-connect-button.md](awc-offline-devices-hide-connect-button.md)   | Connect this computer when this computer is not in the device list                                        |
| [awc-connect-click-creates-duplicate-macs.md](awc-connect-click-creates-duplicate-macs.md) | Repeated Connect this computer clicks must not clone Your computer / Mac 2                                |
| [awc-connect-when-awl-already-running.md](awc-connect-when-awl-already-running.md)         | Connect this computer while AWL is already running, outdated, or deleted in the Console                   |
| [awc-delete-mac-forgets-local-connection.md](awc-delete-mac-forgets-local-connection.md)   | Deleting a computer removes the cloud identity; the computer forgets connection and app code              |
| [awl-loopback-origin.md](awl-loopback-origin.md)                                           | AWL is only `http://127.0.0.1:43347` (no vanity hostname)                                                 |
| [awi-does-not-install-local-llm.md](awi-does-not-install-local-llm.md)                     | AWI installs Ollama on install and update when the command is missing                                     |
| [awi-owns-update-local.md](awi-owns-update-local.md)                                       | Update local work is AWI; the button is AWC; `/update/run` is AWB                                         |
| [task-estimate-uses-ollama-sidecar.md](task-estimate-uses-ollama-sidecar.md)               | Task time estimate is a non-blocking Ollama sidecar; history RAG calibrates it                            |
| [prompt-optimizer.md](prompt-optimizer.md)                                                 | Prompt optimizer on this computer: writers run in the project folder; bots call `/prompt-optimizer/agent` |
| [prompt-optimizer-wizard-verification.md](prompt-optimizer-wizard-verification.md)         | Post-release checklist + dogfood prompt for wizard steps 1–4 (bundle 172+)                                |
| [awc-process-health.md](awc-process-health.md)                                             | `GET /api/health`: process liveness, release label, migration flag; 200 before Next is ready              |
| [prompt-lab-workflow-eval.md](prompt-lab-workflow-eval.md)                                 | Prompt Lab: workflow scenarios, baselines, usage/output reports for the prompt lifecycle                  |

Add a row here when you add a Q&A file.

## Maintenance

After adding or editing any file here:

```bash
npm run feature-knowledge:index
```

Commit `.feature-knowledge/index.json` on the same branch. Agent rule: **`rules-system-qa-rag.mdc`**.
