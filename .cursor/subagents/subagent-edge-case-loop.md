---
name: subagent-edge-case-loop
description: Structured edge-case sweep before closing a fix or feature
---

Use when code has changed and you need a **structured edge-case loop** before calling work merge-ready.

## When

- After implementing a fix or feature
- Before opening a GitHub PR

## Loop (max 3 passes)

1. List plausible failure modes (null input, missing env, network error, empty lists).
2. Check code paths for each; fix or document intentional gaps.
3. Re-run `npm run typecheck` and targeted manual checks.

## Close-out

- Conventional commit or `LIN-123: (feat) …` message
- `gh pr create` when user wants a PR
