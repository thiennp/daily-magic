# Cursor rules (`.cursor/rules/*.mdc`)

Path-scoped project standards: globs attach rules in Cursor; the authoritative map is repo-root **`.cursor.json`**. Some logical rules register twice with different globs but the same **`.mdc`** path (e.g. folder layout vs MDX). Full Rules / Skills / Commands separation table: **`.cursor/README.md`**.

## Catalogue

| File                                             | Scope (high level)                                                                       |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| `rules-bundle-core.mdc`                          | Always-on invariants: protected sources, text system, commits, scaffolding, verification |
| `rules-folder-organization.mdc`                  | Feature layout under `app/`, naming, tests co-location; MDX shape for docs               |
| `rules-server-side-isolation.mdc`                | No mutable server globals; request-scoped context                                        |
| `rules-typescript-language.mdc`                  | TS language baseline: interfaces, unions, strictness, React typing habits                |
| `rules-typescript-validation-and-typeguards.mdc` | Guards, JSON/enums, validation-oriented typing                                           |
| `rules-typescript-clean-code.mdc`                | Clean code, utilities, imports, refactoring habits shared with TS/TSX                    |
| `rules-bundle-react.mdc`                         | Components, JSX, conditional maps, layout habits                                         |
| `rules-html-semantics-and-a11y.mdc`              | Semantic HTML; real buttons only — forbid `div`/`span` with `role="button"`              |
| `rules-bundle-api.mdc`                           | Loaders, fetchers, HTTP classification, DTO flow                                         |
| `rules-bundle-styles.mdc`                        | SCSS modules, tokens, design-system-first UI                                             |
| `rules-state-zustand.mdc`                        | Zustand stores as data + standalone setters                                              |
| `rules-no-react-ui-context.mdc`                  | No React Context for client UI state — use Zustand (request context excepted)            |
| `rules-state-ui-modeling.mdc`                    | UI/form modeling without magic strings                                                   |
| `rules-performance-architecture.mdc`             | Bundle/list perf, architecture hygiene                                                   |
| `rules-dom-document-body.mdc`                    | Guard `document.body` access in scheduled/listener code                                  |
| `rules-bundle-testing.mdc`                       | Vitest policy, mocks, coverage expectations                                              |
| `rules-agent-request-routing.mdc`                | Harness: match user intent → `.cursor/agents` + commands (see `.cursor/harness/`)        |

Extended testing cookbook: **`@.cursor/skills/skill-testing-extended-patterns/SKILL.md`** → **`@.cursor/commands/references/testing-extended/`**. Performance examples: **`@.cursor/skills/skill-architecture-performance-examples/SKILL.md`**.

## Maintenance

- Prefer the smallest matching rule; keep **`.cursor.json`** in sync when adding/removing files or changing globs.
- Rules are edited directly under **`.cursor/rules/`**—there is no merge/consolidation script.
