/** Auto skills: a repeated kind of task raises an owner question. */

export type AutoSkillRunRecord = {
  readonly runId: string;
  readonly prompt: string;
  readonly resultSummary: string;
  readonly completedAt: string;
  readonly writerAgent: string | null;
  /** Short label of the task (first line of the prompt) when known. */
  readonly taskTitle?: string;
  /** sha256 prefix of the normalized prompt; survives redaction. */
  readonly promptHash?: string;
  /** A commit's own changes (file list and diff, trimmed); the only thing a commit run is judged on besides its message. */
  readonly changes?: string;
  /** True when only a preview was stored (project history is OFF). */
  readonly redacted?: boolean;
};

export type AutoSkillVerdictKind = "SAME" | "SIMILAR" | "DIFFERENT";

export type AutoSkillVerdict = {
  readonly candidateId: string;
  readonly verdict: AutoSkillVerdictKind;
  readonly reason: string;
  readonly clusterId: string;
};

export type AutoSkillCandidate = {
  readonly id: string;
  readonly prompt: string;
};

/** Small port: judge a new prompt against earlier prompts. Never throws. */
export type AutoSkillJudge = (input: {
  readonly newPrompt: string;
  readonly candidates: readonly AutoSkillCandidate[];
}) => Promise<
  | { readonly ok: true; readonly verdicts: readonly AutoSkillVerdict[] }
  | { readonly ok: false; readonly reason: string }
>;

/** Text completion shared by the three adapters (Ollama, owner agent, bot). */
export type AutoSkillCompleter = (input: {
  readonly prompt: string;
  readonly json: boolean;
  readonly timeoutMs: number;
}) => Promise<
  | { readonly ok: true; readonly text: string }
  | { readonly ok: false; readonly reason: string }
>;

export type AutoSkillJudgeKind = "ollama" | "agent" | "bot";
export type AutoSkillJudgePref = "auto" | AutoSkillJudgeKind;

export type AutoSkillAvailability = {
  /** Installed local chat model, or null when Ollama is down / has none. */
  readonly ollamaModel: string | null;
  /** Signed-in coding CLI id on this computer (e.g. codex), or null. */
  readonly agentWriter: string | null;
  /** Project bot able to answer, or null. */
  readonly botName: string | null;
};

export type AutoSkillJudgeChoice =
  | {
      readonly ok: true;
      readonly kind: AutoSkillJudgeKind;
      readonly label: string;
      readonly note: string | null;
    }
  | { readonly ok: false; readonly pausedReason: string };

export type AutoSkillClusterStatus = "open" | "never" | "saved";

export type AutoSkillCluster = {
  readonly clusterId: string;
  readonly status: AutoSkillClusterStatus;
  readonly runIds: readonly string[];
  readonly pendingQuestion: boolean;
};
