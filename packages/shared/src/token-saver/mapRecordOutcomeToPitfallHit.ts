import type {
  PitfallHitFromOutcome,
  RecordOutcomeInput,
} from "./tokenSaverTool.types";

/**
 * Maps a pitfall record_outcome onto the existing cloud hit route.
 * Path: POST /api/agent-witch/projects/:projectId/pitfalls/:pitfallId/hit
 * Returns null when kind is not pitfall or ids are missing.
 */
export const mapRecordOutcomeToPitfallHit = (
  input: RecordOutcomeInput,
): PitfallHitFromOutcome | null => {
  if (input.kind !== "pitfall" || input.ok !== true) {
    return null;
  }
  const projectId = input.projectId.trim();
  const pitfallId = input.pitfallId?.trim() ?? "";
  if (projectId.length === 0 || pitfallId.length === 0) {
    return null;
  }
  return {
    projectId,
    pitfallId,
    path: `/api/agent-witch/projects/${projectId}/pitfalls/${pitfallId}/hit`,
  };
};
