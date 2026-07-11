---
name: command-github-pull-request
description: Open a GitHub pull request after local verification
---

# GitHub pull request

## Prerequisites

- Changes committed on a feature branch
- `gh` CLI authenticated (`gh auth status`)
- Remote is GitHub

## Workflow

1. Inspect branch state:

```bash
git status
git log main..HEAD --oneline
git diff main...HEAD
```

2. Verify locally:

```bash
npm run lint
npm run typecheck
npm run build
```

3. Push branch:

```bash
git push -u origin HEAD
```

4. Create PR:

```bash
gh pr create --title "feat: short title" --body "$(cat <<'EOF'
## Summary
- What changed and why

## Test plan
- [ ] Manual check on affected routes
- [ ] `npm run build` passes

## Tracker
Closes #42
<!-- or: Linear LIN-123 -->
EOF
)"
```

5. Return the PR URL to the user.

## Branch naming (optional)

- `feature/lin-123-add-notes-api`
- `fix/gh-42-health-check-error`

## Commit messages

Conventional commits (`feat:`, `fix:`) or tracker prefix (`LIN-123: (feat) …`).
