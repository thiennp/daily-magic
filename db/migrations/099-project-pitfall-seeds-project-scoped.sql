-- Platform pitfall seeds become generic-only (src/features/project-pitfalls).
-- The 10 daily-magic-only seeds from 067 move to project-scoped rows
-- (source 'project') on the AgentWitch project 29b404a2-d2be-45bf-8f88-143b675a94f2; only
-- secrets-in-logs stays a platform seed (PROJECT_PITFALL_SEEDS).
--
-- Safety:
--   * Copy only while the global seed row still exists, and only if the
--     AgentWitch project exists (local / PGlite / test DBs skip it).
--   * ON CONFLICT DO NOTHING keeps any row that project already has for the
--     same id (its own override or a retired row).
--   * The DELETE only touches platform-owned global seed rows we shipped
--     (project_id IS NULL AND source = 'seed' AND one of the 10 ids). User or
--     project rows (project_id NOT NULL) are never deleted or changed.
--   * Hit counters live in project_pitfall_hits keyed by (project_id,
--     pitfall_id). Global seed rows hold no counters, so the AgentWitch
--     project's hits carry over unchanged; other projects' counters are kept.
--   * Rerun-safe: after the first run the global rows are gone, so the copy
--     selects nothing and the DELETE matches nothing.
-- Runtime twin: ensureProjectPitfallsSchema → moveAgentWitchProjectPitfalls +
-- syncGlobalProjectPitfallSeeds (which also retires stale global seed rows).

INSERT INTO project_pitfalls (project_id, pitfall_id, symptom, cause, avoidance,
  check_kind, check_value, keywords, tags, source, severity)
SELECT p.id, v.pitfall_id, v.symptom, v.cause, v.avoidance, v.check_kind,
  v.check_value, v.keywords, v.tags, 'project', v.severity
