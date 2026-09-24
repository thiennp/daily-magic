# Lessons from AgentCore that add no recurring cost

Companion to [docs/qa/bedrock-agentcore-vs-agent-witch-flow.md](../qa/bedrock-agentcore-vs-agent-witch-flow.md), which compares the two flows layer by layer. That file says **what is missing**; this file says **what we would do about it without anyone paying more**. Status: **proposed**, not accepted — no ADR yet.

## What "no recurring cost" means here

A proposal qualifies only if it adds none of the following:

| Cost to avoid             | Concretely                                                                   |
| ------------------------- | ---------------------------------------------------------------------------- |
| Tokens on the team's bill | No server-side LLM call per run (no LLM-as-judge)                            |
| Tokens on the user's bill | No extra writer turns, no extra dispatches to produce a metric               |
| New paid infrastructure   | No tracing vendor, no vector service, no container registry, no new database |
| Neon growth               | Prefer deriving from rows already written over writing new rows              |
| User setup work           | No new daemon to install, no manual per-project configuration                |

Engineering time is not free, and nothing below pretends otherwise. The claim is narrower and more useful: **none of these items change the monthly bill for the user or for the team.**

## Ranked proposals

### 1. Trust tiers instead of one hardcoded most-permissive flag

_AgentCore layer: gateway and policy._

`scripts/buildWriterCliInvocation.ts` currently pins the most permissive setting for every writer, on every run, for every capability: `--dangerously-skip-permissions` for Claude and Antigravity, `exec -s danger-full-access` for Codex, `agent -p --force --trust --sandbox disabled` for Cursor.

**Why it is free:** the sandbox and permission machinery already ships inside each CLI binary the user already installed. Selecting a stricter tier is a different string in `args` — it costs nothing to emit and can only reduce work the agent does. A tier chosen per capability (or per device, from `AgentWitchClientConfig`) needs no new service and no new storage.

**The catch, honestly:** a stricter tier means the CLI will sometimes stop and ask instead of proceeding, and in a headless dispatch a question looks like a stall. So this lands on top of the `[[AWAITING_INPUT]]` checkpoint path that already exists (`scripts/agentWitchRunSessionsAwaitingInput.ts`) rather than as a standalone flag change. That is the real work, and it is one-time.

This is the only item on the list that is also a security fix — see [docs/security/threat-model.md](../security/threat-model.md).

### 2. A git verdict around every run

_AgentCore layer: evaluations (the ground truth an evaluator needs)._

Nothing in AWI or AWL inspects git state today: there is no `rev-parse`, no `status --porcelain`, no `diff` anywhere under `apps/` or `scripts/`. The only git awareness is prompt text telling the **writer** to run git itself.

**Why it is free:** git is already installed, the repository is already on disk, and the run is already executing in that directory. `git status --porcelain` plus `git diff --shortstat` before and after a run cost milliseconds of local CPU and zero tokens.

**What it buys:** it converts "the agent said it finished" into "three files changed, +48/-12, branch unchanged, working tree was already dirty before we started". That is a real verdict, and it is exactly the signal the existing honesty features lack — `parseAgentRunWriterExecutionHonestyFromOutput` today reports which backend ran, not whether any work happened. It also explains a common failure mode that currently surfaces as a confusing success.

### 3. Scorecards computed from rows that already exist

_AgentCore layer: built-in evaluators._

`agent_runs` already stores `result_exit_code`, `result_outcome_code`, `status`, `started_at`, `completed_at`, and `capability_version_id`. `capability_feedback` already stores a 1–5 `rating` and a comment tied to `agent_run_id`.

**Why it is free:** a per-capability-version scorecard — success rate, median duration, share of `session_limit` / `provider_quota` outcomes, mean rating — is one aggregate query over rows that are written whether or not anyone looks at them. No new writes, no new table, no model call.

**The catch:** exit code alone is a weak proxy for quality, which is why item 2 is ranked above this one. A scorecard built on exit code plus git delta plus user rating is worth reading; one built on exit code alone will mostly measure whether the CLI crashed.

### 4. A/B testing that costs nothing because it labels runs users already make

_AgentCore layer: A/B testing._

Dispatch already pins `capability_version_id` on every run (`executeWriterRunDispatch.ts`), and `capability_versions` already models more than one version per capability.

**Why it is free:** alternating that pin between the current version and a candidate is arithmetic at dispatch time, and item 3 reads the result. You never pay for an experimental run — you attribute runs the user was going to make anyway. This is the sharpest contrast with the AgentCore model, where an A/B arm is additional metered inference.

**The catch:** at low run volume the comparison takes a long time to mean anything, and users experience non-deterministic instructions in the meantime. It should be opt-in per capability, and the scorecard should refuse to declare a winner below a sample threshold rather than showing a noisy number.

