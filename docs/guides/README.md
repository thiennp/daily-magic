# Agent Witch guides

Two long-form books live here. They complement [docs/qa/](../qa/README.md) (short RAG answers), [product/product-pillars.md](../product/product-pillars.md) (four pillars + north star vs today), [product/concepts.md](../product/concepts.md) (engineer glossary), and [product/ux-simplification.md](../product/ux-simplification.md) (UI language).

| Book                                             | Audience                                       | Start                                                                              |
| ------------------------------------------------ | ---------------------------------------------- | ---------------------------------------------------------------------------------- |
| **[User guide](user-guide/README.md)**           | Humans using AWC + Mac (solo or team)          | [Philosophy & vocabulary](user-guide/00-philosophy-and-vocabulary.md)              |
| **[Developer guide](developer-guide/README.md)** | Engineers and coding agents changing this repo | [Philosophy & mismatch traps](developer-guide/00-philosophy-and-mismatch-traps.md) |

**External comparison (agents, not end-user UI):** [Bedrock AgentCore vs Agent Witch flow](../qa/bedrock-agentcore-vs-agent-witch-flow.md) · [AgentCore lessons with no recurring cost](../product/agentcore-lessons-zero-marginal-cost.md).

## Maintenance contract

When product behavior or copy changes, update the matching guide chapter **in the same PR** as code (see [docs-first.md](../conventions/docs-first.md)). Path → chapter mapping: [guide-maintenance.map.json](./guide-maintenance.map.json) (includes `src/features/feedback/`, `src/features/improvements/`, and `docs/product/product-pillars.md`). If a change shifts **north star vs today** for a pillar, update [product-pillars.md](../product/product-pillars.md) and the pillar’s guide chapters. Cursor **stop/postToolUse hooks** remind agents when touched code requires a guide pass.

After any edit under `docs/guides/`:

```bash
npm run feature-knowledge:index
```

Commit `.feature-knowledge/index.json` with the branch.
