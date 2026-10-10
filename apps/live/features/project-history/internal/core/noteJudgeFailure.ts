import type { AutoSkillCompleter } from "./autoSkill.types";

/**
 * Wrap a completer so the first failed call of a run tells the strip why
 * ("out of usage", "not signed in") instead of the run ending with no word.
 */
export const noteJudgeFailure = (
  completer: AutoSkillCompleter,
  report: (reason: string) => unknown,
): AutoSkillCompleter => {
  const reported = { done: false };
  return async (call) => {
    const result = await completer(call);
    if (!result.ok && !reported.done) {
      reported.done = true;
      void report(result.reason);
    }
    return result;
  };
};
