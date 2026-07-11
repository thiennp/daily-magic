# `.cursor/subagents/` — specialized workers

| File                      | Skill / intent                   | Primary commands                                                                             |
| ------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------- |
| `subagent-verify-commit`  | `skill-post-change-verification` | `command-verify-post-change-lint-typecheck-tests`, `command-git-commit-comprehensive-review` |
| `subagent-solid-audit`    | `skill-solid-code-quality-audit` | `.agents/scripts/audit/` drivers                                                             |
| `subagent-edge-case-loop` | Plausible-failure sweep          | Used before closing larger fixes                                                             |

Orchestrators for Bitbucket/Jira/Sentry delivery were removed. Use GitHub + Linear context directly in commands.
