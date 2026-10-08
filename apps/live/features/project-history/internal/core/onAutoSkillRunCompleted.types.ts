import type {
  AutoSkillAvailability,
  AutoSkillCompleter,
  AutoSkillJudgeKind,
} from "./autoSkill.types";
import type { AutoSkillCloud } from "./autoSkillCloud";
import type { AutoSkillModuleDb } from "./autoSkillModuleDb";
import type { AutoSkillState } from "./autoSkillStore";

export type OnAutoSkillRunCompletedDeps = {
  readonly cloud: AutoSkillCloud;
  readonly loadState: (projectId: string) => AutoSkillState;
  readonly saveState: (projectId: string, state: AutoSkillState) => void;
  readonly probeAvailability: (
    writerOfRun: string | null,
    judgeAgent: string | null,
  ) => Promise<AutoSkillAvailability>;
  readonly makeCompleter: (
    kind: AutoSkillJudgeKind,
    availability: AutoSkillAvailability,
  ) => AutoSkillCompleter;
  /** Local SQLite (next to knowledge.db); null when unavailable. */
  readonly openModuleDb: () => AutoSkillModuleDb | null;
  readonly embed: (text: string) => Promise<Float32Array | null>;
  readonly isHistoryOn: (projectId: string) => boolean;
};

export type AutoSkillOutcome =
  | "disabled"
  | "cloud_unavailable"
  | "store_unavailable"
  | "paused"
  | "judge_failed"
  | "draft_failed"
  | "no_repeat"
  | "not_asked"
  | "asked";
