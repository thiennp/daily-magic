/** Git hook env vars that pin `git` to the parent repo instead of the subprocess `cwd`. */
const GIT_HOOK_ENV_KEYS = [
  "GIT_DIR",
  "GIT_WORK_TREE",
  "GIT_INDEX_FILE",
  "GIT_OBJECT_DIRECTORY",
  "GIT_ALTERNATE_OBJECT_DIRECTORIES",
  "GIT_PREFIX",
  "GIT_EXEC_PATH",
  "GIT_QUARANTINE_PATH",
  "GIT_REFLOG_ACTION",
  "GIT_TEMPLATE_DIR",
  "GIT_CEILING_DIRECTORIES",
  "GIT_COMMON_DIR",
] as const;

/** Env for nested `git` calls so `cwd` selects the worktree (see `.husky/pre-push`). */
export const buildGitSubprocessEnv = (
  base: NodeJS.ProcessEnv = process.env,
): NodeJS.ProcessEnv => {
  const env = { ...base };
  for (const key of GIT_HOOK_ENV_KEYS) {
    delete env[key];
  }
  return env;
};
