import { isValidProjectPitfallId } from "@/features/project-pitfalls/internal/core/isValidProjectPitfallId";
import { mapPitfallToRuleUsage } from "@/features/project-pitfalls/internal/core/mapPitfallToRuleUsage";
import { mergeProjectPitfalls } from "@/features/project-pitfalls/internal/core/mergeProjectPitfalls";
import type { ProjectPitfallFailure } from "@/features/project-pitfalls/internal/core/projectPitfall.type";
import type { ProjectRuleChangeResult } from "@/features/project-pitfalls/internal/core/ruleUsage.type";
import { toProjectPitfallUpsert } from "@/features/project-pitfalls/internal/core/toProjectPitfallUpsert";
import { logProjectRuleActivity } from "@/features/project-pitfalls/internal/infrastructure/db/logProjectRuleActivity";
import { resolveProjectPitfallAccess } from "@/features/project-pitfalls/internal/infrastructure/db/resolveProjectPitfallAccess";
import { selectProjectPitfallParts } from "@/features/project-pitfalls/internal/infrastructure/db/selectProjectPitfallParts";
import { applyProjectPitfallUpsert } from "@/features/project-pitfalls/internal/infrastructure/orchestrators/applyProjectPitfallUpsert";

/**
 * Rule-compare Drop (active=false) / Undo (active=true). Owner only, explicit
 * request only. Drop = retire (source "retired", soft); restore = source
 * "project" and respects the 64-active cap. Global seeds are retired per
 * project via an override row; the seed row is never touched. Already in the
 * requested state → ok, changed=false, no write and no Access log line.
 */
export const setProjectRuleActive = async (input: {
  readonly actorUserId: string;
  readonly projectId: string;
  readonly ruleId: string;
  readonly active: boolean;
}): Promise<ProjectRuleChangeResult | ProjectPitfallFailure> => {
  const projectId = input.projectId.trim();
  if (projectId.length === 0) {
    return { ok: false, code: "invalid_arguments", field: "projectId" };
  }
  const access = await resolveProjectPitfallAccess({
    projectId,
    actorUserId: input.actorUserId,
  });
  if (!access.ok) return access;
  if (access.role !== "owner") return { ok: false, code: "forbidden" };
  const ruleId = input.ruleId.trim();
  if (!isValidProjectPitfallId(ruleId)) {
    return { ok: false, code: "invalid_arguments", field: "ruleId" };
  }
  const parts = await selectProjectPitfallParts(projectId);
  const before = mergeProjectPitfalls({ ...parts, includeRetired: true }).find(
    (view) => view.id === ruleId,
  );
  if (before === undefined) return { ok: false, code: "not_found" };
  if ((before.source !== "retired") === input.active) {
    const rule = mapPitfallToRuleUsage(before);
    return { ok: true, projectId, rule, changed: false };
  }
  const written = await applyProjectPitfallUpsert({
    projectId,
    actorUserId: input.actorUserId,
    pitfall: toProjectPitfallUpsert(before, input.active ? "project" : "retired"),
    parts,
  });
  if (!written.ok) return written;
  await logProjectRuleActivity({
    projectId,
    actorUserId: input.actorUserId,
    action: input.active ? "restored" : "dropped",
    before,
  });
  const rule = mapPitfallToRuleUsage(written.pitfall);
  return { ok: true, projectId, rule, changed: true };
};
