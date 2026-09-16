# Domain: Catalog & sharing

**Scope:** Published agent offerings (capabilities), workflow forms, saved playbooks (library), harness rules/skills bundles, company marketplace — all dispatch through the same runtime.

**Registry slugs:** `capabilities`, `workflows`, `library`, `harness`, `marketplace`

## Skim (L1)

- **Capability** = what can run; **workflow** = capability with dynamic task fields.
- **Harness** = instructions installed on Mac under `~/.agent-witch/harness/` (not the run itself).
- **Library** = saved playbooks; **marketplace** = company-published listings on top of harness + capabilities.

Engineer glossary: [product/concepts.md](../product/concepts.md).

## Read next if…

| If you need…                     | Open                                                                               |
| -------------------------------- | ---------------------------------------------------------------------------------- |
| UI/nav wording                   | [product/ux-simplification.md](../product/ux-simplification.md)                    |
| Harness install from browser     | [agent-witch/local-bridge.md](../agent-witch/local-bridge.md) (harness API on Mac) |
| Per-feature APIs and routes      | L2 `src/features/<slug>/README.md` for the slug you touch                          |
| Marketplace vs library confusion | [product/concepts.md](../product/concepts.md) § Library / Marketplace              |

```bash
npm run feature-knowledge:query -- "harness catalog publish" --feature=harness
npm run feature-knowledge:query -- "capability workflow" --feature=capabilities
```
