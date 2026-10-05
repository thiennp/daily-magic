-- Project pitfall registry (src/features/project-pitfalls). Cloud source of
-- truth; local caches sync from GET /api/agent-witch/projects/[id]/pitfalls.
-- project_id NULL = platform seed template (read-only, source 'seed').
-- project_id set  = project-authored row or override of a seed id
--                   (source 'project' | 'retired'); seeds are never mutated.
-- Max 64 active (non-retired) per project, seeds + project rows merged
-- (enforced in the upsert orchestrator). Hit counters live per project in
-- project_pitfall_hits so seed rows stay read-only.
-- Seed rows mirror PROJECT_PITFALL_SEEDS; runtime ensureProjectPitfallsSchema
-- re-syncs them from code.

CREATE TABLE IF NOT EXISTS project_pitfalls (
  row_id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  project_id TEXT REFERENCES user_projects(id) ON DELETE CASCADE,
  pitfall_id TEXT NOT NULL CHECK (pitfall_id ~ '^[a-z0-9][a-z0-9-]{0,63}$'),
  symptom TEXT NOT NULL CHECK (char_length(symptom) BETWEEN 1 AND 120),
  cause TEXT NOT NULL CHECK (char_length(cause) BETWEEN 1 AND 200),
  avoidance TEXT NOT NULL CHECK (char_length(avoidance) BETWEEN 1 AND 280),
  check_kind TEXT NOT NULL CHECK (check_kind IN ('command', 'id')),
  check_value TEXT NOT NULL CHECK (char_length(check_value) BETWEEN 1 AND 280),
  keywords TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  source TEXT NOT NULL CHECK (source IN ('seed', 'project', 'retired')),
  severity TEXT NOT NULL DEFAULT 'warn'
    CHECK (severity IN ('block', 'warn', 'info')),
  updated_by_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK ((project_id IS NULL) = (source = 'seed'))
);

CREATE UNIQUE INDEX IF NOT EXISTS project_pitfalls_global_id_idx
  ON project_pitfalls (pitfall_id) WHERE project_id IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS project_pitfalls_project_id_idx
  ON project_pitfalls (project_id, pitfall_id) WHERE project_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS project_pitfall_hits (
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  pitfall_id TEXT NOT NULL,
  hit_count INTEGER NOT NULL DEFAULT 0 CHECK (hit_count >= 0),
  last_seen_at TIMESTAMPTZ,
  PRIMARY KEY (project_id, pitfall_id)
);

INSERT INTO project_pitfalls (project_id, pitfall_id, symptom, cause, avoidance,
  check_kind, check_value, keywords, tags, source, severity)
