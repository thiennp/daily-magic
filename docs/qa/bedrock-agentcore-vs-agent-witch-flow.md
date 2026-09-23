# How does the Agent Witch flow compare with AWS Bedrock AgentCore?

## Query aliases

- so sanh do hieu qua bedrock va agent witch
- so sanh flow bedrock agentcore voi agent witch
- bedrock agentcore vs agent witch
- AgentCore harness CreateHarness InvokeHarness vs Agent Witch dispatch
- Firecracker microVM vs Mac writer CLI runtime
- agent witch co giong bedrock agentcore khong
- managed agent runtime versus dispatch to developer machine
- AgentCore memory tools skills identity observability evaluations mapping

## Short answer

Both systems assemble the same five ingredients — **harness, models, tools, memory, skills** — then invoke a run, but they optimise for opposite ends. **AgentCore** builds a _disposable agent process_ inside an AWS-managed Firecracker microVM and bills per token plus per runtime-second; its strengths are tool governance, isolation, fleet observability, and evaluation. **Agent Witch** builds a _harness on a machine that already holds the repo and the writer-CLI subscription_ (AWC pushes `harness.request`, then dispatches `command.claude.run`; AWI runs Claude Code / Codex / Cursor / Antigravity in the real project folder under a PTY). Agent Witch is more effective per dollar and higher-fidelity for coding work on an existing repo; AgentCore is more effective for scale, sandboxing, credential brokering, and automated scoring. Agent Witch's real gaps versus the AgentCore picture are **tool policy** and **evaluations**, not models or memory.

## Details

### The two invocation flows side by side

| Step                | AgentCore                                                            | Agent Witch                                                                                                               |
| ------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Define the agent    | `CreateHarness` — declarative config (models, tools, memory, skills) | Harness set published in AWC; capability / workflow defines the form and prompt                                           |
| Materialise it      | Config baked into a runtime + optional custom container              | `harness.request` deterministic bundle written to `~/.agent-witch/harness/`, optionally linked into the repo's `.cursor/` |
| Invoke              | `InvokeHarness` — AWS starts a microVM                               | `command.claude.run` over `wss://www.agentwitch.com/api/agent-witch/ws` to a paired device                                |
| Execute             | Agent loop in the microVM, shell commands allowed                    | Writer CLI spawned in `projectFolderPath` (PTY), or Writer API when secrets/settings select it                            |
| Stream results      | CloudWatch logs and traces                                           | `shell.*` / `terminal.stream.*` → `agent_runs` → SSE → Reports                                                            |
| When target is down | AWS schedules another microVM                                        | `agent_witch_dispatch_outbox` queues queueable messages until the socket reconnects (ADR 0005)                            |

The decisive difference: AgentCore **brings the environment to the task**, Agent Witch **brings the task to the environment**. Everything below follows from that.

### Layer-by-layer effectiveness

| Layer             | AgentCore                                                                                    | Agent Witch today                                                                                                                                                                                | More effective for this flow                                                                                                                                                                                                          |
| ----------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Models**        | Bedrock catalogue, direct Anthropic/OpenAI/Gemini APIs, LiteLLM; model is a routed parameter | Five writer ids (`claude-cli`, `codex`, `cursor`, `cursor-cloud`, `antigravity`); model choice is delegated to the CLI; Writer API fallback maps to Anthropic / OpenAI / Google                  | **AgentCore** for breadth and cost routing; **Agent Witch** for cost per completed coding task, because a flat-rate CLI seat replaces per-token billing                                                                               |
| **Tools**         | Managed MCP gateway **with policy**, browser, code interpreter, web search, inline functions | No central tool registry; tools are whatever the writer CLI ships, run with `--dangerously-skip-permissions` / `danger-full-access` / `--sandbox disabled`                                       | **AgentCore** — this is Agent Witch's clearest structural gap; Agent Witch only wins on "real repo tooling for free" (actual git, npm, test suite)                                                                                    |
| **Memory**        | Managed short- and long-term memory, or bring your own                                       | Mac-local recent-run JSONL, Ollama `nomic-embed-text` RAG with a cosine floor, dual-store writer transcripts, CLI `--continue`; tiered budgets in `resolveWriterDispatchRoute`                   | **Roughly equal in outcome.** Agent Witch is better tuned (hot `--continue` turns inject nothing, so context stays cheap) and never leaves the machine; AgentCore wins on durability and sharing across devices and teammates         |
| **Skills**        | AWS skills, git source, S3 source, container-baked at creation time                          | Versioned harness sets pushed as a deterministic bundle, forkable via marketplace/library, materialised into the repo's `.cursor/`                                                               | **Agent Witch** in its niche — the same harness files serve the agent _and_ the human who later opens the repo; **AgentCore** for immutability and reproducibility                                                                    |
| **Runtime**       | Firecracker microVM, managed session filesystem or S3/EFS, own container optional            | The user's Mac or Linux host via AWI, inside the real working tree; no sandbox beyond CLI flags; Cursor Cloud as an alternate target                                                             | **AgentCore** for isolation, concurrency, and not depending on a machine being awake; **Agent Witch** for fidelity — uncommitted changes, real toolchain versions, real local services — and for zero environment build/clone latency |
| **Identity**      | Inbound and outbound auth, OAuth, API-key brokering as a managed layer                       | Auth.js for humans; install token plus Ed25519 device keypair for AWI; encrypted Cursor Cloud key; outbound LLM auth is the CLI's own login or `writer-api-secrets.json` on the Mac              | **Comparable inbound.** **AgentCore** for outbound rotation and audit; **Agent Witch** avoids holding user LLM credentials centrally at all                                                                                           |
| **Observability** | CloudWatch traces, logs, metrics, unified harness view                                       | `agent_runs` rows, live PTY streaming, Reports UI, honesty markers, completion outbox, stale-run reconciliation; no metrics or tracing backend                                                   | **Agent Witch** for the human-in-the-loop moment (watch the terminal live, type into it, answer `[[AWAITING_INPUT]]`); **AgentCore** for fleet-level aggregation                                                                      |
| **Evaluations**   | Built-in and custom evaluators, A/B testing, recommendations, versioning and endpoints       | Outcome classification parsed from writer output, execution-honesty markers, user feedback, improvement suggestions, capability versioning, workflow step retry — no automated eval suite or A/B | **AgentCore** — Agent Witch's second structural gap                                                                                                                                                                                   |

