# AWL cache / Redis / vector-store research (AW Mac)

Status: **research only, nothing installed or built.** Base `origin/main` @ `199e1a8c`. Companion to `mac-research.md` (§5 Ollama summaries, §6 per-project outcome store).
Tags: **VERIFIED** = official docs/release page or repo code at the cited line. **ASSUMED** = estimate / not confirmed. **PROPOSAL** = design suggestion.
Rule: paths only. Secret files are listed by **path** only; their contents were never read.

---

## 1. What AWL ships today

| Layer | Exists? | Code | Data on disk |
| --- | --- | --- | --- |
| **Redis (local or remote)** | **No** | `git grep -nwiE "redis\|ioredis"` over `package.json`, `apps/`, `scripts/`, `packages/`, `src/`, `server.ts` returns 0 hits (VERIFIED) | none |
| **SQLite: pitfall / token-saver cache** | **Yes** (the only SQLite in AWL) | `loadNodeSqlite` / `requireNodeSqlite` / `describePitfallCacheAvailability`: `apps/live/features/token-saver/internal/core/loadNodeSqlite.ts:3-84`. Builtin `node:sqlite` is loaded lazily through `process.getBuiltinModule`, so Node 20 / 22.12 still start (fix `f98b52a7`, "start AWL on Node 20+ without node:sqlite", bundle 266). `openPitfallDb`: `openPitfallDb.ts:36-48` (mkdir, `PRAGMA busy_timeout = 3000` from `pitfall.constants.ts:11`, schema SQL, `pitfall_meta.schema_version`). Path: `resolveTokenSaverDbPath` → `resolveProfileScopedPath` (`resolveTokenSaverDbPath.ts:7-9`, `resolveProfileScopedPath.ts:12-23`) | `~/.agent-witch/profiles/<email>/token-saver.db` (legacy: `<installDir>/token-saver.db` when there is no profile) |
| Node version condition | Yes | `AGENT_WITCH_MIN_NODE_MAJOR = 20`, `AGENT_WITCH_FULL_FEATURE_NODE_VERSION_LABEL = "22.13"` (`src/lib/agentWitch/agentWitchNodeRuntime.constant.ts:2-10`). `NODE_SQLITE_MIN_NODE_VERSION_LABEL = "22.13"` (`loadNodeSqlite.ts:4`). `node:sqlite` is unflagged in 22.13+/23.4+ (repo comment `:3`; VERIFIED against Node docs history) | Thien's Mac runs Node v26.8.1 |
| **Retrieval (RAG)** | **Yes, flat file** | `apps/live/features/knowledge/internal/core/agentWitchLocalRag.ts`: `chunkTextForRag` (800 chars, `:54`), `embedTextWithOllama` (`POST /api/embeddings`, model `nomic-embed-text`, `:12`, `:68-97`, **no timeout**, deprecated endpoint), `indexAgentWitchRagText` (redact → chunk → embed → `appendFileSync` NDJSON, `:120-163`), `queryAgentWitchRag` (read the whole file, brute-force JS `cosineSimilarity` `:36`, top-k, `:165-199`). Cap `AGENT_WITCH_PROJECT_RAG_CHUNK_CEILING = 500` per project (`agentWitchProfileKnowledge.constants`, trimmed by `trimRagChunksToCeiling`). Called before every writer task (`apps/install/entry/startAgentWitchClient.ts:444-469`) and after every result (`:1793-1819`) | Profile: `~/.agent-witch/profiles/<email>/projects/<projectId>/knowledge/{chunks.ndjson, lessons.ndjson, error-chunks.ndjson, usage-stats.json}` (`resolveProfileProjectKnowledgeLayout.ts:24-40`). Legacy repo-local (no projectId): `<projectFolder>/.agent-witch/rag/chunks.ndjson`, `.agent-witch/memory/runs.ndjson` (`resolveAgentWitchProjectStorageLayout.ts:24-50`, constants `agentWitchProjectStorage.constants.ts`) |
| Error knowledge / memory | Yes (NDJSON) | `agentWitchLocalErrorKnowledge.ts`, `apps/live/features/memory/internal/core/agentWitchLocalMemory.ts` | same knowledge dir as above |
| AW History (project computer history) | Yes (JSON/JSONL files) | `resolveProjectDataDir` / `ensureProjectDataTree` (`apps/live/features/project-history/internal/core/resolveProjectDataDir.ts:19-43`, dirs 0700 / files 0600 `projectHistoryPaths.constant.ts:8-9`), purge `purgeProjectHistoryOnOff.ts:30-48` | `~/.agent-witch/profiles/<email>/project-data/<projectId>/{history/, skills/, skills/_drafts/, skills/_tombstones/, skillgen/{episodes.json,budget.json,metrics.jsonl,flags.json,learned-pitfalls.json}}` |
| Estimate history | Yes (NDJSON) | `scripts/agentRunEstimateHistory.ts` | `estimate-history.ndjson` under the reports dir |
| Prompt Optimizer store | Yes (JSON files) | `promptOptimizerLocalStorePaths.ts`, `promptSdlcLocalStore.ts`, `promptSdlcWriterReadyStore.ts` | profile dir (paths in those files) |
| Declined-projects store | Yes (JSON) | `declinedProjectsStore.ts` | `~/.agent-witch/profiles/<email>/declined-projects.json` |
| Run outbox / reports | Yes (JSON) | `scripts/agentWitchRunCompletionOutbox.ts:20, 71-115`; `scripts/agentWitchRunReport.ts` | `profiles/<email>/run-completion-outbox.json`, `profiles/<email>/reports/` |
| Ollama models | External | AWI installs/pulls `qwen2.5:7b` + `nomic-embed-text` (`buildAgentWitchEnsureOllamaShell.ts`) | Ollama's own store (`~/.ollama/models`, ASSUMED default) |
| **Secret files (paths only)** | — | `AGENT_WITCH_PROFILE_RELATIVE_PATHS` (`apps/install/features/install-layout/public-api/types.ts:7-38`) | `profiles/<email>/config.json` (holds `pairingToken`), `profiles/<email>/device-keypair.json`, `profiles/<email>/writer-api-secrets.json` |

