import { isProjectPitfallLimitExceeded } from "@/features/project-pitfalls/internal/core/isProjectPitfallLimitExceeded";
import { mergeProjectPitfalls } from "@/features/project-pitfalls/internal/core/mergeProjectPitfalls";
import type {
  ProjectPitfallFailure,
  ProjectPitfallUpsertInput,
  ProjectPitfallView,
} from "@/features/project-pitfalls/internal/core/projectPitfall.type";
import type { ProjectPitfallParts } from "@/features/project-pitfalls/internal/infrastructure/db/selectProjectPitfallParts";
import { upsertProjectPitfallRow } from "@/features/project-pitfalls/internal/infrastructure/db/upsertProjectPitfallRow";

/**
 * Shared write step for upsert, retire and restore (ACL is the caller's job):
 * 64-active cap over seeds + project rows, then the project row (a seed id
 * becomes this project's override; the global seed row is never touched).
 */
export const applyProjectPitfallUpsert = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly pitfall: ProjectPitfallUpsertInput;
  readonly parts: ProjectPitfallParts;
}): Promise<
  | { readonly ok: true; readonly pitfall: ProjectPitfallView }
  | ProjectPitfallFailure
> => {
  const { parts } = input;
  const merged = mergeProjectPitfalls({ ...parts, includeRetired: true });
  if (isProjectPitfallLimitExceeded({ merged, candidate: input.pitfall })) {
    return { ok: false, code: "limit_exceeded" };
  }
  const row = await upsertProjectPitfallRow({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    pitfall: input.pitfall,
  });
  const views = mergeProjectPitfalls({
    seeds: parts.seeds,
    projectRows: [row],
    hits: parts.hits,
    includeRetired: true,
  });
  const pitfall = views.find((view) => view.id === row.id);
  return pitfall === undefined
    ? { ok: false, code: "not_found" }
    : { ok: true, pitfall };
};
