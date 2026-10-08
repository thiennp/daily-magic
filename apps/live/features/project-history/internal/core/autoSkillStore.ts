import fs from "node:fs";
import path from "node:path";

import { atomicWriteFile0600 } from "./atomicWriteFile0600";
import type {
  AutoSkillCluster,
  AutoSkillRunRecord,
  AutoSkillVerdict,
} from "./autoSkill.types";
import { resolveProjectDataDir } from "./resolveProjectDataDir";

export type AutoSkillState = {
  readonly runs: readonly AutoSkillRunRecord[];
  readonly runClusterIds: Readonly<Record<string, string>>;
  readonly clusters: Readonly<Record<string, AutoSkillCluster>>;
  readonly verdictCache: Readonly<Record<string, AutoSkillVerdict>>;
};

export const EMPTY_AUTO_SKILL_STATE: AutoSkillState = {
  runs: [],
  runClusterIds: {},
  clusters: {},
  verdictCache: {},
};

const RUNS_CAP = 60;
const CACHE_CAP = 300;
const PROMPT_CAP = 2_000;

const statePath = (projectId: string): string =>
  path.join(resolveProjectDataDir(projectId), "skillauto", "state.json");

export const readAutoSkillState = (projectId: string): AutoSkillState => {
  try {
    const parsed = JSON.parse(
      fs.readFileSync(statePath(projectId), "utf8"),
    ) as Partial<AutoSkillState>;
    return { ...EMPTY_AUTO_SKILL_STATE, ...parsed };
  } catch {
    return EMPTY_AUTO_SKILL_STATE;
  }
};

const takeLast = <T>(
  record: Readonly<Record<string, T>>,
  cap: number,
): Record<string, T> => Object.fromEntries(Object.entries(record).slice(-cap));

export const writeAutoSkillState = (
  projectId: string,
  state: AutoSkillState,
): void => {
  const next: AutoSkillState = {
    ...state,
    runs: state.runs.slice(-RUNS_CAP),
    verdictCache: takeLast(state.verdictCache, CACHE_CAP),
  };
  atomicWriteFile0600(statePath(projectId), JSON.stringify(next));
};

/** Append a completed run (idempotent per runId); caps the stored prompt. */
export const appendAutoSkillRun = (
  state: AutoSkillState,
  run: AutoSkillRunRecord,
): AutoSkillState =>
  state.runs.some((r) => r.runId === run.runId)
    ? state
    : {
        ...state,
        runs: [
          ...state.runs,
          { ...run, prompt: run.prompt.slice(0, PROMPT_CAP) },
        ],
      };
