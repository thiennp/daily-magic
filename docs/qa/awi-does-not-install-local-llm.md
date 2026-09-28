# Does AWI install Ollama?

## Query aliases

- AWI install local LLM
- AWI install Ollama
- does Agent Witch install Ollama
- local LLM on Mac install
- nomic-embed-text install
- cài Ollama khi cài Agent Witch
- AWI có cài LLM local không
- AWI update installs Ollama

## Short answer

**Yes, when it is missing.** Mac install and update (**AWI**) check for the `ollama` command. AWI tries `brew install ollama`. If Homebrew cannot install it, the macOS release is downloaded into the Agent Witch home directory and linked from `~/.local/bin/ollama`. AWI then starts the local server and pulls `qwen2.5:7b` and `nomic-embed-text` in the background when those models are not already present. A failed Ollama install does not stop the Agent Witch install.

## Details

| Piece             | What AWI does                                                                                                                                                                       |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Install script    | `agent_witch_ensure_ollama` runs after the Node.js check on a fresh install and on the bash update script                                                                           |
| Self-update       | `runAgentWitchSelfUpdate` runs the same check before it decides whether the install bundle is newer                                                                                 |
| Already installed | Skips `brew install` and only starts the server or pulls a missing model                                                                                                            |
| Homebrew fails    | Downloads `ollama-darwin.tgz` into the install home and links `~/.local/bin/ollama`                                                                                                 |
| Models            | Estimate chat `qwen2.5:7b` (`AGENT_WITCH_ESTIMATE_MODEL`). Embeddings `nomic-embed-text` (`AGENT_WITCH_EMBED_MODEL`). Pull progress is appended to `<install>/logs/ollama-pull.log` |

Task estimates call `http://127.0.0.1:11434/api/chat`. If the server or model is not ready yet, the task still runs and the estimate column stays empty until Ollama answers.

## Related

- [task-estimate-uses-ollama-sidecar.md](task-estimate-uses-ollama-sidecar.md)
- Code: `apps/install/features/self-update/internal/core/buildAgentWitchEnsureOllamaShell.ts`
- Code: `apps/install/features/self-update/internal/core/ensureAgentWitchOllamaInstalled.ts`

## Last reviewed

2026-09-27