FROM (VALUES
  ('arch-max-lines',
   'The ci:architecture check fails at the very end because a file has more than 100 lines of code.',
   'Files grew past the 100-line limit and the check only ran at the last step.',
   'Run the ci:architecture check before you ask for review. If a file is too long, move helpers or tests into their own files.',
   'command', 'npm run ci:architecture',
   ARRAY['arch', 'architecture', 'ci:architecture', 'lines', 'split', 'review']::TEXT[],
   ARRAY['ci', 'architecture']::TEXT[], 'block'),
  ('symlink-node-modules',
   'The build fails in a copied project folder with an error about the project root or files outside it.',
   'node_modules was linked (symlinked) from another folder, so the build tool sees files outside the project.',
   'Do not link node_modules from another folder. Make a real copy of node_modules (on a Mac, a fast clone copy) from a checkout with the same package-lock.json.',
   'id', 'pit.symlink-node-modules',
   ARRAY['build', 'turbopack', 'node_modules', 'symlink', 'worktree', 'install']::TEXT[],
   ARRAY['build', 'worktree']::TEXT[], 'warn'),
  ('install-bundle-clobber',
   'After a build, deps.tar.gz or agent-witch.js in the install folder is missing or changed.',
   'The build rewrites install files that are checked into git.',
   'After every build, restore deps.tar.gz and agent-witch.js from git, and check that both files exist before you commit.',
   'command', 'test -f public/install/agent-witch/app/deps.tar.gz && test -f public/install/agent-witch/app/agent-witch.js',
   ARRAY['build', 'bundle', 'install', 'deps.tar.gz', 'agent-witch.js', 'restore']::TEXT[],
   ARRAY['build', 'install']::TEXT[], 'warn'),
  ('stale-next',
   'Type checking fails with errors about pages or routes that no longer exist.',
   'Old build files are left in the .next folder from an earlier build.',
   'Delete the .next folder and rebuild, then run the type check again before you treat the error as real.',
   'id', 'pit.stale-next',
   ARRAY['build', 'next', '.next', 'typecheck', 'tsc', 'flaky']::TEXT[],
   ARRAY['build', 'typecheck']::TEXT[], 'warn'),
  ('main-moved-rebase',
   'Your push or your update of main is rejected because main has new commits.',
   'Someone else updated main after you created your branch.',
   'Get the latest main, put your commits on top of it in a new branch with the next round number (for example -r2), and push that. Never force-push.',
   'id', 'pit.main-moved-rebase',
   ARRAY['ship', 'push', 'main', 'rebase', 'rejected', 'update main']::TEXT[],
   ARRAY['git', 'ship']::TEXT[], 'warn'),
  ('health-lag',
   'You report the work as done, but the live site still runs the old version.',
   'The deploy finishes after main is updated, so the health check still shows the old commit.',
   'Wait until the health check shows the same commit as main, then run the smoke test. Only then report the work as done.',
   'id', 'pf.health-matches-main',
   ARRAY['ship', 'deploy', 'health', 'commit', 'smoke', 'done']::TEXT[],
   ARRAY['deploy', 'ship']::TEXT[], 'block'),
  ('local-suite-gate',
   'You wait for GitHub checks on your branch, but they never start.',
   'GitHub checks only run on main, not on other branches.',
   'Do not wait for GitHub. Run the tests, the type check, and the ci:architecture check on your own machine and share the results.',
   'id', 'pit.local-suite-gate',
   ARRAY['ci', 'github', 'checks', 'actions', 'tests', 'ship', 'push']::TEXT[],
   ARRAY['ci', 'ship']::TEXT[], 'warn'),
  ('no-prs',
   'A pull request was opened for daily-magic.',
   'Habit from other repos. This repo does not use pull requests.',
   'Never open a pull request for daily-magic. Push your branch and tell the lead it is ready; the lead updates main.',
   'id', 'pit.no-prs',
   ARRAY['pr', 'pull request', 'review', 'merge', 'github', 'ship']::TEXT[],
   ARRAY['git', 'ship']::TEXT[], 'warn'),
  ('dirty-home-checkout',
   'Unsaved work in the main ~/daily-magic folder is lost.',
   'Someone ran a reset, clean, or checkout in the shared home folder, which keeps uncommitted work on purpose.',
   'Never reset or clean ~/daily-magic. Do all work in a separate git worktree under /tmp, created from the latest main.',
   'id', 'pit.dirty-home-checkout',
   ARRAY['reset', 'clean', 'checkout', 'worktree', 'home', 'stash']::TEXT[],
   ARRAY['git', 'safety']::TEXT[], 'block'),
  ('box-no-gh-auth',
   'Pushing to GitHub from the box fails with a login or permission error.',
   'The box has no GitHub login for this repo.',
   'Push from the computer instead. Never copy GitHub keys or tokens onto the box.',
   'id', 'pit.box-no-gh-auth',
   ARRAY['push', 'ship', 'box', 'github', 'auth', 'permission denied']::TEXT[],
   ARRAY['git', 'machines']::TEXT[], 'warn')
) AS v(pitfall_id, symptom, cause, avoidance, check_kind, check_value,
  keywords, tags, severity)
INNER JOIN user_projects p ON p.id = '29b404a2-d2be-45bf-8f88-143b675a94f2'
WHERE EXISTS (
  SELECT 1 FROM project_pitfalls g
  WHERE g.project_id IS NULL AND g.pitfall_id = v.pitfall_id
)
ON CONFLICT (project_id, pitfall_id) WHERE project_id IS NOT NULL DO NOTHING;

DELETE FROM project_pitfalls
WHERE project_id IS NULL
  AND source = 'seed'
  AND pitfall_id IN ('arch-max-lines', 'symlink-node-modules', 'install-bundle-clobber', 'stale-next', 'main-moved-rebase', 'health-lag', 'local-suite-gate', 'no-prs', 'dirty-home-checkout', 'box-no-gh-auth');
