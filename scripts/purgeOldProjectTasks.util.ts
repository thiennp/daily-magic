export type PurgeOptions = {
  readonly before: string;
  readonly projectId: string | null;
  readonly includeOpen: boolean;
  readonly confirm: boolean;
  readonly outFile: string;
};

const flag = (argv: readonly string[], name: string): string | null => {
  const index = argv.indexOf(name);
  const value = index >= 0 ? argv[index + 1] : undefined;
  return value !== undefined && !value.startsWith("--") ? value : null;
};

/** Parse CLI args; `before` is required and must be a real date. Dry run unless --confirm. */
export const parsePurgeArgs = (
  argv: readonly string[],
  now: Date = new Date(),
): PurgeOptions | { readonly error: string } => {
  const before = flag(argv, "--before");
  if (before === null || Number.isNaN(Date.parse(before))) {
    return {
      error: "--before <ISO date> is required (tasks created before it).",
    };
  }
  if (Date.parse(before) > now.getTime()) {
    return { error: "--before must not be in the future." };
  }
  return {
    before: new Date(before).toISOString(),
    projectId: flag(argv, "--project"),
    includeOpen: argv.includes("--include-open"),
    confirm: argv.includes("--confirm"),
    outFile:
      flag(argv, "--out") ??
      `project-tasks-export-${now.toISOString().replaceAll(":", "-")}.json`,
  };
};

/** Done and cancelled only, unless the caller opts in to open work too. */
export const purgeStatuses = (includeOpen: boolean): readonly string[] =>
  includeOpen
    ? ["queued", "planned", "in_progress", "blocked", "done", "cancelled"]
    : ["done", "cancelled"];
