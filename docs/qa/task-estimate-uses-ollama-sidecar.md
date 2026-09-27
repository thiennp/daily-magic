# Does task estimation use a local LLM?

## Query aliases

- do we use local LLM for estimating
- task time estimate Ollama
- WORKING_ESTIMATE sidecar
- pre-estimate local model
- estimate history RAG actual duration
- ước lượng task bằng Ollama

## Short answer

**Yes.** A task time estimate is an Ollama chat call on the Mac (`http://127.0.0.1:11434/api/chat`, model `qwen2.5:7b` unless `AGENT_WITCH_ESTIMATE_MODEL` is set). The sidecar starts before writer setup and RAG, so the main task is not waiting on the estimate. The history file keeps every row. The prompt names the writer that will do the work and includes only the latest 100 finished tasks from `estimate-history.ndjson` (estimated seconds and actual seconds). When the run finishes, the actual duration is written onto that row. **AWL** shows the latest 100 finished runs on [http://127.0.0.1:43347/estimates](http://127.0.0.1:43347/estimates) (Estimates in the Mac app nav), including a run whose prediction never arrived. AWC also shows **Estimated** and **Actual** on the job card and report.

AWI installs Ollama on install and update when the `ollama` command is missing, then pulls the estimate and embedding models in the background. If Ollama is not ready yet, the task still runs and the UI keeps its fallback timer.

## Details

| Piece     | Behavior                                                                                                                                                                                                                       |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Sidecar   | `runAgentRunPreEstimate` → `requestOllamaTaskEstimate`                                                                                                                                                                         |
| Main task | Starts immediately. The prompt tells the writer not to emit the initial estimate                                                                                                                                               |
| UI        | Late `[[WORKING_ESTIMATE]]` chunk updates working progress                                                                                                                                                                     |
| Override  | `AGENT_WITCH_OLLAMA_URL`, `AGENT_WITCH_ESTIMATE_MODEL`                                                                                                                                                                         |
| History   | `estimate-history.ndjson` in the profile reports dir keeps every row. The estimate prompt uses only the latest 100 finished rows that have both an estimate and an actual duration. AWC job history shows the same comparison. |
| RAG       | Project knowledge still uses Ollama embeddings (`nomic-embed-text`), a different call                                                                                                                                          |

AWI pulls `qwen2.5:7b` and `nomic-embed-text` when they are missing. The pull log is `<install>/logs/ollama-pull.log`.

## Related

- [awi-does-not-install-local-llm.md](awi-does-not-install-local-llm.md) — AWI installs Ollama when it is missing
- `scripts/runAgentRunPreEstimate.ts`
- `scripts/requestOllamaTaskEstimate.ts`
- `scripts/agentRunEstimateHistory.ts`

## Last reviewed

2026-09-27