### Where the comparison is not apples to apples

- **Product shape.** AgentCore is a platform for _shipping agent services to end users_. Agent Witch is a control plane for _dispatching coding agents to machines that already hold the code and the subscriptions_. A "run" in AgentCore is a request; a run in Agent Witch is a work session on someone's checkout.
- **Cost curve.** AgentCore scales with tokens and microVM-seconds. Agent Witch's marginal run cost is close to zero once the CLI seat exists — which is why it can afford long, chatty agent turns that would be expensive under per-token billing.
- **Human checkpoints.** Official Agent Witch workflows alternate operator checkpoints with bounded agent dispatches (`src/lib/workflowOrchestration/`). AgentCore's graph is agent-centric; human gating is the caller's job.
- **Failure mode.** AgentCore fails by exhausting retries or quota. Agent Witch fails when the Mac is asleep, the CLI is not logged in, or the repo is dirty in an unexpected way — hence the outbox, watchdog, and send-readiness reason codes.

### What Agent Witch would borrow first

Ranked by the size of the gap this flow exposes:

1. **Tool policy gate.** Today every writer CLI runs with permission prompts disabled. An AgentCore-style allow/deny policy per harness would be the highest-value addition, and it is the only gap that is also a security issue (`docs/security/threat-model.md`).
2. **Evaluators and scoring.** Outcome parsing plus feedback is not a substitute for repeatable scoring of a capability version across runs; `published_capabilities` already carries the version identity needed to attach scores.
3. **Shared memory tier.** Local RAG and transcripts are per-machine; promoting a redacted subset into AWC would let a second device or a teammate reuse them.
4. **Traces and metrics.** `agent_runs` records outcomes but not spans; OTel-style traces would make multi-step workflow runs diagnosable without reading raw terminal output.

## Related

- [mac-harness-workflow-agent-dispatch.md](mac-harness-workflow-agent-dispatch.md) — the dispatch flow this compares against
- [writer-dispatch-cascade-routing.md](writer-dispatch-cascade-routing.md) — memory and RAG budget tiers
- [official-workflow-run-checkpoints-and-retry.md](official-workflow-run-checkpoints-and-retry.md) — human checkpoints and step retry
- [docs/product/agent-witch-deployables.md](../product/agent-witch-deployables.md) — AWC / AWL / AWB / AWI boundaries
- [docs/adr/0005-shared-mac-presence-and-dispatch-outbox.md](../adr/0005-shared-mac-presence-and-dispatch-outbox.md) — presence tiers and the outbox
- Code anchors: `src/lib/dispatch/dispatchWriterRunForDashboardUser.ts`, `apps/install/entry/startAgentWitchClient.ts`, `scripts/buildWriterCliInvocation.ts`, `apps/live/features/knowledge/internal/core/agentWitchLocalRag.ts`

## Last reviewed

2026-09-23 (AgentCore side described from the published AgentCore harness architecture diagram; Agent Witch side verified against code on this date)
