---
name: command-git-commit-quick
description: Quick commit with conventional message and local verification
---

# Quick commit

## Mindset

- One clear purpose per commit.
- Use conventional commit messages (Husky-valid).
- Run local verification before committing.

## Workflow

1. Run **`npm run harness:bootstrap -- --workflow=commit`** — scripts + Husky steps (manifest-backed).
2. `git status` and `git diff` — understand what will be committed.
3. Stage intended files only (never `.env` or secrets). **Always** include `.feature-knowledge/index.json` when it is modified.
4. Draft message:
   - `feat: add styleguide navigation`
   - `fix(db): handle missing DATABASE_URL`
   - Optional tracker prefix: `LIN-42: (feat) …` or `GH-15: (fix) …`
5. Optional before commit (when touching `src/`, `db/`, or `public/`): `npm run validate:staged`. Husky runs lint/typecheck/architecture per the manifest.

6. Commit:

```bash
git commit -m "feat: short description"
```

7. `git status` to confirm success.

## Branch naming (optional)

- `feature/lin-123-add-notes-api`
- `fix/gh-42-health-check-error`

## Push

Push only when the user asks. For GitHub:

```bash
git push -u origin HEAD
gh pr create --title "feat: …" --body "…"
```
