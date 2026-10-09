-- Reword three AgentWitch project pitfalls so they no longer carry the old
-- repo name. Idempotent: only rows still holding the old text are touched.
UPDATE project_pitfalls
SET symptom = 'A pull request was opened for AgentWitch.',
    avoidance = 'Never open a pull request for AgentWitch. Push your branch and tell the lead it is ready; the lead updates main.'
WHERE pitfall_id = 'no-prs'
  AND symptom = 'A pull request was opened for daily-magic.';

UPDATE project_pitfalls
SET symptom = 'Unsaved work in the main ~/agentwitch folder is lost.',
    avoidance = 'Never reset or clean ~/agentwitch. Do all work in a separate git worktree under /tmp, created from the latest main.'
WHERE pitfall_id = 'dirty-home-checkout'
  AND symptom = 'Unsaved work in the main ~/daily-magic folder is lost.';
