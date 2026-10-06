---
name: skill-commit-push-main
description: >-
  Lands intentional changes on origin/main via a dedicated worktree: Arch SHIP,
  full local npm run ci on the exact tip, fast-forward push --no-verify with a
  literal SHA, then health + install smoke. Use when asked to push main, ship
  AWC, or land after Arch GO. Never push from ~/daily-magic; no PRs, no HUSKY=0,
  no force-push, no GitHub Actions.
---

# Commit and push to main (local release path)

Canonical steps: **`docs/agent-witch/local-release-path.md`** (§1 AWC). This skill is a checklist; the release doc wins on conflict.

**Hard rules**

- Never push from `~/daily-magic` (its husky `pre-push` re-runs CI and rewrites install artifacts). Push only from a **dedicated worktree** (fresh worktrees have no `.husky/_`, so hooks do not run).
- Push with `git push --no-verify origin <fullsha>:refs/heads/main` — write the **literal SHA**, never `"$VAR:refs/heads/main"` (zsh treats `:r` as a modifier).
- No `HUSKY=0`, no PRs, no force-push, no GitHub Actions (workflows deleted in `ee10c375`).

## Gate (in order)

1. **Arch SHIP** on the tip. A clean `git range-diff` tip-move (rebase, no content change) carries Arch SHIP; the suite still reruns on the new tip.
2. **Full local suite on the exact tip:** `npm run ci` (`npm test`, `ci:architecture`, `typecheck`, `build`). Never reuse an earlier run; rerun after any rebase.
3. **Worktree setup:** real `node_modules` via APFS clone (`cp -c -R` from a known-good tree), not a symlink (Turbopack rejects symlinks).
4. **Precheck** (all must hold):
   - `git status --porcelain` empty — after restoring generated install files:
     `git checkout -- public/install/agent-witch/app/agent-witch.js public/install/agent-witch/app/deps.tar.gz`
   - `HEAD` equals the tested tip
   - `git ls-remote origin refs/heads/main` equals the expected base you tested on
5. **Fast-forward push** from the dedicated worktree (literal SHA form above).
6. **Health:** `https://www.agentwitch.com/api/health` → `release.commitSha` == tip.
7. **Smoke install endpoints:** `/`, `/install/agent-witch/version`, `/install/agent-witch.sh`, `/install/agent-witch-update.sh`, `/install/agent-witch/repair` (see release doc).

## If main moved

```bash
git fetch origin main
git rebase --onto origin/main <oldbase>
# range-diff must show "=" (content unchanged)
git range-diff <oldbase>..<oldtip> origin/main..HEAD
# then rerun full npm run ci on the new tip
```

## Checklist

```
- [ ] Arch SHIP (or clean range-diff carry)
- [ ] Dedicated worktree + real node_modules (cp -c -R)
- [ ] npm run ci on exact tip
- [ ] Restore install artifacts; porcelain clean; HEAD == tip; origin/main == base
- [ ] git push --no-verify origin <literal-sha>:refs/heads/main
- [ ] /api/health release.commitSha == tip
- [ ] Install endpoint smoke
```

## Commit hygiene (before the gate)

- Stage intentional paths only; include `.feature-knowledge/index.json` when docs/index changed.
- Conventional commits (`feat:`, `fix(scope):`, `docs:`, …). Prefer one logical commit.
- Do not commit `public/install/agent-witch/*` unless this is an intentional bundle bump.
