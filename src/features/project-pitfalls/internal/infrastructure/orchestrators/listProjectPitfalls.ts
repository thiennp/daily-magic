import { mergeProjectPitfalls } from "@/features/project-pitfalls/internal/core/mergeProjectPitfalls";
import type {
  ProjectPitfallFailure,
  ProjectPitfallView,
} from "@/features/project-pitfalls/internal/core/projectPitfall.type";
import { resolveProjectPitfallAccess } from "@/features/project-pitfalls/internal/infrastructure/db/resolveProjectPitfallAccess";
import { selectProjectPitfallParts } from "@/features/project-pitfalls/internal/infrastructure/db/selectProjectPitfallParts";

/**
 * list_pitfalls: merged seeds + project overrides with hit counters. Cloud is
 * the source of truth; local caches (e.g. a Mac SQLite mirror) sync from here.
 */
export const listProjectPitfalls = async (input: {
  readonly actorUserId: string;
  readonly projectId: string;
  readonly includeRetired?: boolean;
}): Promise<
  | { readonly ok: true; readonly pitfalls: readonly ProjectPitfallView[] }
  | ProjectPitfallFailure
> => {
  const projectId = input.projectId.trim();
  if (projectId.length === 0) {
    return { ok: false, code: "invalid_arguments", field: "projectId" };
  }
  const access = await resolveProjectPitfallAccess({
    projectId,
    actorUserId: input.actorUserId,
  });
  if (!access.ok) {
    return access;
  }
  const parts = await selectProjectPitfallParts(projectId);
  return {
    ok: true,
    pitfalls: mergeProjectPitfalls({
      ...parts,
      includeRetired: input.includeRetired === true,
    }),
  };
};
