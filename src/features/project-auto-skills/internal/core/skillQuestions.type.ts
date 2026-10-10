export type SkillCheckAnswer = "old" | "new" | "both";
export type SkillComparisonAnswer = "old" | "new";

/** A judged skill check that proposes a better version and waits for the owner's pick. */
export interface SkillCheckQuestion {
  readonly id: number;
  readonly skillId: string;
  readonly skillName: string;
  readonly skillVersion: number;
  readonly usesAtCheck: number;
  /** What the judge saw and what it would change. */
  readonly note: string;
  readonly proposedBody: string;
  readonly createdAt: string;
}

/** Two versions of a skill run in turn; their outcomes so far. */
export interface SkillComparisonView {
  readonly id: number;
  readonly skillId: string;
  readonly skillName: string;
  readonly oldVersion: number;
  readonly newVersion: number;
  /** Finished runs and how many succeeded, per version. */
  readonly oldRuns: number;
  readonly oldDone: number;
  readonly newRuns: number;
  readonly newDone: number;
  /** Both versions have enough runs to pick one. */
  readonly ready: boolean;
}

/** How often a skill was checked and how often the judge wanted it improved. */
export interface SkillCheckStat {
  readonly skillId: string;
  readonly checks: number;
  readonly improves: number;
}