VALUES
  (NULL, 'arch-max-lines',
   'The ci:architecture check fails at the very end because a file has more than 100 lines of code.',
   'Files grew past the 100-line limit and the check only ran at the last step.',
   'Run the ci:architecture check before you ask for review. If a file is too long, move helpers or tests into their own files.',
   'command', 'npm run ci:architecture',
   ARRAY['arch', 'architecture', 'ci:architecture', 'lines', 'split', 'review']::TEXT[],
   ARRAY['ci', 'architecture']::TEXT[], 'seed', 'block'),
  (NULL, 'symlink-node-modules',
   'The build fails in a copied project folder with an error about the project root or files outside it.',
   'node_modules was linked (symlinked) from another folder, so the build tool sees files outside the project.',
   'Do not link node_modules from another folder. Make a real copy of node_modules (on a Mac, a fast clone copy) from a checkout with the same package-lock.json.',
   'id', 'pit.symlink-node-modules',
   ARRAY['build', 'turbopack', 'node_modules', 'symlink', 'worktree', 'install']::TEXT[],
   ARRAY['build', 'worktree']::TEXT[], 'seed', 'warn'),
  (NULL, 'install-bundle-clobber',
   'After a build, deps.tar.gz or agent-witch.js in the install folder is missing or changed.',
   'The build rewrites install files that are checked into git.',
   'After every build, restore deps.tar.gz and agent-witch.js from git, and check that both files exist before you commit.',
   'command', 'test -f public/install/agent-witch/app/deps.tar.gz && test -f public/install/agent-witch/app/agent-witch.js',
   ARRAY['build', 'bundle', 'install', 'deps.tar.gz', 'agent-witch.js', 'restore']::TEXT[],
   ARRAY['build', 'install']::TEXT[], 'seed', 'warn'),
  (NULL, 'stale-next',
   'Type checking fails with errors about pages or routes that no longer exist.',
   'Old build files are left in the .next folder from an earlier build.',
   'Delete the .next folder and rebuild, then run the type check again before you treat the error as real.',
   'id', 'pit.stale-next',
   ARRAY['build', 'next', '.next', 'typecheck', 'tsc', 'flaky']::TEXT[],
   ARRAY['build', 'typecheck']::TEXT[], 'seed', 'warn'),
  (NULL, 'main-moved-rebase',
   'Your push or your update of main is rejected because main has new commits.',
   'Someone else updated main after you created your branch.',
   'Get the latest main, put your commits on top of it in a new branch with the next round number (for example -r2), and push that. Never force-push.',
   'id', 'pit.main-moved-rebase',
   ARRAY['ship', 'push', 'main', 'rebase', 'rejected', 'update main']::TEXT[],
   ARRAY['git', 'ship']::TEXT[], 'seed', 'warn'),
  (NULL, 'health-lag',
   'You report the work as done, but the live site still runs the old version.',
   'The deploy finishes after main is updated, so the health check still shows the old commit.',
   'Wait until the health check shows the same commit as main, then run the smoke test. Only then report the work as done.',
   'id', 'pf.health-matches-main',
   ARRAY['ship', 'deploy', 'health', 'commit', 'smoke', 'done']::TEXT[],
   ARRAY['deploy', 'ship']::TEXT[], 'seed', 'block'),
  (NULL, 'local-suite-gate',
   'You wait for GitHub checks on your branch, but they never start.',
   'GitHub checks only run on main, not on other branches.',
   'Do not wait for GitHub. Run the tests, the type check, and the ci:architecture check on your own machine and share the results.',
   'id', 'pit.local-suite-gate',
   ARRAY['ci', 'github', 'checks', 'actions', 'tests', 'ship', 'push']::TEXT[],
   ARRAY['ci', 'ship']::TEXT[], 'seed', 'warn'),
  (NULL, 'no-prs',
   'A pull request was opened for daily-magic.',
   'Habit from other repos. This repo does not use pull requests.',
   'Never open a pull request for daily-magic. Push your branch and tell the lead it is ready; the lead updates main.',
   'id', 'pit.no-prs',
   ARRAY['pr', 'pull request', 'review', 'merge', 'github', 'ship']::TEXT[],
   ARRAY['git', 'ship']::TEXT[], 'seed', 'warn'),
  (NULL, 'dirty-home-checkout',
   'Unsaved work in the main ~/daily-magic folder is lost.',
   'Someone ran a reset, clean, or checkout in the shared home folder, which keeps uncommitted work on purpose.',
   'Never reset or clean ~/daily-magic. Do all work in a separate git worktree under /tmp, created from the latest main.',
   'id', 'pit.dirty-home-checkout',
   ARRAY['reset', 'clean', 'checkout', 'worktree', 'home', 'stash']::TEXT[],
   ARRAY['git', 'safety']::TEXT[], 'seed', 'block'),
  (NULL, 'box-no-gh-auth',
   'Pushing to GitHub from the box fails with a login or permission error.',
   'The box has no GitHub login for this repo.',
   'Push from the Mac instead. Never copy GitHub keys or tokens onto the box.',
   'id', 'pit.box-no-gh-auth',
   ARRAY['push', 'ship', 'box', 'github', 'auth', 'permission denied']::TEXT[],
   ARRAY['git', 'machines']::TEXT[], 'seed', 'warn'),
  (NULL, 'secrets-in-logs',
   'A password, token, or key shows up in a log, a chat message, or a report.',
   'Printing settings, environment variables, or key files while debugging.',
   'Never print a secret. Only say whether it exists, where it is stored, and a short fingerprint (the first characters of its hash).',
   'id', 'pit.secrets-in-logs',
   ARRAY['secret', 'token', 'key', 'password', 'env', 'log', 'redact']::TEXT[],
   ARRAY['security']::TEXT[], 'seed', 'block')
ON CONFLICT (pitfall_id) WHERE project_id IS NULL DO NOTHING;
