import type {
  AutoSkillAvailability,
  AutoSkillJudgeChoice,
  AutoSkillJudgeKind,
  AutoSkillJudgePref,
} from "./autoSkill.types";

const ORDER: readonly AutoSkillJudgeKind[] = ["ollama", "agent", "bot"];

const WRITER_LABELS: Record<string, string> = {
  codex: "Codex",
  "claude-cli": "Claude",
  cursor: "Cursor",
  antigravity: "Antigravity",
};

const labelFor = (
  kind: AutoSkillJudgeKind,
  a: AutoSkillAvailability,
): string | null => {
  if (kind === "ollama") {
    return a.ollamaModel === null ? null : `Ollama (local, ${a.ollamaModel})`;
  }
  if (kind === "agent") {
    return a.agentWriter === null
      ? null
      : `your computer agent: ${WRITER_LABELS[a.agentWriter] ?? a.agentWriter}`;
  }
  return a.botName === null ? null : `bot ${a.botName}`;
};

const MISSING: Record<AutoSkillJudgeKind, string> = {
  ollama: "Ollama is not running or has no chat model",
  agent: "no coding tool is signed in on this computer",
  bot: "Project bot judging is not available yet",
};

/**
 * Judge selection: Ollama, then owner agent, then project bot. An owner
 * override is tried first; when it is unavailable we fall back down the list
 * and say why. No judge at all returns a clear paused reason.
 */
export const selectAutoSkillJudge = (
  pref: AutoSkillJudgePref,
  availability: AutoSkillAvailability,
): AutoSkillJudgeChoice => {
  const order =
    pref === "auto" ? ORDER : [pref, ...ORDER.filter((k) => k !== pref)];
  const skipped: string[] = [];
  for (const kind of order) {
    const label = labelFor(kind, availability);
    if (label !== null) {
      const note =
        pref !== "auto" && kind !== pref
          ? `Preferred judge unavailable (${skipped[0] ?? MISSING[pref]}); using ${label}.`
          : null;
      return { ok: true, kind, label, note };
    }
    skipped.push(MISSING[kind]);
  }
  return {
    ok: false,
    pausedReason: `Auto skills paused: ${skipped.join("; ")}.`,
  };
};
