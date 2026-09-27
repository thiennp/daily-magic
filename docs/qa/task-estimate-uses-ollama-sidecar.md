# Does task estimation use a local LLM?

## Query aliases

- do we use local LLM for estimating
- task time estimate Ollama
- WORKING_ESTIMATE sidecar
- pre-estimate local model
- ước lượng task bằng Ollama

## Short answer

**Yes.** A task time estimate is an Ollama chat call on the Mac (`http://127.0.0.1:11434/api/chat`, model `qwen2.5:7b` unless `AGENT_WITCH_ESTIMATE_MODEL` is set). The sidecar starts before writer setup and RAG, so the main task is not waiting on the estimate. The prompt names the writer that will do the work (Claude CLI, Cursor agent CLI, Codex CLI, Antigravity CLI, or the saved API model).

If Ollama is down or the model is missing, the task still runs and the UI keeps its fallback timer.

## Details

| Piece     | Behavior                                                                         |
| --------- | -------------------------------------------------------------------------------- |
| Sidecar   | `runAgentRunPreEstimate` → `requestOllamaTaskEstimate`                           |
| Main task | Starts immediately. The prompt tells the writer not to emit the initial estimate |
| UI        | Late `[[WORKING_ESTIMATE]]` chunk updates working progress                       |
| Override  | `AGENT_WITCH_OLLAMA_URL`, `AGENT_WITCH_ESTIMATE_MODEL`                           |
| RAG       | Still uses Ollama embeddings (`nomic-embed-text`), a different model             |

Pull the chat model once: `ollama pull qwen2.5:7b`.

## Related

- [awi-does-not-install-local-llm.md](awi-does-not-install-local-llm.md) — AWI does not install Ollama
- `scripts/runAgentRunPreEstimate.ts`
- `scripts/requestOllamaTaskEstimate.ts`

## Last reviewed

2026-09-27
