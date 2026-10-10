import type {
  AutoSkillAvailability,
  AutoSkillCompleter,
  AutoSkillRunRecord,
  AutoSkillVerdict,
} from "./autoSkill.types";
import { createCompleterAutoSkillJudge } from "./autoSkillJudge";
import type { AutoSkillModuleCluster } from "./autoSkillModule.types";
import type { AutoSkillModuleDb } from "./autoSkillModuleDb";
import { extractModules } from "./autoSkillModuleExtract";
import { feedModulesThroughClusters } from "./autoSkillModulePipeline";
import type { OnAutoSkillRunCompletedDeps } from "./onAutoSkillRunCompleted.types";

/** Split a new run into modules and match them against the project's clusters. */
export const feedRun = async (input: {
  readonly run: AutoSkillRunRecord;
  readonly agentOutput: string | undefined;
  readonly db: AutoSkillModuleDb;
  readonly projectId: string;
  readonly completer: AutoSkillCompleter;
  readonly availability: AutoSkillAvailability;
  readonly deps: OnAutoSkillRunCompletedDeps;
  readonly answers: {
    readonly saved: ReadonlySet<string>;
    readonly never: ReadonlySet<string>;
  };
  readonly verdictCache: Readonly<Record<string, AutoSkillVerdict>>;
  readonly onVerdict: (key: string, verdict: AutoSkillVerdict) => void;
}): Promise<{
  readonly touched: readonly AutoSkillModuleCluster[];
  readonly judgeFailed: boolean;
}> => {
  const { run, deps } = input;
  const { modules } = await extractModules(
    run.prompt,
    input.agentOutput,
    input.availability.ollamaModel === null
      ? undefined
      : deps.makeCompleter("ollama", input.availability),
  );
  const judge = createCompleterAutoSkillJudge(input.completer, {
    get: (key) => input.verdictCache[key],
    set: input.onVerdict,
  });
  return feedModulesThroughClusters(
    modules,
    run,
    {
      db: input.db,
      projectId: input.projectId,
      runId: run.runId,
      judge,
      embed: deps.embed,
      historyOn: deps.isHistoryOn(input.projectId),
    },
    input.answers,
  );
};
