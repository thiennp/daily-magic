import { parseProjectPitfallHitBody } from "@/features/project-pitfalls/internal/core/parseProjectPitfallHitBody";
import type {
  ProjectPitfallFailure,
  ProjectPitfallHitRecord,
} from "@/features/project-pitfalls/internal/core/projectPitfall.type";
import { resolveProjectPitfallAccess } from "@/features/project-pitfalls/internal/infrastructure/db/resolveProjectPitfallAccess";
import { recordProjectPitfallHitRow } from "@/features/project-pitfalls/internal/infrastructure/db/recordProjectPitfallHitRow";
import { getProjectPitfall } from "@/features/project-pitfalls/internal/infrastructure/orchestrators/getProjectPitfall";

/**
 * record_hit: bump hitCount + lastSeenAt for a known pitfall in this project.
 * Local-first callers may batch (`count`); the cloud still owns the write.
 */
export const recordProjectPitfallHit = async (input: {
  readonly actorUserId: string;
  readonly projectId: string;
  readonly pitfallId: string;
  readonly body: unknown;
  readonly nowMs?: number;
}): Promise<
  | { readonly ok: true; readonly hit: ProjectPitfallHitRecord }
  | ProjectPitfallFailure
> => {
  const parsed = parseProjectPitfallHitBody(
    input.body,
    input.nowMs ?? Date.now(),
  );
  if (!parsed.ok) {
    return parsed;
  }
  const access = await resolveProjectPitfallAccess({
    projectId: input.projectId.trim(),
    actorUserId: input.actorUserId,
  });
  if (!access.ok) {
    return access;
  }
  if (access.role === "viewer") {
    return { ok: false, code: "forbidden" };
  }
  const found = await getProjectPitfall(input);
  if (!found.ok) {
    return found;
  }
  const hit = await recordProjectPitfallHitRow({
    projectId: input.projectId.trim(),
    pitfallId: found.pitfall.id,
    hit: parsed.input,
  });
  return { ok: true, hit };
};
