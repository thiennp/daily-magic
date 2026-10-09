import type {
  ProjectPitfallFailure,
  ProjectPitfallView,
} from "@/features/project-pitfalls/internal/core/projectPitfall.type";
import { validateProjectPitfallUpsert } from "@/features/project-pitfalls/internal/core/validateProjectPitfallUpsert";
import { resolveProjectPitfallAccess } from "@/features/project-pitfalls/internal/infrastructure/db/resolveProjectPitfallAccess";
import { selectProjectPitfallParts } from "@/features/project-pitfalls/internal/infrastructure/db/selectProjectPitfallParts";
import { applyProjectPitfallUpsert } from "@/features/project-pitfalls/internal/infrastructure/orchestrators/applyProjectPitfallUpsert";

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
  if (access.role === "viewer") {
    return { ok: false, code: "forbidden" };
  }
  return applyProjectPitfallUpsert({
    projectId,
    actorUserId: input.actorUserId,
    pitfall: parsed.input,
    parts: await selectProjectPitfallParts(projectId),
  });
};
