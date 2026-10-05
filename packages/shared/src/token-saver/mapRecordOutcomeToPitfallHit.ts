import { buildProjectPitfallHitPath } from "@agent-witch/shared/pitfalls";
import type {
  PitfallHitFromOutcome,
  RecordOutcomeInput,
} from "./tokenSaverTool.types";

/**
 * Maps a pitfall record_outcome onto the existing cloud hit route.
 * Returns null when kind is not pitfall, ids are missing, or ids are unsafe.
 */
export const mapRecordOutcomeToPitfallHit = (
  input: RecordOutcomeInput,
): PitfallHitFromOutcome | null => {
  if (input.kind !== "pitfall" || input.ok !== true) {
    return null;
  }
  const projectId = input.projectId.trim();
  const pitfallId = input.pitfallId?.trim() ?? "";
  const path = buildProjectPitfallHitPath(projectId, pitfallId);
  if (path === null) {
    return null;
  }
  return { projectId, pitfallId, path };
};
