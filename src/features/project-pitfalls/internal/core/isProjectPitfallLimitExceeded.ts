import { PROJECT_PITFALL_MAX_ACTIVE } from "@agent-witch/shared/pitfalls";
import type { ProjectPitfallView } from "@/features/project-pitfalls/internal/core/projectPitfall.type";

/**
 * True when the upsert would raise the active (non-retired) count above the
 * cap. `merged` must include retired rows. Editing an already-active id never
 * raises the count, so it is always allowed.
 */
export const isProjectPitfallLimitExceeded = (input: {
  readonly merged: readonly ProjectPitfallView[];
  readonly candidate: { readonly id: string; readonly source: string };
}): boolean => {
  if (input.candidate.source === "retired") {
    return false;
  }
  const active = input.merged.filter((view) => view.source !== "retired");
  if (active.some((view) => view.id === input.candidate.id)) {
    return false;
  }
  return active.length + 1 > PROJECT_PITFALL_MAX_ACTIVE;
};
