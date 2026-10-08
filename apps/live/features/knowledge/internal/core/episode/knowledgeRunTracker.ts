const CORRECTION_WINDOW_TURNS = 2;
const CORRECTION_WINDOW_MS = 30 * 60 * 1_000;

export type TrackedKnowledgeRun = {
  readonly runId: string;
  readonly request: string;
  readonly costTokens: number;
  readonly passed: boolean;
  readonly at: number;
  readonly turnsSince: number;
};

const lastRunByProject = new Map<string, TrackedKnowledgeRun>();

export const rememberKnowledgeRun = (
  projectKey: string,
  run: Omit<TrackedKnowledgeRun, "turnsSince" | "at">,
): void => {
  lastRunByProject.set(projectKey, { ...run, at: Date.now(), turnsSince: 0 });
};

/** Last run still eligible for a "user corrected it" check; advances the turn counter. */
export const takeCorrectableKnowledgeRun = (
  projectKey: string,
  now: number = Date.now(),
): TrackedKnowledgeRun | null => {
  const run = lastRunByProject.get(projectKey);
  if (run === undefined) {
    return null;
  }
  const eligible =
    run.passed &&
    run.turnsSince < CORRECTION_WINDOW_TURNS &&
    now - run.at <= CORRECTION_WINDOW_MS;
  if (run.turnsSince + 1 >= CORRECTION_WINDOW_TURNS) {
    lastRunByProject.delete(projectKey);
  } else {
    lastRunByProject.set(projectKey, {
      ...run,
      turnsSince: run.turnsSince + 1,
    });
  }
  return eligible ? run : null;
};

export const clearKnowledgeRunTrackerForTests = (): void => {
  lastRunByProject.clear();
};
