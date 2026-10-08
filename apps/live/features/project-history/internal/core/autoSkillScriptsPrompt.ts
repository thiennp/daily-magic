/** Extra drafting instructions: optional scripts for the deterministic steps. */
export const AUTO_SKILL_SCRIPTS_INSTRUCTION = [
  "",
  "OPTIONAL: if some steps are fully deterministic (same commands every time),",
  "ALSO output ONE fenced block after the SKILL.md, opened with ```scripts and",
  "closed with ```, holding a JSON array (max 3 items) of objects:",
  '{"name":"kebab-case","file":"name.sh or name.mjs","description":"one line",',
  '"params":[{"name":"snake_case","required":true,"example":"value"}],',
  '"permissions":{"write":false,"network":false},"content":"script text"}',
  "Script rules: plain POSIX shell or Node (no packages, no dependencies);",
  "parameters ONLY as positional arguments in the order of params ($1, $2 or",
  "process.argv[2], [3]); never embed secrets, tokens, absolute or home paths;",
  "write only inside the current directory (the project folder); no network",
  "unless permissions.network is true; print a short result to stdout; exit",
  "non-zero on failure. Reference each script in the Steps section by name.",
  "Skip the block entirely if nothing is deterministic.",
].join("\n");
