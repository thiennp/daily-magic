import { isProjectPitfallLimitExceeded } from "@/features/project-pitfalls/internal/core/isProjectPitfallLimitExceeded";
import { mergeProjectPitfalls } from "@/features/project-pitfalls/internal/core/mergeProjectPitfalls";
import type {
  ProjectPitfallFailure,
  ProjectPitfallView,
} from "@/features/project-pitfalls/internal/core/projectPitfall.type";
import { validateProjectPitfallUpsert } from "@/features/project-pitfalls/internal/core/validateProjectPitfallUpsert";
import { resolveProjectPitfallAccess } from "@/features/project-pitfalls/internal/infrastructure/db/resolveProjectPitfallAccess";
import { selectProjectPitfallParts } from "@/features/project-pitfalls/internal/infrastructure/db/selectProjectPitfallParts";
import { upsertProjectPitfallRow } from "@/features/project-pitfalls/internal/infrastructure/db/upsertProjectPitfallRow";

/**
 * upsert_pitfall: owner or active member writes a project row. A seed id
 * becomes a project override; the cap counts active seeds + project rows.
 */
export const upsertProjectPitfall = async (input: {
  readonly actorUserId: string;
  readonly projectId: string;
  readonly body: unknown;
}): Promise<
  | { readonly ok: true; readonly pitfall: ProjectPitfallView }
  | ProjectPitfallFailure
> => {
  const projectId = input.projectId.trim();
  const parsed = validateProjectPitfallUpsert(input.body);
  if (!parsed.ok) {
    return parsed;
  }
  const access = await resolveProjectPitfallAccess({
    projectId,
    actorUserId: input.actorUserId,
  });
  if (!access.ok) {
    return access;
  }
  const parts = await selectProjectPitfallParts(projectId);
  const merged = mergeProjectPitfalls({ ...parts, includeRetired: true });
  if (isProjectPitfallLimitExceeded({ merged, candidate: parsed.input })) {
    return { ok: false, code: "limit_exceeded" };
  }
  const row = await upsertProjectPitfallRow({
    projectId,
    actorUserId: input.actorUserId,
    pitfall: parsed.input,
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
