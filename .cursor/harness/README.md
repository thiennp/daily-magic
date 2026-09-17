# `.cursor/harness/` — agent routing and git hooks

| File                                | Role                                                     |
| ----------------------------------- | -------------------------------------------------------- |
| **`agent-bootstrap.manifest.json`** | **Source of truth** — routing, workflows, git-hook steps |
| **`agent-request-routing.md`**      | Human mirror of manifest routing                         |
| **`git-hooks.md`**                  | Generated from manifest — `npm run harness:sync`         |

| npm script                                           | Role                                                          |
| ---------------------------------------------------- | ------------------------------------------------------------- |
| **`npm run harness:bootstrap`**                      | Compact routing + workflow summary                            |
| **`npm run harness:bootstrap -- --workflow=verify`** | Script list for verify (replaces duplicating checks in rules) |
| **`npm run harness:sync`**                           | Regenerate **`git-hooks.md`**                                 |

**Bootstrap (always-on):** **`rules-harness-bootstrap.mdc`** — read routing table; attach at most one **`commands/`** playbook.

**Invariants (always-on):** **`rules-bundle-core.mdc`**.

**Cursor hooks:** **`.cursor/hooks.json`** — architecture after `Write`/`StrReplace`, structure + architecture on agent **stop** ([cursor-hooks.md](../../docs/conventions/cursor-hooks.md)).

**Flow:** User message → bootstrap → match routing table → optional single command + optional **`git-hooks.md`** → path-scoped rules from **`.cursor.json`**.

Subagents (optional): **`.cursor/subagents/`**. See **`.cursor/README.md`** for rules / commands / skills layout.
