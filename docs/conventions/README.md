# Conventions

How to keep **documentation** the map of the system and code the implementation.

| Doc                                                 | Purpose                                                              |
| --------------------------------------------------- | -------------------------------------------------------------------- |
| [Load context (task paths)](load-context.md)        | Minimal doc sets for bugfix, feature, refactor, deploy, architecture |
| [Progressive disclosure](progressive-disclosure.md) | L0 index → L1 domains → L2 modules → L3 deep dives → code            |
| [Docs-first maintenance](docs-first.md)             | What to update when behavior, APIs, or architecture change           |
| [Script index](script-index.md)                     | Which `npm run` observes which part of the system                    |
| [Agent context & scripts](agent-context.md)         | Reveal order + harness file map                                      |

Human coding standards also live in `.cursor/rules/` (enforced partly via `npm run cursor:verify` and Husky). Those rules are harness material, not duplicated here.
