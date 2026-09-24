# Agent Witch guides

Two long-form books live here. They complement [docs/qa/](../qa/README.md) (short RAG answers), [product/concepts.md](../product/concepts.md) (engineer glossary), and [product/ux-simplification.md](../product/ux-simplification.md) (UI language).

| Book                                             | Audience                                       | Start                                                                              |
| ------------------------------------------------ | ---------------------------------------------- | ---------------------------------------------------------------------------------- |
| **[User guide](user-guide/README.md)**           | Humans using AWC + Mac (solo or team)          | [Philosophy & vocabulary](user-guide/00-philosophy-and-vocabulary.md)              |
| **[Developer guide](developer-guide/README.md)** | Engineers and coding agents changing this repo | [Philosophy & mismatch traps](developer-guide/00-philosophy-and-mismatch-traps.md) |

## Maintenance contract

When product behavior or copy changes, update the matching guide chapter **in the same PR** as code (see [docs-first.md](../conventions/docs-first.md)). Path → chapter mapping: [guide-maintenance.map.json](./guide-maintenance.map.json). Cursor **stop/postToolUse hooks** remind agents when touched code requires a guide pass.

After any edit under `docs/guides/`:

```bash
npm run feature-knowledge:index
```

Commit `.feature-knowledge/index.json` with the branch.
