---
name: subagent-solid-audit
description: >-
  Worker: skill-solid-code-quality-audit + audit drivers under .agents/scripts/audit/ (pairing only; no script bodies).
model: inherit
readonly: false
---

# Description

Use when running **SOLID-oriented file audits** with repository drivers (SRP, ISP, LSP, DIP, OCP).

## Skill (intent)

**`.cursor/skills/skill-solid-code-quality-audit/SKILL.md`** — merge discipline and how audit output should read.

## Commands / tooling (references only)

- Driver scripts live under **`.agents/scripts/audit/`** (see skill for pairing).
- Regenerate **`.agents/todo/FILE_LIST.json`** when the audit sweep list is stale — procedure documented under **`.agents/scripts/audit/`** / **`.agents/README.md`** (no driver enumeration here).

Verification tone: **`.cursor/skills/skill-agent-verification-reporting/SKILL.md`**.
