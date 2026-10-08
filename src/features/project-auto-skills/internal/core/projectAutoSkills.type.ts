export type AutoSkillJudgePref = "auto" | "ollama" | "agent" | "bot";
export type AutoSkillPublishMode = "draft" | "publish";
export type AutoSkillSuggestionStatus =
  "pending" | "saved" | "not_now" | "never";
export type AutoSkillAnswer = "save" | "not_now" | "never";

export interface AutoSkillsSettings {
  readonly enabled: boolean;
  readonly judgePref: AutoSkillJudgePref;
  /** Coding agent that judges (codex, claude-cli, cursor); null = any signed-in one. */
  readonly judgeAgent: string | null;
  readonly publishMode: AutoSkillPublishMode;
}

export interface AutoSkillsStatus {
  readonly judgeKind: string | null;
  readonly judgeLabel: string | null;
  readonly pausedReason: string | null;
  readonly statusNote: string | null;
  readonly lastCheckedAt: string | null;
}

export interface AutoSkillSuggestionMatch {
  readonly runId: string;
  readonly completedAt: string;
  readonly summary: string;
}

export type AutoSkillSuggestionKind = "skill" | "script_approval";

export type AutoSkillReplayStatus = "ok" | "failed" | "not_replayed";

/** One proposed (or installed) script: what it may do and how its replay went. */
export interface AutoSkillScriptInfoEntry {
  readonly name: string;
  readonly description: string;
  readonly permissions: { readonly write: boolean; readonly network: boolean };
  readonly params: readonly {
    readonly name: string;
    readonly required: boolean;
  }[];
  readonly replay: {
    readonly status: AutoSkillReplayStatus;
    readonly exitCode: number | null;
    readonly ms: number | null;
    readonly note: string | null;
  };
}

export interface AutoSkillScriptInfo {
  readonly skillId?: string;
  readonly scripts: readonly AutoSkillScriptInfoEntry[];
}

export interface AutoSkillSuggestion {
  readonly id: string;
  readonly clusterId: string;
  readonly status: AutoSkillSuggestionStatus;
  readonly title: string;
  readonly prompt: string;
  readonly occurrences: number;
  /** Repeated step (module) label; null for older prompt-level questions. */
  readonly moduleLabel: string | null;
  /** Distinct prompts the step appeared in; null for older questions. */
  readonly distinctPrompts: number | null;
  readonly matches: readonly AutoSkillSuggestionMatch[];
  readonly draftName: string;
  readonly draftBody: string;
  readonly judgeLabel: string | null;
  readonly skillId: string | null;
  /** `script_approval`: "Allow script X to run on your computer?" (draftBody = script text). */
  readonly kind: AutoSkillSuggestionKind;
  readonly scriptInfo: AutoSkillScriptInfo | null;
  readonly createdAt: string;
}

/** What the Library strip renders. */
export interface AutoSkillsOverview
  extends AutoSkillsSettings, AutoSkillsStatus {
  readonly pending: readonly AutoSkillSuggestion[];
  /** skillIds that were saved from an auto question (Library "Auto" chip). */
  readonly autoSkillIds: readonly string[];
}
