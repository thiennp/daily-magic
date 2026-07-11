---
name: command-git-commit-comprehensive-review
description: Comprehensive review before commit for larger changes
---

# Comprehensive commit review

Use when the change touches multiple areas, adds new patterns, or needs extra verification.

Pair with **`skill-post-change-verification`**.

## 1. Scope review

- [ ] `git status` and full `git diff`
- [ ] Group changes: app routes, features, components, config, harness
- [ ] Confirm no secrets or `.env` files staged

## 2. Issue context (GitHub / Linear)

- [ ] Load issue from tracker when branch or user message references it
- [ ] GitHub: `gh issue view <number>`
- [ ] Linear: use Linear MCP/API when available
- [ ] Verify acceptance criteria before claiming done

## 3. Architecture & rules

- [ ] Changes fit `src/app`, `src/features`, `src/components`, `src/lib` layout
- [ ] Run `npm run validate:staged`
- [ ] Run `npm run cursor:architecture -- --staged`
- [ ] Relevant `.cursor/rules/` bundles respected (TypeScript, React, folder org)

## 4. Quality gates

```bash
npm run lint
npm run typecheck
npm run build
```

## 5. Commit

- Conventional commit: `feat: …`, `fix: …`, `chore: …`
- Or tracker prefix: `LIN-123: (feat) …`
- One logical change per commit when possible

## 6. Pull request (GitHub)

When user requests PR:

```bash
git push -u origin HEAD
gh pr create --title "feat: …" --body "$(cat <<'EOF'
## Summary
- …

## Test plan
- [ ] …
EOF
)"
```
