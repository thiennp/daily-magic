# Does AWI install a local LLM such as Ollama?

## Query aliases

- AWI install local LLM
- AWI install Ollama
- does Agent Witch install Ollama
- local LLM on Mac install
- nomic-embed-text install
- cài Ollama khi cài Agent Witch
- AWI có cài LLM local không

## Short answer

**No.** The Mac install (**AWI**) installs the Agent Witch runtime, Node.js when it is missing, LaunchAgents, and optional writer CLIs (Claude, Codex, Cursor, Antigravity). It does not install Ollama or any other local chat model.

Ollama is an optional local server. Task time estimates call its chat API when it is already running. RAG embeddings call its embeddings API. If nothing is listening on `http://127.0.0.1:11434`, those calls are skipped and the task still runs.

## Details

| Piece   | What AWI does                                                                                           |
| ------- | ------------------------------------------------------------------------------------------------------- |
| Runtime | Node client under `~/.agent-witch` (or `~/.local-agent-witch` for localhost), LaunchAgents, self-update |
| Node    | Homebrew `node@22` (or `node`) only when Node is missing or too old                                     |
| Writers | On demand: `claude`, Codex, `cursor`, `agy` — cloud CLIs, not a local model server                      |
| Ollama  | Not installed, not started, no model pull                                                               |

Task estimates use `POST /api/chat` with `qwen2.5:7b` unless `AGENT_WITCH_ESTIMATE_MODEL` is set. RAG uses `nomic-embed-text` unless `AGENT_WITCH_EMBED_MODEL` is set. Both honor `AGENT_WITCH_OLLAMA_URL`.

## Related

- [task-estimate-uses-ollama-sidecar.md](task-estimate-uses-ollama-sidecar.md)
- Code: `scripts/requestOllamaTaskEstimate.ts`
- Code: `apps/live/features/knowledge/internal/core/agentWitchLocalRag.ts`

## Last reviewed

2026-09-27
