/** Module-level auto skills: a module is one small reusable step of a prompt. */

export type AutoSkillModuleParam = {
  readonly name: string;
  readonly example: string;
};

export type AutoSkillModule = {
  readonly verb: string;
  readonly target: string;
  readonly params: readonly AutoSkillModuleParam[];
  /** Step text with values replaced by <param> (scrubbed). */
  readonly text: string;
  /** Lowercase text with paths/numbers/quoted values as <param>. */
  readonly canonical: string;
  readonly hash: string;
  readonly position: number;
};

export type AutoSkillClusterState = "watching" | "asked" | "saved" | "never";

export type AutoSkillModuleCluster = {
  readonly id: string;
  readonly label: string;
  /** Distinct runs the cluster's steps appeared in. */
  readonly occurrences: number;
  readonly distinctPrompts: number;
  readonly state: AutoSkillClusterState;
};
