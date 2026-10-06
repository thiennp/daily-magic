---
name: skill-commit-push-main
description: >-
  Commits and pushes to origin/main only after full CI parity (tests, architecture,
  typecheck, Next build). Use when the user asks to push main, ship to production,
  deploy Railway, or commit WIP with confidence CI/Railway will pass.
---

# Commit and push to main (CI-safe)

Ship intentional changes on `main` only after the local suite gate (no GitHub Actions CI) so Railway deploys stay healthy.

## References

- Husky steps: **`.cursor/harness/git-hooks.md`**
- Agent commit workflow: **`npm run harness:bootstrap -- --workflow=commit`**
- Local suite gate: **`npm run ci`** (same verify path as `.husky/pre-push`; there is no GitHub Actions CI)
- Canonical release path (dedicated worktree, `--no-verify` fast-forward push, health `commitSha` check): **`docs/agent-witch/local-release-path.md`** — it wins where this skill differs

## Prerequisites

- Worktree may be a bare checkout — always export before git:

```bash
export GIT_DIR=/Users/thien.nguyen/daily-magic/.git
export GIT_WORK_TREE=/Users/thien.nguyen/daily-magic
```

- Never bypass Husky with `--no-verify` unless a human explicitly requests it.
- Stage **`.feature-knowledge/index.json`** whenever docs or the index changed (see `rules-feature-knowledge.mdc`).

## Workflow

Copy and track:

```
- [ ] 1. Git env + status
- [ ] 2. Install bundle hygiene
- [ ] 3. Scope — intentional changes only
- [ ] 4. npm run ci (must pass)
- [ ] 5. Stage + commit (Husky pre-commit)
- [ ] 6. Push origin main
- [ ] 7. Verify origin/main HEAD
```

### 1. Git env + status

```bash
export GIT_DIR=/Users/thien.nguyen/daily-magic/.git GIT_WORK_TREE=/Users/thien.nguyen/daily-magic
git status
git diff --stat
git log -3 --oneline
```

### 2. Install bundle hygiene

`npm run ci` runs **`build:agent-witch`** then **`next build`**, which can rewrite **`public/install/agent-witch/*`** without an intentional **`AGENT_WITCH_INSTALL_BUNDLE_VERSION`** bump.

- **Do not commit** `public/install/agent-witch/*` unless you deliberately bumped the bundle version in `apps/install/features/bundle/public-api/types.ts` (and related docs).
- After any local `build:agent-witch` or failed/partial CI, restore artifacts:

```bash
git restore public/install/agent-witch/
```

Re-check `git status` — install paths should be clean unless the commit is explicitly an AWI bundle release.

### 3. Scope — intentional changes only

- Exclude unrelated WIP (e.g. accidental `repo-urls` edits, drive-by refactors, debug-only files).
- Prefer one logical commit; use two only when docs/index vs product code should split clearly.
- Conventional commit messages (`feat:`, `fix(scope):`, `chore:`) or ticket prefix (`LIN-123: (feat) …`).

### 4. Full CI (required before push)

From repo root (with correct `DATABASE_URL` / `.env.local` if tests need DB — see `AGENTS.md`):

```bash
npm run ci
```

This runs tests, `ci:architecture`, typecheck, and build (Railway-ish path). **Do not push if CI fails** — fix forward and re-run.

### 5. Stage and commit

```bash
git add <intentional paths>
# include .feature-knowledge/index.json when docs/index changed
git commit -m "$(cat <<'EOF'
feat: concise summary of why

Optional body line.
EOF
)"
```

Pre-commit runs Prettier, ESLint, structure validation, staged architecture checks, and typecheck on staged TS — fix and retry with a **new** commit if hooks fail (do not amend after a failed hook).

### 6. Push to origin/main

Normal push (runs pre-push **`npm run ci`** again):

```bash
git push origin main
```

**Next.js lock / duplicate CI:** If pre-push re-runs CI and fails because install bundle files changed during the hook’s build step, **`git restore public/install/agent-witch/`** and push again.

**After successful local `npm run ci`:** If pre-push would only duplicate the same CI and you hit lock contention or redundant runtime, **`HUSKY=0 git push origin main`** is allowed **only** in that case — local CI already proved parity; document in the commit/PR note why Husky was skipped. Do not use `HUSKY=0` to skip CI when local `npm run ci` did not pass.

### 7. Verify remote HEAD

```bash
git fetch origin main
git log origin/main -1 --oneline
git status
```

Report commit SHA(s) and that local **`npm run ci`** passed before push.

## Examples

**UI-only feature on main:**

```bash
export GIT_DIR=... GIT_WORK_TREE=...
git restore public/install/agent-witch/ 2>/dev/null || true
npm run ci
git add src/features/shell/ ...
git commit -m "feat(shell): devices panel in app chrome"
git push origin main
git log origin/main -1
```

**Docs + index:**

```bash
git add docs/qa/foo.md docs/qa/README.md .feature-knowledge/index.json
git commit -m "docs(qa): add foo topic"
```
