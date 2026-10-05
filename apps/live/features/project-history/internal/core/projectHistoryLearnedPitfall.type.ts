import type { ProjectHistoryPitfallFailureState } from "./projectHistoryPitfallFailureStates.constant";

export type ProjectHistoryLearnedPitfall = {
  readonly id: string;
  readonly symptom: string;
  readonly avoidance: string;
  readonly sourceEpisodeId: string;
  readonly sourceState: ProjectHistoryPitfallFailureState;
  readonly contentHash: string;
  readonly createdAt: string;
};

export type ProjectHistoryLearnedPitfallsFile = {
  readonly items: readonly ProjectHistoryLearnedPitfall[];
  readonly updatedAt: string;
};

export type ProjectHistorySkillgenFlagsFile = {
  readonly historyLearnedPitfalls: {
    readonly active: boolean;
    readonly count: number;
    readonly updatedAt: string;
    readonly summary: string;
  } | null;
  readonly updatedAt: string;
};
