import { createHash } from "node:crypto";

import {
  PROJECT_HISTORY_PITFALL_MAX_BULLET_CHARS,
  PROJECT_HISTORY_PITFALL_MAX_PER_DRAFT,
  PROJECT_HISTORY_PITFALL_MAX_STORED,
  PROJECT_HISTORY_PITFALL_MAX_SYMPTOM_CHARS,
} from "./projectHistory.constants";
import { normalizeProjectHistoryPitfallText } from "./normalizeProjectHistoryPitfallText";
import type { ProjectHistoryLearnedPitfall } from "./projectHistoryLearnedPitfall.type";
import type { ProjectHistorySkillgenFailureEpisode } from "./selectProjectHistorySkillgenFailureEpisodes";
import { scrubProjectHistorySkillgenSecrets } from "./scrubProjectHistorySkillgenSecrets";

export type MapHistoryFailuresToSkillPitfallsInput = {
  readonly failures: readonly ProjectHistorySkillgenFailureEpisode[];
  readonly nowIso?: string;
  readonly maxPerDraft?: number;
  readonly maxStored?: number;
};

export type MapHistoryFailuresToSkillPitfallsResult = {
  readonly skillPitfallLines: readonly string[];
  readonly localEntries: readonly ProjectHistoryLearnedPitfall[];
  readonly skippedSecretCount: number;
};

const clip = (text: string, max: number): string =>
  text.length <= max ? text : `${text.slice(0, Math.max(0, max - 1)).trimEnd()}…`;

const humanizeState = (state: string): string =>
  state.toLowerCase().replace(/_/g, " ");

const contentHashOf = (symptom: string, avoidance: string): string =>
  `sha256:${createHash("sha256")
    .update(`${symptom}\n${avoidance}`, "utf8")
    .digest("hex")}`;

const slugId = (episodeId: string, hash: string): string => {
  const short = hash.replace(/^sha256:/, "").slice(0, 12);
  const base = episodeId
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  const id = `hist-${base || "ep"}-${short}`;
  return id.slice(0, 64);
};

/**
 * Pure mapper: scrubbed failure episodes → SKILL.md Pitfalls lines + local entries.
 * Drops residual-secret candidates. Caps draft and store sizes.
 */
export const mapHistoryFailuresToSkillPitfalls = (
  input: MapHistoryFailuresToSkillPitfallsInput,
): MapHistoryFailuresToSkillPitfallsResult => {
  const maxPerDraft = input.maxPerDraft ?? PROJECT_HISTORY_PITFALL_MAX_PER_DRAFT;
  const maxStored = input.maxStored ?? PROJECT_HISTORY_PITFALL_MAX_STORED;
  const nowIso = input.nowIso ?? new Date().toISOString();
  const seen = new Set<string>();
  const skillPitfallLines: string[] = [];
  const localEntries: ProjectHistoryLearnedPitfall[] = [];
  let skippedSecretCount = 0;

  for (const failure of input.failures) {
    const rawSymptom =
      failure.reason !== null && failure.reason.trim().length > 0
        ? failure.reason.trim()
        : humanizeState(failure.state);
    const scrubbedSymptom = scrubProjectHistorySkillgenSecrets(rawSymptom);
    if (scrubbedSymptom.residualSecret) {
      skippedSecretCount += 1;
      continue;
    }
    const avoidanceRaw = `Avoid repeating this history failure (${humanizeState(failure.state)}).`;
    const scrubbedAvoidance = scrubProjectHistorySkillgenSecrets(avoidanceRaw);
    if (scrubbedAvoidance.residualSecret) {
      skippedSecretCount += 1;
      continue;
    }
    const symptom = clip(
      scrubbedSymptom.scrubbed.replace(/\s+/g, " ").trim(),
      PROJECT_HISTORY_PITFALL_MAX_SYMPTOM_CHARS,
    );
    const avoidance = clip(
      scrubbedAvoidance.scrubbed.replace(/\s+/g, " ").trim(),
      PROJECT_HISTORY_PITFALL_MAX_BULLET_CHARS,
    );
    if (symptom.length === 0 || avoidance.length === 0) {
      continue;
    }
    const norm = normalizeProjectHistoryPitfallText(`${symptom}|${avoidance}`);
    if (seen.has(norm)) {
      continue;
    }
    seen.add(norm);
    const hash = contentHashOf(symptom, avoidance);
    const line = `- **${symptom}:** ${avoidance}`;
    if (skillPitfallLines.length < maxPerDraft) {
      skillPitfallLines.push(line);
    }
    if (localEntries.length < maxStored) {
      localEntries.push({
        id: slugId(failure.episodeId, hash),
        symptom,
        avoidance,
        sourceEpisodeId: failure.episodeId,
        sourceState: failure.state,
        contentHash: hash,
        createdAt: nowIso,
      });
    }
  }

  return { skillPitfallLines, localEntries, skippedSecretCount };
};