### 5. A run waterfall derived from timestamps we already record

_AgentCore layer: CloudWatch traces._

`agent_run_events` is already append-only with `seq`, `kind`, `payload`, and `created_at`, emitting `status.running`, `terminal.end`, and `status.completed` / `status.failed` (`src/lib/dispatch/dispatchWriterRunToAgent.ts`). `workflow_step_runs` carries per-step timestamps and its linked `agent_run_id`. The Mac report file carries `history[].at`.

**Why it is free:** that is already a span tree. Rendering it as a waterfall in Reports is a read, not a collection pipeline — no OTel collector, no vendor, no retention bill, no new rows.

**The catch:** the grain is coarse. Finer spans mean more event rows, which is real Neon growth, so the sequence matters: render what exists first, and add events only where a specific diagnostic question proves the coarse view insufficient.

### 6. Cross-device memory without a memory service

_AgentCore layer: managed memory._

The "recent runs" block AWI injects into prompts is read from a Mac-local JSONL file, so a second machine starts cold. But the underlying content — prompt and output per run, scoped by `project_id` — is already in Neon.

**Why it is free:** a second device can hydrate that memory block from the cloud it is already connected to, over an API surface that already exists. Embeddings stay local in Ollama, which already degrades to an empty result set when absent (`embedTextWithOllama` returns `null` and callers skip), so no hosted vector store enters the picture.

**The catch:** `result_output` is raw terminal text and must be redacted before it re-enters a prompt, and this moves a little read load onto Neon. Neither changes the bill; both are correctness work.

### 7. Pin the harness version on the run

_AgentCore layer: versioning and endpoints._

The local manifest already increments `sets[slug].version` on every install, and composition snapshots already carry a per-entry `versionId`. Runs record `capability_version_id` but not which harness files were on disk.

**Why it is free:** the value is already flowing through the dispatch path; recording it makes "which instructions produced this output" answerable, which is a precondition for items 3 and 4 meaning anything. Pure wiring.

## What not to copy, because it bills someone

| AgentCore feature               | Why we should not clone it                                                                                                                                                                   | Cheaper substitute                            |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| LLM-as-judge evaluators         | A model call per run, per rubric, on the team's bill. Note `src/lib/improvements/` is deliberately deterministic today — accepting a suggestion publishes a version, it does not ask a model | Items 2, 3, and the rating users already give |
| Managed memory / vector service | Recurring per-GB and per-query cost for something local files plus Ollama already do                                                                                                         | Item 6                                        |
| Tracing backend                 | Ingest and retention pricing for spans we can derive                                                                                                                                         | Item 5                                        |
| Tool gateway proxy              | We would host and pay for a hop on every tool call, and re-implement policy the CLI already enforces                                                                                         | Item 1                                        |
| Firecracker-style isolation     | Container build, registry, and disk on every run                                                                                                                                             | See below — partially                         |

## Cheap, but not actually free

Listed separately so the ranking above stays honest.

- **A git worktree per run.** This buys most of what microVM isolation buys — the agent cannot dirty the tree you are looking at, and concurrent runs stop colliding — with no container runtime, image, or registry, because a worktree shares the existing object database on the same disk. But a worktree does not share `node_modules`, so a JavaScript repository pays real disk and a real install per worktree. Plausible default for automations, wrong default for interactive runs.
- **Durable report fields.** Report status, summary, and history currently live on the WebSocket and in the browser cache only; the cloud keeps outcome but not the narrative. Persisting them is new Neon rows — small, and still not zero.

## Related

- [docs/qa/bedrock-agentcore-vs-agent-witch-flow.md](../qa/bedrock-agentcore-vs-agent-witch-flow.md) — the layer-by-layer comparison this follows from
- [docs/qa/writer-dispatch-cascade-routing.md](../qa/writer-dispatch-cascade-routing.md) — the memory and RAG budget tiers item 6 would extend
- [docs/security/threat-model.md](../security/threat-model.md) — why item 1 is more than a nicety
- [docs/adr/0005-shared-mac-presence-and-dispatch-outbox.md](../adr/0005-shared-mac-presence-and-dispatch-outbox.md) — presence and queueing constraints any of this inherits
- Code anchors: `scripts/buildWriterCliInvocation.ts`, `src/lib/dispatch/dispatchWriterRunToAgent.ts`, `src/lib/dispatch/executeWriterRunDispatch.ts`, `apps/live/features/knowledge/internal/core/agentWitchLocalRag.ts`, `apps/install/features/runtime-client/internal/core/composition/materializeRunScopedCompositionOverlay.ts`

## Last reviewed

2026-09-24
