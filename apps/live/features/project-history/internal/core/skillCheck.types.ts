/** One skill check waiting for a judge, as the cloud returns it. */
export type DueSkillCheck = {
  readonly checkId: number;
  readonly skillId: string;
  readonly skillName: string;
  readonly skillVersion: number;
  readonly usesAtCheck: number;
  readonly trigger: string;
  readonly skillBody: string;
  readonly runs: readonly {
    readonly outcome: string;
    readonly title: string;
    readonly description: string | null;
    readonly resultSummary: string | null;
  }[];
};
