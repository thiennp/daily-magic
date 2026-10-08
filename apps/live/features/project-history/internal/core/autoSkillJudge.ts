import { createHash } from "node:crypto";

import type {
  AutoSkillCompleter,
  AutoSkillJudge,
  AutoSkillVerdict,
} from "./autoSkill.types";
import {
  buildAutoSkillJudgePrompt,
  parseAutoSkillJudgeVerdicts,
} from "./autoSkillJudgePrompt";
import { normalizeAutoSkillPrompt } from "./autoSkillPromptSimilarity";

export type AutoSkillVerdictCache = {
  readonly get: (key: string) => AutoSkillVerdict | undefined;
  readonly set: (key: string, verdict: AutoSkillVerdict) => void;
};

const JUDGE_TIMEOUT_MS = 45_000;
const JUDGE_ATTEMPTS = 2;

export const autoSkillPairKey = (a: string, b: string): string =>
  createHash("sha256")
    .update(
      `${normalizeAutoSkillPrompt(a)}\u0000${normalizeAutoSkillPrompt(b)}`,
    )
    .digest("hex")
    .slice(0, 24);

/**
 * Judge over any completer (Ollama / owner agent / bot). Cached pairs are not
 * re-sent; strict JSON with one retry; failure is a value, never a throw.
 */
export const createCompleterAutoSkillJudge =
  (
    completer: AutoSkillCompleter,
    cache: AutoSkillVerdictCache,
  ): AutoSkillJudge =>
  async ({ newPrompt, candidates }) => {
    const cached: AutoSkillVerdict[] = [];
    const missing = candidates.filter((c) => {
      const hit = cache.get(autoSkillPairKey(newPrompt, c.prompt));
      if (hit === undefined) {
        return true;
      }
      cached.push({ ...hit, candidateId: c.id });
      return false;
    });
    if (missing.length === 0) {
      return { ok: true, verdicts: cached };
    }
    const prompt = buildAutoSkillJudgePrompt({
      newPrompt,
      candidates: missing,
    });
    let lastReason = "judge_unparseable";
    for (let attempt = 0; attempt < JUDGE_ATTEMPTS; attempt += 1) {
      const done = await completer({
        prompt,
        json: true,
        timeoutMs: JUDGE_TIMEOUT_MS,
      });
      if (!done.ok) {
        lastReason = done.reason;
        continue;
      }
      const verdicts = parseAutoSkillJudgeVerdicts(done.text);
      if (verdicts === null) {
        continue;
      }
      const wanted = new Set(missing.map((c) => c.id));
      const fresh = verdicts.filter((v) => wanted.has(v.candidateId));
      for (const verdict of fresh) {
        const source = missing.find((c) => c.id === verdict.candidateId);
        if (source !== undefined) {
          cache.set(autoSkillPairKey(newPrompt, source.prompt), verdict);
        }
      }
      return { ok: true, verdicts: [...cached, ...fresh] };
    }
    return { ok: false, reason: lastReason };
  };
