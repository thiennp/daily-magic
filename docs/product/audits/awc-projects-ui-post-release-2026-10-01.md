# AWC Projects UI — post-release verification (Verifier D)

**Date:** 2026-10-01 (UTC)  
**Role:** Isolated post-release check (no prior agent chat context)  
**Production origin:** `https://www.agentwitch.com`  
**Scope:** Confirm AWC shell fix merge on `main`, production deploy, and route availability for `/projects`.

---

## Git (`main`)

Synced with `origin/main` at verification time.

```text
41b7d4ac Merge pull request #216 from thiennp/cursor/awc-projects-shell-fix-b63b
820a671c docs(audit): AWC projects UI phase-3 review (Reviewer C)
86da9834 fix(awc): projects shell sidebar and list mustFix MF-01–05
ca2facba fix(docs): align AWC projects audit pipeline paths and mustFix handoff
f62d56cd docs(product): isolated AWC projects UI audit pipeline phase briefs (#215)
```

**Verdict:** AWC projects shell fix (**PR #216**, branch `cursor/awc-projects-shell-fix-b63b`) is on `main`. Head commit `41b7d4ac` includes `fix(awc): projects shell sidebar and list mustFix MF-01–05` (`86da9834`).

---

## Production deploy poll (`GET /api/health`)

Polled every ~20s for up to ~5 minutes after local `main` fast-forward to `41b7d4ac`.

| Attempt (UTC)       | HTTP | `release.shortCommitSha` | Notes                            |
| ------------------- | ---- | ------------------------ | -------------------------------- |
| 2026-10-01T13:09:32 | 200  | `ca2facb`                | Pre-deploy (parent of merge)     |
| 2026-10-01T13:09:52 | 200  | `ca2facb`                |                                  |
| 2026-10-01T13:10:13 | 200  | `ca2facb`                |                                  |
| 2026-10-01T13:10:33 | 200  | `ca2facb`                |                                  |
| 2026-10-01T13:10:53 | 200  | `ca2facb`                |                                  |
| 2026-10-01T13:11:14 | 200  | `ca2facb`                |                                  |
| 2026-10-01T13:11:34 | 200  | `41b7d4a`                | **Matches merge commit on main** |

Final health body (attempt 7):

```json
{
  "ok": true,
  "release": {
    "label": "2026-09-29-remember-optimizer-choices",
    "commitSha": "41b7d4acac7e8559462cc375762b4a78f1683adf",
    "shortCommitSha": "41b7d4a"
  },
  "deviceSupersessionMigrationApplied": true
}
```

**Verdict:** Production rolled forward to merge SHA within the poll window (~2 minutes from first sample).

---

## Route smoke (`GET /projects`)

| URL                                     | HTTP | Latency (curl) | Notes                                          |
| --------------------------------------- | ---- | -------------- | ---------------------------------------------- |
| `https://www.agentwitch.com/projects`   | 200  | ~0.68s         | HTML document returned (`-L` follow redirects) |
| `https://www.agentwitch.com/api/health` | 200  | ~0.23s         | After deploy aligned with `41b7d4ac`           |

**Verdict:** `/projects` is reachable on production with **200** after deploy.

---

## Post-release UI verification (limits)

This verifier did **not** run authenticated browser or Storybook captures on production (sign-in requires user session; prior audit used Storybook `awc-pages--projects-ready` on the fix branch — see `awc-projects-ui-review-2026-10-01.md`).

**Inference:** Shell/list changes ship with commit `41b7d4ac` on the same AWC deployable that serves `/projects`. Functional UI regression testing remains manual: signed-in `/projects` at 1280×900 and 1440×900 against shell P0-SHELL-01/02 and MF-01–05 from `awc-projects-ui-fix-notes-2026-10-01.md`.

---

## Overall

| Check                         | Result                       |
| ----------------------------- | ---------------------------- |
| Shell fix on `main`           | **Pass**                     |
| Production commit = merge SHA | **Pass** (after ~2 min poll) |
| `/projects` HTTP              | **Pass** (200)               |
| `/api/health` HTTP            | **Pass** (200)               |

**Post-release gate:** **Pass** for merge presence, deploy alignment, and route availability.
