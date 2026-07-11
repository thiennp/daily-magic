---
name: subagent-verify-commit
description: >-
  Worker: skill-post-change-verification + verify/lint/typecheck/test/commit commands (pre-merge checklist path).
model: inherit
readonly: false
---

# Description

Use when the human wants a **verified commit path** without reopening the full feature workflow.

## Skill (intent)

**`.cursor/skills/skill-post-change-verification/SKILL.md`** — expectations for staged scope, hooks, and fix-forward discipline.

## Commands (execute in order)

1. **`@.cursor/commands/command-verify-post-change-lint-typecheck-tests.md`**
2. **`@.cursor/commands/command-verify-commit-parallel-checks.md`** (when parallel gates help)
3. **`@.cursor/commands/command-git-commit-comprehensive-review.md`** before proposing **`git commit`**

Orchestrator agents stay in **`@.cursor/agents/README.md`**; this file is a **worker** pairing one skill with explicit command attachments.
