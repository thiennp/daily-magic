# Does task estimation use a local LLM?

## Query aliases

- do we use local LLM for estimating
- task time estimate Ollama
- WORKING_ESTIMATE sidecar
- pre-estimate local model
- estimate history RAG actual duration
- ước lượng task bằng Ollama

## Short answer

**Yes.** Before a run, the computer checks `ollama list` and each writer CLI version. The estimate then uses the best chat model already installed (`qwen2.5:7b` when it is present, otherwise the next installed chat model). `AGENT_WITCH_ESTIMATE_MODEL` wins only when that model is already installed. The call is `http://127.0.0.1:11434/api/chat`. The CLI check finishes first. The estimate chat then runs beside writer setup, so the task does not wait for the model reply. The history file keeps every row. The time prompt names the writer and includes only the latest 100 finished tasks from `estimate-history.ndjson` (estimated seconds and actual seconds). A second non-blocking Ollama call estimates the writer-reported token total (input, output, and cache). The prompt names that writer's recent actual range, matches the history row with the closest task length, skips a single spike, and still receives only the latest 100 finished token rows. Claude CLI print uses `--output-format json`. Actual tokens are that usage object's input, output, and cache tokens. Other writers still use their usage report. When the run finishes, the actual duration is written onto that row. **AWL** History at [http://127.0.0.1:43347/history](http://127.0.0.1:43347/history) lists every prompt on this computer in a table. A row opens the input, output, and time and token estimates in a dialog. It is not tied to a workflow. AWC also shows **Estimated** and **Actual** on the job card and report.

AWI installs Ollama on install and update when the `ollama` command is missing, then pulls the embedding model in the background (and the small `qwen2.5:3b` estimate model only when no chat model is installed). If Ollama is not ready yet, the task still runs and the UI keeps its fallback timer.

## Details

| Piece      | Behavior                                                                                                                                                                            |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sidecar    | `runAgentRunPreEstimate` → `requestOllamaTaskEstimate`                                                                                                                              |
| Main task  | Starts immediately. The prompt tells the writer not to emit the initial estimate                                                                                                    |
| UI         | Late `[[WORKING_ESTIMATE]]` chunk updates working progress                                                                                                                          |
| Before run | `ollama list` and writer `--version` checks. The chat uses the best installed model. Embedding models are skipped.                                                                  |
| History    | `estimate-history.ndjson` keeps every prompt. AWL History is a table; a row opens input, output, and both estimates. Each estimation prompt uses only its latest 100 finished rows. |
| RAG        | Project knowledge still uses Ollama embeddings (`nomic-embed-text`), a different call                                                                                               |

AWI pulls `nomic-embed-text` when it is missing, and `qwen2.5:3b` only when no chat model exists. The pull log is `<install>/logs/ollama-pull.log`.

## Related

- [awi-does-not-install-local-llm.md](awi-does-not-install-local-llm.md) — AWI installs Ollama when it is missing
- `scripts/runAgentRunPreEstimate.ts`
- `scripts/requestOllamaTaskEstimate.ts`
- `scripts/agentRunEstimateHistory.ts`

## Last reviewed

2026-09-27