Bundle: `deps.tar.gz` (`AWI_SHIPPED_DEPS_ARCHIVE_FILE_NAME`, `apps/install/features/bundle/public-api/types.ts:33`) is built by `buildAgentWitchBundledDepsArchive.ts`. Today its only native dependency is **node-pty**, with prebuilds for `darwin-arm64` and `darwin-x64` only (`:11-14`, `:32-60`). The archive is byte-stable (fixed epoch, `:64`). Platforms: `agent_witch_devices.platform IN ('mac','linux')` (`db/schema.sql:85`). **Windows is not an AWL target today.**

**Summary:** no Redis, one SQLite DB (pitfalls, via builtin `node:sqlite`), and a flat-file NDJSON + JS-cosine retrieval layer capped at 500 chunks per project.

---

## 2. Vector-store options under a tight RAM/disk budget

Embedding model: `nomic-embed-text` v1.5. 137M params, **274 MB** model, **768-d** output (Matryoshka, can be truncated), 8,192-token context. VERIFIED ([ollama library](https://ollama.com/library/nomic-embed-text)). Model RAM is about 0.5 GB while loaded (ASSUMED from FP16 size). Ollama unloads it after `keep_alive` (default 5m, VERIFIED).

Raw vector math (VERIFIED arithmetic): 768 × 4 B = **3,072 B / chunk float32**; int8 = 768 B; binary = 96 B.

| | **A. plain `node:sqlite` + Float32 BLOB + JS cosine** | **B. `sqlite-vec` (vec0) on `node:sqlite`** | **C. LanceDB (`@lancedb/lancedb`)** | *(today)* NDJSON + JS cosine |
| --- | --- | --- | --- | --- |
| New deps | **none** (builtin) | npm `sqlite-vec` + one loadable per platform. Release loadables ≈ **50–60 KB** (macOS/Linux), 140 KB (Windows). VERIFIED ([v0.1.8 assets](https://github.com/asg017/sqlite-vec/releases/tag/v0.1.8)) | wrapper 1.3 MB + napi-rs native `.node`; npmx install size **134–155 MB**. VERIFIED ([npmx](https://npmx.dev/package/@lancedb/lancedb/v/0.30.0)). Peer dep `apache-arrow` (VERIFIED: 1 peer dep listed) | none |
| Platforms | wherever Node ≥ 22.13 runs | linux x64/arm64, macOS x64/arm64, windows x64 (VERIFIED, release assets) | darwin-arm64, linux x64/arm64 (gnu+musl), win32 x64/arm64. **darwin-x64 dropped** (VERIFIED, [issue #3149](https://github.com/lancedb/lancedb/issues/3149); the README still claims Intel support) | all |
| Node constraint | ≥ 22.13 (`node:sqlite`) | ≥ 22.13 for `DatabaseSync({allowExtension:true})` / `loadExtension` (VERIFIED, Node docs: added v22.13.0 / v23.5.0). The sqlite-vec docs say "Node 23.5.0+" (VERIFIED), so test on 22.13–22.x | Node ≥ 18 (VERIFIED) | ≥ 20 |
| Packaging impact on `deps.tar.gz` | 0 | +~120 KB for the 2 mac loadables (+~120 KB with Linux). Must be extracted to disk to `loadExtension`. macOS quarantine/codesign of a downloaded dylib: ASSUMED low risk because AWL runs under plain `node` via a LaunchAgent, but **verify** with the Developer ID signing work (`feat/awl-mac-developer-id-default`) | +~135–155 MB per platform binary (ASSUMED per-platform share of the install size), breaks byte-stable small bundle, no Intel Mac | 0 |
| Disk per **10k chunks** (768-d, ~800-char text) | vectors 30.7 MB + text ~8 MB ≈ **~40 MB** (ASSUMED overhead small) | float32 ≈ same **~40 MB**; `int8[768]` ≈ **~16 MB**; `bit[768]` ≈ ~9 MB (ASSUMED, from 3,072/768/96 B per vector + text) | Lance columnar ≈ 31 MB vectors + text + optional IVF-PQ index ≈ **~40–45 MB** (ASSUMED) | JSON floats ≈ 15–20 KB/chunk ⇒ **~150–200 MB** (ASSUMED, ~20 chars per float). Today's cap of 500 gives ~8–10 MB |
| Query RAM (10k) | loads 30.7 MB of BLOBs per query (or a cached `Float32Array`); ~31–60 MB transient (ASSUMED) | brute-force scan in C inside SQLite; page cache only, ~few MB above SQLite (ASSUMED) | Rust runtime + Arrow buffers; tens to 100+ MB resident (ASSUMED) | `readFileSync` + `JSON.parse` of the whole file ⇒ several × file size (ASSUMED) |
| Query latency (10k × 768) | ~10–40 ms JS dot products (ASSUMED) | ~5–20 ms brute force (ASSUMED; sqlite-vec is brute-force KNN) | ms-level with an index, but cold start/load cost (ASSUMED) | grows with file size; fine at ≤ 500 |
| Fits AWL patterns | **exactly** the `openPitfallDb` pattern (busy_timeout, schema version, profile/project-scoped file, degrade when unavailable) | same, plus one `allowExtension` connection | new storage engine + Arrow types, async API | current |

---

## 3. Recommendation (**PROPOSAL**)

1. **No Redis.** AWL is a single-user, single-machine agent. A server process adds RAM, a port and a lifecycle for no gain. SQLite WAL + `busy_timeout` already covers the multi-process case (HTTP + stdio MCP share `token-saver.db`).
2. **Phase 1: option A** (plain `node:sqlite`, Float32 `BLOB`, JS cosine). Zero new deps, zero bundle growth, same degrade path as the pitfall cache (`describePitfallCacheAvailability`). Use it for the per-project outcome store (`mac-research.md` §6), the doc-summary cache (§5), and **migrate RAG from `chunks.ndjson`** (≈ 5× less disk, no full JSON parse per query). Cap at 2k–10k rows per project. Keep a `Float32Array` cache in memory per open project.
3. **Phase 2 (only if a project exceeds ~10k chunks or p95 > 50 ms): option B** `sqlite-vec`. Ship the darwin-arm64/x64 (+ linux) loadables in `deps.tar.gz` next to node-pty and load them only when `process.versions.node ≥ 22.13` **and** extension load succeeds, otherwise fall back to A. Consider `int8[768]` or Matryoshka 256-d to cut disk 4× (quality trade-off: ASSUMED small for nomic v1.5 at 256-d).
4. **Reject option C (LanceDB)** for AWL: ~135–155 MB native binary per platform, no Intel Mac, Arrow peer dependency, and a second storage engine. Its strengths (large-scale ANN, columnar analytics) do not apply at per-project scale.
5. Separately: switch `embedTextWithOllama` to `POST /api/embed` (VERIFIED: `/api/embeddings` is deprecated) and add an `AbortSignal.timeout` (it has none today, `agentWitchLocalRag.ts:76`). Store `embed_model@digest` with every vector so model changes trigger re-embedding.

### Budget targets (PROPOSAL)

| Item | Target |
| --- | --- |
| AWL resident overhead for the cache layer | ≤ 30 MB at 10k rows (A with lazy load; B lower) |
| Disk per project | ≤ 50 MB (10k chunks float32), ≤ 20 MB with int8 |
| Bundle growth | 0 (A); ≤ 250 KB (B) |
| Query p95 | ≤ 50 ms without embedding; embedding call ≤ 400 ms warm |

## 4. Open questions

- Should Phase 1 replace the RAG NDJSON files (a migration on first open), or only serve new stores?
- Profile-scoped (`profiles/<email>/…`) vs per-project (`project-data/<projectId>/…`) DB files: per-project makes History purge and owner delete trivial (`rm -rf`), so it is recommended for outcomes. A single profile DB is fine for the doc-summary cache.
- Linux node-pty prebuilds are not in `deps.tar.gz` today (`buildAgentWitchBundledDepsArchive.ts:11-14`). Any Phase 2 native add-on must solve Linux packaging too.
