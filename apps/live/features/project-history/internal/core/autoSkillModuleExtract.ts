import type { AutoSkillCompleter } from "./autoSkill.types";
import { MODULE_MAX_PER_RUN } from "./autoSkillModule.constants";
import type { AutoSkillModule } from "./autoSkillModule.types";
import { extractModulesWithLlm } from "./autoSkillModuleLlm";
import { buildAutoSkillModule } from "./autoSkillModuleNormalize";
import { splitPromptIntoSteps } from "./autoSkillModuleSplitter";
import { parseWavePlanStepTitles } from "./autoSkillModuleWavePlan";

export type AutoSkillModuleSource = "wave_plan" | "llm" | "splitter";

const fromTexts = (texts: readonly string[]): AutoSkillModule[] =>
  texts
    .map((text, i) => buildAutoSkillModule(text, i))
    .filter((m): m is AutoSkillModule => m !== null);

/** One module per distinct canonical text, in order, capped per run. */
const uniqueModules = (
  modules: readonly AutoSkillModule[],
): AutoSkillModule[] =>
  [...new Map(modules.map((m) => [m.hash, m])).values()].slice(
    0,
    MODULE_MAX_PER_RUN,
  );

/**
 * Split a completed run into modules. Order of sources: the agent's
 * [[WAVE_PLAN]] (free structure) -> strict-JSON LLM (when a completer is
 * given; 1 retry) -> deterministic sentence/list splitter. Trivial modules
 * are dropped (see MODULE_MIN_MEANINGFUL_TOKENS).
 */
export const extractModules = async (
  promptText: string,
  planText?: string,
  completer?: AutoSkillCompleter,
): Promise<{
  readonly modules: readonly AutoSkillModule[];
  readonly source: AutoSkillModuleSource;
}> => {
  const planTitles =
    planText === undefined ? [] : parseWavePlanStepTitles(planText);
  if (planTitles.length > 0) {
    return {
      modules: uniqueModules(fromTexts(planTitles)),
      source: "wave_plan",
    };
  }
  const rows =
    completer === undefined
      ? null
      : await extractModulesWithLlm(promptText, completer);
  if (rows !== null) {
    const modules = rows
      .map((row, i) =>
        buildAutoSkillModule(row.text, i, {
          verb: row.verb,
          target: row.target,
          params: row.params,
        }),
      )
      .filter((m): m is AutoSkillModule => m !== null);
    return { modules: uniqueModules(modules), source: "llm" };
  }
  return {
    modules: uniqueModules(fromTexts(splitPromptIntoSteps(promptText))),
    source: "splitter",
  };
};
