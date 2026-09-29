# What is Prompt Lab (workflow evaluation)?

## Query aliases

- Prompt Lab Agent Witch, prompt SDLC, workflow eval, compare orchestrated vs baseline
- benchmark workflow tokens, workflow lab, evaluate official workflow

## Short answer

**Prompt Lab** is the planned Agent Witch surface to run **fixed scenarios** against an official **workflow** and a **baseline** (usually one-shot same inputs), persist **usage and full outputs**, and produce a **report** (cost, repeatability, side-by-side review). MVP dogfoods **`document-summary`** only. It supports the prompt lifecycle: author → version → test → measure → review → promote.

## Details

| Piece        | Behavior                                                                        |
| ------------ | ------------------------------------------------------------------------------- |
| **Scenario** | Saved form values (+ optional automated checkpoint replies) for a `template_id` |
| **Suite**    | Orchestrated runs × replicates + baseline `raw_same_prompt` × replicates        |
| **Writer**   | Same Mac writer API path as production tasks (`antigravity`, etc.)              |
| **Lab-only** | Checkpoint answers from fixtures; production checkpoints stay human-driven      |
| **Report**   | Tokens, call count, run1 vs run2 spread, final output diff                      |

Not a substitute for Cursor billing; measures writer LLM usage on the connected Mac (or configured API writer).

Canonical MVP spec: [docs/product/prompt-lab-mvp.md](../product/prompt-lab-mvp.md).

## Related

- [product-pillars.md](../product/product-pillars.md)
- `src/lib/workflowOrchestration/renderOfficialWorkflowAgentPrompt.ts`
- [bedrock-agentcore-vs-agent-witch-flow.md](bedrock-agentcore-vs-agent-witch-flow.md) (evaluations gap)

**Last reviewed:** 2026-09-29
