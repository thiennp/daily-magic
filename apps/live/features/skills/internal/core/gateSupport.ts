import { insertSkillCall, markFindChosen } from "./skillCallLog";
import type { SkillIndexDb } from "./skillIndex.types";

export const withTimeout = async <T>(
  work: Promise<T> | T,
  ms: number,
): Promise<T> => {
  let timer: NodeJS.Timeout | undefined;
  try {
    return await Promise.race([
      Promise.resolve(work),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error("timeout")), ms);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
};

export type LoggedCall = {
  readonly db: SkillIndexDb;
  readonly projectId: string;
  readonly skillId: string;
  readonly tool: string;
  readonly chosenBy: "agent" | "bot" | "owner";
  readonly runId: string | null;
};

/** Never throws: logging must not break the call. */
export const logCall = (
  r: LoggedCall,
  ok: boolean,
  startedAt: number,
  holdout = false,
): void => {
  try {
    insertSkillCall(r.db, {
      skillId: r.skillId,
      projectId: r.projectId,
      runId: r.runId,
      chosenBy: r.chosenBy,
      tool: r.tool,
      ok,
      durationMs: Date.now() - startedAt,
      holdout,
    });
    if (ok && !holdout) {
      markFindChosen(r.db, { projectId: r.projectId, skillId: r.skillId });
    }
  } catch {
    // logging must never break the call
  }
};
