---
name: skill-agent-verification-reporting
description: >-
  How agents should format checklist output so humans can scan PR, audit, or gate results quickly.
---

# Verification reporting tone

## Why it matters

Structured responses reduce friction when many criteria must be checked quickly. Humans and orchestrators can skim aligned columns, spot risk fast, and route follow-ups without rereading prose.

## Status tokens

| Meaning              | Token | Guidance                                                                                                                                        |
| -------------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Satisfied / verified | `[✓]` | Cite concise evidence (path, behavior, metric).                                                                                                 |
| Not satisfied / risk | `[x]` | Always pair with a concrete recommendation (and patch idea if possible). ASCII-only teams may substitute `[PASS]` / `[FAIL]` for the first two. |
| Not applicable       | `[~]` | One short clause explaining why the criterion is out of scope.                                                                                  |
| Blocked / unknown    | `[?]` | List missing inputs (diff, ticket, environment) explicitly.                                                                                     |

> **`[x]` means “fails” here**, not “checked”. Unchecked template boxes should use `[ ]` if you must distinguish from failure.

**Markdown task lists vs agent tokens:** In GitHub-style PR templates, `- [x]` often marks a completed item. In **this** skill’s reporting tables, **`[x]`** always means **not satisfied / risk** (see column **Meaning**). When you paste agent output into a human checklist, rewrite tokens or add a legend so readers are not confused.

## When a row fails

Immediately after each `[x]`, add:

1. **Recommendation** — the next investigative or corrective step.
2. **Code suggestion (optional)** — the smallest illustrative fix or test stub, fenced in a normal markdown code block.

## Scope discipline

- **Reviewers** focus on changed hunks versus the agreed base branch unless instructions say otherwise.
- **Implementers** validate their touched surfaces plus any integration the ticket demands.

Keep procedural automation (CI commands, lint pipelines) in **`.cursor/commands/`**, not inside this skill.

Executable workflows: `.cursor/commands/command-README.md`
